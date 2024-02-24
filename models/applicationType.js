const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const ApplicationType = mongoose.model('ApplicationType', applicationTypeSchema);
module.exports = ApplicationType;