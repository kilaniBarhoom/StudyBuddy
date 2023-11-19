import express from "express";
import catcher from '../middleware/catcher.middleware.js'
import { OK } from '../constants/status.constants.js'
import { auth, hasRole } from '../middleware/auth.middleware.js'
import * as controller from '../controllers/auth.controller.js'
const ADMIN = 'admin'

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

router.post('/signup', catcher(controller.signup))
router.post('/login', catcher(controller.login))
router.put('/update-password', auth, catcher(controller.updatePassword))

router.route('/me')
    .get(auth, catcher(controller.getOwnProfile))
    .put(auth, catcher(controller.updateOwnProfile))

router.get('/admin/users', auth, hasRole(ADMIN), catcher(controller.getAll))
router.route('/admin/users/:userId', auth, hasRole(ADMIN))
    .get(catcher(controller.getOneUser))
    .put(catcher(controller.updateOneUser))
    .delete(catcher(controller.deleteOneUser))



export default router