import { deleteDataByAny } from "../../../../services/servicesOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "Request not found.." });
  }
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await deleteDataByAny("todo", { id: id });
      return res.status(200).json({ message: "Todo has been successfully deleted." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Wrong request." });
  }
}