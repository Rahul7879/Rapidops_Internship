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

        console.log(result);
        res.status(200).json({ message: "Page updated successfully", page: result });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating page", error: err.message });
    }
};
