import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHotkey: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check for Ctrl + Shift + C
            if (event.ctrlKey && event.shiftKey && (event.key === 'c' || event.key === 'C')) {
                event.preventDefault();
                navigate('/admin/login');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

    return null;
};

export default AdminHotkey;
