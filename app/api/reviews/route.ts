// /app/api/reviews/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId, noiseLevel, reviewTimestamp } = req.body;

  if (!restaurantId || !noiseLevel) {
    return res.status(400).json({ error: "Restaurant ID and noise level are required." });
  }

  const review = await db.review.create({
    data: {
      restaurant_id: restaurantId,
      noise_level: noiseLevel,
      review_timestamp: reviewTimestamp ? new Date(reviewTimestamp) : new Date()
    }
  });

  res.status(201).json(review);
}
