'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var BookSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    serial: {
        type: Number,
        default:'',
        trim: true
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: String,
        default: 'כללי',
        trim: true
    },
    type: {
        type: String,
        default: 'ספר',
        trim: true
    },
    publisher: {
        type: String,
        default: '',
        trim:true
    },
    author: {
        type: String,
        default: '',
        trim: true
    },
    mikum: {
        type: String,
        default: '',
        trim: true
    },
    summary: {
        type: String,
        default: '',
        trim: true
    },
});

/**
 * Validations
 */
/*BookSchema.path('name').validate(function(name) {
    return !!name;
}, 'name cannot be blank');*/

/*BookSchema.path('content').validate(function(content) {
    return !!content;
}, 'Content cannot be blank');*/

/**
 * Statics
 */
BookSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Book', BookSchema);
