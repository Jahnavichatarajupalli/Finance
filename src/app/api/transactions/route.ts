import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Transaction } from '@/models/Transaction';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const transaction = await Transaction.create({
      ...data,
      amount: Math.abs(data.amount) * (data.type === 'debit' ? -1 : 1)
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const transactions = await Transaction.find({}).sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}