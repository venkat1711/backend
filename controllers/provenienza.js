const Provenienza = require('../models/provenienza');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const provenienza = new Provenienza(req.body);
  provenienza.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'provenienza not exist',
      });
    }
    res.json({ data });
  });
};

exports.provenienzaById = (req, res, next, id) => {
  Provenienza.findById(id).exec((err, provenienza) => {
    if (err || !provenienza) {
      return res.status(400).json({
        error: 'provenienza not found',
      });
    }
    req.provenienza = provenienza;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.provenienza);
};

exports.remove = (req, res) => {
  let provenienza = req.provenienza;
  provenienza.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'provenienza deleted sucess',
    });
  });
};

exports.update = (req, res) => {
  const provenienza = req.provenienza;
  provenienza.name = req.body.name;

  provenienza.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'provenienza not exist',
      });
    }
    res.json({ data });
  });
};

exports.list = (req, res) => {
  Provenienza.find().sort({ name: 1 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
