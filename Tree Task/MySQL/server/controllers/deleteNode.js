import dbcon from "../db/conn.js"

const deleteNode = async (req,res)=>{
    try {
        const conn = await dbcon();
        console.log(req.params.id),"hello";
        const [result] = await conn.execute('DELETE FROM nodes WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "No page found with the provided ID." });
        }
        return res.json({ message: "Page successfully deleted" });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Error deleting page", error: e.message });
      }
}
export default deleteNode