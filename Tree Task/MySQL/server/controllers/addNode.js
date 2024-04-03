import dbcon from "../db/conn.js"

const addNode = async (req,res)=>{
    try {
        console.log(req.body);
        const conn = await dbcon();
        const query = `INSERT INTO nodes (id,name, parentnodeId) VALUES (?,?,?)`;
        const [result] = await conn.execute(query, [req.body.id,req.body.nodeName,req.body.parentID]);
        res.status(200).json({ message: "Node Created successfully", id: result.insertId });

    } catch (err) {
        console.log(err);
        res.status(501).json({ message: "Page not created", error: err.message });
    }
}
export default addNode