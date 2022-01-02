const Material = require('../models/material');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const material = new Material(req.body);
  material.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'material not exist',
      });
    }
    res.json({ data });
  });
};

exports.materialById = (req, res, next, id) => {
  Material.findById(id).exec((err, material) => {
    if (err || !material) {
      return res.status(400).json({
        error: 'material not found',
      });
    }
    req.material = material;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.material);
};

exports.remove = (req, res) => {
  let material = req.material;
  material.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'material deleted sucess',
    });
  });
};

exports.update = (req, res) => {
  const material = req.material;
  material.name = req.body.name;

  material.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'material not exist',
      });
    }
    res.json({ data });
  });
};

exports.list = (req, res) => {
  Material.find().sort({ name: 1 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
