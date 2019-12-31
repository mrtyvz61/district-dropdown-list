import React, { useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import ParcelContext from './parcelContext'
import ParcelReducer from './parcelReducer'
import {
  GET_ILCE,
  GET_MAHALLE,
  GET_PAFTA,
  GET_ADA,
  GET_PARSEL
} from '../../types'

const ParcelState = props => {
  const initState = {
    ilceSelected: null,
    ilceler: [],
    mahalleSelected: null,
    mahalleler: [],
    paftalar: '',
    adalar: '',
    parseller: '',
    parselResult: []
  }

  const [state, dispatch] = useReducer(ParcelReducer, initState)

  let [fetchedData, setFetchedData] = useState(false)

  const getAdres = async url => {
    let response = await fetch(url)
    let data = await response.json()
    let list = []
    data.AdresList.Adresler.Adres.forEach(item => {
      console.info(item)
      list.push({
        label: item.ADI,
        value: item.ID
      })
    })
    return list
  }

  const responseData = async url => {
    let response = await fetch(url)
    let data = await response.json()
    return [
      {
        label: data.AdresList.hatamesaj,
        value: data.AdresList.hatakodu
      }
    ]
  }

  useEffect(() => {
    const ilceUrl = 'http://cbsproxy.ibb.gov.tr/?SehirHaritasiIlceListele151&'
    !fetchedData &&
      axios
        .get(ilceUrl)
        .then(response => response.data)
        .then(ilceList => {
          console.info('ilceList: ', { ilceList })
          setFetchedData(true)
          let ilceler = []
          ilceList.AdresList.Adresler.Adres.forEach(ilce => {
            ilceler.push({
              label: ilce.ADI,
              value: ilce.ID
            })
          })
          console.log('ilceler:', { ilceler })
          dispatch({
            type: GET_ILCE,
            payload: ilceler
          })
        })
  })

  const handleIlceChange = async e => {
    let mahalleler = await getAdres(
      `http://cbsproxy.ibb.gov.tr/?SehirHaritasiMahalleListele151&&ID=${e.value}`
    )

    dispatch({
      type: GET_MAHALLE,
      payload: mahalleler,
      ilceSelected: true,
      mahalleSelected: false
    })
  }

  const handleMahalleChange = async e => {
    let sokaklar = await responseData(
      `http://cbsproxy.ibb.gov.tr/?SehirHaritasiYolListele151&&ilceID=${state.ilceSelected}&mahalleID=${e.value}&yolAdi=`
    )

    dispatch({
      type: GET_MAHALLE,
      payload: sokaklar,
      ilceSelected: true
    })
  }

  const handlePaftaChange = async e => {
    dispatch({
      type: GET_PAFTA,
      payload: e.taget.value
    })
  }

  const handleAdaChange = async e => {
    dispatch({
      type: GET_ADA,
      payload: e.target.value
    })
  }

  const handleParselChange = async e => {
    dispatch({
      type: GET_PARSEL,
      payload: e.target.value
    })
  }

  const getQueryResult = async params => {
    let where =
      (params.adalar !== false ? `ADA='${params.adalar}'+and+` : '1=1+and+') +
      (params.paftalar !== false
        ? `PAFTA='${params.paftalar}'+and+`
        : '1=1+and+') +
      (params.parseller !== false
        ? `PARSEL='${params.parseller}'+and+`
        : '1=1+and+') +
      (params.ilceSelected != null
        ? `ILCE_ADI=${params.ilceSelected}+and+`
        : '1=1+and+') +
      (params.mahalleSelected != null
        ? `MAHALLE_UAVT=${params.mahalleSelected}`
        : '1=1')
    let url = `https://cbsmaps.ibb.gov.tr/arcgis/rest/services/ParselTKGM/MapServer/0/query?
    where=${where}&
    text=&
    objectIds=&
    time=&
    geometry=&
    geometryType=esriGeometryEnvelope&
    inSR=&
    spatialRel=esriSpatialRelIntersects&
    relationParam=&
    outFields=*&
    returnGeometry=true&
    returnTrueCurves=false&
    maxAllowableOffset=&
    geometryPrecision=&
    outSR=&
    having=&
    returnIdsOnly=false&
    returnCountOnly=false&
    orderByFields=&
    groupByFieldsForStatistics=&
    outStatistics=&
    returnZ=false&
    returnM=false&
    gdbVersion=&
    historicMoment=&
    returnDistinctValues=false&
    resultOffset=&
    resultRecordCount=&
    queryByDistance=&
    returnExtentOnly=false&
    datumTransformation=&
    parameterValues=&
    rangeValues=&
    quantizationParameters=&
    f=pjson`
    url = url.replace(/\s/g, '')
    // console.log("1")
    let response = await fetch(url)
    // console.log("2")
    let data = await response.json()
    // console.log("3")
    let parseller = []
    // console.log("4")
    data.features.forEach(parsel => {
      // console.log(`parsel`, parsel);
      parseller.push({ attributes: parsel.attributes })
    })
    // console.log("5")
    return parseller
  }

  const formSubmitHandler = async e => {
    e.preventDefault()
    let response = await getQueryResult(initState)

    dispatch({
      parselResult: response
    })
  }

  const renderParselResult = ({ parselResult }) => {
    return parselResult.map(res => {
      return (
        <tr>
          <td />
          <td>{res.attributes.ILCE_ADI}</td>
          <td>{res.attributes.MAHALLE_ADI}</td>
          <td>{res.attributes.MAHALLE_UAVT}</td>
          <td>{res.attributes.ADA}</td>
          <td>{res.attributes.PAFTA}</td>
          <td>{res.attributes.PARSEL}</td>
        </tr>
      )
    })
  }

  return (
    <ParcelContext.Provider
      value={{
        ilceSelected: state.ilceSelected,
        ilceler: state.ilceler,
        mahalleSelected: state.mahalleSelected,
        mahalleler: state.mahalleler,
        paftalar: state.paftalar,
        adalar: state.adalar,
        parseller: state.parseller,
        parselResult: state.parselResult,
        handleIlceChange,
        handleMahalleChange,
        handlePaftaChange,
        handleAdaChange,
        handleParselChange,
        formSubmitHandler,
        renderParselResult
      }}
    >
      {props.children}
    </ParcelContext.Provider>
  )
}

export default ParcelState
