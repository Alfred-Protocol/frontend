// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/db/prisma';
import { isAddress } from 'ethers/lib/utils.js';
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
      const { address } = req.query;
      let manager = address?.toString();
      // If invalid address, do not filter by manager
      if (manager !== undefined && !isAddress(manager)) {
        manager = undefined;
      }
      console.log(prisma);
      const funds = await prisma.fund.findMany({
        where: {
          manager: {
            contains: manager,
          },
        },
      });

      return res.status(200).json({ message: 'Success', data: funds });
    } catch (e) {
      return res.status(400).json({
        message: 'Error occured',
        data: e,
      });
    }
  }
}
