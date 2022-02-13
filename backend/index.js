const express = require('express');
const port = 3000;
const app = express();

//middlewares
app.use(express,json());
app.use(express.urlencoded({extended:true}));

//module import for router
const scrabble = require("./routes/scrabble");

app.use('/scrabble', scrabble);

app.listen(port, err => {
    if(err) {
        return console.log(`ERROR ${err}`);
    } else {
        console.log(`Listening at port ${port}`);
    }
    
});