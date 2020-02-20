import React from 'react'
// style
import '../assets/css/PharmacyItem.sass'

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


const PharmacyItem = ({properties}) => {
  return (
    <div className="pharmacy-item">
      <div className="text-md mb-1">{ properties.name }</div>
      <div className="text-sm"><a href={`tel:${displayCallPhone(properties.phone)}`}>{displayPhone(properties.phone)}</a></div>
      <div className="text-sm">{properties.address}</div>
      <div className="d-flex mt-2">
        <div className={`mask-label-${labelStyle(properties.mask_adult)}`}>成人口罩 {properties.mask_adult}</div>
        <div className={`mask-label-${labelStyle(properties.mask_child)}`}>兒童口罩 {properties.mask_child}</div>
      </div>
    </div>
  )
}

export default PharmacyItem;
