const Author = require('../models/author');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const author = new Author(req.body);
    author.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};

exports.authorById = (req, res, next, id) => {
    Author.findById(id).exec((err, author) => {
        if (err || !author) {
            return res.status(400).json({
                error: 'author not found',
            });
        }
        req.author = author;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.author);
};

exports.remove = (req, res) => {
    let author = req.author;
    author.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            message: 'author deleted sucess',
        });
    });
};

exports.update = (req, res) => {
    const author = req.author;
    author.name = req.body.name;

    author.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'author not exist',
            });
        }
        res.json({ data });
    });
};

exports.list = (req, res) => {
    Author.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};
