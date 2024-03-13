const apiKeySalesmate = '13fd4900-db7f-11ee-ba7b-67eadf4debce';
const apiUrlSalesmate = 'dumy.salesmate.io';

 export default async function fetchDealsSalesmate() {
    const response = await fetch(`https://${apiUrlSalesmate}/apis/module/v4/fields/all-visible-fields`, {
        headers: {
            'accessToken': `${apiKeySalesmate}`,
            'Content-Type': 'application/json',
            'x-linkname': `${apiUrlSalesmate}`
        }
    });
    const data = await response.json();
    return data;
}

fetchDealsSalesmate()
    .then(data => {
        console.log("All Visible Fields Salesmate");
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching deals:', error);
    });