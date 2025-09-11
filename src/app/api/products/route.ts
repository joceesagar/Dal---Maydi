import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  price: z.number().positive("Price must be positive"),
  tags: z.array(z.string()),
  images: z.array(z.string()),
  category: z.string(),
  volumes: z.array(z.string()).optional(),
  bundles: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.price && typeof body.price === "string") {
      body.price = parseFloat(body.price);
    }

    const parsed = createProductSchema.parse(body);

    const productData: any = {
      title: parsed.title,
      description: parsed.description,
      price: parsed.price,
      tags: parsed.tags,
      images: parsed.images,
      category: parsed.category,
    };

    if (parsed.volumes !== undefined) {
      productData.volumes = parsed.volumes;
    }
    if (parsed.bundles !== undefined) {
      productData.bundles = parsed.bundles;
    }

    const newProduct = await prisma.product.create({
      data: productData,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/products error:", err);

    if (err.name === 'ZodError') {
      return NextResponse.json(
        { error: "Validation error", details: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: err.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}




export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const skip = (page - 1) * limit;

    const where: any = {};

    if (category && category.trim()) {
      where.category = category;
    }

    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}