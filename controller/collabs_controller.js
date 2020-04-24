import collabs from '../model/collabs'
import userModel from '../model/userModel'
import { responseFormat } from '../model/response/response_format'

export const getCollabs = (req, res) => {
    let responseBody = responseFormat;

    userModel.findOne({email: req.body.email})
    .populate('collabs')
    .exec((err, user) => {
        if(err || user == null){
            console.log(req.body)
            responseBody.status = 201;
            responseBody.message = "No Collabs found";
            responseBody.data = "";
            res.json(responseBody);
        }else{
            console.log(user);
            responseBody.message = "Collabs retrieved successfully";
            responseBody.data = user.collabs;
            res.json(responseBody);
        }
    })
    // userModel.findOne({email: req.body.email}, (err, user) => {
        
    // })
}

export const getCollabsByGenre = (req, res) => {
    let responseBody = responseFormat;

    collabs.find({genre: req.body.genre})
    .populate('author')
    .exec((err, collab) => {
        if(err || collab == null){
            console.log(req.body)
            responseBody.status = 201;
            responseBody.message = "No Collabs found";
            responseBody.data = "";
            res.json(responseBody);
        }else{
            console.log(collab);
            responseBody.message = "Collabs retrieved successfully";
            responseBody.data = collab;
            res.json(responseBody);
        }
    })
    // userModel.findOne({email: req.body.email}, (err, user) => {
        
    // })
}

export const getAllCollabs = (req, res) => {
    let responseBody = responseFormat;

    collabs.find()
    .populate('author')
    .exec((err, collab) => {
        if(err || collab == null){
            console.log(req.body)
            responseBody.status = 201;
            responseBody.message = "No Collabs found";
            responseBody.data = "";
            res.json(responseBody);
        }else{
            console.log(collab);
            responseBody.message = "Collabs retrieved successfully";
            responseBody.data = collab;
            res.json(responseBody);
        }
    })
    // userModel.findOne({email: req.body.email}, (err, user) => {
        
    // })
}


export const saveCollab = (req, res) => {
    let responseBody = responseFormat;
    let new_collab = new collabs(req.body);
    console.log(new_collab)
    new_collab.save((err, collab) => {
        if(err){
            console.log(err)
            responseBody.status = 201;
            responseBody.message = "Server Error";
            res.json(responseBody);
        }else{
            console.log(collab);
            responseBody.message = "Collabs Saved successfully";
            responseBody.data = collab;
            userModel.findById((new_collab.author),(err, user) => {
                if(err){
                    responseBody.status = 201;
                    responseBody.message = "User not found";
                    res.json(responseBody); 
                }else{
                    user.collabs.push(new_collab);
                    console.log(new_collab);
                    console.log(user);
                    user.save();
                }
            })
            res.json(responseBody);
        }
    })
}