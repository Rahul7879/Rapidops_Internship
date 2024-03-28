import dbcon from "../db/conn.js";

const updatePage = async (req, res) => {
    try {
        const pageId = req.body.id;
        const conn = await dbcon();

        const query = `
            UPDATE pages 
            SET email = ?, title = ?, subtitle = ?, body = ?, url = ?, publishDate = ?, isDraft = ?, isHide = ?, status = ?
            WHERE id = ?
        `;
        const values = [
            req.body.email,
            req.body.title,
            req.body.subTitle,
            req.body.body,
            req.body.url,
            req.body.publishDate,
            req.body.isDraft,
            req.body.isHide,
            req.body.status,
            pageId
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

export default updatePage;