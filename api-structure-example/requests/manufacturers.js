import useRequest from '@/api/useRequest'

export const createManufacturerRequest = async (data = null) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('manufacturers.create', { data })
  return responseData.value
}

export const deleteManufacturerRequest = async (id) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('manufacturers.delete', { routeParams: [{ name: 'id', value: id }] })
  return responseData.value
}

export const getManufacturerRequest = async (id) => {
  console.log(id)
  const { makeRequest, responseData } = useRequest()
  await makeRequest('manufacturers.get', { routeParams: [{ name: 'id', value: id }] })
  return responseData.value
}

export const getAllManufacturersRequest = async () => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('manufacturers.getAll')
  return responseData.value
}

export const updateManufacturerRequest = async (payload = null) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('manufacturers.update', {
    data: payload.data,
    routeParams: [{ name: 'id', value: payload.routeParams.id }],
  })
  return responseData.value
}
