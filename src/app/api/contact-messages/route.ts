import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, email, message, phoneNumber } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                {
                    error: 'Missing required fields',
                    details: 'Name, email, and message are required'
                },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const contactMessage = await prisma.contactMessages.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                message: message.trim(),
                phoneNumber: phoneNumber?.trim() || null,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Contact message saved successfully',
                data: contactMessage
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creating contact message:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');

        const messages = await prisma.contactMessages.findMany({
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            success: true,
            data: messages,
            count: messages.length
        });

    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}