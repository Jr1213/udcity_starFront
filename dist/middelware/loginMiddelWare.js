"use strict";
exports.__esModule = true;
var loginMiddelWare = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        res.status(401);
        res.json({
            error: "plase enter email and password"
        });
        res.end();
    }
    else {
        next();
    }
};
exports["default"] = loginMiddelWare;
