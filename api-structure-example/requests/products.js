import useRequest from '@/api/useRequest'

export const createProductRequest = async (data = null) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('products.create', { data })
  return responseData.value
}

export const deleteProductRequest = async (id) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('products.delete', { routeParams: [{ name: 'id', value: id }] })
  return responseData.value
}

export const getProductRequest = async (id) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('products.get', { routeParams: [{ name: 'id', value: id }] })
  return responseData.value
}

export const getAllProductsRequest = async () => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('products.getAll')
  return responseData.value
}

export const updateProductRequest = async (payload = null) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('products.update', {
    data: payload.data,
    routeParams: [{ name: 'id', value: payload.routeParams.id }],
  })
  return responseData.value
}
