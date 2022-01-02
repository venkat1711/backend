const Fragment = require('../models/fragment');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const fragment = new Fragment(req.body);
    fragment.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};

exports.fragmentById = (req, res, next, id) => {
    Fragment.findById(id).exec((err, fragment) => {
        if (err || !fragment) {
            return res.status(400).json({
                error: 'fragment not found',
            });
        }
        req.fragment = fragment;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.fragment);
};

exports.remove = (req, res) => {
    let fragment = req.fragment;
    fragment.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            message: 'fragment deleted sucess',
        });
    });
};

exports.update = (req, res) => {
    const fragment = req.fragment;
    fragment.name = req.body.name;

    fragment.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'fragment not exist',
            });
        }
        res.json({ data });
    });
};

exports.list = (req, res) => {
    Fragment.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};
