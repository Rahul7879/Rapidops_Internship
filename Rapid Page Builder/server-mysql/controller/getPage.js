import dbcon from "../db/conn.js";

const getPage = async (req, res) => {
    try {
        const conn = await dbcon();
        const query = 'SELECT * FROM pages WHERE email = ?';
        const [results] = await conn.query(query, [req.body.email]);

        if (results.length === 0) {
            return res.status(204).json({ message: "No Data" });
        } else {
            return res.status(200).json(results);
        }
    } catch (e) {
        return res.status(500).json({ message: "Server error", e: e.message });
    }
};
 
export { getPage };

