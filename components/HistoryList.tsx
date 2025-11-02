
import React from 'react';
import { HistoryItem, TransactionType, isSettlement } from '../types';

interface HistoryListProps {
  items: HistoryItem[];
}

const formatDateTime = (date: Date) => {
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

const HistoryItemCard: React.FC<{ item: HistoryItem }> = ({ item }) => {
    if (isSettlement(item)) {
        return (
            <div className="bg-gray-700/50 p-4 rounded-lg flex items-center space-x-4">
                <div className="flex-shrink-0 bg-green-500 h-10 w-10 rounded-full flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-white">{item.from} paid {item.to}</p>
                    <p className="text-sm text-gray-400">{formatDateTime(item.date)}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg text-green-400">${item.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-400">Settlement</p>
                </div>
            </div>
        );
    }

    const isExpense = item.type === TransactionType.EXPENSE;
    const amountColor = isExpense ? 'text-red-400' : 'text-blue-400';
    const sign = isExpense ? '-' : '+';

    return (
        <div className="bg-gray-700/50 p-4 rounded-lg flex items-center space-x-4">
             <div className={`flex-shrink-0 ${isExpense ? 'bg-red-500' : 'bg-blue-500'} h-10 w-10 rounded-full flex items-center justify-center`}>
                {isExpense ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9l-5 5-5-5" />
                </svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>}
            </div>
            <div className="flex-1">
                <p className="font-semibold text-white">{item.description}</p>
                <p className="text-sm text-gray-400">{formatDateTime(item.date)}</p>
            </div>
            <div className="text-right">
                <p className={`font-bold text-lg ${amountColor}`}>{sign}${item.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-400">{isExpense ? `Paid by ${item.user}` : `Received by ${item.user}`}</p>
            </div>
        </div>
    );
};


const HistoryList: React.FC<HistoryListProps> = ({ items }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-bold text-white mb-4">History</h2>
      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No transactions yet.</p>
      ) : (
        <div className="space-y-3 max-h-[400px] lg:max-h-full overflow-y-auto pr-2">
          {items.map((item) => <HistoryItemCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
