import { supabase } from './supabase'

export const getCrops = async () => {
  const { data, error } = await supabase.from('crops').select('*').order('created_at', { ascending: false })
  return { data, error }
}

export const createCrop = async (crop) => {
  const { data, error } = await supabase.from('crops').insert(crop).select()
  return { data, error }
}

export const updateCrop = async (id, crop) => {
  const { data, error } = await supabase.from('crops').update(crop).eq('id', id).select()
  return { data, error }
}

export const deleteCrop = async (id) => {
  const { error } = await supabase.from('crops').delete().eq('id', id)
  return { error }
}

export const getFarms = async () => {
  const { data, error } = await supabase.from('farms').select('*').order('created_at', { ascending: false })
  return { data, error }
}

export const createFarm = async (farm) => {
  const { data, error } = await supabase.from('farms').insert(farm).select()
  return { data, error }
}

export const updateFarm = async (id, farm) => {
  const { data, error } = await supabase.from('farms').update(farm).eq('id', id).select()
  return { data, error }
}

export const deleteFarm = async (id) => {
  const { error } = await supabase.from('farms').delete().eq('id', id)
  return { error }
}

export const getInventory = async () => {
  const { data, error } = await supabase.from('inventory').select('*').order('created_at', { ascending: false })
  return { data, error }
}

export const createInventoryItem = async (item) => {
  const { data, error } = await supabase.from('inventory').insert(item).select()
  return { data, error }
}

export const updateInventoryItem = async (id, item) => {
  const { data, error } = await supabase.from('inventory').update(item).eq('id', id).select()
  return { data, error }
}

export const deleteInventoryItem = async (id) => {
  const { error } = await supabase.from('inventory').delete().eq('id', id)
  return { error }
}

export const getSales = async () => {
  const { data, error } = await supabase.from('sales').select('*').order('date', { ascending: false })
  return { data, error }
}

export const createSale = async (sale) => {
  const { data, error } = await supabase.from('sales').insert(sale).select()
  return { data, error }
}

export const updateSale = async (id, sale) => {
  const { data, error } = await supabase.from('sales').update(sale).eq('id', id).select()
  return { data, error }
}

export const deleteSale = async (id) => {
  const { error } = await supabase.from('sales').delete().eq('id', id)
  return { error }
}
