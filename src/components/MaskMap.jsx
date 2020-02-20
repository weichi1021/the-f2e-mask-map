import React, { useContext } from 'react'
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
// data
import { MaskContext } from '../data/Context'
// css
import 'react-leaflet-markercluster/dist/styles.min.css'
import '../assets/css/MaskMap.sass'
// image
import imgMarker from '../assets/images/maker.png'

// display
const displayPhone = (phone) => {
  return phone.replace(' ', '')
}
const displayCallPhone = (phone) => {
  return phone.replace(/[^0-9]/ig, '')
}

function MaskMap() {
  const { data, position, zoom } = useContext(MaskContext)
  const btnSideBarHandler = (e) => {
    const SideBarEl = document.querySelector('[name="side-bar"]')
    const MaskMapEl = document.querySelector('[name="mask-map"]')
    const MaskMapContainerEl = document.querySelector('[name="mask-map"]>.leaflet-container')
    const btnArrowEl = document.querySelector('.btn-sidebar-arrow')
    const btnArrowIconEl = document.querySelector('.btn-sidebar-arrow>i.fa')
    if(!!SideBarEl.style.width){
      SideBarEl.style.width = '';
      MaskMapEl.style.marginLeft = '';
      btnArrowEl.style.left = '10px';
      MaskMapContainerEl.style.width = '100vw';
      btnArrowIconEl.classList.add('fa-angle-double-right');
      btnArrowIconEl.classList.remove('fa-angle-double-left');
    }else{
      SideBarEl.style.width = '350px';
      MaskMapEl.style.marginLeft = '350px';
      MaskMapContainerEl.style.width = '';
      btnArrowEl.style.left = '350px';
      btnArrowIconEl.classList.add('fa-angle-double-left');
      btnArrowIconEl.classList.remove('fa-angle-double-right');
    }
  }
  const RedMapMarker = new L.Icon({
    iconUrl: imgMarker,
    iconSize: new L.Point(35, 35),
  });

  return (
    <section name="mask-map">
      <Map
        center={position}
        zoom={zoom}
        maxZoom={40}
        viewport={{
          center: position,
          zoom: zoom
        }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
        <MarkerClusterGroup>
          {
            data.map((item, index) => {
              const p = item.properties;
              const position = [item.geometry.coordinates[1], item.geometry.coordinates[0]];
              return (
                <Marker
                  key={`position-${index}`}
                  position={position}
                  icon={RedMapMarker}>
                  <Tooltip>
                    <div className="text-md mb-1">{ p.name }</div>
                    <div className="text-sm"><a href={`tel:${displayCallPhone(p.phone)}`}>{displayPhone(p.phone)}</a></div>
                    <div className="text-sm">{p.address}</div>
                  </Tooltip>
                </Marker>
              )
            })
          }
        </MarkerClusterGroup>
      </Map>
      <div className="btn-sidebar-arrow bg-info text-white" onClick={btnSideBarHandler}>
        <i className="fa fa-angle-double-left"></i>
      </div>
    </section>
  )
}

export default MaskMap;
