import { useState } from 'react'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import Modal from '../components/Modal'

const initialItems = [
  { id: 1, name: 'Fertilizer NPK', category: 'Fertilizer', quantity: 500, unit: 'kg', price: 45, supplier: 'AgriSupply Co', status: 'In Stock' },
  { id: 2, name: 'Pesticide X-200', category: 'Pesticide', quantity: 120, unit: 'liters', price: 120, supplier: 'CropCare Inc', status: 'In Stock' },
  { id: 3, name: 'Wheat Seeds', category: 'Seeds', quantity: 200, unit: 'kg', price: 30, supplier: 'SeedWorld', status: 'Low Stock' },
  { id: 4, name: 'Irrigation Pipe', category: 'Equipment', quantity: 50, unit: 'meters', price: 85, supplier: 'FarmTools', status: 'In Stock' },
  { id: 5, name: 'Herbicide Pro', category: 'Pesticide', quantity: 15, unit: 'liters', price: 95, supplier: 'CropCare Inc', status: 'Critical' }
]

const Inventory = () => {
  const [items, setItems] = useState(initialItems)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', category: '', quantity: '', unit: '', price: '', supplier: '', status: 'In Stock' })

  const filteredItems = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  )

  const totalValue = items.reduce((sum, i) => sum + (i.quantity * i.price), 0)
  const lowStock = items.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length

  const openCreate = () => {
    setEditingItem(null)
    setFormData({ name: '', category: '', quantity: '', unit: '', price: '', supplier: '', status: 'In Stock' })
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.name) return
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...formData, id: i.id, quantity: Number(formData.quantity), price: Number(formData.price) } : i))
    } else {
      setItems([...items, { ...formData, id: Date.now(), quantity: Number(formData.quantity), price: Number(formData.price) }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id) => setItems(items.filter(i => i.id !== id))

  const statusColors = {
    'In Stock': 'bg-emerald-500/10 text-emerald-400',
    'Low Stock': 'bg-amber-500/10 text-amber-400',
    'Critical': 'bg-red-500/10 text-red-400'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Items" value={items.length} color="emerald" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} />
        <StatCard title="Total Value" value={`$${totalValue.toLocaleString()}`} color="amber" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v1" /></svg>} />
        <StatCard title="Low Stock" value={lowStock} changeType={lowStock > 0 ? 'down' : 'up'} change={lowStock > 0 ? 'Action needed' : 'All good'} color="rose" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">Inventory Items</h2>
          <Button onClick={openCreate} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}>Add Item</Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
          </div>
          <Select options={[{ value: '', label: 'All Categories' }, { value: 'Fertilizer', label: 'Fertilizer' }, { value: 'Pesticide', label: 'Pesticide' }, { value: 'Seeds', label: 'Seeds' }, { value: 'Equipment', label: 'Equipment' }]} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Category</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Unit Price</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">Supplier</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr><td colSpan="7" className="py-12 text-center"><p className="text-gray-500 text-sm">No items found</p></td></tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-white">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden md:table-cell">{item.category}</td>
                    <td className="py-3 px-4 text-sm text-white">{item.quantity} {item.unit}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden lg:table-cell">${item.price}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden xl:table-cell">{item.supplier}</td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[item.status]}`}>{item.status}</span></td>
                    <td className="py-3 px-4 text-right"><div className="flex items-center justify-end gap-2"><Button variant="ghost" size="sm" onClick={() => openEdit(item)}>Edit</Button><Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}><span className="text-red-400">Delete</span></Button></div></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Item' : 'Add New Item'}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Item Name" placeholder="e.g. Fertilizer NPK" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Select label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} options={[{ value: 'Fertilizer', label: 'Fertilizer' }, { value: 'Pesticide', label: 'Pesticide' }, { value: 'Seeds', label: 'Seeds' }, { value: 'Equipment', label: 'Equipment' }]} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Quantity" type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
            <Input label="Unit" placeholder="kg, liters..." value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} />
            <Input label="Price ($)" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          </div>
          <Input label="Supplier" placeholder="Supplier name" value={formData.supplier} onChange={(e) => setFormData({ ...formData, supplier: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingItem ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Inventory
