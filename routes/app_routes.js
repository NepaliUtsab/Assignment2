import {
    loginUser,
    getUser,
    registerUser
} from '../controller/login_register_controller'

import {
    getCollabs,
    saveCollab,
    getCollabsByGenre,
    getAllCollabs
} from '../controller/collabs_controller'

const route = (app) => {
    app.route('/login_user')
    .post(loginUser)
    .get((req,res,next) => {
        console.log(`Request from ${req.method} from ${req.originalUrl}`);
        next();
    }, getUser)

    app.route('/register_user')
    .post(registerUser)

    app.route('/save_collab')
    .post(saveCollab)

    app.route('/get_collab')
    .get(getCollabs)

    app.route('/get_collab_genre')
    .get(getCollabsByGenre)

    app.route('/get_all_collabs')
    .get(getAllCollabs)
    
}

export default route;