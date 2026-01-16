import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, LayoutDashboard, Users, Image as ImageIcon, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GalleryManager from '../../components/admin/GalleryManager';

type Tab = 'content' | 'gallery' | 'members';

const Dashboard = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('gallery'); // Default to gallery for now

    const handleLogout = async () => {
        await signOut();
        navigate('/admin/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'gallery':
                return <GalleryManager />;
            case 'content':
                return <div className="p-8 text-center text-gray-500">Content editing coming soon...</div>;
            case 'members':
                return <div className="p-8 text-center text-gray-500">Member management coming soon...</div>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <LayoutDashboard className="text-emerald-600" />
                        Admin Panel
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'content' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <FileText size={20} />
                        Site Content
                    </button>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'gallery' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <ImageIcon size={20} />
                        Gallery
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'members' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users size={20} />
                        Governing Body
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen">
                <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">Admin Panel</h2>
                    <button onClick={handleLogout} className="text-red-600">
                        <LogOut size={20} />
                    </button>
                </header>

                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {activeTab === 'gallery' && 'Gallery Management'}
                            {activeTab === 'content' && 'Site Content'}
                            {activeTab === 'members' && 'Governing Body'}
                        </h1>
                        <p className="text-gray-500">Manage your website content here.</p>
                    </div>

                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
