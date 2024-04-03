import dbcon from "../db/conn.js";

const updateNode = async (req, res) => {
    try {
        console.log(req.body);
        const nodeId = req.body.id;
        const conn = await dbcon();

        const query = `
            UPDATE nodes SET parentnodeId = ? WHERE id = ?
        `;
        const values = [
            req.body.parentID,
            nodeId
        ];

        const [result] = await conn.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Page not found with the provided ID" });
        }
        res.status(200).json({ message: "Page updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating page", error: err.message });
    }
};

export default updateNode;