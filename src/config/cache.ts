import { createClient, RedisClientType } from "redis";

let client: RedisClientType;

const connect = async () => {
  client = (await createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .on("connect", () => console.log("Redis Client Connected"))
    .connect()) as unknown as RedisClientType;
};

export { client, connect };
