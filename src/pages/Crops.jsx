import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import Modal from '../components/Modal'

const initialCrops = [
  { id: 1, name: 'Wheat', variety: 'Hard Red', farm: 'Field A', plantedDate: '2024-03-15', status: 'Growing', area: '50 acres', expectedYield: '200 tons' },
  { id: 2, name: 'Corn', variety: 'Sweet Corn', farm: 'Field B', plantedDate: '2024-04-01', status: 'Growing', area: '35 acres', expectedYield: '150 tons' },
  { id: 3, name: 'Rice', variety: 'Basmati', farm: 'Field C', plantedDate: '2024-02-20', status: 'Harvested', area: '40 acres', expectedYield: '180 tons' },
  { id: 4, name: 'Tomato', variety: 'Roma', farm: 'Greenhouse 1', plantedDate: '2024-05-10', status: 'Planted', area: '5 acres', expectedYield: '25 tons' },
  { id: 5, name: 'Soybean', variety: 'Glycine max', farm: 'Field D', plantedDate: '2024-04-15', status: 'Growing', area: '60 acres', expectedYield: '120 tons' }
]

const Crops = () => {
  const [crops, setCrops] = useState(initialCrops)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCrop, setEditingCrop] = useState(null)
  const [formData, setFormData] = useState({ name: '', variety: '', farm: '', plantedDate: '', status: 'Planted', area: '', expectedYield: '' })

  const filteredCrops = crops.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.variety.toLowerCase().includes(search.toLowerCase()) ||
    c.farm.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditingCrop(null)
    setFormData({ name: '', variety: '', farm: '', plantedDate: '', status: 'Planted', area: '', expectedYield: '' })
    setModalOpen(true)
  }

  const openEdit = (crop) => {
    setEditingCrop(crop)
    setFormData(crop)
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.variety) return
    if (editingCrop) {
      setCrops(crops.map(c => c.id === editingCrop.id ? { ...formData, id: c.id } : c))
    } else {
      setCrops([...crops, { ...formData, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id) => {
    setCrops(crops.filter(c => c.id !== id))
  }

  const statusColors = {
    Growing: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Harvested: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Planted: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Crop Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all your crops</p>
        </div>
        <Button onClick={openCreate} icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        }>Add Crop</Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search crops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            />
          </div>
          <Select
            options={[
              { value: '', label: 'All Status' },
              { value: 'Growing', label: 'Growing' },
              { value: 'Harvested', label: 'Harvested' },
              { value: 'Planted', label: 'Planted' }
            ]}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Farm</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Planted</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Area</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <svg className="w-12 h-12 mx-auto text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    <p className="text-gray-500 text-sm">No crops found</p>
                  </td>
                </tr>
              ) : (
                filteredCrops.map((crop) => (
                  <tr key={crop.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-white">{crop.name}</p>
                        <p className="text-xs text-gray-500">{crop.variety}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden md:table-cell">{crop.farm}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden lg:table-cell">{crop.plantedDate}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusColors[crop.status]}`}>
                        {crop.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400 hidden xl:table-cell">{crop.area}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(crop)}>Edit</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(crop.id)}>
                          <span className="text-red-400">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCrop ? 'Edit Crop' : 'Add New Crop'}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Crop Name" placeholder="e.g. Wheat" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Input label="Variety" placeholder="e.g. Hard Red" value={formData.variety} onChange={(e) => setFormData({ ...formData, variety: e.target.value })} required />
          </div>
          <Input label="Farm/Location" placeholder="e.g. Field A" value={formData.farm} onChange={(e) => setFormData({ ...formData, farm: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Planted Date" type="date" value={formData.plantedDate} onChange={(e) => setFormData({ ...formData, plantedDate: e.target.value })} />
            <Select label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} options={[{ value: 'Planted', label: 'Planted' }, { value: 'Growing', label: 'Growing' }, { value: 'Harvested', label: 'Harvested' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Area" placeholder="e.g. 50 acres" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} />
            <Input label="Expected Yield" placeholder="e.g. 200 tons" value={formData.expectedYield} onChange={(e) => setFormData({ ...formData, expectedYield: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingCrop ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Crops
