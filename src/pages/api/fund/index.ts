import { prisma } from '@/db/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface DefaultResponse {
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method === 'POST') {
    const { address, name, manager, description, startDate, matureDate } =
      JSON.parse(req.body) || {};
    console.log(address, name, manager, description, startDate, matureDate);
    if (
      !address ||
      !name ||
      !description ||
      !startDate ||
      !matureDate ||
      !manager
    ) {
      console.log('Invalid fund data', req.body);
      return res.status(400).send({
        message: 'Invalid fund data',
      });
    }

    const fundYield = Math.random() * 10;

    const data = await prisma.fund.create({
      data: {
        address,
        name,
        manager,
        description,
        startDate,
        matureDate,
        yield: fundYield.toString(),
      },
    });
    return res.status(200).json({
      message: 'Successs',
      data,
    });
  }
}
