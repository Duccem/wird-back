import { getWeather } from "@/services/weather.service";
import { Router } from "express";

const router = Router();

router.get("/:location", async (req, res) => {
  const { location } = req.params;
  const response = await getWeather(location);

  res.status(200).json(response);
});

export default router;
