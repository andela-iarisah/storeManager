'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Log Schema
 */

 	var LogSchema = new Schema ({
	action : {
		type: String,
		default: 'restock',
	},
	item: {
		type: Schema.ObjectId,
		ref: 'Item'
	},
	quantityAdded: {
		type: Number,
		default: 0,
	},
	quantitySold: {
		type: Number,
		default: 0
	},
	created: {
		type: Date,
		default: Date.now
	}
});

 mongoose.model('Log', LogSchema);