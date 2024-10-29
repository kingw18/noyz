// /app/api/reviews/[restaurantId].ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId } = req.query;

  const reviews = await db.review.findMany({
    where: {
      restaurant_id: restaurantId as string
    },
    orderBy: {
      review_timestamp: "desc"
    }
  });

  res.status(200).json(reviews);
}
