/**
 * Created by user on 20/9/15.
 */
"use strict"


var store        = require('../common/store');

exports.upload = (req, res, next) => {
    req.busboy.on('file', (fieldname, file, filename) => {
        store.upload(file, {filename: filename}, (err, result) => {
            if (err) {
                return next(err);
            }
            res.json({
                success: true,
                url: result.url,
                title: req.body.pictitle,
                original: filename,
                state: 'SUCCESS'
            });

        });
    });

    req.pipe(req.busboy);
};

exports.ueditorUpload = (req, res, next) => {
    req.busboy.on('file', (fieldname, file, filename) => {
        store.upload(file, {filename: filename}, (err, result) => {
            if (err) {
                return next(err);
            }
            res.send({
                success: true,
                url: result.url,
                title: req.body.pictitle,
                original: filename,
                state: 'SUCCESS'
            });

        });
    });

    req.pipe(req.busboy);
};
