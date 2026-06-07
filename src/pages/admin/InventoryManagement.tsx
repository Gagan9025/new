import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Package, Plus, Pencil, Trash2, AlertTriangle, Sofa, LayoutGrid } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';

export const InventoryManagement: React.FC = () => {
  const { products, addProduct, editProduct, deleteProduct } = useStore();
  
  // Add state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(100);
  const [stock, setStock] = useState(10);
  const [category, setCategory] = useState<'Living Room' | 'Bedroom' | 'Office' | 'Dining' | 'Outdoor'>('Living Room');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [features, setFeatures] = useState('');

  // Edit state
  const [editProdId, setEditProdId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);
  const [editCategory, setEditCategory] = useState<'Living Room' | 'Bedroom' | 'Office' | 'Dining' | 'Outdoor'>('Living Room');
  const [editDesc, setEditDesc] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    addProduct({
      name,
      price,
      stock,
      category,
      description,
      rating: 4.5,
      reviewsCount: 1,
      image: image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60',
      features: features ? features.split(',').map(f => f.trim()) : ['Premium Timber', 'Craftsman Joint construction']
    });

    setName('');
    setPrice(100);
    setStock(10);
    setDescription('');
    setImage('');
    setFeatures('');
    setIsAddOpen(false);
  };

  const openEdit = (p: any) => {
    setEditProdId(p.id);
    setEditName(p.name);
    setEditPrice(p.price);
    setEditStock(p.stock);
    setEditCategory(p.category);
    setEditDesc(p.description);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProdId) return;
    editProduct(editProdId, {
      name: editName,
      price: editPrice,
      stock: editStock,
      category: editCategory,
      description: editDesc
    });
    setEditProdId(null);
  };

  const lowStockCount = products.filter(p => p.stock <= 2).length;

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display flex items-center gap-2">
          <Package className="h-5 w-5 text-accentTeal" /> Product Inventory Warehouse
        </h3>

        <div className="flex items-center gap-3">
          {lowStockCount > 0 && (
            <Badge variant="danger" className="animate-pulse flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> {lowStockCount} Low Stock Items
            </Badge>
          )}
          <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>
            Add Product
          </Button>
        </div>
      </div>

      {/* Roster list */}
      <Card className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-darkBg/60 border-b border-slate-200 dark:border-darkBorder/40 font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price Rate</th>
              <th className="px-6 py-4">Warehouse Stock</th>
              <th className="px-6 py-4">Safety Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-darkBorder/30 text-slate-700 dark:text-slate-300 font-medium">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-darkCard/10 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="h-10 w-10 object-cover rounded-lg" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-slate-800 dark:text-white leading-tight">{p.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{p.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="purple">{p.category}</Badge>
                </td>
                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">₹{p.price}</td>
                <td className="px-6 py-4 font-bold">{p.stock} units</td>
                <td className="px-6 py-4">
                  <Badge variant={p.stock === 0 ? 'danger' : p.stock <= 2 ? 'warning' : 'success'}>
                    {p.stock === 0 ? 'Sold Out' : p.stock <= 2 ? 'Critically Low' : 'Secure'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => openEdit(p)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-accentIndigo hover:bg-slate-100 dark:hover:bg-darkCard transition-all"
                      title="Edit Details"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                      title="Delete Product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Add dialog */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Catalog Product"
        size="lg"
      >
        <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
          <Input 
            label="Product Name"
            placeholder="E.g. Nordic Ash Oak Wardrobe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Price Rate (₹)"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              required
            />
            <Input 
              label="Warehouse Initial Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              required
            />
          </div>
          <Select 
            label="Catalog Category"
            options={[
              { value: 'Living Room', label: 'Living Room Seating' },
              { value: 'Bedroom', label: 'Bedroom Platforms' },
              { value: 'Office', label: 'Workplace Desks & Chairs' },
              { value: 'Dining', label: 'Dining Tables' },
              { value: 'Outdoor', label: 'Outdoor Lounges' }
            ]}
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          />
          <Input 
            label="High-Res Image URL (Optional)"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Input 
            label="Highlights (Comma Separated)"
            placeholder="Eco-friendly timber, Scratch-resistant finish, 3-Year Care"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
          <div className="flex flex-col gap-1.5 text-left text-xs">
            <label className="font-semibold text-slate-400">Product Specification Description</label>
            <textarea
              rows={3}
              placeholder="Detail wood grain finish, dimensions, weight capacities..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="glass-input p-2.5 resize-none focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Submit Product</Button>
          </div>
        </form>
      </Modal>

      {/* Edit dialog */}
      <Modal
        isOpen={editProdId !== null}
        onClose={() => setEditProdId(null)}
        title="Edit Product Details"
        size="md"
      >
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
          <Input 
            label="Product Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Price Rate (₹)"
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(parseInt(e.target.value))}
              required
            />
            <Input 
              label="Warehouse Stock"
              type="number"
              value={editStock}
              onChange={(e) => setEditStock(parseInt(e.target.value))}
              required
            />
          </div>
          <Select 
            label="Category"
            options={[
              { value: 'Living Room', label: 'Living Room Seating' },
              { value: 'Bedroom', label: 'Bedroom Platforms' },
              { value: 'Office', label: 'Workplace Desks & Chairs' },
              { value: 'Dining', label: 'Dining Tables' },
              { value: 'Outdoor', label: 'Outdoor Lounges' }
            ]}
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as any)}
          />
          <div className="flex flex-col gap-1.5 text-left text-xs">
            <label className="font-semibold text-slate-400">Description</label>
            <textarea
              rows={3}
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              required
              className="glass-input p-2.5 resize-none focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setEditProdId(null)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Updates</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
