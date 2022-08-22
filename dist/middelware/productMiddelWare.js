"use strict";
exports.__esModule = true;
var productMiddelWare = function (req, res, next) {
    var _a = req.body, name = _a.name, price = _a.price;
    var error = null;
    if (name == null || price == null || isNaN(price) || name.length == 0) {
        error = 'invaild';
    }
    else {
        error = null;
    }
    if (error == null) {
        next();
    }
    else {
        res.status(401);
        res.json({ error: error });
        res.end();
    }
};
exports["default"] = productMiddelWare;
