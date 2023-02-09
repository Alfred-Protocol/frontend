import { prisma } from '@/db/prisma';
import { isAddress } from 'ethers/lib/utils.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { DefaultResponse } from '.';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method === 'GET') {
    const { address } = req.query;
    console.log(address);
    if (!address || !isAddress(address.toString())) {
      return res.status(400).json({
        message: 'Invalid address',
      });
    }
    const fund = await prisma.fund.findFirst({
      where: {
        address: address.toString(),
      },
    });

    return res.status(200).json({ message: 'Success', data: fund });
  }
}
