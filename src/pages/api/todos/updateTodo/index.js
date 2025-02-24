import { updateDataByAny } from "../../../../services/servicesOperations";

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { title, content } = req.body;

    if (!id || !title || !content) {
      return res.status(400).json({
        success: false,
        error: "Please fill in the required fields"
      });
    }

    const updatedTodo = await updateDataByAny("todo", 
      { id: id },
      { title, content }
    );

    if (updatedTodo.error) {
      throw new Error(updatedTodo.error);
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated",
      data: updatedTodo
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export default handler;