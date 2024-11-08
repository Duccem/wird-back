import { client } from "@/config/cache";

export async function setKey(key: string, value: string) {
  return client.set(key, value);
}

export async function getKey(key: string) {
  return client.get(key);
}