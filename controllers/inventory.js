const Inventory = require('../models/inventory');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const inventory = new Inventory(req.body);
    inventory.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};

exports.inventoryById = (req, res, next, id) => {
    Inventory.findById(id).exec((err, inventory) => {
        if (err || !inventory) {
            return res.status(400).json({
                error: 'inventory not found',
            });
        }
        req.inventory = inventory;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.inventory);
};

exports.remove = (req, res) => {
    let inventory = req.inventory;
    inventory.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            message: 'inventory deleted sucess',
        });
    });
};

exports.update = (req, res) => {
    const inventory = req.inventory;
    inventory.name = req.body.name;

    inventory.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'inventory not exist',
            });
        }
        res.json({ data });
    });
};

exports.list = (req, res) => {
    Inventory.find().sort({ name: 1 }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};
