import { useEffect, useState } from 'react'
import { mappls } from 'mappls-web-maps'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import { IOrderMap } from 'interfaces'
import { OrderStateWrapper, MapLocationImage } from 'styles/views/driverFlowHome'

const MapComponent = ({ taskStartPoints, taskEndPoints }: IOrderMap) => {
  const [mapClassObject, setMapClassObject] = useState<any>()
  const [geoLayer, setGeoLayer] = useState<any>(null)
  const { refetch, data: mmiToken } = useGet('mmi-token', `${APIS.MMI_TOKEN}`)
  const floatStartCoordinates = taskStartPoints?.map((coord: string) => parseFloat(coord))
  const floatEndCoordinates = taskEndPoints?.map((coord: string) => parseFloat(coord))
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
        mapClassObject?.removeLayer({
          map: mapObject,
          layer: geoLayer,
          cType: 0, // Specify the layer type as needed
        })
      }
    }
  }, [mmiToken?.access_token, taskStartPoints])

  //mapples-map-myindia
  const mapMyIndia = async (token: string) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        position.coords
        const mapProps = {
          center: [21.7679, 78.8718],
          traffic: false,
          geolocation: false,
          zoomControl: false,
          zoom: 4,
        }

        const mapplsClassObject = new mappls()
        setMapClassObject(mapplsClassObject)

        mapplsClassObject.initialize(`${token}`, () => {
          const mapObj = mapplsClassObject.Map({ id: 'map', properties: mapProps })
          setMapObject(mapObj)

          mapObj.on('load', () => {
            if (taskStartPoints) {
              const geoJson = [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [floatStartCoordinates[0], floatStartCoordinates[1]],
                  },
                  properties: {
                    description: `Order Starting Point`,
                    icon: 'https://apis.mapmyindia.com/map_v3/1.png',
                    'icon-size': 0.8,
                    text: '2',
                  },
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [floatEndCoordinates[0], floatEndCoordinates[1]],
                  },
                  properties: {
                    description: 'Order Deliver Point',
                    icon: 'https://apis.mapmyindia.com/map_v3/2.png',
                    'icon-size': 0.8,
                    text: '1',
                  },
                },
              ]

              const markerData = mapplsClassObject.addGeoJson({
                map: mapObject,
                data: {
                  type: 'FeatureCollection',
                  features: geoJson,
                },
                fitbounds: true,
                cType: 0,
              })
              setGeoLayer(markerData)
            }
          })
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

export default MapComponent
