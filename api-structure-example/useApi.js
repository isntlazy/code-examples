import useAsync from '@/api/useAsync'
import { useVendorsStore } from '@/stores/vendorsStore'
import { useManufacturersStore } from '@/stores/manufacturersStore'
import { useCollectionsStore } from '@/stores/collectionsStore'
import { useProductsStore } from '@/stores/productsStore'

export default (settings) => {
  const vendorsStore = useVendorsStore()
  const manufacturersStore = useManufacturersStore()
  const collectionsStore = useCollectionsStore()
  const productsStore = useProductsStore()

  const { cb, saveToStore = false, storeId = null, setterId = null } = settings

  const stores = {
    Vendors: vendorsStore,
    Manufacturers: manufacturersStore,
    Collections: collectionsStore,
    Products: productsStore,
  }
  const entityName = cb.name.replace('getAll', '').replace('Request', '') // specific case for getAllRequest, todo replace with regex
  const storeName = storeId || entityName // dynamically detect store and setter from callback function name
  const store = stores[storeName]
  const setterName = setterId || `set${entityName}`
  const { data, error, isLoading, run } = useAsync(async (payload = null) => {
    const getterName = cb.name
    const hasGetterName = `has${cb.name}`
    if (store.getters[hasGetterName]) {
      return store.getters[getterName]
    }
    const data = await cb(payload)
    if (data && saveToStore) {
      store[setterName](data)
    }
    return data
  })
  return { data, error, isLoading, run }
}
