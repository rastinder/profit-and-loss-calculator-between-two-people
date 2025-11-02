
import React, { useState, useMemo, useCallback } from 'react';
import TransactionForm from './components/TransactionForm';
import BalanceSummary from './components/BalanceSummary';
import HistoryList from './components/HistoryList';
import { Transaction, Settlement, HistoryItem, User, TransactionType } from './types';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleAddTransaction = useCallback((newTransactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...newTransactionData,
      id: `trans_${new Date().getTime()}`,
      date: new Date(),
    };
    setTransactions(prev => [...prev, newTransaction]);
    setHistory(prev => [newTransaction, ...prev]);
  }, []);
  
  const balance = useMemo(() => {
    if (transactions.length === 0) {
      return 0;
    }

    let rasSpent = 0;
    let sukaSpent = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === TransactionType.EXPENSE) {
        totalExpense += t.amount;
        if (t.user === User.RAS) {
          rasSpent += t.amount;
        } else {
          sukaSpent += t.amount;
        }
      } else if (t.type === TransactionType.INCOME) {
        totalIncome += t.amount;
        if (t.user === User.RAS) {
          rasSpent -= t.amount;
        } else {
          sukaSpent -= t.amount;
        }
      }
    });

    const netCost = totalExpense - totalIncome;
    const sharePerPerson = netCost / 2;

    const rasBalance = rasSpent - sharePerPerson;
    
    // rasBalance > 0 means Ras paid more than their share, so Suka owes Ras.
    // rasBalance < 0 means Suka paid more than their share, so Ras owes Suka.
    return rasBalance;

  }, [transactions]);

  const handleSettleUp = useCallback(() => {
    if (balance === 0) return;

    const amount = Math.abs(balance);
    const newSettlement: Settlement = {
        id: `settle_${new Date().getTime()}`,
        from: balance > 0 ? User.SUKA : User.RAS,
        to: balance > 0 ? User.RAS : User.SUKA,
        amount,
        date: new Date(),
    };

    setHistory(prev => [newSettlement, ...prev]);
    setTransactions([]);

  }, [balance]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Ras & Suka's Ledger
            </span>
          </h1>
          <p className="text-gray-400 mt-2">Track shared finances with ease.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <BalanceSummary balance={balance} onSettle={handleSettleUp} />
          </div>
          <div className="lg:col-span-2">
            <HistoryList items={history} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
