import { useState } from 'react'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import Modal from '../components/Modal'

const initialSales = [
  { id: 1, product: 'Wheat', quantity: 500, unit: 'kg', price: 2.5, total: 1250, date: '2024-06-15', buyer: 'GrainCorp', status: 'Completed' },
  { id: 2, product: 'Corn', quantity: 300, unit: 'kg', price: 3.0, total: 900, date: '2024-06-14', buyer: 'FoodMart', status: 'Completed' },
  { id: 3, product: 'Rice', quantity: 200, unit: 'kg', price: 4.5, total: 900, date: '2024-06-13', buyer: 'RiceWorld', status: 'Pending' },
  { id: 4, product: 'Tomato', quantity: 100, unit: 'kg', price: 5.0, total: 500, date: '2024-06-12', buyer: 'FreshMarket', status: 'Completed' },
  { id: 5, product: 'Soybean', quantity: 400, unit: 'kg', price: 2.0, total: 800, date: '2024-06-10', buyer: 'OilMills Inc', status: 'Completed' }
]

const monthlyData = [
  { month: 'Jan', revenue: 4200, orders: 12 },
  { month: 'Feb', revenue: 3800, orders: 10 },
  { month: 'Mar', revenue: 5100, orders: 15 },
  { month: 'Apr', revenue: 4600, orders: 13 },
  { month: 'May', revenue: 5800, orders: 18 },
  { month: 'Jun', revenue: 6200, orders: 20 }
]

const Sales = () => {
  const [sales, setSales] = useState(initialSales)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ product: '', quantity: '', unit: 'kg', price: '', buyer: '', date: new Date().toISOString().split('T')[0], status: 'Pending' })

  const filteredSales = sales.filter(s =>
    s.product.toLowerCase().includes(search.toLowerCase()) ||
    s.buyer.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0)
  const totalOrders = sales.length
  const avgOrder = totalRevenue / totalOrders || 0

  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue))

  const openCreate = () => {
    setFormData({ product: '', quantity: '', unit: 'kg', price: '', buyer: '', date: new Date().toISOString().split('T')[0], status: 'Pending' })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.product || !formData.quantity || !formData.price) return
    const quantity = Number(formData.quantity)
    const price = Number(formData.price)
    setSales([{ ...formData, id: Date.now(), quantity, price, total: quantity * price }, ...sales])
    setModalOpen(false)
  }

  const handleDelete = (id) => setSales(sales.filter(s => s.id !== id))

  const statusColors = {
    Completed: 'bg-emerald-500/10 text-emerald-400',
    Pending: 'bg-amber-500/10 text-amber-400',
    Cancelled: 'bg-red-500/10 text-red-400'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} change="+18.2%" changeType="up" color="emerald" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v1" /></svg>} />
        <StatCard title="Total Orders" value={totalOrders} change="+5" changeType="up" color="blue" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
        <StatCard title="Avg Order Value" value={`$${avgOrder.toFixed(0)}`} change="+3.1%" changeType="up" color="amber" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} />
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-white mb-6">Revenue Trend</h2>
        <div className="flex items-end gap-4 h-40">
          {monthlyData.map((item) => (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md relative group cursor-pointer hover:from-emerald-500 hover:to-emerald-300 transition-all"
                style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/[0.06]">
                  ${item.revenue.toLocaleString()} ({item.orders} orders)
                </div>
              </div>
              <span className="text-xs text-gray-500">{item.month}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">Sales Records</h2>
          <Button onClick={openCreate} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}>New Sale</Button>
        </div>

        <Input placeholder="Search sales..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-6" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Quantity</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Price</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">Buyer</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.length === 0 ? (
                <tr><td colSpan="8" className="py-12 text-center"><p className="text-gray-500 text-sm">No sales found</p></td></tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-white">{sale.product}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden md:table-cell">{sale.quantity} {sale.unit}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden lg:table-cell">${sale.price}/{sale.unit}</td>
                    <td className="py-3 px-4 text-sm text-white font-medium">${sale.total.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden xl:table-cell">{sale.buyer}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden md:table-cell">{sale.date}</td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[sale.status]}`}>{sale.status}</span></td>
                    <td className="py-3 px-4 text-right"><Button variant="ghost" size="sm" onClick={() => handleDelete(sale.id)}><span className="text-red-400">Delete</span></Button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Record New Sale">
        <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Product" placeholder="e.g. Wheat" value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })} required />
            <Input label="Buyer" placeholder="Buyer name" value={formData.buyer} onChange={(e) => setFormData({ ...formData, buyer: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Quantity" type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} required />
            <Select label="Unit" value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} options={[{ value: 'kg', label: 'kg' }, { value: 'tons', label: 'tons' }, { value: 'liters', label: 'liters' }]} />
            <Input label="Price ($)" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
          </div>
          <Input label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Record Sale</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Sales
