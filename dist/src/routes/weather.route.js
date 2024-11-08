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
const weather_service_1 = require("@/services/weather.service");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/:location", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location } = req.params;
    const response = yield (0, weather_service_1.getWeather)(location);
    res.status(200).json(response);
}));
exports.default = router;
