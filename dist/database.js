"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB;
var ENV = process.env.ENV;
console.log(ENV);
// any till we choose if env is test or dev
var db;
if (ENV === 'test') {
    db = new pg_1.Pool({
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USER,
        database: POSTGRES_TEST_DB
    });
}
if (ENV === 'dev') {
    db = new pg_1.Pool({
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USER,
        database: POSTGRES_DB
    });
}
exports["default"] = db;
