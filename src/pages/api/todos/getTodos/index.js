import { getAllData } from "../../../../services/servicesOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "Request not found." });
  }
  if (req.method === "GET") {
    try {
      const data = await getAllData("todo");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Wrong request." });
  }
}