const fs = require("fs").promises;
const ResponseHandler = require('../utilities/response.js');

const random1000Data = async (req, res) => {
    try {
        const fileContent = await fs.readFile("./input.json", "utf-8");
        let allUsersData = JSON.parse(fileContent).input;
        allUsersData.sort(() => Math.random() - 0.5);
        let random1000 = allUsersData.slice(0, 1000);
        let data = random1000;
        ResponseHandler.sendSuccess(res, data, 200);

    } catch (e) {
        let data = { msg: 'Error' };
        ResponseHandler.sendError(res, data, 500);
    }
};

const getUserById = async (req,res)=>{
    try {
        const fileContent = await fs.readFile("./input.json", "utf-8");
        const allUsersData = JSON.parse(fileContent).input;
        const user = allUsersData.find((user)=>user._id == req.params.id)

        if(user !== undefined){
            const data = user;
            ResponseHandler.sendSuccess(res, data, 200);
        }else{
            const data = { msg: 'User Not Found' };
            ResponseHandler.sendError(res, data, 404);
        }
    } catch (e) {
        let data = { msg: 'Error' };
        ResponseHandler.sendError(res, data, 500);
    };
}

const getFixedData = async (req, res) => {
    try {
        let fileContent = await fs.readFile("./input.json", "utf-8");
        let allUsersData = JSON.parse(fileContent).input;
        allUsersData.sort(() => Math.random() - 0.5);

        let random100 = allUsersData.slice(0, 100);
        let unique = new Set();
        random100 = random100.map((user, index) => {

            let randomID;
            do {
                randomID = Math.floor(Math.random() * 1000);
            } while (unique.has(randomID) || randomID === 0);
            unique.add(randomID);
            let uniquePos = randomID;
            if (index < 80) {
                return { _id: user._id, position: uniquePos };
            } else {
                let newUserId = 5000+randomID;
                return { _id: newUserId, position: uniquePos };
            }
        });

        ResponseHandler.sendSuccess(res, random100, 200);

    } catch (error) {
        let data = { msg: 'Error' };
        ResponseHandler.sendError(res, data, 500);
    }
};


module.exports = {random1000Data,getUserById,getFixedData}
