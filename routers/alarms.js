import express from "express";
import { addAlarm, deleteAlarm, getAlarms, updateAlarm, getAlarm } from "../controllers/alarmsControllers.js";
const router = express.Router();

router.route('/')
    .post(addAlarm)
    .get(getAlarms)
    .patch(updateAlarm)
    .delete(deleteAlarm);

router.route('/:id')
    .get(getAlarm);

export default router;