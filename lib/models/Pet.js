const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PetSchema = new Schema({
    personal: {
        name: { type: String, trim: true },
        age: Number,
        breed: { type: String, trim: true },
        castrated: Boolean,
        coat: String,
    },
    clinicalData: {
        bite: Boolean,
        vaccine: [{ type: String, trim: true }],
        microchip: { type: String, match: /[0-9]{15}/i },
        medication: [String],
        diseases: [String]
    },
    comment: String,
    owner: { type: Schema.Types.ObjectId, ref: 'Client' }
});


module.exports = mongoose.model('Pet', PetSchema);