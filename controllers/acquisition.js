const Acquisition = require('../models/acquisition');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const acquisition = new Acquisition(req.body);
    acquisition.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};

exports.acquisitionById = (req, res, next, id) => {
    Acquisition.findById(id).exec((err, acquisition) => {
        if (err || !acquisition) {
            return res.status(400).json({
                error: 'acquisition not found',
            });
        }
        req.acquisition = acquisition;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.acquisition);
};

exports.remove = (req, res) => {
    let acquisition = req.acquisition;
    acquisition.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            message: 'acquisition deleted sucess',
        });
    });
};

exports.update = (req, res) => {
    const acquisition = req.acquisition;
    acquisition.name = req.body.name;

    acquisition.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'acquisition not exist',
            });
        }
        res.json({ data });
    });
};

exports.list = (req, res) => {
    Acquisition.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};
