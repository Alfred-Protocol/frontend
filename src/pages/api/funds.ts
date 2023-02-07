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
  if (req.method === 'GET') {
    try {
      const funds = await prisma.fund.findMany();
      return res.status(200).json({ message: 'Success', data: funds });
    } catch (e) {
      return res.status(400).json({
        message: 'Error occured',
        data: e,
      });
    }
  }
}
