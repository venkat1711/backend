const _ = require('lodash');
const RegisterPost = require('../models/registerpost');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.registerpostById = (req, res, next, id) => {
    RegisterPost.findById(id)
        .populate('userId', '_id username')
        .populate('allpostId', '_id inventory author bookform editiondata fragment genre material provenance acquisition cartonnage dimension')
        .exec((err, registerpost) => {
            if (err || !registerpost) {
                return res.status(400).json({
                    error: 'registerpost not found',
                });
            }
            req.registerpost = registerpost;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.registerpost);
};

exports.create = (req, res) => {
    // console.log(req.body);
    const registerpost = new RegisterPost(req.body);
    registerpost.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    let registerpost = req.registerpost;
    registerpost.remove((err, deletedregisterpost) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            message: 'registerpost deleted sucess',
        });
    });
};

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found',
            });
        }
        req.profile = user;
        next();
    });
};

// find registerpost based on the userId
exports.registerpostListByUserId = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    RegisterPost.find({
        userId: req.profile,
    })
        .select('-check')
        .sort([[sortBy, order]])
        .populate('userId', '_id username')
        .populate('allpostId', '_id inventory author bookform editiondata fragment genre material provenance acquisition cartonnage dimension')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'registerpost not found',
                });
            }
            res.json(data);
        });
};
