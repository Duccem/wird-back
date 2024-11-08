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
const constants_1 = require("@/config/constants");
const redis_service_1 = require("@/services/redis.service");
const weather_service_1 = require("@/services/weather.service");
const node_cron_1 = __importDefault(require("node-cron"));
function consultWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const location of constants_1.locations) {
            try {
                yield (0, weather_service_1.getWeather)(location.name);
            }
            catch (error) {
                console.error(error);
                (0, redis_service_1.setError)(error.message);
            }
        }
    });
}
node_cron_1.default.schedule("*/5 * * * *", consultWeather);