'use client';

import React, { useState, useEffect } from 'react';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    phoneNumber?: string;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    success: boolean;
    data: ContactMessage[];
    count: number;
}

function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/contact-messages');

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const result: ApiResponse = await response.json();
            setMessages(result.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Messages</h1>
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bb8116]"></div>
                        <span className="ml-3 text-gray-600">Loading messages...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Messages</h1>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800">Error: {error}</p>
                        <button
                            onClick={fetchMessages}
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
                    <div className="text-sm text-gray-500">
                        Total: {messages.length} messages
                    </div>
                </div>

                {messages.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500 text-lg">No messages found</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {messages.map((message) => (
                            <div key={message.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#bb8116]">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {message.name}
                                        </h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p className="flex items-center">
                                                <span className="font-medium mr-2">Email:</span>
                                                <a
                                                    href={`mailto:${message.email}`}
                                                    className="text-[#bb8116] hover:underline"
                                                >
                                                    {message.email}
                                                </a>
                                            </p>
                                            {message.phoneNumber && (
                                                <p className="flex items-center">
                                                    <span className="font-medium mr-2">Phone:</span>
                                                    <a
                                                        href={`tel:${message.phoneNumber}`}
                                                        className="text-[#bb8116] hover:underline"
                                                    >
                                                        {message.phoneNumber}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <p>{formatDate(message.createdAt)}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-700 mb-2">Message:</h4>
                                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminMessagesPage;