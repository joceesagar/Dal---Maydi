import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

// GET /api/products
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Math.min(Number(searchParams.get("limit") ?? 12), 100);
  const skip = (page - 1) * limit;

  try {
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createProductSchema.parse(body);

    const created = await prisma.product.create({
      data: parsed as any,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Bad Request" },
      { status: 400 }
    );
  }
}
