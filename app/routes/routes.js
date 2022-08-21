module.exports = app => {
    const word = require("../controllers/controller.js")
    var router = require("express").Router();
    router.get("/status", word.status);
    router.get("/status1/:section", word.status1);    
    router.get("/mark", word.mark);
    router.get("/getquez/:section/:learning", word.getquez)
    router.post("/answer", word.answer);
    router.get("/result/:section", word.result);
    router.post("/clear/:section/:learning/:learning2/:learning3", word.clear);
    router.post("/markUpdate/:section", word.markUpdate);
    router.post("/postword/:section", word.postWord)
    router.post("/postnewword", word.postNewWord)
    router.get("/getnewwords/:section", word.getNewWords)
    app.use("/api/tango", router);
}