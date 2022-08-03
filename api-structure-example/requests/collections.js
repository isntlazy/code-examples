import useRequest from '@/api/useRequest'

export const createCollectionRequest = async (data = null) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('collections.create', { data })
  return responseData.value
}

export const deleteCollectionRequest = async (id) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('collections.delete', { routeParams: [{ name: 'id', value: id }] })
  return responseData.value
}

export const getCollectionRequest = async (id) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('collections.get', { routeParams: [{ name: 'id', value: id }] })
  return responseData.value
}

export const getAllCollectionsRequest = async () => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('collections.getAll')
  return responseData.value
}

export const updateCollectionRequest = async (payload = null) => {
  const { makeRequest, responseData } = useRequest()
  await makeRequest('collections.update', {
    data: payload.data,
    routeParams: [{ name: 'id', value: payload.routeParams.id }],
  })
  return responseData.value
}
