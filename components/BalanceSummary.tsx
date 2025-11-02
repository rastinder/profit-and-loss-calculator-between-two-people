
import React from 'react';
import { User } from '../types';

interface BalanceSummaryProps {
  balance: number;
  onSettle: () => void;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({ balance, onSettle }) => {
  const whoOwes = balance > 0 ? `${User.SUKA} owes ${User.RAS}` : `${User.RAS} owes ${User.SUKA}`;
  const amountOwed = Math.abs(balance).toFixed(2);
  const isSettled = balance === 0;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full text-center">
      <h2 className="text-lg font-medium text-gray-400 mb-2">Current Balance</h2>
      {isSettled ? (
        <div className="flex flex-col items-center justify-center h-24">
            <p className="text-3xl font-bold text-green-400">All Square!</p>
            <p className="text-gray-300">No one owes anyone anything.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-24">
          <p className="text-4xl font-extrabold text-white">${amountOwed}</p>
          <p className={`mt-1 text-lg font-semibold ${balance > 0 ? 'text-cyan-400' : 'text-amber-400'}`}>
            {whoOwes}
          </p>
        </div>
      )}
      <button
        onClick={onSettle}
        disabled={isSettled}
        className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Settle Up
      </button>
    </div>
  );
};

export default BalanceSummary;
