const router = require('express').Router(),
    Profile = require('../models/Profile'),
    Benefit = require('../models/Benefit'),
    Service = require('../models/Services'),
    ContactData = require('../models/ContactData');
const client = require('../models/Client');

router.get('/', (request, response, next) => {
    let profileData = {},
        benefitData = {},
        servicesData = {};
    /*
        client.create({
            personal: {
                name: "Antonio orozco candidato",
                birthday: new Date('2000-04-16'),
                address: "C/ cipriano pentecostes edificio 5",
                DNI: "44567890x",
                locality: "Toledo interno",
                province: "Toledo",
                postal_code: "43001",
            },
            contact: {
                email: "cipriano@toledo.com",
                phoneOne: "657874321",
                phoneTwo: "653312344"
            },
            comment: "Un tio de pueblo"
        }, (error, client) => {
            if (error) return next(error)
            console.log(client);
        })
    */

    Profile.findById('59abc4c29f6c941060343599', (error, profile) => {
        if (error) return next(error);
    }).then(profile => {
        profileData = profile;
        Benefit.find({}, (error, benefits) => {
            if (error) return next(error);

        }).then(benefits => {
            benefitData = benefits;
            Service.find({}, (error, services) => {
                if (error) return next(error);

            }).then(services => {
                servicesData = services
                ContactData.findById("59aeee169b9dcf1ac06b4e3f", (error, contactData) => {
                    if (error) return next(error);
                }).then(contactData => {
                    response.render('index', {
                        actualYear: new Date().getFullYear(),
                        profile: profileData,
                        benefits: benefitData,
                        services: servicesData,
                        contact: contactData,
                    })
                })
            })
        })
    })
})

module.exports = router;