import { createClient, RedisClientType } from "redis";

let client: RedisClientType;

const connect = async () => {
  client = (await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .on("connect", () => console.log("Redis Client Connected"))
    .connect()) as unknown as RedisClientType;
};

export { client, connect };
