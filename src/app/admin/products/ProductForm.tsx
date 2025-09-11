"use client";
import React from "react";
import { Save, Loader2, Upload, X, DollarSign } from "lucide-react";

interface ProductFormProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    submitting: boolean;
    showEditModal: boolean;
    handleSubmit: (e: React.FormEvent) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (index: number) => void;
    imageUploading: boolean;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
    formData,
    setFormData,
    submitting,
    showEditModal,
    handleSubmit,
    handleImageUpload,
    removeImage,
    imageUploading,
    onCancel,
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Category + Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <input
                        type="text"
                        value={formData.tags.join(", ")}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                tags: e.target.value.split(",").map(tag => tag.trim()),
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="tag1, tag2"
                    />
                </div>
            </div>

            {/* Volumes + Bundles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    type="text"
                    value={formData.volumes.join(", ")}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            volumes: e.target.value.split(",").map(v => v.trim()),
                        })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Volumes (250ml, 500ml)"
                />

                <input
                    type="text"
                    value={formData.bundles.join(", ")}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            bundles: e.target.value.split(",").map(b => b.trim()),
                        })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Bundles (bundle1, bundle2)"
                />

            </div>

            {/* Images */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                    />

                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center"
                    >
                        {imageUploading ? (
                            <>
                                <Loader2 className="animate-spin text-blue-500 mb-2" size={24} />
                                <span className="text-blue-600">Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="text-gray-400 mb-2" size={24} />
                                <span className="text-gray-600">Click to upload images</span>
                            </>
                        )}
                    </label>

                    {/* Uploaded Images Preview */}
                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {formData.images.map((image: any, index: any) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-20 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Success inline feedback */}
                    {!imageUploading && formData.images.length > 0 && (
                        <p className="text-sm text-green-600 mt-2">
                            ✅ {formData.images.length} image(s) uploaded
                        </p>
                    )}
                </div>


            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                    {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    {submitting ? "Saving..." : showEditModal ? "Update Product" : "Create Product"}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
