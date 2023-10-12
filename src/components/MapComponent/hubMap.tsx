import { useEffect, useState } from 'react'
import { mappls } from 'mappls-web-maps'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import { OrderStateWrapper, MapLocationImage } from 'styles/views/driverFlowHome'

const HubMapComponent = () => {
  const { refetch, data: mmiToken } = useGet('mmi-token', `${APIS.MMI_TOKEN}`)
  const [mapObject, setMapObject] = useState<any>(null)

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (mmiToken?.access_token) {
      mapMyIndia(mmiToken?.access_token)
    }

    return () => {
      if (mapObject) {
        mapObject.clearListeners()
      }
    }
  }, [mmiToken?.access_token])

  //mapples-map-myindia
  const mapMyIndia = async (token: string) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const mapProps = {
          center: [21.7679, 78.8718],
          traffic: false,
          geolocation: true,
          zoomControl: true,
          zoom: 4,
        }
        const mapplsClassObject = new mappls()

        mapplsClassObject.initialize(`${token}`, () => {
          const mapObj = mapplsClassObject.Map({ id: 'map', properties: mapProps })
          setMapObject(mapObj)

          //load map layers/components after map load, inside this callback (Recommended)
          mapObj.on(
            'load',
            () => {
              // Activites after mapload
              // if (taskEndpoints) {
              const coor = { lat: latitude, lng: longitude }
              mapplsClassObject.Marker({
                map: mapObj,
                position: coor,
                fitbounds: true,
                draggable: true,
                popupHtml: `<div>Hub Current Location</div>`,
                html: `<div><img class="bouncing bounce" src='https://apis.mapmyindia.com/map_v3/2.png'></div>`,
              })
            },
            //   }
          )
        })
      })
    }
  }

  return (
    <>
      <OrderStateWrapper>
        <MapLocationImage id="map" />
      </OrderStateWrapper>
    </>
  )
}

export default HubMapComponent
