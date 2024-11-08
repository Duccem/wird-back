import { client } from "@/config/cache";
import { locations } from "@/config/constants";
import { getWeather } from "./weather.service";

export async function setWeatherToCache(key: string, value: string) {
  return client.set(key, value, { EX: 300 });
}

export async function getWeatherCached(location: string) {
  const locationName = locations.find((loc) => loc.code === location)?.name;
  if (!locationName) {
    await setError("Location not found");
    throw new Error("Location not found");
  }
  const res = await client.get(locationName);
  if (res) {
    return JSON.parse(res);
  }
  return getWeather(location);
}

export async function setError(error: string) {
  return client.set(`error-${new Date().getTime()}`, error);
}
