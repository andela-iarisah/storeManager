'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Log = mongoose.model('Log'),
	_ = require('lodash');