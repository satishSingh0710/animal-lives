const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const sharp = require('sharp')
const bodyParser = require('body-parser')
const fs = require('fs')
const multer = require('multer')
const app = express()
const { HelpModel, VolunteerModel } = require('./models/model')
require('dotenv').config()

app.use(cors())
app.use(express.static('./build'))
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload-data')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }

})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, true)
    else cb('Invalid File', false)
}
const Upload = multer({ storage, fileFilter })

const dataBase = "mongodb+srv://praveennegi:praveenitis@cluster0.yepvd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dataBase,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongoose is connected"))
    .catch(e => console.log("could not connect"))


app.get('/help', async (req, res) => {
    const rec = await HelpModel.find({})
    res.json(rec)
})

app.post('/help', Upload.single('image'), async (req, res) => {
    
    const unique = Date.now() + '-' + '.jpeg'
    const imgPath = path.resolve(__dirname + '/upload-data/' + unique);

    const resize = async() => {
        console.log('saving')
        try{
            await sharp(req.file.path).resize(188, 280).jpeg({
                quality: 100,
                chromaSubsampling: ('4:4:4')
            }).toFile(imgPath, (err, info) => {
                if (err) console.log(err)
                else console.log(info)
            })
        } catch(err){ console.log('error occured during resizing ',err)}
        
    } 
    resize()

    let newData
    const read= () =>{
        newData = new HelpModel({
            location: req.body.location,
            contact: req.body.contact,
            about: req.body.about,
            img: {
                data: fs.readFileSync('upload-data/' + unique),
                contentType: 'image/png'
            }
        })
    }
    const save= ()=>{
        newData.save().then( () =>console.log('UPLOADED')).catch(err=>console.log(err,'ERROR OCCURED'))
    }
    console.log('uploaded')
    setTimeout( read, 2000)
    setTimeout( save, 3000)

    res.redirect('/help') 
})   

app.get('/volunteer', async (req, res) => {
    console.log('fetch volunteer')
    const rec = await VolunteerModel.find({})
    res.json(rec)
})

app.post('/volunteer', Upload.single('image'), async (req, res) => {

    const unique = Date.now() + '-' + '.jpeg'
    const imgPath = path.resolve(__dirname + '/upload-data/' + unique);

    const resize = async() => {
        console.log('saving')
        try{
            await sharp(req.file.path).resize(188, 280).jpeg({
                quality: 100,
                chromaSubsampling: ('4:4:4')
            }).toFile(imgPath, (err, info) => {
                if (err) console.log(err)
                else console.log(info)
            })
        } catch(err){ console.log('error occured during resizing ',err)}
        
    } 
    resize()

    let newData
    const read= () =>{
        newData = new VolunteerModel({
            name: req.body.name,
            contact: req.body.contact,
            about: req.body.about,
            img: {
                data: fs.readFileSync('upload-data/' + unique),
                contentType: 'image/png'
            }
        })
    }
    const save= ()=>{
        newData.save().then( () =>console.log('UPLOADED')).catch(err=>console.log(err,'ERROR OCCURED'))
    }
    console.log('uploaded')
    setTimeout( read, 2000)
    setTimeout( save, 3000)

    res.redirect('/volunteer') 
})

app.get('*', (req, res) => {
    console.log('fetch')
    res.sendFile(path.resolve(__dirname + '/index.html'))
})

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`SERVER RUNNING AT PORT ${port}`))