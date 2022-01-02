const Bookform = require('../models/bookform');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const bookform = new Bookform(req.body);
    bookform.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};

exports.bookformById = (req, res, next, id) => {
    Bookform.findById(id).exec((err, bookform) => {
        if (err || !bookform) {
            return res.status(400).json({
                error: 'bookform not found',
            });
        }
        req.bookform = bookform;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.bookform);
};

exports.remove = (req, res) => {
    let bookform = req.bookform;
    bookform.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            message: 'bookform deleted sucess',
        });
    });
};

exports.update = (req, res) => {
    const bookform = req.bookform;
    bookform.name = req.body.name;

    bookform.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'bookform not exist',
            });
        }
        res.json({ data });
    });
};

exports.list = (req, res) => {
    Bookform.find().sort({ name: 1 }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};
