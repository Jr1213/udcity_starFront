"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.userStore = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var userStore = /** @class */ (function () {
    function userStore() {
    }
    //show all users
    userStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, reslt, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'SELECT * FROM users;';
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        reslt = _a.sent();
                        conn.release();
                        return [2 /*return*/, reslt.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("faild to connect to database : ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //create user 
    userStore.prototype.create = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, pepper, soldRound, hashed, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        query = "INSERT INTO users (firstname, lastname, password, email) VALUES ($1, $2, $3,$4);";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        pepper = process.env.BCRYPT_PASSWORD;
                        soldRound = process.env.SALT_ROUNDS;
                        hashed = bcrypt_1["default"].hashSync(info.password + pepper, parseInt(soldRound));
                        return [4 /*yield*/, conn.query(query, [info.firstName, info.lastName, hashed, info.email])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, ["new user has been added", true]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("unexpected error happend : ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // show user by id 
    userStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, qurey, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        qurey = 'SELECT * FROM users WHERE id = $1;';
                        return [4 /*yield*/, conn.query(qurey, [id])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("unexpected error happend : ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //login with user
    userStore.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, data, pepper, check, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'SELECT * FROM users WHERE email = $1';
                        return [4 /*yield*/, conn.query(query, [email])];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        data = [false, 'invlaild email or password'];
                        pepper = process.env.BCRYPT_PASSWORD;
                        check = bcrypt_1["default"].compareSync(password + pepper, result.rows[0].password);
                        if (result.rowCount == 0) {
                            data = [false, 'invlaild email or password'];
                        }
                        if (check == true) {
                            data = [check, result.rows[0]];
                        }
                        else {
                            [check, 'invlaild email or password'];
                        }
                        return [2 /*return*/, data];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, [false, 'invlaild email or password']];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return userStore;
}());
exports.userStore = userStore;
