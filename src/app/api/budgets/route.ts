'use server'
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Budget } from '@/models/Budget';
import { Transaction } from '@/models/Transaction';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const budget = await Budget.create(data);
    return NextResponse.json(budget);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const budgets = await Budget.find({});
    const transactions = await Transaction.find({ type: 'debit' });
    
    const budgetsWithSpending = budgets.map(budget => {
      const spending = transactions
        .filter(t => t.category === budget.category)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      return {
        ...budget.toObject(),
        spent: spending,
        remaining: budget.amount - spending
      };
    });
    
    return NextResponse.json(budgetsWithSpending);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}