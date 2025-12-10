import { api } from "encore.dev/api";
import db from "../db";
import type { Order } from "./create";

export interface UpdateOrderStatusRequest {
  order_id: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export const updateStatus = api(
  { method: "POST", path: "/orders/:order_id/status", expose: true, auth: true },
  async (req: UpdateOrderStatusRequest): Promise<Order> => {
    const order = await db.queryRow<Order>`
      UPDATE orders 
      SET status = ${req.status}
      WHERE id = ${req.order_id}
      RETURNING *
    `;

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }
);
