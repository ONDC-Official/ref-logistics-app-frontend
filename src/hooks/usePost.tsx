import { useMutation } from 'react-query'
import axiosInstance from 'services/axiosInstance'
import { IParams } from 'interfaces'

const post = async ({ url, payload, config = {} }: IParams) => {
  const res = await axiosInstance.post(url, payload, config)

  if (res?.headers?.authorization) {
    await localStorage.setItem(`accessToken`, `${res?.headers?.authorization}`)
    window.location.reload()
  }

  return res.data
}

const usePost = () => useMutation(post)

export default usePost
