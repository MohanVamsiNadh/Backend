const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userApplicationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
    application_typeId: {
        type: Schema.Types.ObjectId,
        ref: 'ApplicationType',
        required: true,
    },
    currentStage: {
        type: Schema.Types.ObjectId,
        ref: 'ApplicationStage',
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending' , 'rejected' , 'approved']
    },
});

const UserApplication = mongoose.model('UserApplication', userApplicationSchema);
module.exports = UserApplication;
