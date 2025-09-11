import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const updateProductSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    price: z.number().positive("Price must be positive").optional(),
    tags: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),
    volumes: z.array(z.string()).optional(),
    bundles: z.array(z.string()).optional(),
});

function getPublicIdFromUrl(url: string): string | null {
    const match = url.match(/\/v\d+\/(.+)\.(jpg|jpeg|png|gif|webp)$/);
    return match ? match[1] : null;
}

async function deleteCloudinaryImages(imageUrls: string[]) {
    if (!imageUrls?.length) return;

    const deletePromises = imageUrls.map(async (url) => {
        try {
            const publicId = getPublicIdFromUrl(url);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        } catch (error) {
            console.error(`Failed to delete image ${url}:`, error);
        }
    });

    await Promise.allSettled(deletePromises);
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id: id }
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (err) {
        console.error("GET /api/products/[id] error:", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}



export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (body.price && typeof body.price === "string") {
            body.price = parseFloat(body.price);
        }

        const parsed = updateProductSchema.parse(body);

        const updateData = Object.fromEntries(
            Object.entries(parsed).filter(([_, value]) => value !== undefined)
        );

        const current = await prisma.product.findUnique({
            where: { id: id },
            select: { images: true },
        });

        if (!current) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (updateData.images) {
            const currentImages = current.images || [];
            const newImages = updateData.images as string[];
            const imagesToDelete = currentImages.filter(img => !newImages.includes(img));

            if (imagesToDelete.length > 0) {
                await deleteCloudinaryImages(imagesToDelete);
            }
        }

        const updated = await prisma.product.update({
            where: { id: id },
            data: updateData,
        });

        return NextResponse.json(updated);
    } catch (err: any) {
        console.error("PUT /api/products/[id] error:", err);
        if (err.name === 'ZodError') {
            return NextResponse.json(
                { error: "Validation error", details: err.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: err.message ?? "Bad Request" },
            { status: 400 }
        );
    }
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id },
            select: { images: true, title: true },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (product.images?.length) {
            await deleteCloudinaryImages(product.images);
        }

        await prisma.product.delete({ where: { id } });

        return NextResponse.json({
            message: "Product deleted successfully",
            deletedProduct: { id, title: product.title }
        });
    } catch (err: any) {
        console.error("DELETE /api/products/[id] error:", err);
        return NextResponse.json(
            { error: err.message ?? "Internal Server Error" },
            { status: 500 }
        );
    }
}