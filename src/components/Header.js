
import React, {useState} from 'react'
import { checkConnection,retrievePublicKey,getBalance } from './Freighter'
const Header = () => {
    const [connected , setConnected] = useState(false);
    const [publicKey , setPublicKey] = useState('');
    const [balance , setBalance] = useState('0');
    const connectWallet = async () => {
        try{
            const allowed = await checkConnection();
            if(!allowed) {
                alert('Please allow access to your wallet');
                return;
            }
        const key = await retrievePublicKey();
        const bal = await getBalance();
        setPublicKey(key);
        setBalance(Number(bal).toFixed(2));
        setConnected(true);
    }catch (error) {
        console.error('Error connecting to wallet:', error);
    }
};
  return (
    <div>
      <div>Stellar Wallet Header</div>
      <div>
        {publicKey && (
            <>
            <div>{`${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`}</div>
      <div>
        balance: {balance} XLM
      </div>
      </>
        )}
        <button onClick={connectWallet} disabled={connected}>{connected ? 'Connected' : 'Connect Wallet'}</button>
      </div>
    </div>
  )
};

export default Header
