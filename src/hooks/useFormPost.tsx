import { useMutation } from 'react-query'
import workForceInstance from 'services/axiosInstance'
import { IParam } from 'interfaces'

const post = async ({ url, payload, formData }: IParam) => {
  const authToken = localStorage.getItem('accessToken') || ''
  const res = await workForceInstance.post(url, payload, {
    headers: { authorization: authToken, 'Content-Type': formData },
  })
  if (res?.headers?.authorization) {
    await localStorage.setItem(`accessToken`, `${res?.headers?.authorization}`)
    window.location.reload()
  }

  return res
}

const useFormPost = () => useMutation(post)

export default useFormPost
