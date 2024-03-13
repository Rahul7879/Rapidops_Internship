import fetchorganizationField from './fetch_data_pipedrive.js';
import fetchDealsSalesmate from './fetch_data_salesmate.js';

let salesMateFields = await fetchDealsSalesmate();
let data = await fetchorganizationField();

let pipeDrive = document.getElementById("pipeDrive");

let dropdown = document.getElementsByClassName("form-select")[0];
let count = 0;
salesMateFields.Data.company.forEach((val) => {
    let option = document.createElement("option");
    option.innerHTML = val.fieldName;
    option.value = count++;
    dropdown.append(option);
});

data.data.forEach(d => {
    let rowDiv = document.createElement("div");
    rowDiv.className = "input-group field-row";

    let pipeInput = document.createElement("input");
    pipeInput.setAttribute("type", "text");
    pipeInput.className = "form-control";
    pipeInput.value = d.name;

    let salesDropdown = dropdown.cloneNode(true);
    salesDropdown.className = "form-select";

    rowDiv.append(pipeInput);
    rowDiv.append(salesDropdown);

    pipeDrive.append(rowDiv);
});




