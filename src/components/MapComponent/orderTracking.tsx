import React, { useEffect, useState } from 'react'
import { mappls } from 'mappls-web-maps'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import { ICoordinates } from 'interfaces'
import { OrderStateWrapper, MapLocationImage } from 'styles/views/driverFlowHome'

const OrderTrackingMapComponent = ({ taskEndpoints }: ICoordinates) => {
  const { refetch, data: mmiToken } = useGet('mmi-token', `${APIS.MMI_TOKEN}`)
  const floatCoordinates = taskEndpoints?.map((coord: string) => parseFloat(coord))
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
        mapObj.on('load', () => {
          // Activites after mapload
          if (taskEndpoints) {
            const coor = { lat: floatCoordinates[0], lng: floatCoordinates[1] }
            mapplsClassObject.Marker({
              map: mapObj,
              position: coor,
              fitbounds: true,
              popupHtml: `<div>Order Current Location</div>`,
              html: `<div><img class="bouncing bounce" src='https://apis.mapmyindia.com/map_v3/2.png'></div>`,
            })
          }
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

export default OrderTrackingMapComponent
