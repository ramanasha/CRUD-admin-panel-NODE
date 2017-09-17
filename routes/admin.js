const router = require('express').Router(),
    Profile = require('../models/Profile'),
    ContactData = require('../models/ContactData'),
    Services = require('../models/Services'),
    Client = require('../models/Client');

let servicesData = [];

router.get('/admin', (request, response, next) => {
    response.render('admin_zone/admin_home')
})

/**
 * PROFILE ADMIN ZONE
 */
router.get('/admin/profile', (request, response, next) => {
    let profileData = {};
    Profile.findById('59abc4c29f6c941060343599', (error, profile) => {
        if (error) return next(error);
    }).then(profile => {
        profileData = profile;
        ContactData.findById("59aeee169b9dcf1ac06b4e3f", (error, contactData) => {
            if (error) return next(error);
        }).then(contactData => {
            response.render('admin_zone/admin_profile', {
                profile: profileData,
                contact: contactData,
            })
        })
    })
})

router.post('/admin/profile/edit', (request, response, next) => {
    let newProfileData = {},
        newContactData = {};

    if (request.body.mainTitle) newProfileData.title = request.body.mainTitle.toUpperCase();
    if (request.body.profile_img) newProfileData.imageURL = request.body.profile_img;
    if (request.body.profile_description) newProfileData.description = request.body.profile_description;

    if (request.body.profile_email) newContactData.email = request.body.profile_email;
    if (request.body.profile_phone) newContactData.phone = request.body.profile_phone;

    Profile.findByIdAndUpdate('59abc4c29f6c941060343599', {
        $set: newProfileData
    }, { new: true }, (error, update) => {
        if (error) return next(error);
        console.log(`PROFILE DATA UPDATED WITH SUCESS: ${JSON.stringify(update,undefined,2)}`);
    })

    ContactData.findByIdAndUpdate('59aeee169b9dcf1ac06b4e3f', {
        $set: newContactData,
    }, { new: true }, (error, update) => {
        if (error) return next(error);
        console.log(`PROFILE DATA UPDATED WITH SUCESS: ${JSON.stringify(update,undefined,2)}`);
        response.redirect('/admin/profile')
    })

})


/**
 * SERVICES ADMIN ZONE
 */
router.get('/admin/services', (request, response, next) => {
    Services.find({}, (error, services) => {
        if (error) return next(error);
    }).then(services => {
        servicesData = services;
        response.render('admin_zone/admin_services', {
            services: services
        })

    })
})

router.post('/admin/services/new', (request, response, next) => {
    new Services().save((error, service) => {
        if (error) return next(error)
        console.log(`NEW SERVICE ADDED WITH SUCCESS: ${JSON.stringify(service,undefined,2)}`);
        response.redirect('/admin/services')
    })
})

router.post('/admin/services/delete/:index', (request, response, next) => {
    Services.findOneAndRemove({ nameService: servicesData[request.params.index].nameService },
        (error, service) => {
            if (error) return next(error);
            console.log(`REMOVED SERVICE WITH SUCCESS: ${JSON.stringify(service,undefined,2)}`);
            response.redirect('/admin/services')
        })
})

/**
 * CLIENT ADMIN ZONE
 */
router.get('/admin/clients', (request, response, next) => {
    let clientsData = [];

    Client.find({}, (error, clients) => {
        if (error) return next(error);
    }).then(clients => {
        clientsData = clients;
        response.render('admin_zone/admin_clients.pug', {
            clients: clientsData
        })
    })
})

router.get('/logout', function(request, response) {
    request.logOut();
    response.redirect('/');
});


module.exports = router;