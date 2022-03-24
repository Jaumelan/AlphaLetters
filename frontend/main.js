const express = require("express");
const app = express();
const port = 80;

//middlewares

/* app.use('/', express.static('pages/home')) */
/* app.use("/game", express.static("pages/game")); */
app.use(express.static("public"))
app.use(express.static("pages/game"))


app.listen(port, err => {
    if(err) {
        return console.log(`ERROR ${err}`);
    } else {
        console.log(`Listening at port ${port}`);
    }})
