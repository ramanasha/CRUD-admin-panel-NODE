const router = require('express').Router(),
    Profile = require('../models/Profile'),
    ContactData = require('../models/ContactData'),
    Services = require('../models/Services'),
    Client = require('../models/Client'),
    Contact = require('../models/Contact'),
    Pet = require('../models/Pet');

let servicesData = [],
    clientsData = [],
    petsData = [];

router.get('/admin', (request, response, next) => {
    let newMessages = 0;
    Contact.find({}, (error, result) => {
        if (error) return next(error);
    }).then(messages => {
        messagesLength = messages.length;
        for (let i = 0; i < messagesLength; i++) {
            if (messages[i].unreaded) {
                newMessages++;
            }
        }
        response.render('admin_zone/admin_home', {
            newMessages: newMessages,
        })
    })
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
        console.log(`PROFILE DATA UPDATED WITH SUCESS: ${JSON.stringify(update, undefined, 2)}`);
    })

    ContactData.findByIdAndUpdate('59aeee169b9dcf1ac06b4e3f', {
        $set: newContactData,
    }, { new: true }, (error, update) => {
        if (error) return next(error);
        console.log(`PROFILE DATA UPDATED WITH SUCESS: ${JSON.stringify(update, undefined, 2)}`);
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
        console.log(`NEW SERVICE ADDED WITH SUCCESS: ${JSON.stringify(service, undefined, 2)}`);
        response.redirect('/admin/services')
    })
})

router.post('/admin/services/delete/:index', (request, response, next) => {
    Services.findOneAndRemove({ nameService: servicesData[request.params.index].nameService },
        (error, service) => {
            if (error) return next(error);
            console.log(`REMOVED SERVICE WITH SUCCESS: ${JSON.stringify(service, undefined, 2)}`);
            response.redirect('/admin/services')
        })
})

/**
 * CLIENT ADMIN ZONE
 */
router.get('/admin/clients', (request, response, next) => {
    /*
        new Client().create({
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

    Client.find({}, (error, clients) => {
        if (error) return next(error);
    }).then(clients => {
        clientsData = clients;
        response.render('admin_zone/admin_clients.pug', {
            clients: clientsData
        })
    })
})


router.post('/admin/clients/remove/:index', (request, response, next) => {
    Client.findByIdAndRemove(clientsData[request.params.index]._id,
        (error, client) => {
            if (error) return next(error);
            console.log(`REMOVED CLIENT WITH SUCCESS: ${JSON.stringify(client, undefined, 2)}`);
            response.redirect('/admin/clients')
        })
})


router.post('/admin/new/pet', (request, response, next) => {
    let vaccines = [],
        diseases = [],
        vaccinesParsed = JSON.parse(request.body.vaccines),
        diseasesParsed = JSON.parse(request.body.diseases);

    if (vaccinesParsed.length !== 0) {
        vaccines = vaccinesParsed.map(vaccine => {
            return vaccine.value
        })
    }
    if (diseasesParsed.length !== 0) {
        diseases = diseasesParsed.map(disease => {
            return disease.value
        })
    }

    Pet.create({
        personal: {
            name: request.body.petName,
            age: request.body.petAge,
            gender: request.body.petGender,
            breed: request.body.petBreed,
            castrated: request.body.castrated ? true : false,
            nature: request.body.attitude
        },
        clinicalData: {
            bite: request.body.bite ? true : false,
            microchip: request.body.petMicrochip,
            vaccines: vaccines,
            diseases: diseases
        },
        comment: request.body.comment,
        owner: request.body.client_id
    }, (error, pet) => {
        if (error) return next(error);
        console.log(`NEW PET ADDED: ${JSON.stringify(pet, undefined, 2)}`)
        Client.findByIdAndUpdate(pet.owner, {
            $push: {
                pets: pet._id
            }
        }, { new: true }, (error, client) => {
            if (error) return next(error);
            console.log(`NEW CLIENT PET ADDED ON CLIENT`)
            response.redirect('/admin/clients')
        })
    })
})

router.get('/logout', function (request, response) {
    request.logOut();
    response.redirect('/');
});


module.exports = router;