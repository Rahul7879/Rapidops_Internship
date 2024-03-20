import Pages from "../model/pages.js";
import pageModel from "../model/pages.js"
import cloudinary from "../Routes/cloudinary.js"

const createPage = async (req, res) => {
        try {
            const newUser = new pageModel({
                email: req.body.email,
                title: req.body.title,
                subtitle: req.body.subTitle,
                body: req.body.body,
                url: req.body.url,
                publishDate: req.body.publishDate,
                isdraft: req.body.isDraft,
                ishide: req.body.isHide,
                status: req.body.status,
            });

            const result1 = await newUser.save();
            console.log(result1);
            res.status(200).json({ message: "Page saved successfully",id:result1.id });
        } catch (err) {
            console.log(err);
            res.status(501).json({ message: "Page not created", error: err.message });
        }
};


const updatePage = async (req, res) => {
    try {
        const pageId = req.body.id;
        const result = await pageModel.findByIdAndUpdate(
            pageId,
            {
                email: req.body.email,
                title: req.body.title,
                subtitle: req.body.subTitle,
                body: req.body.body,
                url: req.body.url,
                publishDate: req.body.publishDate,
                isDraft: req.body.isDraft,
                isHide: req.body.isHide,
                status: req.body.status,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!result) {
            return res.status(404).json({ message: "Page not found with the provided ID" });
        }
        res.status(200).json({ message: "Page updated successfully", page: result });

    } catch (err) {
        res.status(500).json({ message: "Error updating page", error: err.message });
    }
};

const getAllPages = async (req, res) => {
    try {
        const allPages = await Pages.find(); 
        return res.status(200).json({ msg: 'Received successfully', result: allPages });
    } catch (e) {
        return res.status(500).json({ error: e.message }); 
    }
};


// const createPage = async (req, res) => {

//     console.log("img===",req.file)
//     let path = req.file.path || 'none'
//     cloudinary.uploader.upload(path, async (err, result) => {
//         try {
//             console.log(result.secure_url);
//             const newUser = new pageModel({
//                 email: req.body.email,
//                 title: req.body.title,
//                 subtitle: req.body.subTitle,
//                 body: req.body.body,
//                 url: req.body.url,
//                 publishDate: req.body.publishDate,
//                 isdraft: req.body.isDraft,
//                 ishide: req.body.isHide,
//                 status: req.body.status,
//                 file: result.secure_url,
//             });

//             const result1 = await newUser.save();
//             console.log(result1);
//             res.status(200).json({ message: "Page saved successfully" });
//         } catch (err) {
//             console.log(err);
//             res.status(501).json({ message: "Page not created", error: err.message });
//         }
//     })
// };


export { createPage, updatePage, getAllPages };