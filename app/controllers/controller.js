const { sequelize } = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../models");
const Word = db.Word1;
const Progress = db.progress;
const Mark = db.mark;

exports.create=(req, res) =>{
    if (!req.body.section) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    const word = {
        section: req.body.section
    };
    Word.create(word)
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "error occured"
            });
            
        });
    
}

exports.status = (req, res) => {
    Progress.findAll({ order: sequelize.literal('id')})
        .then(data => {
            res.send(data)
        })
}

exports.status1 = (req, res) => {
    const section = req.params.section;
    Progress.findOne({ where : { section: section }})
        .then(data => {
            res.send(data)
        })
}

exports.findOne = (req, res) => {
    Word.findOne({ where : { section: '1' } })
        .then(data => {
            res.send(data);
            console.log(data)
            
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'error'
            })
        })
}

exports.getquez = (req, res) => {
    const section = req.params.section;
    const learn = req.params.learning;
    if(learn==2){    
        Word.findAll({ 
            where : { section:section,[Op.or]:[{learning:'3'},{learning:'2'}]} , 
            limit:15,
            order: sequelize.random() 
        })
        .then(data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'error'
            })
        })}
    else if(learn==0){
        Word.findAll({ 
            where : { section:section,learning: '0' } , 
            limit:15,
            order: sequelize.random() 
        })
        .then(data => {

            res.send(data);
        })
    }else if(learn==3){
        Word.findAll({ 
            where : { section:section,learning: '3' } , 
            limit:15,
            order: sequelize.random() 
        })
        .then(data => {

            res.send(data);
        })
    }}

exports.answer = (req, res) => {
    const learning = req.body.learning
    const id = req.body.id
    Word.update({ learning: learning },{where: { id: id }})
        .then(data => {res.send(data)})
}

exports.result = async (req, res) => {
    const section = req.params.section
    const count = await Word.count(
        {where: {section: section }});
    const count2 = await Word.count(
        {where: {section: section, learning: "0"}});
    const count3 = await Word.count(
        {where: {section: section, learning: "1"}});
    const answerrate = Math.round((count3/count)*100)
    const answered = Math.round((1-count2/count)*100)
    const update = await Progress.update({ answerrate: answerrate, answered: answered },{where: { section: section } })
    res.send({ answerrate, answered, section })
    }

exports.mark = async (req, res) => {
    const mark = await Mark.findOne()
    const section=mark.section
    const recent = await Progress.findOne({ where: { section: section } })
    res.send({ recent })
}

exports.clear = (req, res) => {
    const section = req.params.section
    const learning = req.params.learning
    const learning2 = req.params.learning2
    const learning3 = req.params.learning3
    Word.update({ learning: '0' },{ where: { section: section, [Op.or]:[{learning: learning},{learning: learning2},{learning: learning3}] }})
        .then(() => res.send("success"))
}

exports.markUpdate = (req, res) => {
    const section = req.params.section
    Mark.update({ section: section },{ where: { id: '1' }})
        .then(() => res.send("success"))
}