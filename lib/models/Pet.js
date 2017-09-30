const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PetSchema = new Schema({
    personal: {
        name: { type: String, trim: true },
        age: Number,
        gender: String,
        breed: { type: String, trim: true },
        castrated: Boolean,
        coat: String,
        nature: String
    },
    clinicalData: {
        bite: Boolean,
        vaccines: [{ type: String, trim: true }],
        microchip: { type: String, match: /[0-9]{15}/i },
        diseases: [String]
    },
    comment: String,
    owner: { type: Schema.Types.ObjectId, ref: 'Client' }
});


module.exports = mongoose.model('Pet', PetSchema);