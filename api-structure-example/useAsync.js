import { ref } from 'vue'

export default (cb = () => {}) => {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const run = async (params) => {
    try {
      isLoading.value = true
      data.value = params ? await cb(params) : await cb()
    } catch (e) {
      error.value = processError(e)
    } finally {
      isLoading.value = false
    }
  }

  const processError = (error) => {
    console.log(error)
    return error
  }

  return { data, error, isLoading, run }
}
