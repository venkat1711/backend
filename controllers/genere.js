const Genere = require('../models/genere');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const genere = new Genere(req.body);
  genere.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.genereById = (req, res, next, id) => {
  Genere.findById(id).exec((err, genere) => {
    if (err || !genere) {
      return res.status(400).json({
        error: 'genere not found',
      });
    }
    req.genere = genere;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.genere);
};

exports.remove = (req, res) => {
  let genere = req.genere;
  genere.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'genere deleted sucess',
    });
  });
};

exports.update = (req, res) => {
  const genere = req.genere;
  genere.name = req.body.name;

  genere.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'genere not exist',
      });
    }
    res.json({ data });
  });
};

exports.list = (req, res) => {
  Genere.find().sort({ name: 1 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
