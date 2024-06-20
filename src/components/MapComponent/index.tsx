import React, { useEffect, useState } from 'react'
import { mappls } from 'mappls-web-maps'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import { ICoordinates } from 'interfaces'
import { OrderStateWrapper, MapLocationImage } from 'styles/views/driverFlowHome'

const MapComponent = ({ liveAgentTracking, taskEndpoints }: ICoordinates) => {
  const { refetch, data: mmiToken } = useGet('mmi-token', `${APIS.MMI_TOKEN}`)
  const floatCoordinates = taskEndpoints?.map((coord: string) => parseFloat(coord))
  floatCoordinates
  const [mapObject, setMapObject] = useState<any>(null)
  const [mapClassObject, setMapClassObject] = useState<any>()
  const [geoLayer, setGeoLayer] = useState<any>(null)
  const [markerLayer, setMarkerLayer] = useState<any>(null)

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (mmiToken?.access_token) {
      mapMyIndia(mmiToken?.access_token)
    }

    return () => {
      if (mapObject) {
        // Clear existing GeoJSON data from the map
        mapClassObject?.removeLayer({
          map: mapObject,
          layer: geoLayer,
          cType: 0, // Specify the layer type as needed
        })

        // Clear any event listeners or other cleanup as needed
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
        setMapClassObject(mapplsClassObject)

        mapplsClassObject.initialize(`${token}`, () => {
          const mapObj = mapplsClassObject.Map({ id: 'map', properties: mapProps })
          setMapObject(mapObj)

          //load map layers/components after map load, inside this callback (Recommended)
          mapObj.on('load', () => {
            // Activites after mapload
            if (liveAgentTracking === undefined) {
              const coor = { lat: latitude, lng: longitude }
              const currentMarker = mapplsClassObject.Marker({
                map: mapObj,
                position: coor,
                fitbounds: true,
                popupHtml: `<div>My Current Location</div>`,
                html: `<div><img class="bouncing bounce" src='https://apis.mapmyindia.com/map_v3/2.png'></div>`,
              })
              setMarkerLayer(currentMarker)
            }
          })
        })
      })
    }
  }

  const placeMarker = (long: number, lat: number) => {
    if (mapClassObject) {
      if (geoLayer || markerLayer) {
        mapClassObject?.removeLayer({
          map: mapObject,
          layer: geoLayer,
          cType: 0, // Specify the layer type as needed
        })

        mapClassObject?.removeLayer({
          map: mapObject,
          layer: markerLayer,
          // cType: 0, // Specify the layer type as needed
        })
      }

      const geoJson = [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [28.549652, 77.268039], //static delivery corrniates for testing
            // coordinates: [floatCoordinates[0], floatCoordinates[1]],
          },
          properties: {
            description: 'Delivery Location',
            icon: 'https://apis.mapmyindia.com/map_v3/2.png',
            'icon-size': 0.8,
            text: '1',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [28.551042, 77.268953],
              [28.551005, 77.268649],
              [28.550986, 77.268392],
              [28.550967, 77.268231],
              [28.550967, 77.268177],
              [28.550958, 77.268016],
              [28.55092, 77.267587],
              [28.550722, 77.267651],
              [28.55042, 77.267823],
              [28.550128, 77.267802],
              [28.549751, 77.267995],
              [28.549652, 77.268039],
            ],
          },
          properties: {
            name: 'Direction1',
            description: 'Direction2',
            stroke: '#33CC00',
            'stroke-opacity': 0.6509803921568628,
            'stroke-width': 10,
          },
        },
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
      ]

      const markerData = mapClassObject?.addGeoJson({
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
