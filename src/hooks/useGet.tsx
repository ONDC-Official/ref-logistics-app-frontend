import { useQuery } from 'react-query'
import axiosInstance from 'services/axiosInstance'

const useGet = (key: string, url: string, configs?: any) => {
  const get = async () => {
    const res = await axiosInstance.get(url, configs)

    if (res?.headers?.authorization) {
      await localStorage.setItem(`accessToken`, `${res?.headers?.authorization}`)
      window.location.reload()
    }

    return res?.data
  }
  const defaultConfig = {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    ...configs,
  }
  return useQuery(key, get, defaultConfig)
}

export default useGet
