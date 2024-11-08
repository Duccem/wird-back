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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWeatherToCache = setWeatherToCache;
exports.getWeatherCached = getWeatherCached;
exports.setError = setError;
const cache_1 = require("@/config/cache");
const constants_1 = require("@/config/constants");
const weather_service_1 = require("./weather.service");
function setWeatherToCache(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        return cache_1.client.set(key, value, { EX: 300 });
    });
}
function getWeatherCached(location) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const locationName = (_a = constants_1.locations.find((loc) => loc.code === location)) === null || _a === void 0 ? void 0 : _a.name;
        if (!locationName) {
            yield setError("Location not found");
            throw new Error("Location not found");
        }
        const res = yield cache_1.client.get(locationName);
        if (res) {
            return JSON.parse(res);
        }
        return (0, weather_service_1.getWeather)(location);
    });
}
function setError(error) {
    return __awaiter(this, void 0, void 0, function* () {
        return cache_1.client.set(`error-${new Date().getTime()}`, error);
    });
}
