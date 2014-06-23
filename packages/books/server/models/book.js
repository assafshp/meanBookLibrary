'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Counter Schema
 */
var CounterSchema = new Schema({
    seq: {
        type: Number

    }
});




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
        default:'0',
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
 * Pre-save hook
 */
BookSchema.pre('save', function (next) {
    //if (this.isNew && this.provider === 'local' && this.password && !this.password.length)
    //    return next(new Error('Invalid password'));
    var self = this;
    //console.log('here');
    console.log('serial=' + self.serial);
    if (self.serial !== 0) {
        return next();
    }
    
    mongoose.models.Counter.findOne(function (err, counter) {
        if (err) {
            console.log(err);
            return next(err);
        }
        else {

            //console.log('here2');
            var query = { count: 1 };
            var seq = counter.seq;
            seq = seq + 1;
            console.log('new book serial: ' + seq);
            mongoose.models.Counter.findOneAndUpdate(query,  { seq: seq }, function (err, res) {
                if (err) {
                    console.log(err);
                    return next(err);
                } else {
                    //console.log('here5');
                    self.serial = res.seq;
                    next();
                }

            });


        }
    });
   
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
mongoose.model('Counter', CounterSchema);
