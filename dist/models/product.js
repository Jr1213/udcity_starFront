"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    //index
    async index() {
        try {
            const conn = await database_1.default.connect();
            const query = 'SELECT * FROM products;';
            const result = conn.query(query);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`error happend : ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const query = 'SELECT * FROM products Where id = $1';
            const result = conn.query(query, [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`error happend : ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
