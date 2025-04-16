'use server';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Transaction } from '@/models/Transaction';

export async function GET() {
  try {
    await dbConnect().then(()=>{console.log("db connected successfully")})
    const transactions = await Transaction.find({}).sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('GET /api/transactions error:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const transaction = await Transaction.create({
      ...data,
      amount: Math.abs(data.amount) * (data.type === 'debit' ? -1 : 1),
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('POST /api/transactions error:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}
