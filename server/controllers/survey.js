let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// create a reference to the model
let Contact = require('../models/survey');


module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);

            res.render('survey/list', 
            {title: 'Survey Managment',
             ContactList:contactList,
             displayName: req.user ? req.user.displayName: ''});
        }
    });
}

module.exports.displayAddPage = (req,res,next) =>{
    res.render('survey/add', {title: 'Add Question',
    displayName: req.user ? req.user.displayName: ''});

}

module.exports.processAddPage = (req,res,next) => {
    let newContact = Contact({
        "question": req.body.question,
        "option1": req.body.option1,
        "option2": req.body.option2,
        "option3": req.body.option3,
        "option4": req.body.option4,

       
       
    });
    Contact.create(newContact, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the Contact list
            res.redirect('/survey-list');
        }
    });
}


module.exports.displayEditPage =  (req,res,next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the update view
            res.render('survey/update', {title: 'Update Survey', contact: contactToUpdate,
            displayName: req.user ? req.user.displayName: ''});
        }
    });
}

module.exports.processEditPage =  (req,res,next) => {
    let id = req.params.id;

    let updatedBook = Contact({
        "_id": id,
        "question": req.body.question,
        "option1": req.body.option1,
        "option2": req.body.option2,
        "option3": req.body.option3,
        "option4": req.body.option4,
    });

    Contact.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/survey-list');
        }
    });
}

// delete contact list individually

module.exports.performDelete = (req,res,next) => { 
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/survey-list');
        }
    });

}