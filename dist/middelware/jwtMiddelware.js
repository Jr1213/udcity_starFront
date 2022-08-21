"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtMiddelWare = function (req, res, next) {
    var secret = process.env.TOKEN_SECRET;
    try {
        jsonwebtoken_1["default"].verify(req.headers.token, secret);
        next();
    }
    catch (err) {
        res.json({ error: "invilad token ".concat(err) });
        res.end();
        return;
    }
};
exports["default"] = jwtMiddelWare;
