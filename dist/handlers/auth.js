"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            var token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
            next();
        }
        else {
            res.status(401).json('Unauthorized: Missing Token');
        }
    }
    catch (error) {
        res.status(401).json("Access denied, invalid token: " + error);
    }
};
exports["default"] = verifyAuthToken;
