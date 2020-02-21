import React, { useContext } from 'react'
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
// data
import { MaskContext } from '../data/Context'
// component
import PharmacyItem from './PharmacyItem'
// style
import 'react-leaflet-markercluster/dist/styles.min.css'
import '../assets/css/MaskMap.sass'
// image
import InfoMarker from '../assets/images/info-maker.png'
import DangerMarker from '../assets/images/danger-maker.png'

function MaskMap() {
  const { data, pharmacyId, position, zoom } = useContext(MaskContext)
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
  const InfoMapMarker = new L.Icon({
    iconUrl: InfoMarker,
    iconSize: new L.Point(40, 40),
  });
  const DangerMapMarker = new L.Icon({
    iconUrl: DangerMarker,
    iconSize: new L.Point(55, 55),
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
              const pharmacyPos = [item.geometry.coordinates[1], item.geometry.coordinates[0]];
              return (
                <Marker
                  key={`position-${index}`}
                  position={pharmacyPos}
                  icon={(pharmacyId === item.properties.id)? DangerMapMarker :InfoMapMarker}>
                  <Tooltip direction="top" offset={[0, -15]} opacity={1}>
                    <PharmacyItem properties={item.properties} />
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
