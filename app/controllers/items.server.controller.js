'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Item = mongoose.model('Item'),
	Log = mongoose.model('Log'),
	_ = require('lodash');

/**
 * Create a Item
 */
exports.create = function(req, res) {
	var item = new Item(req.body);
	item.user = req.user;

	item.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(item);
		}
	});
};

/**
 * Show the current Item
 */
exports.read = function(req, res) {
	res.jsonp(req.item);
};

/**
 * Update a Item
 */
exports.update = function(req, res) {
	
	var item = req.item ;

	item = _.extend(item , req.body);
	item.modified = Date.now();
	
	item.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var log = new Log({
				action: 'sell',
				quantityAdded: req.body.newAdd,
				quantitySold: req.body.itemQty
			});
			log.item = req.item;
			log.save(function(err) {
				if (err){
					return res.status(400).send({
						message:errorHandler.getErrorMessage(err)
					});
				}
				else {
						res.jsonp(item);
					}
			});
			//res.jsonp(item);
		}
	});
};

/**
 * Delete an Item
 */
exports.delete = function(req, res) {
	var item = req.item ;

	item.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(item);
		}
	});
};

/**
 * List of Items
 */
exports.list = function(req, res) { Item.find().sort('-created').populate('user', 'displayName').exec(function(err, items) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(items);
		}
	});
};

/**
 * Item middleware
 */
exports.itemByID = function(req, res, next, id) { Item.findById(id).populate('user', 'displayName').exec(function(err, item) {
		if (err) return next(err);
		if (! item) return next(new Error('Failed to load Item ' + id));
		req.item = item ;
		next();
	});
};

/**
 * Item authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.item.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

function fixDate(i) {
	i = i.toString();
	i = i.length===1?'0'+i:i;
	return i;
};

exports.reportList = function(req, res) { 
	
	var d  = new Date();
	var today = d.getFullYear() + '-' + fixDate(d.getMonth() + 1) + '-' + fixDate(d.getDate()); 
	today = new Date(today);
	var dateexp = new RegExp(today,'i');
	console.log(today, dateexp,'user');
	
	Item.find({modified:{$gt:today},user:req.user}).exec(function(err,items){

		console.log(items);
		if(err) {			
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else 
			return res.jsonp(items);

		
	});
};

