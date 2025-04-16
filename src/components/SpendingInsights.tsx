'use client';

interface Budget {
  category: string;
  amount: number;
}

interface Transaction {
  category: string;
  amount: number;
}

export default function SpendingInsights({ budgets, transactions }: { budgets: Budget[], transactions: Transaction[] }) {
  const insights = budgets.map(budget => {
    const spending = transactions
      .filter(t => t.category === budget.category)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
    
    const percentageUsed = (spending / budget.amount) * 100;
    
    return {
      category: budget.category,
      budgetAmount: budget.amount,
      spent: spending,
      remaining: budget.amount - spending,
      percentageUsed
    };
  });

  return (
    <div className="space-y-4">
      {insights.map(insight => (
        <div key={insight.category} className="border p-4 rounded-lg">
          <h3 className="font-semibold">{insight.category}</h3>
          <div className="mt-2 space-y-2">
            <p>Budget: ${insight.budgetAmount}</p>
            <p>Spent: ${insight.spent}</p>
            <p>Remaining: ${insight.remaining}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  insight.percentageUsed > 90 ? 'bg-red-500' :
                  insight.percentageUsed > 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(100, insight.percentageUsed)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}