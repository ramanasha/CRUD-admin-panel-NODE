const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ClientSchema = new Schema({
    personal: {
        name: { type: String, trim: true },
        birthday: Date,
        age: Number,
        address: { type: String, trim: true },
        DNI: { type: String, match: /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i, unique: true },
        locality: { type: String, trim: true },
        province: { type: String, trim: true },
        postal_code: { type: String, match: /[0-9]{5}/i },
    },
    contact: {
        email: { type: String, trim: true, unique: true },
        phoneOne: { type: String, match: /[0-9]{9}/, unique: true },
        phoneTwo: { type: String, match: /[0-9]{9}/, unique: true, default: "" },
    },
    createdAt: { type: Date, default: Date.now },
    pets: { type: [Schema.Types.ObjectId], ref: 'Pet' },
    comment: String
});

ClientSchema.pre('save', function(next) {
    this.personal.name = this.personal.name.split(' ')
        .map(word => {
            return word.charAt(0).toUpperCase() + word.substring(1);
        }).join(' ');

    let days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado", "Domingo"],
        months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        formattedDate = `${days[this.createdAt.getDay()]} 
        - ${months[this.createdAt.getMonth()]} / 
        ${this.createdAt.getDate()} / 
        ${this.createdAt.getFullYear()}, 
        ${this.createdAt.getHours()}:${this.createdAt.getMinutes()}`;

    this.createdAt = formattedDate;

    this.personal.age = new Date().getFullYear() - this.personal.birthday.getFullYear();
    next();

})
module.exports = mongoose.model('Client', ClientSchema);