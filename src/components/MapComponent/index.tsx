import React, { useEffect, useState } from 'react'
import { mappls } from 'mappls-web-maps'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import { OrderStateWrapper, MapLocationImage } from 'styles/views/driverFlowHome'

interface ICoordinates {
  liveAgentTracking?: any
  taskEndpoints?: any
}

const MapComponent = ({ liveAgentTracking, taskEndpoints }: ICoordinates) => {
  const { refetch, data: mmiToken } = useGet('mmi-token', `${APIS.MMI_TOKEN}`)
  const floatCoordinates = taskEndpoints?.map((coord: string) => parseFloat(coord))
  const [mapObject, setMapObject] = useState<any>(null)
  const [mapClassObject, setMapClassObject] = useState<any>()

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (mmiToken?.access_token) {
      mapMyIndia(mmiToken?.access_token)
    }

    return () => {
      if (mapObject) (mapObject as any).clearListeners()
    }
  }, [])

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
        setMapClassObject(mapplsClassObject)

        mapplsClassObject.initialize(`${token}`, () => {
          const mapObj = mapplsClassObject.Map({ id: 'map', properties: mapProps })
          setMapObject(mapObj)

          //load map layers/components after map load, inside this callback (Recommended)
          mapObj.on('load', () => {
            // Activites after mapload
            if (liveAgentTracking === undefined) {
              const coor = { lat: latitude, lng: longitude }
              mapplsClassObject.Marker({
                map: mapObject,
                position: coor,
                fitbounds: true,
                popupHtml: `<div>My Current Location</div>`,
                html: `<div><img class="bouncing bounce" src='https://apis.mapmyindia.com/map_v3/2.png'></div>`,
              })
            }
          })
        })
      })
    }
  }

  const placeMarker = (long: number, lat: number) => {
    if (mapClassObject) {
      const geoJson = [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [long, lat],
          },
          properties: {
            description: `Driver's Current Location`,
            icon: 'https://apis.mapmyindia.com/map_v3/1.png',
            'icon-size': 0.8,
            text: '2',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [floatCoordinates[0], floatCoordinates[1]],
          },
          properties: {
            description: 'Delivery Location',
            icon: 'https://apis.mapmyindia.com/map_v3/2.png',
            'icon-size': 0.8,
            text: '1',
          },
        },
      ]

      mapClassObject?.addGeoJson({
        map: mapObject,
        data: {
          type: 'FeatureCollection',
          features: geoJson,
        },
        fitbounds: true,
        cType: 0,
      })
    }
  }

  useEffect(() => {
    if (liveAgentTracking && liveAgentTracking?.lat && liveAgentTracking?.lng) {
      placeMarker(liveAgentTracking?.lat || 0, liveAgentTracking?.lng || 0)
    }
  }, [liveAgentTracking])

  return (
    <>
      <OrderStateWrapper>
        <MapLocationImage id="map" />
      </OrderStateWrapper>
    </>
  )
}

export default MapComponent
