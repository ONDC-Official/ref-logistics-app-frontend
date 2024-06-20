import { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import useGet from 'hooks/useGet'
import routes, { LoginRoute, DashboardRoute } from 'constants/routes'
import APIS from 'constants/api'
import { AppContext } from 'context/payloadContext'
import PublicLayout from 'components/Layouts/public'
import PrivateLayout from 'components/Layouts/private'
import { IRoute } from 'interfaces'

export const CustomRoutes = ({ restricted, component: Component, ...rest }: IRoute) => {
  const navigate = useHistory()
  const { setUserInfo, userInfo } = useContext(AppContext)
  const token = localStorage.getItem('accessToken')

  const { refetch: fetchUserInfo, data: userInfoData } = useGet('userProfile', APIS.GET_PROFILE_INFO, {
    headers: {
      authorization: token,
    },
  })

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!userInfo?.name && accessToken) {
      fetchUserInfo()
    }
  }, [])

  useEffect(() => {
    if (userInfoData?.data?.user?.role?.name) {
      const accessToken = localStorage.getItem('accessToken')
      if (restricted && !accessToken) navigate.push(LoginRoute.path)
      else if (!restricted && accessToken && !window.location.href.includes('create-password')) {
        navigate.push(DashboardRoute.path)
      }
    }
  }, [restricted, userInfoData?.data?.user])

  setUserInfo(userInfoData?.data?.user)

  return (
    <Route {...rest}>
      {restricted ? (
        <PrivateLayout>
          <Component />
        </PrivateLayout>
      ) : (
        <PublicLayout>
          <Component />
        </PublicLayout>
      )}
    </Route>
  )
}

const Routing = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route, index) => {
        const { component, path, exact, restricted }: any = route
        return (
          <Route
            key={index}
            path={path}
            exact={exact}
            render={() => <CustomRoutes path={path} exact={exact} restricted={restricted} component={component} />}
          />
        )
      })}
      <Redirect to={LoginRoute.path} />
    </Switch>
  </BrowserRouter>
)

export default Routing
