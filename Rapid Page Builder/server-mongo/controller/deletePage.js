import Pages from "../model/pages.js";

const deletePage = async (req, res) => {
try {
    const result = await Pages.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "No user found with the provided ID." });
    }
    return res.json({ message: "User successfully deleted." });
    }catch (e) {
    if (e.name === "CastError") {
        return res.status(400).json({ message: "Invalid user ID format." });
    }
    return res.status(500).json({ message: "Error deleting user", error: e.message });
}
};

export default deletePage