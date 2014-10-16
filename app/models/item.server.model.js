'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Item Schema
 */
var ItemSchema = new Schema({
	category: {
		type: String,
		default: '',
		required: 'Please select a category'
	},
	itemName: {
		type: String,
		default: '',
		required: 'Please fill item name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	itemQuantity: {
		type: Number,
		default: 0,
		required: 'Please fill item quantity'
	},
	minItemQuantity: {
		type: Number,
		default: 0,
		required: 'Please fill the minimum item quantity you wish to have'
	},
	addedQuantity: {
		type: Number,
		default: 0,
	},
	soldQuantity: {
		type: Number,
		default: 0
	},
	q: {
		type: String,
		default: '',
		trim: true
	},
	modified: {
		type: Date,
		default: Date.now
	},
	initialItemQuantity: {
		type: Number,
		default: 0
	}
});

mongoose.model('Item', ItemSchema);