const mongoose = require('mongoose');

const clipboardSchema = new mongoose.Schema({
    text: String,
    isAvailable: Boolean
});

const Clipboard = mongoose.model('Clipboard', clipboardSchema);

module.exports = {Clipboard};