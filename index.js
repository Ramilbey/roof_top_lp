


 import express from 'express'
 import path from 'path'
 import dotenv from 'dotenv'
 import mongoose  from 'mongoose'
import Contact from './schema/contact.schema.js';
 dotenv.config();


const app = express();

const __dirname = path.resolve();


const port = process.env.PORT || 3000;

// render everything on public folder

app.use(express.static(path.join(__dirname, 'public')));

// body parsing

app.use(express.json());


// routes

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});


mongoose.connect(process.env.DATABASE_URL, {
    dbName: "roof-top",

    auth: {

        username: process.env.DATABASE_USERNAME,

        password: process.env.DATABASE_PASSWORD

    }

}).then(() => console.log('MongoDB connected...'))



app.post('/contact', async (req, res) => {

    try {

        const { name, contact } = req.body;

        const newContact = new Contact({ name, contact });
    
        await newContact.save();
    
        res.json({message:'Contact added successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.use((err, req, res, next) => {
    res.status(500).json({message:'Something broke!'})
})


app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});
