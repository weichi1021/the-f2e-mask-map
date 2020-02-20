import React, { useState, useEffect } from 'react'
// data
import { MaskContext } from '../data/Context'
import { getData } from '../data/fetchData'
// import TempDate from '../data/Temp.json'
// components
import SideBar from './SideBar'
import MaskMap from './MaskMap'
import Loading from './Loading'
// style
import 'bootstrap/dist/css/bootstrap.css'
import '../assets/css/App.sass'

const defaultState = {
  lat: 22.6598005,
  lng: 120.2907475
}

function App() {
  const [mainData, setMainData] = useState([])
  const [position, setPosition] = useState([defaultState.lat, defaultState.lng])
  const [zoom, setZoom] = useState(12)
  const [loading, SetLoading] = useState(true)
  useEffect(() => {
    async function fetch() {
      const res = await getData();
      // console.log(res)
      setMainData(res)
      // setMainData(TempDate.features)
      navigator.geolocation.getCurrentPosition(GeolocationPosition => {
        const lat = GeolocationPosition.coords.latitude || defaultState.lat;
        const lng = GeolocationPosition.coords.longitude || defaultState.lng;
        setPosition([lat, lng])
      })
      setTimeout(()=>{
        SetLoading(false)
      }, 1000)
    }
    fetch()
  }, [])
  // console.log(position)
  return (
    <MaskContext.Provider value={
      {
        data: mainData,
        position,
        zoom,
        setPosition: (arr)=>setPosition(arr),
        setZoom: (num)=>setZoom(num),
      }
    }>
      <SideBar/>
      {(loading)? null : (<MaskMap/>)}
      {(loading)? (<Loading/>) : null}
    </MaskContext.Provider>
  );
}

export default App;
