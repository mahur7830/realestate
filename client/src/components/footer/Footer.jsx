

import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
          This real estate web application provides a seamless platform for users to browse,
          list, and manage property listings. Whether you're a homeowner looking to sell or 
          rent out a property, or a buyer searching for your dream home, the app offers a 
          user-friendly interface to facilitate your needs.Users can easily sign up, log in,
          and navigate through detailed property listings, including essential information 
          like price, size, and location, along with images for better visualization. 
          For sellers, the app allows simple property listing management with photo uploads 
          Secure authentication ensures a safe and personalized experience, making property
          transactions efficient and transparent.      </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone:+91 7830197952</span>
          <span>YouTube: The truth haut</span>
          <span>GitHub: The developer</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Asia</span>
          <span>Country: India</span>
          <span>Current Location: Greater Noida (Uttar Pradesh)</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer