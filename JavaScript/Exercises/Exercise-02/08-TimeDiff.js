// 8. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​ difference​ ​between​ ​ two​ ​ dates,​ ​ from​ ​ maximum​ ​ unit​ ​ to minimum​ ​ unit.

function dateDifference(date1, date2) {
    if (date1 > date2) {
        [date1, date2] = [date2, date1];
    }

    let years = date2.getFullYear() - date1.getFullYear();
    let months = date2.getMonth() - date1.getMonth();
    let days = date2.getDate() - date1.getDate();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (days < 0) {
        months--;
        const previousMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
        days += previousMonth.getDate();
        if (months < 0) {
            years--;
            months += 12;
        }
    }

    let output = "";
    if (years > 0) output += `${years} year${years > 1 ? 's' : ''} `;
    if (months > 0) output += `${months} month${months > 1 ? 's' : ''} `;
    if (days > 0) output += `${days} day${days > 1 ? 's' : ''}`;

    return output.trim();
}

const date1 = new Date("02/15/2024");
const date2 = new Date("03/16/2028");
console.log(dateDifference(date1, date2));