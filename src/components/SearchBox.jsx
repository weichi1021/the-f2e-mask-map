import React, { useState } from 'react'

const CountyList = (arr) => {
  let results = arr.filter(item => !!item.county).map(item => item.county)
  return [...new Set(results)]
}
const TownList = (arr, county) => {
  let results = arr.filter(item => !!item.town && (item.county === county)).map(item => item.town)
  return [...new Set(results)]
}

function SearchBox({ options, setCounty, setTown, county, setSearchVal }) {
  const [searchPharmacyVal, setSearchPharmacyVal] = useState('')
  // console.log(options)
  const keyupEnterHandler = (e) => {
    if(e.keyCode === 13){
      console.log('enter', e.target.value)
      setSearchVal(e.target.value)
    }
  }
  const CountySelectHandler = (e) => {
    setCounty(e.target.value)
    setTown("")
  }
  return (
    <div className="search-box">
      <div className="form-group search-pharmacy">
        <input type="text" className="form-control" placeholder="搜尋藥局名稱"
          value={searchPharmacyVal}
          onChange={e=>setSearchPharmacyVal(e.target.value)}
          onKeyDown={e=>keyupEnterHandler(e)}  />
        <i className="fa fa-search"></i>
      </div>
      <div className="d-flex">
        <select className="form-control" onChange={CountySelectHandler}>
          <option value="">縣市</option>
          {
            CountyList(options).map((item, index) => {
              return (
                <option key={`county-${index}`}>{item}</option>
              )
            })
          }
        </select>
        <select className="form-control" onChange={e => setTown(e.target.value)}>
          <option value="">鄉鎮市區</option>
          {
            TownList(options, county).map((item, index) => {
              return (
                <option key={`town-${index}`}>{item}</option>
              )
            })
          }
        </select>
      </div>
    </div>
  )
}

export default SearchBox
