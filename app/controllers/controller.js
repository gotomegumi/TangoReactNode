const { sequelize } = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../models");
const Word = db.Word1;
const Progress = db.progress;
const Mark = db.mark;
const NewWords = db.newWords;

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


exports.result = async (req, res) => {
    const section = req.params.section
    const count = await Word.count(
        {where: {section: section }});
    const count0 = await Word.count(
        {where: {section: section, learning: "0"}});
    const count1 = await Word.count(
        {where: {section: section, learning: "1"}});
    const count3 = await Word.count(
        {where: {section: section, learning: "3"}});
    const answerrate = Math.round((count1/count)*100)
    const answered = Math.round((1-count0/count)*100)
    const update = await Progress.update({ answerrate: answerrate, answered: answered },{where: { section: section } })
    res.send({ answerrate, answered, section, count0, count1, count3 })
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

exports.status1 = async (req, res) => {
    const section = req.params.section;
    const count0 = await Word.count(
        {where: {section: section, learning: "0"}});
    const count2 = await Word.count(
        {where: {section: section, learning: "0"}});
    const count3 = await Word.count(
        {where: {section: section, learning: "0"}});
    res.send({count0, count2, count3})
}

exports.getquez = async (req, res) => {
    const section = req.params.section;
    const learn = req.params.learning;
    const count0 = await Word.count(
        {where: {section: section, learning: "0"}});
    const count2 = await Word.count(
        {where: {section: section, learning: "2"}});
    const count3 = await Word.count(
        {where: {section: section, learning: "3"}});
    const findWords = (learning2, learning3, limmit)=>{ Word.findAll({ 
            where : { section:section,[Op.or]:[{learning:learning2},{learning:learning3}]} , 
            limit:limmit,
            order: sequelize.random() 
        })
        .then(data => {
            res.send(data);
        })}
    // if(learn==2){    
    //     findWords('2','3')
    // }
    // else if(learn==0 || learn==3 || learn==1){
    //     findWords(learn, learn)
    // }}

    if(learn==2){
        if(count0>0){
          if(count0<=20){
            findWords('0','0','20')
      //  not to make remaining words 0 too few, so that quez won't end so early
          }else{
      //  get words of learning 0(not learned)
            findWords('0','0','15')
          }
        }else if(count2==0 && count3==0){
            findWords('1','1','15')
        }else if(count0==0){
      //  get words of learning 2,3(△or✕)
            findWords('2','3','15')
        }
      }else if(learn==3){
        findWords('3','3','15')
        }}



exports.answer = (req, res) => {
    const learning = req.body.learning
    const id = req.body.id
    Word.update({ learning: learning },{where: { id: id }})
        .then(data => {res.send(data)})
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

exports.postNewWord = (req, res) => {
    const section = req.body.section
    const korean = req.body.korean
    const meaning = req.body.meaning
    const pronounce = req.body.pronounce
    const learning = '0'
    const newword = {section:section,korean:korean,meaning:meaning,pronounce:pronounce, learning:learning}
    NewWords.create(newword)
        .then((data)=>res.send(data))
}

exports.postWord = (req, res) => {
    const section = req.body.section
    const korean = req.body.korean
    const meaning = req.body.meaning
    const pronounce = req.body.pronounce
    const learning = '0'
    const newword = {section:section,korean:korean,meaning:meaning,pronounce:pronounce, learning:learning}
    Word.create(newword)
        .then((data)=>res.send(data))
}

exports.getNewWords = (req, res) => {
    const section = req.params.section
    NewWords.findAll({where:{section:section}})
        .then((data)=>res.send(data))
}