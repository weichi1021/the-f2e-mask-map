import React, { useState, useContext } from 'react'
// data
import { MaskContext } from '../data/Context'
// components
import TodayInfo from './TodayInfo'
import SearchBox from './SearchBox'
import PharmacyList from './PharmacyList'
// style
import '../assets/css/SideBar.sass'

// computed
const filterCountyTownOpt = (arr) => {
  return arr.map(item => {
    return {
      county: item.properties.county,
      town: item.properties.town
    }
  })
}
const filterMainData = (arr, county, town, searchVal) => {
  return arr.filter(item => {
    const p = item.properties;
    const samePharmacy = (p.name.indexOf(searchVal) !== -1)
    const sameCounty =  (p.county === county)
    const sameTown =  (p.town === town)
    // [pharmacy, county, town]
    // [empty, empty, empty] => empty
    // [value, empty, empty] => pharmacy
    // [empty, value, empty] => county
    // [empty, value, value] => county && town
    // [value, value, empty] => pharmacy && county
    // [value, value, value] => pharmacy && county && town
    if(!searchVal && !county && !town) return true
    if(!!searchVal && !county && !town) return samePharmacy
    if(!searchVal && !!county && !town) return sameCounty
    if(!searchVal && !!county && !!town) return sameCounty && sameTown
    if(!!searchVal && !!county && !town) return samePharmacy && sameCounty
    if(!!searchVal && !!county && !!town) return samePharmacy && sameCounty && sameTown
    return false
  })
}

function SideBar() {
  const { data } = useContext(MaskContext)
  const [searchVal, setSearchVal] = useState()
  const [county, setCounty] = useState()
  const [town, setTown] = useState()
  // console.log(data)
  return (
    <section name="side-bar" style={{width: '350px'}}>
      <TodayInfo/>
      <SearchBox
        options={filterCountyTownOpt(data)}
        county={county}
        setCounty={setCounty}
        setTown={setTown}
        setSearchVal={setSearchVal} />
      <PharmacyList
        filterMainData={filterMainData(data, county, town, searchVal)}/>
    </section>
  )
}

export default SideBar;

