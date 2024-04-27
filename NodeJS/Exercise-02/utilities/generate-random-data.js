const fs = require('fs').promises; 

const generateRandomData = async () => {
    try {
        
        let data = [];
        let uniqueID = new Set();
        while (uniqueID.size < 2000) {
            let randomID = Math.floor(Math.random() * 2000);
            if (!uniqueID.has(randomID)) {
                uniqueID.add(randomID);
                let user = {
                    _id: randomID,
                    name: `User ${uniqueID.size}`
                };
                data.push(user);
            }
        }
        data = {input: data};
        await fs.writeFile("./input.json", JSON.stringify(data)); 
        console.log("Random data generated");

    } catch (err) {
        console.log("Error in random data generation:", err);
    }

}
module.exports = { generateRandomData };
