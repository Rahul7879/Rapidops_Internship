import uploadOnCloudinary from '../Routes/cloudinary.js';
import dbcon from '../db/conn.js';

const createPage = async (req, res) => {
    let cPath;
    try {
        if (req.file) {
            const localPath = req.file.path;
            cPath = await uploadOnCloudinary(localPath);
        } else {
            cPath = {
                url: "http://res.cloudinary.com/daosgxxc3/image/upload/v1711089134/atpm86r98adzg6npxx8k.jpg"
            };
        }
        console.log(req.body, req.file);
        const conn = await dbcon();
        const query = `INSERT INTO pages (email,title, subtitle, body, url, publishDate,isHide,isDraft, status, file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await conn.execute(query, [req.body.email, req.body.title, req.body.subTitle, req.body.body, req.body.url, req.body.publishDate, "true", "false", req.body.status, cPath.url]);

        res.status(200).json({ message: "Page saved successfully", id: result.insertId });
    } catch (err) {
        console.log(err);
        res.status(501).json({ message: "Page not created", error: err.message });
    }
};

const updatePage = async (req, res) => {
    try {
        const conn = await dbcon();
        const query = `UPDATE pages SET email=?, title=?, subtitle=?, body=?, url=?, publishDate=?, isDraft=?, isHide=?, status=? WHERE _id=?`;
        const [result] = await conn.execute(query, [req.body.email, req.body.title, req.body.subTitle, req.body.body, req.body.url, req.body.publishDate, req.body.isDraft, req.body.isHide, req.body.status, req.body.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Page not found with the provided ID" });
        }
        res.status(200).json({ message: "Page updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating page", error: err.message });
    }
};

const getAllPages = async (req, res) => {
    try {
        const conn = await dbcon();
        const [rows] = await conn.query(`SELECT * FROM pages`);
        res.status(200).json({ msg: 'Received successfully', result: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { createPage, updatePage, getAllPages };
