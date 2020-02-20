import React, { useContext } from 'react'
// data
import { MaskContext } from '../data/Context'

const labelStyle = (num) => {
  if(num > 50) return 'info'
  if(num > 10) return 'warning'
  if(num > 0) return 'danger'
  return 'secondary'
}

// display
const displayPhone = (phone) => {
  return phone.replace(' ', '')
}
const displayCallPhone = (phone) => {
  return phone.replace(/[^0-9]/ig, '')
}


const PharmacyList = ({filterMainData}) => {
  const { setPosition, setZoom } = useContext(MaskContext)
  return (
      <div className="pharmacy-list list-group-flush list-group">
      {
        filterMainData.map((item, index) => {
          const p = item.properties;
          const position = [item.geometry.coordinates[1], item.geometry.coordinates[0]];
          return (
            <div className="list-group-item" key={`pharmacy-${index}`}
              onClick={e=>{setPosition(position); setZoom(18);}}>
              <div className="text-md mb-1">{ p.name }</div>
              <div className="text-sm"><a href={`tel:${displayCallPhone(p.phone)}`}>{displayPhone(p.phone)}</a></div>
              <div className="text-sm">{p.address}</div>
              <div className="row mt-2">
                <div className="col-6 d-flex align-items-center">
                  <div className={`mask-label-${labelStyle(p.mask_adult)}`}>成人口罩 {p.mask_adult}</div>
                </div>
                <div className="col-6 d-flex align-items-center">
                  <div className={`mask-label-${labelStyle(p.mask_child)}`}>兒童口罩 {p.mask_child}</div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PharmacyList;
