#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

fn create_client(env: &Env) -> Address {
    Address::generate(env)
}

fn create_freelancer(env: &Env) -> Address {
    Address::generate(env)
}

#[test]
fn test_initialize_escrow() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_client(&env);
    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000; // 10 XLM in stroops
    let deadline = env.ledger().timestamp() + 86400; // 24 hours from now
    let metadata = String::from_str(&env, "Test escrow");

    let escrow_id = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata.clone(),
    ).unwrap();

    assert_eq!(escrow_id, 1);

    // Verify escrow was created
    let escrow = EscrowContract::get_escrow(env.clone(), escrow_id).unwrap();
    assert_eq!(escrow.id, 1);
    assert_eq!(escrow.amount, amount);
    assert_eq!(escrow.status, EscrowStatus::Created);
    assert_eq!(escrow.deadline, deadline);
}

#[test]
fn test_initialize_invalid_amount() {
    let env = Env::default();
    env.mock_all_auths();

    let freelancer = create_freelancer(&env);
    let amount: i128 = 0;
    let deadline = env.ledger().timestamp() + 86400;
    let metadata = String::from_str(&env, "Test");

    let result = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    );

    assert_eq!(result, Err(EscrowError::InvalidAmount));
}

#[test]
fn test_initialize_invalid_deadline() {
    let env = Env::default();
    env.mock_all_auths();

    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() - 1000; // Past deadline
    let metadata = String::from_str(&env, "Test");

    let result = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    );

    assert_eq!(result, Err(EscrowError::InvalidDeadline));
}

#[test]
fn test_fund_escrow() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_client(&env);
    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() + 86400;
    let metadata = String::from_str(&env, "Test escrow");

    let escrow_id = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    ).unwrap();

    // Fund the escrow
    let result = EscrowContract::fund(env.clone(), escrow_id);
    assert!(result.is_ok());

    // Verify status changed to Funded
    let escrow = EscrowContract::get_escrow(env.clone(), escrow_id).unwrap();
    assert_eq!(escrow.status, EscrowStatus::Funded);
}

#[test]
fn test_fund_already_funded_escrow() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_client(&env);
    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() + 86400;
    let metadata = String::from_str(&env, "Test escrow");

    let escrow_id = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    ).unwrap();

    // Fund once
    EscrowContract::fund(env.clone(), escrow_id).unwrap();

    // Try to fund again
    let result = EscrowContract::fund(env.clone(), escrow_id);
    assert_eq!(result, Err(EscrowError::EscrowAlreadyFunded));
}

#[test]
fn test_release_payment() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_client(&env);
    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() + 86400;
    let metadata = String::from_str(&env, "Test escrow");

    let escrow_id = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    ).unwrap();

    // Fund the escrow
    EscrowContract::fund(env.clone(), escrow_id).unwrap();

    // Release payment
    let result = EscrowContract::release_payment(env.clone(), escrow_id);
    assert!(result.is_ok());

    // Verify status changed to Released
    let escrow = EscrowContract::get_escrow(env.clone(), escrow_id).unwrap();
    assert_eq!(escrow.status, EscrowStatus::Released);
}

#[test]
fn test_release_not_funded_escrow() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_client(&env);
    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() + 86400;
    let metadata = String::from_str(&env, "Test escrow");

    let escrow_id = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    ).unwrap();

    // Try to release without funding
    let result = EscrowContract::release_payment(env.clone(), escrow_id);
    assert_eq!(result, Err(EscrowError::EscrowNotFunded));
}

#[test]
fn test_refund_after_deadline() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_client(&env);
    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() + 100; // Short deadline
    let metadata = String::from_str(&env, "Test escrow");

    let escrow_id = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    ).unwrap();

    // Fund the escrow
    EscrowContract::fund(env.clone(), escrow_id).unwrap();

    // Advance time past deadline
    env.ledger().with_mut(|li| {
        li.timestamp = deadline + 1000;
    });

    // Refund
    let result = EscrowContract::refund(env.clone(), escrow_id);
    assert!(result.is_ok());

    // Verify status changed to Refunded
    let escrow = EscrowContract::get_escrow(env.clone(), escrow_id).unwrap();
    assert_eq!(escrow.status, EscrowStatus::Refunded);
}

#[test]
fn test_refund_before_deadline() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_client(&env);
    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() + 86400;
    let metadata = String::from_str(&env, "Test escrow");

    let escrow_id = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    ).unwrap();

    // Fund the escrow
    EscrowContract::fund(env.clone(), escrow_id).unwrap();

    // Try to refund before deadline
    let result = EscrowContract::refund(env.clone(), escrow_id);
    assert_eq!(result, Err(EscrowError::DeadlineNotPassed));
}

#[test]
fn test_get_escrow_count() {
    let env = Env::default();
    env.mock_all_auths();

    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() + 86400;
    let metadata = String::from_str(&env, "Test");

    // Initially 0
    assert_eq!(EscrowContract::get_escrow_count(env.clone()), 0);

    // Create first escrow
    EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata.clone(),
    ).unwrap();

    assert_eq!(EscrowContract::get_escrow_count(env.clone()), 1);

    // Create second escrow
    EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    ).unwrap();

    assert_eq!(EscrowContract::get_escrow_count(env.clone()), 2);
}

#[test]
fn test_get_status() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_client(&env);
    let freelancer = create_freelancer(&env);
    let amount: i128 = 100_000_000;
    let deadline = env.ledger().timestamp() + 86400;
    let metadata = String::from_str(&env, "Test escrow");

    let escrow_id = EscrowContract::initialize(
        env.clone(),
        freelancer.clone(),
        amount,
        deadline,
        metadata,
    ).unwrap();

    // Check initial status
    let status = EscrowContract::get_status(env.clone(), escrow_id).unwrap();
    assert_eq!(status, EscrowStatus::Created);

    // Fund and check again
    EscrowContract::fund(env.clone(), escrow_id).unwrap();
    let status = EscrowContract::get_status(env.clone(), escrow_id).unwrap();
    assert_eq!(status, EscrowStatus::Funded);
}
