import express, { Router } from 'express'
import mongoose, {mongo} from 'mongoose'
import routes from './routes/app_routes'
import parser from 'body-parser'

const app = express();
const PORT = 4000;

// mongoose init
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/music_collab_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// body-parser
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

routes(app)

app.listen(PORT)