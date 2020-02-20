import React, { useContext } from 'react'
// data
import { MaskContext } from '../data/Context'
// component
import PharmacyItem from './PharmacyItem'

const PharmacyList = ({filterMainData}) => {
  const { setPosition, setZoom, SetPharmacyId } = useContext(MaskContext)
  const clickPharmacyItemHandler = (item) => {
    const p = item.properties;
    const position = [item.geometry.coordinates[1], item.geometry.coordinates[0]];
    setPosition(position);
    setZoom(18);
    SetPharmacyId(p.id)
  }
  return (
      <div className="list-group-flush list-group pharmacy-list">
      {
        filterMainData.map((item, index) => {
          return (
            <div className="list-group-item" key={`pharmacy-${index}`}
              onClick={()=>{clickPharmacyItemHandler(item)}}>
              <PharmacyItem properties={item.properties} />
            </div>
          )
        })
      }
    </div>
  )
}

export default PharmacyList;
