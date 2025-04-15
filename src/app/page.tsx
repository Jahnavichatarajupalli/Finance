'use client';


import TransactionForm from '@/components/TransactionForm';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Add New Transaction</h1>
      <div className="max-w-xl mx-auto">
        <Card className="p-6">
          <TransactionForm onSuccess={() => {}} />
        </Card>
      </div>
    </main>
  );
}