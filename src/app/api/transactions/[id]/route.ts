import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import { Transaction } from '../../../../models/Transaction';
import { ObjectId } from 'mongodb';
// import { NextApiRequest, NextApiResponse } from 'next';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();
//   const { id } = req.query;

//   if (req.method === 'PUT') {
//     const { description, amount, date } = req.body;
//     try {
//       await Transaction.updateOne(
//         { _id: new ObjectId(id as string) },
//         { $set: { description, amount, date } }
//       );
//       res.status(200).json({ message: 'Transaction updated' });
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to update transaction' });
//     }
//   } else if (req.method === 'DELETE') {
//     try {
//       await Transaction.deleteOne({ _id: new ObjectId(id as string) });
//       res.status(200).json({ message: 'Transaction deleted' });
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to delete transaction' });
//     }
//   } else {
//     res.setHeader('Allow', ['PUT', 'DELETE']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
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



// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     await dbConnect();
//     const transaction = await Transaction.create(body);
//     return NextResponse.json(transaction);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
//   }
// }

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