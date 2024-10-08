import React, { useEffect, useState } from "react"
import classes from "./featuredProperties.module.css"
import img from "../../assets/estate3.jpg"
import person from "../../assets/person.jpg"
import {FaBed, FaSquareFull} from 'react-icons/fa'
import { request } from "../../util/fetchAPI"
import {Link} from 'react-router-dom'

const FeaturedProperties = () =>{
    const [featuredProperties,setFeaturedProperties] = useState([])

    useEffect(()=>{
        const fetchFeatured = async()=>{
            try{
                const data = await request('/property/find/featured','GET')
                setFeaturedProperties(data)
            }catch(error){
                console.error(error.message)

            }
        }
        fetchFeatured()
    },[])
    console.log(featuredProperties)
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.titles}>
                    <h5>Properties you may like</h5>
                    <h2>Our glamrous properties</h2>
                </div>
                <div className={classes.featuredProperties}>
                    {featuredProperties?.map((property)=>( 
                        <div key={property._id} className={classes.featuredProperty}>
                             <Link to = {`/propertyDetail/${property._id}`} className={classes.imgContainer}>
                             <img src={property.img?`https://realestateservices.onrender.com/images/${property.img}`:img} alt=""/>
                             </Link>
                             <div className={classes.details}>

                                <div className={classes.priceAndOwner}>
                                    <span className={classes.price}>$ {property?.price}</span>
                                    <img src={person} className={classes.owner} alt="not uploaded"/>
                                </div>

                                <div className={classes.moreDetails}>
                                    <span>{property?.beds}Beds <FaBed className={classes.icon}/></span>
                                    <span>{property?.sqmeters}Square meters <FaSquareFull className={classes.icon}/></span>
                                </div>

                                <div className={classes.desc}>
                                     {property?.desc}
                                </div>

                             </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}


export default FeaturedProperties