const express = require('express');
const router = express.Router();

const Message=require('../models/message');

router.get('/', async(req,res)=>{
    const messages = await Message.find();
    res.send(messages);
});

router.post('/add', async(req,res)=>{
    const message=new Message(req.body);
    await message.save();
    res.send(message);
});

router.get('/consult/:id1/:id2', async (req,res)=>{
    const {id1,id2} = req.params;
    const Messages= await Message.find({"transmitter":id1, "receiver":id2});
    res.send(Messages);
});
/*
router.post('/edit/:id', async(req,res)=>{
const {id}= req.params;
const task=await Task.update({"id": id},{$set:req.body});
console.log(req.body);
res.send(task);
});
*/
router.get('/delete/:id1/:id2', async(req,res)=>{
    const {id1,id2} = req.params;
    const answer=await Message.remove({"transmitter":id1, "receiver":id2});
    res.send(answer);
});

router.get('/deletemes/:id', async(req,res)=>{
    const {id} = req.params;
    const answer=await Message.remove({"_id":id});
    res.send(answer);
});

module.exports=router;