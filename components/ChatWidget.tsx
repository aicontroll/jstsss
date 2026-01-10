import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import ChatLoader from './ui/ChatLoader';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Custom Bot Icon Component
const CustomBotIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
    <img
        src="/chat-logo.png"
        alt="Chat Logo"
        width={size}
        height={size}
        className={`object-contain rounded-full ${className}`}
    />
);

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) throw new Error('Failed to send message');
            if (!response.body) throw new Error('No response body');

            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') break;

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.content) {
                                assistantMessage += parsed.content;
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    newMessages[newMessages.length - 1].content = assistantMessage;
                                    return newMessages;
                                });
                            }
                        } catch (e) {
                            console.error('Error parsing chunk:', e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-emerald-600 hover:bg-emerald-700'
                    } text-white`}
                aria-label="Toggle Chat"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-2xl flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-full animate-pulse">
                            <CustomBotIcon size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold">AI Assistant</h3>
                            <p className="text-xs text-emerald-100">Ask me anything!</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-8">
                                <CustomBotIcon size={48} className="mx-auto mb-2 text-emerald-500 animate-bounce" />
                                <p className="px-4">Hi there! I'm DeepSeek, an AI assistant created by DeepSeek Company. integrated by "Metalogix (dev.utsav thakur)" & currently working for JATASHANKAR THAKUR SMARITI SEVA SANSTHAN</p>
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                                        <CustomBotIcon size={16} className="text-emerald-600" />
                                    </div>
                                )}
                                <div
                                    className={`p-3 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap ${msg.role === 'user'
                                        ? 'bg-emerald-600 text-white rounded-tr-none'
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <User size={16} className="text-gray-600" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <ChatLoader />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                aria-label="Send message"
                            >
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
