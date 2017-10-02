const router = require('express').Router(),
    ContactMessages = require('../models/Contact');

let contactMessages = [];

router.get('/contact', (request, response) => {
    response.render('partials/messageInfo')
})

router.post('/contact', (request, response) => {
    ContactMessages.create({
        email: request.body.emailFromUser,
        message: request.body.emailMessage
    }, (error, message) => {
        if (error) return next(error);
        console.log(`CONTACT MESSAGE RECEIVED: ${JSON.stringify(message, undefined, 2)}`)
        response.redirect('/contact')
    })
})

router.get('/admin/messages', (request, response) => {
    ContactMessages.find({})
        .sort({ date: 'asc' })
        .exec((error, messages) => {
            contactMessages = messages;
            response.render('admin_zone/admin_messages', {
                messages: messages
            })
        })
})

router.post('/contact/remove/:index', (request, response, next) => {
    ContactMessages.findOneAndRemove({ email: contactMessages[request.params.index].email }, (error, result) => {
        if (error) return next(error);
        console.log(`MESSAGE REMOVED WITH SUCCESS: ${JSON.stringify(result,undefined,2)}`)
        response.redirect('/admin/messages')
    })
})

router.post('/contact/readed/:index', (request, response, next) => {
    ContactMessages.findOneAndUpdate({ email: contactMessages[request.params.index].email }, {
            $set: { unreaded: false, classReaded: "readed" }
        }, { new: true },
        (error, doc) => {
            if (error) throw new Error(error);
            console.log(`EMAIL NOW IS READED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
            response.redirect('/admin/messages');
        })
})

module.exports = router;