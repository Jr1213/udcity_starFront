"use strict";
exports.__esModule = true;
var createUserVaildate = function (req, res, next) {
    //first name exist
    var errors = {
        firstName: null,
        lastName: null,
        password: null
    };
    if (!req.body.hasOwnProperty('firstName') || req.body.firstName.length == 0) {
        errors.firstName = 'invaild user first name';
    }
    //last name exist
    if (!req.body.hasOwnProperty('lastName') || req.body.lastName.length == 0) {
        errors.lastName = 'invaild user last name';
    }
    //password exist
    if (!req.body.hasOwnProperty('password') || req.body.password.length == 0) {
        errors.password = 'invaild password';
    }
    if (errors.firstName != null || errors.lastName != null || errors.password != null) {
        res.status(401);
        res.json(errors);
        res.end();
    }
    else {
        next();
    }
};
exports["default"] = createUserVaildate;
