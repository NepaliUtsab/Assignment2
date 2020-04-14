import {
    loginUser,
    getUser,
    registerUser
} from '../controller/login_register_controller'

const route = (app) => {
    app.route('/login_user')
    .post(loginUser)
    .get((req,res,next) => {
        console.log(`Request from ${req.method} from ${req.originalUrl}`);
        next();
    }, getUser)

    app.route('/register_user')
    .post(registerUser)
    
}

export default route;