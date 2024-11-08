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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const redis_service_1 = require("./redis.service");
const getWeather = (location) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const API_KEY = process.env.API_KEY;
    try {
        const locationName = (_a = locations.find((loc) => loc.code === location)) === null || _a === void 0 ? void 0 : _a.name;
        if (!locationName) {
            throw new Error("Location not found");
        }
        if (Math.random() < 0.2) {
            throw new Error("The api request failed");
        }
        const cacheData = yield (0, redis_service_1.getKey)(locationName);
        if (cacheData) {
            return JSON.parse(cacheData);
        }
        const response = yield axios_1.default.get(`https://api.tomorrow.io/v4/weather/realtime?location=${locationName}&apikey=${API_KEY}`);
        const data = Object.assign(Object.assign({}, response.data.data.values), { time: response.data.data.time, location: response.data.location });
        yield (0, redis_service_1.setKey)(locationName, JSON.stringify(data));
        return data;
    }
    catch (error) {
        if (error.message === "The api request failed") {
            console.log("retrying api call on error");
            return yield (0, exports.getWeather)(location);
        }
        throw error;
    }
});
exports.getWeather = getWeather;
const locations = [
    { name: "Santiago de chile", code: "santiago" },
    { name: "London", code: "london" },
    { name: "Zurich", code: "zurich" },
    { name: "Auckland new zeland", code: "auckland" },
    { name: "Sidney australia", code: "sidney" },
    { name: "Georgia usa", code: "georgia" },
];
