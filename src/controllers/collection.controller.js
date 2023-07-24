import Collections from "../Models/collection.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";


/**
 * To Create Collection 
 */
export const createCollection = asyncHandler(async (req, res) => {
    const { name } = req.body
    if (!name) {
        throw new CustomError("Collection name is required", 400)

    }
    const collection = await Collections.create({
        name
    })

    res.status(200).json({
        success: true,
        message: " Collection was created successfully",
        collection
    })
})

/**
 * To Update Collection 
 */
export const updateCollection = asyncHandler(async (req, res) => {
    const { name } = req.body
    const { id: collectionId } = req.params

    if (!name) {
        throw new CustomError("Collection name is required", 400)

    }
    const updatedCollection = await Collections.findByIdAndUpdate(collectionId, {
        name
    }, {
        new: true,
        runValidators: true
    })

    if (!updatedCollection) {
        throw new CustomError("Collection not found", 400)

    }
    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatedCollection
    })
})

/**
 * To Delete Collection 
 */
export const deleteCollection = asyncHandler(async (req, res) => {

    const { id: collectionId } = req.params
    
    // const collectionToDelete = await Collections.findByIdAndDelete(collectionId)  // Direct method
    
    const collectionToDelete = await Collections.findById(collectionId)
    if (!collectionToDelete) {
        throw new CustomError("Collection to be deleted not found", 400)

    }
    await collectionToDelete.remove()

    res.status(200).json({
        success: true,
        message: "Collection deleted successfully",
    })
})

/**
 * To Get all Collections 
 */
export const getAllCollection = asyncHandler(async (req, res) => {
const collections = await Collections.find()   

    
    if (!collections) {
        throw new CustomError("No Collection found", 400)
    }


    res.status(200).json({
        success: true,
        collections
    })
})