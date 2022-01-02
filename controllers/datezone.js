const Datezone = require('../models/datezone');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const datezone = new Datezone(req.body);
  datezone.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'datezone not exist',
      });
    }
    res.json({ data });
  });
};

exports.datezoneById = (req, res, next, id) => {
  Datezone.findById(id).exec((err, datezone) => {
    if (err || !datezone) {
      return res.status(400).json({
        error: 'datezone not found',
      });
    }
    req.datezone = datezone;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.datezone);
};

exports.remove = (req, res) => {
  let datezone = req.datezone;
  datezone.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'datezone deleted sucess',
    });
  });
};

exports.update = (req, res) => {
  const datezone = req.datezone;
  datezone.name = req.body.name;

  datezone.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'datezone not exist',
      });
    }
    res.json({ data });
  });
};

exports.list = (req, res) => {
  Datezone.find().sort({ name: 1 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
