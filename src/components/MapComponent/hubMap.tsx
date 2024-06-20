import { useEffect, useState } from 'react'
import { mappls } from 'mappls-web-maps'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import { OrderStateWrapper, MapLocationImage } from 'styles/views/driverFlowHome'

interface IHubMap {
  setDragPincode: (e: any) => void
}

const HubMapComponent = ({ setDragPincode }: IHubMap) => {
  const [dragsCoords, setDragsCoords] = useState<any>({})
  const { refetch, data: mmiToken } = useGet('mmi-token', `${APIS.MMI_TOKEN}`)
  const { refetch: refetchGeoResverseDetails, data: geoReverseData } = useGet(
    'geo-reverse-data',
    `http://apis.mappls.com/advancedmaps/v1/${mmiToken?.access_token}/rev_geocode?lat=${dragsCoords?.lat}&lng=${dragsCoords?.lng}`,
  )
  const [mapObject, setMapObject] = useState<any>(null)

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    setDragPincode(geoReverseData?.results[0]?.pincode)
  }, [dragsCoords])

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

          mapObj.on('load', () => {
            const coor = { lat: latitude, lng: longitude }
            const dragableMarker = mapplsClassObject.Marker({
              map: mapObj,
              position: coor,
              fitbounds: true,
              draggable: true,
              popupHtml: `<div>Hub Current Location</div>`,
              html: `<div><img class="bouncing bounce" src='https://apis.mapmyindia.com/map_v3/2.png'></div>`,
            })
            //Drag evenet listner
            dragableMarker.addListener('dragend', async (e: any) => {
              const dragCoordinates = e?.target?._lngLat
              setDragsCoords(dragCoordinates)
              if (dragCoordinates?.lat && dragCoordinates.lng) {
                await refetchGeoResverseDetails()
                //Do not remove this comment.May be use in future
                // dragableMarker.setPosition({ lat: dragCoordinates?.lat, lng: dragCoordinates.lng })
              }
            })
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

export default HubMapComponent
