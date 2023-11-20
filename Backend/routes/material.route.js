import express from "express";
import catcher from '../middleware/catcher.middleware.js'
import { auth, hasRole } from '../middleware/auth.middleware.js'
import * as controller from '../controllers/material.controller.js'
const ADMIN = 'admin'

const router = express.Router()

router.route('/')
    .post(auth, catcher(controller.postMaterial))
    .get(catcher(controller.findMaterial))

router.route('/:materialId')
    .get(auth, hasRole(ADMIN), catcher(controller.findMaterialById))
    .put(auth, hasRole(ADMIN), catcher(controller.editMaterial))
    .delete(auth, hasRole(ADMIN), catcher(controller.deleteMaterial))

router.post('/:materialId/ratings', auth, catcher(controller.addRating))



export default router
