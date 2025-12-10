import { api } from "encore.dev/api";
import db from "../db";
import type { Order } from "./create";

export const list = api(
  { method: "GET", path: "/orders", expose: true, auth: true },
  async (): Promise<{ orders: Order[] }> => {
    const result = [];
    for await (const order of db.query<Order>`
      SELECT * FROM orders 
      ORDER BY created_at DESC
    `) {
      result.push(order);
    }

    return { orders: result };
  }
);
