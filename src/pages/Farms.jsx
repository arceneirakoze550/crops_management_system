import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'

const initialFarms = [
  { id: 1, name: 'Field A', location: 'North Valley', size: '50 acres', soilType: 'Loamy', irrigation: 'Drip', crops: 'Wheat, Barley', status: 'Active' },
  { id: 2, name: 'Field B', location: 'East Plains', size: '35 acres', soilType: 'Clay', irrigation: 'Sprinkler', crops: 'Corn', status: 'Active' },
  { id: 3, name: 'Field C', location: 'South Ridge', size: '40 acres', soilType: 'Sandy', irrigation: 'Flood', crops: 'Rice', status: 'Active' },
  { id: 4, name: 'Greenhouse 1', location: 'Main Campus', size: '5 acres', soilType: 'Hydroponic', irrigation: 'Automated', crops: 'Tomato, Peppers', status: 'Active' },
  { id: 5, name: 'Field D', location: 'West Hill', size: '60 acres', soilType: 'Loamy', irrigation: 'Drip', crops: 'Soybean', status: 'Fallow' }
]

const Farms = () => {
  const [farms, setFarms] = useState(initialFarms)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingFarm, setEditingFarm] = useState(null)
  const [formData, setFormData] = useState({ name: '', location: '', size: '', soilType: '', irrigation: '', crops: '', status: 'Active' })
  const [viewMode, setViewMode] = useState('grid')

  const filteredFarms = farms.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.location.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditingFarm(null)
    setFormData({ name: '', location: '', size: '', soilType: '', irrigation: '', crops: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (farm) => {
    setEditingFarm(farm)
    setFormData(farm)
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.name) return
    if (editingFarm) {
      setFarms(farms.map(f => f.id === editingFarm.id ? { ...formData, id: f.id } : f))
    } else {
      setFarms([...farms, { ...formData, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id) => {
    setFarms(farms.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Farm Management</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage all your farm locations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/[0.04] rounded-lg p-1 border border-white/[0.06]">
            <button onClick={() => setViewMode('grid')} className={`px-3 py-1.5 text-xs rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-gray-300'}`}>Grid</button>
            <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 text-xs rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-gray-300'}`}>List</button>
          </div>
          <Button onClick={openCreate} icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          }>Add Farm</Button>
        </div>
      </div>

      <Card>
        <Input
          placeholder="Search farms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6"
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
        />

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredFarms.map((farm) => (
              <div key={farm.id} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:border-white/[0.1] transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{farm.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{farm.location}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${farm.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'}`}>{farm.status}</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Size</span><span className="text-gray-300">{farm.size}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Soil</span><span className="text-gray-300">{farm.soilType}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Irrigation</span><span className="text-gray-300">{farm.irrigation}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Crops</span><span className="text-gray-300">{farm.crops}</span></div>
                </div>
                <div className="flex gap-2 pt-3 border-t border-white/[0.04]">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => openEdit(farm)}>Edit</Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleDelete(farm.id)}><span className="text-red-400">Delete</span></Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Location</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Size</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">Soil</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarms.map((farm) => (
                  <tr key={farm.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-white">{farm.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden md:table-cell">{farm.location}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden lg:table-cell">{farm.size}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden xl:table-cell">{farm.soilType}</td>
                    <td className="py-3 px-4"><span className={`px-2 py-0.5 text-xs rounded-full ${farm.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'}`}>{farm.status}</span></td>
                    <td className="py-3 px-4 text-right"><div className="flex items-center justify-end gap-2"><Button variant="ghost" size="sm" onClick={() => openEdit(farm)}>Edit</Button><Button variant="ghost" size="sm" onClick={() => handleDelete(farm.id)}><span className="text-red-400">Delete</span></Button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredFarms.length === 0 && (
          <div className="py-12 text-center">
            <svg className="w-12 h-12 mx-auto text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-gray-500 text-sm">No farms found</p>
          </div>
        )}
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingFarm ? 'Edit Farm' : 'Add New Farm'}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Farm Name" placeholder="e.g. Field A" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Input label="Location" placeholder="e.g. North Valley" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Size" placeholder="e.g. 50 acres" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} />
            <Input label="Soil Type" placeholder="e.g. Loamy" value={formData.soilType} onChange={(e) => setFormData({ ...formData, soilType: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Irrigation" placeholder="e.g. Drip" value={formData.irrigation} onChange={(e) => setFormData({ ...formData, irrigation: e.target.value })} />
            <Input label="Crops" placeholder="e.g. Wheat, Barley" value={formData.crops} onChange={(e) => setFormData({ ...formData, crops: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingFarm ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Farms
