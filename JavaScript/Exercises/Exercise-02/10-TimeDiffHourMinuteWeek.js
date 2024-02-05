// 10. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​ time​ ​differences​ ​ in​ ​ years,​ ​ months,​ ​ weeks,​ ​ days,​ ​ hours and​ ​ minutes​ ​ between​ ​ two​ ​ dates.


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
    output += `${years} years `;
    output += `${months} month `;
    output += `${days} day \n`;
    output+=`${years*12+months} months and ${days} days \n`
    let totalDays = Math.ceil((years*12+months)*30.45)+days;
    output+=`${Math.floor(totalDays/7)} weeks ${totalDays%7} days \n`
    output+=`${totalDays} days \n`
    output+=`${totalDays*24} hours \n`
    output+=`${totalDays*24*60} \n`
    output+=`${totalDays*24*60*60} \n`
    return output;
}

const date1 = new Date("02/16/2024");
const date2 = new Date("03/16/2028");
console.log(dateDifference(date1, date2));