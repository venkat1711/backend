const Dimension = require('../models/dimension');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const dimension = new Dimension(req.body);
    dimension.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};

exports.dimensionById = (req, res, next, id) => {
    Dimension.findById(id).exec((err, dimension) => {
        if (err || !dimension) {
            return res.status(400).json({
                error: 'dimension not found',
            });
        }
        req.dimension = dimension;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.dimension);
};

exports.remove = (req, res) => {
    let dimension = req.dimension;
    dimension.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            message: 'dimension deleted sucess',
        });
    });
};

exports.update = (req, res) => {
    const dimension = req.dimension;
    dimension.name = req.body.name;

    dimension.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'dimension not exist',
            });
        }
        res.json({ data });
    });
};

exports.list = (req, res) => {
    Dimension.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};
