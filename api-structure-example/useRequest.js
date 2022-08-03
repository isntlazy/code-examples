import axios from 'axios'
import { ref } from 'vue'
import { APP_BASE_URI } from '@/constants'

const axiosInstance = axios.create({
  baseURL: APP_BASE_URI,
})

const routesConfig = {
  'vendors.getAll': { method: 'GET', url: '/vendor' },
  'vendors.get': { method: 'GET', url: '/vendor/{id}' },
  'vendors.create': { method: 'POST', url: '/vendor' },
  'vendors.update': { method: 'PUT', url: '/vendor/{id}' },
  'vendors.delete': { method: 'DELETE', url: '/vendor/{id}' },
  'manufacturers.getAll': { method: 'GET', url: '/manufacturer' },
  'manufacturers.get': { method: 'GET', url: '/manufacturer/{id}' },
  'manufacturers.create': { method: 'POST', url: '/manufacturer' },
  'manufacturers.update': { method: 'PUT', url: '/manufacturer/{id}' },
  'manufacturers.delete': { method: 'DELETE', url: '/manufacturer/{id}' },
  'collections.getAll': { method: 'GET', url: '/collection' },
  'collections.get': { method: 'GET', url: '/collection/{id}' },
  'collections.create': { method: 'POST', url: '/collection' },
  'collections.update': { method: 'PUT', url: '/collection/{id}' },
  'collections.delete': { method: 'DELETE', url: '/collection/{id}' },
  'products.getAll': { method: 'GET', url: '/product' },
  'products.get': { method: 'GET', url: '/product/{id}' },
  'products.create': { method: 'POST', url: '/product' },
  'products.update': { method: 'PUT', url: '/product/{id}' },
  'products.delete': { method: 'DELETE', url: '/product/{id}' },
}
export default () => {
  const responseData = ref(null)

  const makeRequest = async (route, payload = { params: {}, data: {}, routeParams: [] }) => {
    try {
      let url = routesConfig[route].url
      if (payload?.routeParams?.length) {
        payload.routeParams.forEach((param) => {
          url = url.replace(`{${param.name}}`, param.value)
        })
      }
      const requestConfig = {
        method: routesConfig[route].method,
        url,
        params: payload.params,
        data: payload.data,
      }
      const res = await axiosInstance(requestConfig)
      responseData.value = await res.data
    } catch (e) {
      throw new Error(e)
    }
  }

  return {
    responseData,
    makeRequest,
  }
}
