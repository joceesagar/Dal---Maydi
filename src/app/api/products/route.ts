import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const createProductSchema = z.object({
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
  if (req.method === "GET") {
    const page = Number(req.query.page ?? 1);
    const limit = Math.min(Number(req.query.limit ?? 12), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count(),
    ]);

    return res.status(200).json({ items, total, page, limit });
  }

  if (req.method === "POST") {
    try {
      const parsed = createProductSchema.parse(req.body);
      const created = await prisma.product.create({ data: parsed as any });
      return res.status(201).json(created);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.status(405).end();
}
