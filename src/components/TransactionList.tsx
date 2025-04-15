'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionUpdate: () => void;
}

export default function TransactionList({ transactions, onTransactionUpdate }: TransactionListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    description: '',
    amount: 0,
    date: ''
  });

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction._id);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount,
      date: new Date(transaction.date).toISOString().split('T')[0]
    });
  };

  const handleSave = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error('Failed to update transaction');
      setEditingId(null);
      onTransactionUpdate();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete transaction');
      onTransactionUpdate();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>
                {editingId === transaction._id ? (
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : (
                  format(new Date(transaction.date), 'MMM dd, yyyy')
                )}
              </TableCell>
              <TableCell>
                {editingId === transaction._id ? (
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : (
                  transaction.description
                )}
              </TableCell>
              <TableCell className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                {editingId === transaction._id ? (
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: Number(e.target.value) })}
                    className="border p-1 rounded"
                  />
                ) : (
                  `$${Math.abs(transaction.amount).toFixed(2)}`
                )}
              </TableCell>
              <TableCell>
                {editingId === transaction._id ? (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleSave(transaction._id)}
                      className="mr-2"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleEdit(transaction)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}