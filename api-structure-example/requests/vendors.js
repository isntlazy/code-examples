import useRequest from '@/api/useRequest'

export const createVendorRequest = async (data = null) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('vendors.create', { data })
  return responseData.value
}

export const deleteVendorRequest = async (id) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('vendors.delete', { routeParams: [{ name: 'id', value: id }] })
  return responseData.value
}

export const getVendorRequest = async (id) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('vendors.get', { routeParams: [{ name: 'id', value: id }] })
  return responseData.value
}

export const getAllVendorsRequest = async () => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('vendors.getAll')
  return responseData.value
}

export const updateVendorRequest = async (payload = null) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('vendors.update', {
    data: payload.data,
    routeParams: [{ name: 'id', value: payload.routeParams.id }],
  })
  return responseData.value
}
