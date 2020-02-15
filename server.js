const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname+'/client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
    console.log(__dirname+'/build/index.html')
}); 

const port = process.env.PORT || 5001
app.listen(port, () => console.log(`listenting at port: ${port}`)) 