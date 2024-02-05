// 9. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ convert​ ​ a ​ ​ Unix​ ​timestamp​ ​ to​ ​ time.

function UnixToTime(unix) {
    let dateObj = new Date(unix * 1000);
    let utcString = dateObj.toUTCString();
    console.log(utcString);
}
 
UnixToTime(1607518718);