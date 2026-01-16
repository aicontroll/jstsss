import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
    id: string;
    title: string | null;
    image_url: string;
    created_at: string;
}

const GalleryManager = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [newItemTitle, setNewItemTitle] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching images:', error);
        } else {
            setImages(data || []);
        }
        setLoading(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = e.target.files?.[0];
            if (!file) return;

            // 1. Upload to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            // 3. Save to Database
            const { error: dbError } = await supabase
                .from('gallery_images')
                .insert([
                    {
                        title: newItemTitle || 'Untitled',
                        image_url: publicUrl,
                    },
                ]);

            if (dbError) throw dbError;

            setNewItemTitle('');
            fetchImages();
        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + (error.message || 'Unknown error'));
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, imageUrl: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            // 1. Delete from Database
            const { error: dbError } = await supabase
                .from('gallery_images')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;

            // 2. Delete from Storage (Optional but recommended)
            // Extract filename from URL
            const fileName = imageUrl.split('/').pop();
            if (fileName) {
                await supabase.storage.from('images').remove([fileName]);
            }

            setImages(images.filter((img) => img.id !== id));
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error deleting image');
        }
    };

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Upload size={20} className="text-emerald-600" />
                    Upload New Image
                </h3>

                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
                        <input
                            type="text"
                            value={newItemTitle}
                            onChange={(e) => setNewItemTitle(e.target.value)}
                            placeholder="e.g. Community Event 2024"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div className="w-full md:w-auto relative">
                        <label className="cursor-pointer bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 justify-center">
                            {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                            {uploading ? 'Uploading...' : 'Select Image'}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group relative">
                        <div className="aspect-video bg-gray-100 relative">
                            <img src={img.image_url} alt={img.title || ''} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => handleDelete(img.id, img.image_url)}
                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform hover:scale-110"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-3">
                            <p className="font-medium text-gray-800 truncate">{img.title || 'Untitled'}</p>
                            <p className="text-xs text-gray-400">{new Date(img.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}

                {images.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                        <p>No images in gallery yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryManager;
