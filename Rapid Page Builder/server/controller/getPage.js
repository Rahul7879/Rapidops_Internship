const getPage = (req, res) => {
    userModel.findMany({ email: req.body.email })
    .then(async (result) => {
        if (!result) {
             res.send({ code: 501, message: "User not found" });
        }
        console.log(res);
    }).catch((err) => {
        console.error(err); // It's a good practice to log the error for debugging.
        res.status(500).send({ code: 501, message: "Server error" });
    });  
}

export { getPage}