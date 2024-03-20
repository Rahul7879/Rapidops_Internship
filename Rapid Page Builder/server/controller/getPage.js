import pageModel from "../model/pages.js";


const getPage = async (req, res) => {
    try {
        const result = await pageModel.find({ email: req.body.email });
        if (result.length === 0) {
            return res.status(204).json({ message: "No Data" });
        } else {
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(500).json({ message: "Server error", e: e.message });
    }
};
 

export { getPage };


// const getPage = (req, res) => {
//     pageModel.find({ email: req.body.email }) 
//     .then((result) => {
//         if (result.length === 0) {
//             res.send({ code: 404, message: "User not found with the specified email." });
//         } else {
//             res.send(result);
//         }
//     })
//     .catch((err) => {
//         res.status(500).send({ code: 500, message: "Server error" });
//     });
// };

// export { getPage };
