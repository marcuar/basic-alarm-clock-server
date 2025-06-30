import Alarms from "../models/Alarms.js";

export const addAlarm = async (req, res) => {
    const {title, content, completionTime, userId} = req.body
    if(!title || !content || !completionTime || !userId) return res.status(400).json({message: "Invalid input"});
    const duplicateTitle = await Alarms.findOne({title}).lean().exec();
    if(duplicateTitle) return res.status(409).json({message: "Duplicate Title"});
    const newAlarm = await Alarms.create({title, content, completionTime, userId});
    const alarms = await Alarms.find({userId}).lean();
    res.json(alarms);
}

export const getAlarms = async (req, res) => {
    const {userId} = req.query;
    const alarms = await Alarms.find({userId}).lean();
    if(alarms.length < 1) return res.json({});
    if(!alarms || !alarms.length) return res.status(500).json({message: "Unable to retrieve alarms!"});
    res.status(200).json(alarms);
}

export const getAlarm = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'Id required!'});
    const alarm = await Alarms.findOne({_id: req.params.id}).exec();
    if(!alarm) return res.status(204).json({'message': 'Employee not found!'});
    res.json(alarm);
}

export const updateAlarm = async (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    if (!id) return res.status(400).json({message: "Id is required!"});
    const alarm = await Alarms.findById(id).exec();
    if(!alarm) return res.status(400).json({message: "alarm doesn't exist!"})
    if (req?.body?.title) alarm.title = req.body.title;
    if (req?.body?.content) alarm.content = req.body.content;
    if (req?.body?.completionTime) alarm.completionTime = req.body.completionTime;
    console.log(alarm);
    const result = await alarm.save();
    res.json(result)
}
export const deleteAlarm = async (req, res) => {
    const { id } = req.query;
    if(!id)return res.status(400).json({message: "Id is required!"});
    const alarm = await Alarms.findById(id).exec();
    if(!alarm) return res.status(400).json({message: "Alarm does not exist!"});
    const result = await alarm.deleteOne();
    if(result.acknowledged === true) {
        const alarms = await Alarms.find({userId: alarm.userId}).lean();
        console.log(alarms)
        res.json(alarms)
    }
}