const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const db =require("./models/index");
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

db.sequelize.sync()
    .then(()=>{
        console.log("synced db.");
    }).catch((err)=>{
        console.log("fail to sync"+err.message);
    });

app.use(express.static(path.join(__dirname, '../tango/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello World!" });
  });
  
require("./routes/routes")(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../tango/build/index.html'));
});

app.listen(port, () => console.log("listening on port"+port));
