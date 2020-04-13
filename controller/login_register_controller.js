import userModel from '../model/userModel'
import { responseFormat } from '../model/response/response_format'

export const loginUser = (req, res) => {
    var responseBody = responseFormat;
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (user == null) {
            responseBody.status = 201;
            responseBody.message = "Invalid email or password."
            res.json(responseBody);
        } else if (user.password !== req.body.password) {
            responseBody.status = 201;
            responseBody.message = "Invalid email or password.";
            res.json(responseBody);
        } else {
            responseBody.status = 200;
            responseBody.message = "Login Successful";
            responseBody.data = user;
            res.json(responseBody);
        }
    })
}

export const getUser = (req, res) => {
    var responseBody = responseFormat;
    userModel.find({}, (err, user) => {
        if (user.length == 0) {
            responseBody.status = 201;
            responseBody.message = "No User Found";
            res.json(responseBody);
        } else {
            responseBody.status = 200;
            responseBody.message = "Users found";
            responseBody.data = user
            res.json(responseBody);
        }
    })
}

export const registerUser = (req, res) => {
    let newUser = userModel(req.body)
    var responseBody = responseFormat;
    userModel.findOne({ email: newUser.email }, (err, user) => {
        if (err) {
            responseBody.status = 401;
            responseBody.message = "Internal error";
            res.json(responseBody);
        } else if (user == null) {
            newUser.save((err, new_user) => {
                if (err) {
                    res.send(err)
                }
                let responseBody = responseFormat;
                responseBody.message = 'Successfully created';
                responseBody.data = new_user;
                res.json(responseBody);
            })
        } else {
            responseBody.status = 201;
            responseBody.message = "Email is already registered";
            res.json(responseBody);
        }
    })
}