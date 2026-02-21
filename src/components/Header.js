
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Stellar Wallet Connect</h1>
        <div className="flex items-center space-x-4">
          <span className="text-cyan-400">Freighter Wallet</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
