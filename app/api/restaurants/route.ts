// /app/api/restaurants/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { neighborhoods, noiseLevelMin, noiseLevelMax, cuisine } = req.query;

  const restaurants = await db.restaurant.findMany({
    where: {
      neighborhood: neighborhoods ? { in: neighborhoods } : undefined,
      noiseLevel: {
        gte: parseInt(noiseLevelMin as string),
        lte: parseInt(noiseLevelMax as string)
      },
      cuisine_type: cuisine ? cuisine : undefined
    },
    include: {
      reviews: true // or use an average function if we calculate noise dynamically
    }
  });

  res.status(200).json(restaurants);
}
