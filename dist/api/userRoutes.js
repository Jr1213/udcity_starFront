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
var express_1 = require("express");
var user_1 = require("../models/user");
var userMiddelware_1 = __importDefault(require("../middelware/userMiddelware"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtMiddelware_1 = __importDefault(require("../middelware/jwtMiddelware"));
var userRouter = (0, express_1.Router)();
//get users
userRouter.get("/users", jwtMiddelware_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userModel, reslt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userModel = new user_1.userStore();
                return [4 /*yield*/, userModel.index()];
            case 1:
                reslt = _a.sent();
                res.json(reslt);
                res.end();
                return [2 /*return*/];
        }
    });
}); });
//create user
userRouter.post("/user", [userMiddelware_1["default"], jwtMiddelware_1["default"]], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userModel, result, secret, jwt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userModel = new user_1.userStore();
                return [4 /*yield*/, userModel.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: req.body.password
                    })
                    //return response
                ];
            case 1:
                result = _a.sent();
                secret = process.env.TOKEN_SECRET;
                jwt = jsonwebtoken_1["default"].sign({ user: result[0] }, secret);
                res.json(jwt);
                res.end();
                return [2 /*return*/];
        }
    });
}); });
userRouter.get("/user/:id", jwtMiddelware_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userModel, id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userModel = new user_1.userStore();
                id = parseInt(req.params.id);
                return [4 /*yield*/, userModel.show(id)];
            case 1:
                result = _a.sent();
                res.json(result);
                res.end();
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = userRouter;
