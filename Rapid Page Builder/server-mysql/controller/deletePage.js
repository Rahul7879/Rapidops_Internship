import dbcon from "../db/conn.js";

const deletePage = async (req, res) => {
  try {
    const conn = await dbcon();
    console.log(req.params.id);
    const [result] = await conn.execute('DELETE FROM pages WHERE _id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No page found with the provided ID." });
    }
    return res.json({ message: "Page successfully deleted." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error deleting page", error: e.message });
  }
};

export default deletePage;
