import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ShoppingBag, Loader2, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { ProductReviewsModal } from '../components/ProductReviewsModal';
import { productService } from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await productService.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingProduct) {
                await productService.update(editingProduct.id, formData);
            } else {
                await productService.create(formData);
            }
            setIsModalOpen(false);
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Failed to save product', error);
            alert('Failed to save product');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productService.delete(id);
                fetchProducts();
            } catch (error) {
                console.error('Failed to delete product', error);
            }
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price
        });
        setIsModalOpen(true);
    };

    const openReviews = (product) => {
        setSelectedProduct(product);
        setIsReviewsOpen(true);
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({ name: '', description: '', price: '' });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    if (loading) {
        return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Products</h1>
                    <p className="text-slate-400 mt-1">Manage your product catalog</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} className="mr-2" />
                    Add Product
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="group hover:-translate-y-1 transition-transform duration-300">
                        <CardContent className="p-0">
                            <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden group-hover:from-slate-800 group-hover:to-slate-700 transition-colors">
                                <div className="absolute top-0 right-0 p-3 flex gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                                    <button onClick={() => openEditModal(product)} className="p-2 bg-white/10 hover:bg-primary/80 text-white rounded-full backdrop-blur-sm transition-colors" title="Edit">
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="p-2 bg-white/10 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-colors" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                    <button onClick={() => openReviews(product)} className="p-2 bg-white/10 hover:bg-yellow-500/80 text-white rounded-full backdrop-blur-sm transition-colors" title="Reviews">
                                        <MessageSquare size={16} />
                                    </button>
                                </div>
                                <ShoppingBag size={48} className="text-slate-600 group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-white truncate max-w-[70%]">{product.name}</h3>
                                    <span className="font-bold text-primary">${product.price}</span>
                                </div>
                                <p className="text-xs text-slate-400 line-clamp-2 h-8">{product.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {products.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                        No products found. Add some inventory!
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Product Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Wireless Headphones"
                        required
                        autoFocus
                    />
                    <Input
                        label="Price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0.00"
                        required
                    />
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
                        <textarea
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all p-3 h-24"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Product details..."
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={submitting}>
                            {editingProduct ? 'Update Product' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </Modal>

            <ProductReviewsModal
                isOpen={isReviewsOpen}
                onClose={() => setIsReviewsOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Products;
