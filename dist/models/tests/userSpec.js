"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const userModel = new user_1.userStore();
describe("user model tests", () => {
    it("should have index method", () => {
        expect(userModel.index()).toBeDefined();
    });
    it('index method should return list of users', async () => {
        const res = await userModel.index();
        expect(res).toEqual([]);
    });
    it("should have method create", () => {
        const userFakeInfo = {
            firstName: "mohammed",
            lastName: "hammad"
        };
        expect(userModel.create(userFakeInfo)).toBeDefined();
    });
    it("should add new user", async () => {
        const userFakeInfo = {
            firstName: "mohammed",
            lastName: "hammad",
            id: 1
        };
        const res = await userModel.create(userFakeInfo);
        console.log(res);
        // expect(res).toEqual(userFakeInfo)
    });
});
