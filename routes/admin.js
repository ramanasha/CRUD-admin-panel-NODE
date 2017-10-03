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
    Client.find({}, (error, clients) => {
        if (error) return next(error);
    }).then(clients => {
        clientsData = clients;
        response.render('admin_zone/admin_clients.pug', {
            clients: clientsData
        })
    })
})

router.post('/admin/clients/new', (request, response, next) => {
    Client.create({
        personal: {
            name: request.body.clientName,
            birthday: new Date(request.body.client_birthday),
            age: request.body.client_age,
            gender: request.body.client_gender,
            address: request.body.clientAddress,
            DNI: request.body.clientDNI,
            locality: request.body.clientLocality,
            province: request.body.client_province,
            postal_code: request.body.client_postal_code
        },
        attitude: {
            nature: request.body.client_nature,
            temperament: request.body.client_temperament,
        },
        contact: {
            email: request.body.client_email,
            phoneOne: request.body.client_phone1,
            phoneTwo: request.body.client_phone2
        },
        comment: request.body.client_comment
    }, (error, client) => {
        if (error) return next(error);
        console.log(`ADDED CLIENT WITH SUCCESS: ${JSON.stringify(client, undefined, 2)}`);
        response.redirect('/admin/clients')
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

router.post('/admin/clients/edit', (request, response, next) => {
    let newClientData = {
        personal: {

        },
        attitude: {

        },
        contact: {

        },
    }

    if (request.body.clientName) {
        let capitalizeName = request.body.clientName.split(' ')
            .map(word => {
                return word.charAt(0).toUpperCase() + word.substring(1);
            }).join(' ');
        newClientData.personal.name = capitalizeName;
    }

    if (request.body.clientDNI) newClientData.personal.DNI = request.body.clientDNI;
    if (request.body.clientAddress) newClientData.personal.address = request.body.clientAddress;
    if (request.body.client_postal_code) newClientData.personal.postal_code = request.body.client_postal_code;
    if (request.body.clientLocality) newClientData.personal.locality = request.body.clientLocality
    if (request.body.client_birthday) newClientData.personal.birthday = request.body.client_birthday;
    if (request.body.client_province) newClientData.personal.province = request.body.client_province;
    if (request.body.client_gender) newClientData.personal.gender = request.body.client_gender;
    if (request.body.client_age) newClientData.personal.age = request.body.client_age;

    if (request.body.client_nature) newClientData.attitude.nature = request.body.client_nature;
    if (request.body.client_temperament) newClientData.attitude.temperament = request.body.client_temperament;

    if (request.body.client_email) newClientData.contact.email = request.body.client_email;
    if (request.body.client_phone1) newClientData.contact.phoneOne = request.body.client_phone1;
    if (request.body.client_phone2) newClientData.contact.phoneTwo = request.body.client_phone2;

    if (request.body.client_comment) newClientData.comment = request.body.client_comment;


    Client.findByIdAndUpdate(request.body.client_id,
        { $set: newClientData },
        { new: true }, (error, client) => {
            if (error) return next(error);
            console.log(`EDIT CLIENT WITH SUCCESS: ${JSON.stringify(client, undefined, 2)}`);
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
            kind: request.body.petKind,
            castrated: request.body.castrated ? true : false,
            coat: request.body.petCoat,
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

router.post('/admin/pet/info', (request, response, next) => {
    Pet.findById(request.body.pet_id, (error, pet) => {
        response.send(pet)
    })
})

router.get('/admin/pet/control/:id', (request, response, next) => {
    let petData;
    Pet.findById(request.params.id, (error, pet) => {
        if (error) return next(error);
        petData = pet;
        Client.findById(pet.owner, (error, client) => {
            if (error) return next(error)
            response.render('admin_zone/admin_pet_control.pug', {
                petData: pet,
                clientId: client.personal.name
            })
        })
    })

})

router.post('/admin/pet/edit', (request, response, next) => {

    let vaccines = [],
        diseases = [],
        vaccinesParsed = JSON.parse(request.body.vaccines),
        diseasesParsed = JSON.parse(request.body.diseases);

    let newPetData = {
        personal: {

        }, clinicalData: {

        }
    };

    if (vaccinesParsed.length !== 0) {
        vaccines = vaccinesParsed.map(vaccine => {
            return vaccine.value
        })
        newPetData.clinicalData.vaccines = vaccines;

    }
    if (diseasesParsed.length !== 0) {
        diseases = diseasesParsed.map(disease => {
            return disease.value
        })
        newPetData.clinicalData.diseases = diseases;
    }
    if (request.body.petName) newPetData.personal.name = request.body.petName;
    if (request.body.petBreed) newPetData.personal.breed = request.body.petBreed;
    if (request.body.petKind) newPetData.personal.kind = request.body.petKind;
    if (request.body.petCoat) newPetData.personal.coat = request.body.petCoat;
    if (request.body.petNature) newPetData.personal.nature = request.body.petNature;
    if (request.body.petAge) newPetData.personal.age = request.body.petAge;
    if (request.body.castrated) newPetData.personal.castrated = request.body.castrated
    if (request.body.petGender) newPetData.personal.gender = request.body.petGender;
    if (request.body.bite) newPetData.clinicalData.bite = request.body.bite;
    if (request.body.petMicrochip) newPetData.clinicalData.microchip = request.body.petMicrochip;
    if (request.body.comment) newPetData.comment = request.body.comment;

    Pet.findByIdAndUpdate(request.body.petID,
        { $set: newPetData }, { new: true }, (error, pet) => {
            if (error) return next(error)
            console.log(`PET UPDATED WITH SUCCESS: ${JSON.stringify(pet, undefined, 2)}`)
            response.redirect(`/admin/pet/control/${pet._id}`)
        })

})


router.get('/logout', function (request, response) {
    request.logOut();
    response.redirect('/');
});


module.exports = router;