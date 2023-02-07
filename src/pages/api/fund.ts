// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/db/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateFundData {
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateFundData>
) {
  if (req.method === 'POST') {
    const { address, name, manager, description, startDate, matureDate } =
      JSON.parse(req.body);
    console.log(address, name, manager, description, startDate, matureDate);
    if (!name || !description || !startDate || !matureDate || !manager) {
      console.log('Invalid fund data', req.body);
      return res.status(400).send({
        message: 'Invalid fund data',
      });
    }
    const data = await prisma.fund.create({
      data: {
        address,
        name,
        manager,
        description,
        startDate,
        matureDate,
      },
    });
    return res.status(200).json({
      message: 'Successs',
      data,
    });
  }
}
