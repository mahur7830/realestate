
import React from 'react'
import { Link } from 'react-router-dom'
import classes from './popularProperties.module.css'
import img1 from '../../assets/realestatebeach.jpg'
import img2 from '../../assets/realestatemountain.jpg'
import img3 from '../../assets/realestatecountryside.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'

const PopularProperties = () => {
  const [numProperties, setBeachProperties] = useState(0)
  const [mountainProperties, setNumProperties] = useState(0)
  const [villageProperties, setVillageProperties] = useState(0)

  useEffect(() => {
    const fetchNumberProperties = async() => {
      try {
         const data = await request('/property/find/types', 'GET')

         } catch (error) {
        console.error(error.message)
      }
    }
     fetchNumberProperties()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
          <Link to={`/properties?type=beach&continent=0&priceRange=2`} className={classes.property}>
            <img src={img1} />
            <div className={classes.quantity}>{numProperties?.beach} properties</div>
            <h5>Beach properties</h5>
          </Link>
          <Link to={`/properties?type=mountain&continent=1&priceRange=2`} className={classes.property}>
            <img src={img2} />
            <div className={classes.quantity}>{numProperties?.mountain}properties</div>
            <h5>Mountain properties</h5>
          </Link>
          <Link to={`/properties?type=village&continent=2&priceRange=2`} className={classes.property}>
            <img src={img3} />
            <div className={classes.quantity}>{numProperties?.village}properties</div>
            <h5>Village properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties