import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
const compression = require('compression');
const morgan = require('morgan');

const app = express();
const dev = app.get('env') !== 'production';
app.use(bodyParser.json());

let dbUrl;

if (!dev) {
    // app.use(compression());
    // app.use(morgan('common'));
    //
    // dbUrl = 'mongodb://admin:12345@ds133017.mlab.com:33017/recipebook';
    //
    // app.use(express.static(path.resolve(__dirname, 'build')));
    //
    // app.get('/', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    // })
}

if (dev) {
    app.use(morgan('dev'));
    dbUrl = 'mongodb://localhost:27017';
}

function validate(data) {
    let errors = {};
    if (data.title === '') errors.title = "Can't be empty";
    if (data.cover === '') errors.cover = "Can't be empty";
    if (data.description === '') errors.description = "Can't be empty";
    if (data.ingredients === []) errors.ingredients = "Can't be empty";
    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, (err, client) =>{
    if (err) throw err;

    const db = client.db('recipebook');

    app.get('/api/recipes', (req, res) => {
        db.collection('recipes').find({}).toArray((err, recipes) => {
            res.json({recipes});
        });
    });

    app.post('/api/recipes', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if (isValid) {
            const { title, cover, description, ingredients, views, date, liked } = req.body;
            db.collection('recipes').insert({ title, cover, description, ingredients, views, date, liked }, (err, result) => {
                if (err) {
                    res.status(500).json({ errors: { global: "Something went wrong"} });
                } else {
                    res.json({recipe: result.ops[0]});
                }
            });
        } else {
            res.status(400).json({ errors});
        }
    });

    app.get('/api/recipes/:_id', (req, res) => {
        db.collection('recipes').findOne({_id: new mongodb.ObjectId(req.params._id)}, (err, recipe) => {
            res.json({ recipe });
        })
    });

    app.put('/api/recipes/:_id', (req, res) => {
        const { errors, isValid } = validate(req.body);

        if(isValid) {
            const { title, cover, description, ingredients, views, date, liked } = req.body;

            db.collection('recipes').findOneAndUpdate(
                { _id: new mongodb.ObjectId(req.params._id) },
                { $set: { title, cover, description, ingredients, views, date, liked } },
                { returnOriginal: false },
                (err, result) => {
                    if(err) {
                        res.status(500).json({ errors: { global: err }});
                    } else {
                        res.json({ recipe: result.value });
                    }
                }
            )
        } else {
            res.status(400).json({ errors });
        }
    });

    app.delete('/api/recipes/:_id', (req, res) => {
        db.collection('recipes').deleteOne({ _id: new mongodb.ObjectId(req.params._id)}, (err, r) => {
            if(err) res.status(500).json({ errors: { global: err }});
            res.json({});
        })
    });

    app.use((req, res) => {
        res.status(404).json({
            errors: {
                global: 'Still working on it. Please try again later when we implement it'
            }
        })
    });

    app.listen(process.env.PORT ||8081, () => console.log('Server is running on localhost:8081'));

});
