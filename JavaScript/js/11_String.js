let guestList = "guests";
console.log(guestList);
guestList = guestList[0].toUpperCase() + guestList.substring(1)
console.log(guestList);

// Some Methods for Getting Substring

let str = "Rahul Singh Rajput";

console.log(str.slice(5));
console.log(str.slice(-12, -7));
console.log(str.substring(5, 2));

// trime method 

str = "    Rahul  Singj   ";
let newstr = str.trim();
console.log(newstr);
newstr = newstr.repeat(4);
console.log(newstr);

// Tasks-01 convert first letter of string

function uCase(str) {
    str = str[0].toUpperCase() + str.substring(1, str.length);
    return str;
}
console.log(uCase("john"));

// Task-2 Check spam 

function checkSpam(str) {
    str = str.toLowerCase();
    if (str.includes('xxx') || str.includes('viagra')) {
        return true;
    }
    return false;
}
console.log(checkSpam("rahul sin cViaGRA adsg vigra aksdjg "));

// Task-03 truncate the text 

function truncate(str, size) {
    str = str.slice(0, size - 1) + '...';
    return str;
}
console.log(truncate("What I'd like to tell on this topic is", 20));

// task-04 ExtractCurrencyValue 

function extractCurrencyValue(str) {
    return Number(str.slice(1));
}
console.log(extractCurrencyValue("$300"));

