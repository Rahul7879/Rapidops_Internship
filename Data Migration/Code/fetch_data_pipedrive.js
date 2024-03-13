const apiKey = '3b5823b5a44d72c0959ffebf3b60d352b0a58686';
const apiUrl = 'https://api.pipedrive.com/v1';

async function fetchorganizationField() {
    const response = await fetch(`${apiUrl}/organizationFields?api_token=${apiKey}`);
    const data = await response.json();
    return data;
}

fetchorganizationField()
    .then(data => {
        console.log("orgainization Fields Data");
        console.log(data);
    })
    .catch(error => {
        console.error('Error while fetching  dealFields Data:', error);
    });
;

export default fetchorganizationField;