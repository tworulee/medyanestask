import { createNewData } from "../../../../services/servicesOperations";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "Request not found." });
  }

  if (req.method === "POST") {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: "Please fill in the required fields",
        });
      }
      const data = req.body;
      const todo = await createNewData("todo", data);

      return res.status(200).json({  
        success: true,
        message: " successful todo insertion",
        data: todo,
      });
    } catch (error) {
      return res.status(500).json({
        status: error.status || 500,
        error: error.message || "There's been a mistake.",
      });
    }
  } else {
    return res.status(500).json({ error: "Wrong request." });
  }
};

export default handler;
