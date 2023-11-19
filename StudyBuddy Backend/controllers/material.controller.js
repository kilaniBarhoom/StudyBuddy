import Material from "../models/material.js";
import * as statusCodes from '../constants/status.constants.js'
import ResponseError from "../utils/responseerror.js";
import APIFeatures from '../utils/apiFeatures.js'


export const findMaterialById = async (req, res, next) => {

    const { materialId } = req.params
    const material = await Material.findById(materialId)
    if (!material) {
        return next(
            new ResponseError(
                "Material not found",
                statusCodes.NOT_FOUND
            )
        )
    }
    res.status(statusCodes.OK).json({
        material
    })
}
export const findMaterial = async (req, res, next) => {

    if (req.query.subject && req.query.type) {
        req.query.subject = req.query.subject.trim()
        req.query.type = req.query.type.trim()
    }

    const apiFeatures = new APIFeatures(Material.find(), req.query)
        .searchByMajor()

    const materials = await apiFeatures.query.populate("user", "username avatar")

    res.status(statusCodes.OK).json({
        message: `Results`,
        materials
    })
}
export const postMaterial = async (req, res, next) => {
    const { name, type, subject, link, anonymous } = req.body
    if (!name || !type || !subject || !link) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const foundMaterial = await Material.findOne({ link: link })
    if (foundMaterial) {
        return next(
            new ResponseError(
                "Material already exists",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const newMaterial = { name, type, subject, link, user: req.user._id, anonymous }
    const material = await Material.create(newMaterial)
    res.status(statusCodes.OK).json({
        message: "Material created",
        material
    })
}
export const editMaterial = async (req, res, next) => {
    const { materialId } = req.params
    const { name, type, subject, link } = req.body
    if (!name || !type || !subject || !link) {
        return next(
            new ResponseError(
                "Enter all required fields",
                statusCodes.BAD_REQUEST
            )
        )
    }

    const found = await Material.findById(materialId)
    if (!found) {
        return next(
            new ResponseError(
                "Material not found",
                statusCodes.NOT_FOUND
            )
        )
    }

    const material = await Material.findByIdAndUpdate(materialId, req.body, {
        new: true,
        runValidators: true
    })
    res.status(statusCodes.OK).json({
        message: "Material updated",
        material
    })
}
export const deleteMaterial = async (req, res, next) => {
    const { materialId } = req.params

    const material = await Material.findById(materialId)
    if (!material) {
        return next(
            new ResponseError(
                "Material not found",
                statusCodes.NOT_FOUND
            )
        )
    }
    await Material.findByIdAndDelete(materialId)
    res.status(statusCodes.OK).json({
        message: "Material deleted",
    })
}

export const addRating = async (req, res, next) => {
    const { materialId } = req.params
    const material = await Material.findById(materialId)
    if (!material) {
        return next(
            new ResponseError(
                "Material not found",
                statusCodes.NOT_FOUND
            )
        )
    }
    const { rating } = req.body
    if (!rating) {
        return next(
            new ResponseError(
                "Enter rating",
                statusCodes.BAD_REQUEST
            )
        )
    }
    const ratedAlr = material.ratings.find(rating => rating.user.toString() == req.user._id.toString())
    if (ratedAlr) {
        ratedAlr.rating = rating

    } else {
        material.ratings.push({ rating, user: req.user._id })
    }

    await material.save();
    res.status(statusCodes.OK).json({
        message: "Rating added"
    })
}