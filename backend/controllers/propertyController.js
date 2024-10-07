const verifyToken = require('../middlewares/verifyToken')
const Property = require('../models/Property')
const User = require('../models/user')
const propertyController = require('express').Router()



// get all
propertyController.get('/getAll', async (req, res) => {
    try {
        const properties = await Property.find({}).populate("currentOwner", '-password')

        console.log(properties)

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})

// get featured
propertyController.get('/find/featured', async (req, res) => {
    try {
        const featuredProperties = await Property.find({ featured: true }).populate("currentOwner", '-password')
        return res.status(200).json(featuredProperties)
    } catch (error) {
        return res.status(500).json(error)
    }
})


// get all from type
propertyController.get('/find', async (req, res) => {
    const type = req.query
    //let properties = []
    try {
        if (type) {
          const  properties = await Property.find(type).populate("currentOwner", '-password')
          return res.status(200).json(properties)
        } else {
            //properties = await Property.find({})
            return res.status(500).json({mgs:"no such type"})
        }

        //return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


//get count of types
propertyController.get('/find/types', async (req, res) => {
    try {
        const beachType = await Property.countDocuments({ type: 'beach' })
        const mountainType = await Property.countDocuments({ type: 'mountain' })
        const villageType = await Property.countDocuments({ type: 'village' })

        return res.status(200).json({ beach: beachType, mountain: mountainType, village: villageType })
    } catch (error) {
        return res.status(500).json(error)
    }
})


//Get individual property
propertyController.get('/find/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('currentOwner', '-password')

        if (!property) {
            throw new Error('No such property with that id')
        } else {
            return res.status(200).json(property)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})


// create property
propertyController.post('/', verifyToken, async (req, res) => {
    try {
        const newProperty = await Property.create({ ...req.body, currentOwner: req.user.id })

        return res.status(201).json(newProperty)
    } catch (error) {
        return res.status(500).json(error)
    }
})


// update property
propertyController.put('/:id', verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        //console.log(req.user.id);
        //console.log(property.currentOwner.toString());
        
        if (property.currentOwner.toString() !== req.user.id.toString()) {
            throw new Error("You are not allowed to update other people's properties")
        }
         //console.log(req.body);

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )

      //console.log(updatedProperty);

        return res.status(200).json(updatedProperty)
    } catch (error) {
        return res.status(500).json(error)
    }
})



// delete estate
propertyController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        console.log(req.user.id);
        console.log(property.currentOwner.toString());
        
        if (property.currentOwner.toString() !== req.user.id.toString()) {
            throw new Error("You are not allowed to delete other people properties")
        }

        await property.deleteOne()

        return res.status(200).json({ msg: "Successfully deleted property" })
    } catch (error) {
        return res.status(500).json(error)
    }
})



module.exports = propertyController