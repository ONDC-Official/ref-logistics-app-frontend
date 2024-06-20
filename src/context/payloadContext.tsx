import APIS from 'constants/api'
import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext<any>('defaultValue')

const AppProvider = ({ children }: any) => {
  const [payloadData, setPayloadData] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [sse, setSse] = useState()
  const [urls, setUrls] = useState<any>([])

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}${APIS.AGENT_SSE}`)
      eventSource.addEventListener('on_live_update', (event) => {
        const data = JSON.parse(event.data)
        setSse(data)
      })
      eventSource.onerror = () => {
        eventSource.close()
      }

      return () => {
        eventSource.close()
      }
    }
  }, [localStorage.getItem('accessToken')])

  return (
    <AppContext.Provider
      value={{
        payloadData,
        setPayloadData,
        setUserInfo,
        userInfo,
        urls,
        setUrls,
        sse,
        setSse,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
const usePostContext = () => {
  return useContext(AppContext)
}

export { AppProvider, AppContext, usePostContext }
