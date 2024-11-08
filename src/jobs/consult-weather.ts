import { locations } from "@/config/constants";
import { setError } from "@/services/redis.service";
import { getWeather } from "@/services/weather.service";
import cron from "node-cron";

async function consultWeather() {
  for (const location of locations) {
    try {
      await getWeather(location.name);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    }
  }
}

cron.schedule("*/5 * * * *", consultWeather);
