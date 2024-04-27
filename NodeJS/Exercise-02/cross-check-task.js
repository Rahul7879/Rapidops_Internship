const fs = require("fs").promises;
const axios = require("axios");

async function crossCheckTask() {
  try {
    const allDataResponse = await axios.get('http://localhost:8000/data/all');
    let allData = allDataResponse.data.data;

    const fixedDataResponse = await axios.get("http://localhost:8000/data/fixed");
    const fixedData = fixedDataResponse.data.data;

    const userPromises = fixedData.map(item => callUserById(item._id, item.position));
    let users = await Promise.all(userPromises);
    users = users.filter(user => user !== null);

    users.sort((a, b) => a.position - b.position);

    let removableIndices = [];

    users.forEach(user => {
      const existingIndex = allData.findIndex(data => data._id === user._id);
      if (existingIndex !== -1) {
        removableIndices.push(existingIndex);
      }
    });

    removableIndices.sort((a, b) => b - a);
    removableIndices.forEach(index => allData.splice(index, 1));
    

    users.forEach(user => {
      const index = user.position - 1;
      if (index >= allData.length) {
        allData.push(user);
      } else {
        allData.splice(index, 0, user);
      }
    });
    checkUserPositions(allData);
    allData = {
      output:allData
    }

    await fs.writeFile("./output.json", JSON.stringify(allData, null, 2));
    console.log("File written successfully");
  } catch (error) {
    console.error("Error during task execution:", error);
  }
}


async function callUserById(id, position) {
  try {
    const userResponse = await axios.get(`http://localhost:8000/data/_id/${id}`);
    let userData = userResponse.data.data;
    userData.position = position;
    return userData;
  } catch (error) {
    return null;
  }
}

crossCheckTask()

function checkUserPositions(users) {
  users.forEach((user, index) => {
      if (user.position !== undefined) {
          const expectedIndex = user.position - 1; 
          if (expectedIndex !== index) {
              console.log(`Position mismatch for user ID ${user._id}: Expected index ${expectedIndex}, found at index ${index}`);
          }
      }
  });
}