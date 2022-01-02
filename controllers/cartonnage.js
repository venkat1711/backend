const Cartonnage = require('../models/cartonnage');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const cartonnage = new Cartonnage(req.body);
    cartonnage.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};

exports.cartonnageById = (req, res, next, id) => {
    Cartonnage.findById(id).exec((err, cartonnage) => {
        if (err || !cartonnage) {
            return res.status(400).json({
                error: 'cartonnage not found',
            });
        }
        req.cartonnage = cartonnage;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.cartonnage);
};

exports.remove = (req, res) => {
    let cartonnage = req.cartonnage;
    cartonnage.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            message: 'cartonnage deleted sucess',
        });
    });
};

exports.update = (req, res) => {
    const cartonnage = req.cartonnage;
    cartonnage.name = req.body.name;

    cartonnage.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'cartonnage not exist',
            });
        }
        res.json({ data });
    });
};

exports.list = (req, res) => {
    Cartonnage.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};
