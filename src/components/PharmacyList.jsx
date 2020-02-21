import React, { useState, useEffect, useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
// data
import { MaskContext } from '../data/Context'
// component
import PharmacyItem from './PharmacyItem'

const PharmacyList = ({filterMainData}) => {
  const { setPosition, setZoom, SetPharmacyId } = useContext(MaskContext)
  const [reload, setReload] = useState(false)
  const [infiniteLoading, setInfiniteLoading] = useState(true)
  const [pharmacyList, setPharmacyList] = useState([])

  useEffect(() => {
    setPharmacyList([])
    setInfiniteLoading(true)
    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 500)
  }, [filterMainData]);

  const loadFunc = (page) => {
    // console.log(page)
    const firstIndex = (page-1)*5;
    setPharmacyList([...pharmacyList, ...filterMainData.slice(firstIndex, firstIndex+4)])
    // console.log(page, firstIndex, firstIndex+4)
    if(firstIndex+4 >= filterMainData.length) setInfiniteLoading(false)
  }
  const clickPharmacyItemHandler = (item) => {
    const p = item.properties;
    const position = [item.geometry.coordinates[1], item.geometry.coordinates[0]];
    setPosition(position);
    setZoom(18);
    SetPharmacyId(p.id)
  }

  const LoadingEl = (<div className="text-center py-3" key={0}><i className="fa fa-spinner fa-spin fa-2x"></i></div>)

  return (
      <div className="list-group-flush list-group pharmacy-list">
        { (reload)? LoadingEl : null}
        { (filterMainData.length && !reload)? (
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={infiniteLoading}
            useWindow={false}
            loader={LoadingEl}>
            {
              pharmacyList.map((item, index) => {
                return (
                  <div className="list-group-item" key={`pharmacy-${index}`}
                    onClick={()=>{clickPharmacyItemHandler(item)}}>
                    <PharmacyItem properties={item.properties} />
                  </div>
                )
              })
            }
          </InfiniteScroll>
        ): null}
    </div>
  )
}

export default PharmacyList;
