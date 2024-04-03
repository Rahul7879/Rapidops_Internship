import dbcon from "../db/conn.js"

const getData = async (req,res)=>{
    try {
        const con = await dbcon();
        const [rows] = await con.query(`SELECT * FROM nodes`);
        res.status(200).json({ msg: 'Received successfully', result: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export default getData