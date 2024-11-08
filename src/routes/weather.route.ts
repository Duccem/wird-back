import { getWeather } from "@/services/weather.service";
import { Router } from "express";

const router = Router();

router.get("/:location", async (req, res) => {
  const { location } = req.params;
  let response;
  try {
    response = await getWeather(location);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
