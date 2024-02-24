const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationStageSchema = new Schema({
    applicationType: {
        type: Schema.Types.ObjectId,
        ref: 'ApplicationType',
        required: true,
    },
    stageName: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
});

const ApplicationStage = mongoose.model('ApplicationStage', applicationStageSchema);
module.exports = ApplicationStage;
