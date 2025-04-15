import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { Transaction } from '../../../models/Transaction';
import { ObjectId } from 'mongodb';
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    await Transaction.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

// ... existing GET and DELETE handlers ...

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();

    const { description, amount, date } = data;

    if (!description || !amount || !date) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    console.log(params.id)

    const updated = await Transaction.findByIdAndUpdate(
      params.id,
      {
        description,
        amount,
        date: new Date(date),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaction updated successfully', transaction: updated });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}