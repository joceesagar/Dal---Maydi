import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const updateProductSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  category: z.string().optional(),
  volumes: z.array(z.string()).optional(),
  bundles: z.array(z.string()).optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };

  if (req.method === "GET") {
    const item = await prisma.product.findUnique({ where: { id } });
    return res.status(200).json(item);
  }

  if (req.method === "PUT") {
    try {
      const parsed = updateProductSchema.parse(req.body);
      const updated = await prisma.product.update({
        where: { id },
        data: parsed as any,
      });
      return res.status(200).json(updated);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === "DELETE") {
    await prisma.product.delete({ where: { id } });
    return res.status(204).end();
  }

  res.status(405).end();
}
