// /app/api/restaurants/search.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;

  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: name as string,
        mode: "insensitive",
      },
    },
  });

  res.status(200).json(restaurants);
}
