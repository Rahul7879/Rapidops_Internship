// 2. Write​ ​ a ​​ JavaScript​ ​ function​ ​ to​ ​ hide​ ​ email​ ​ addresses​ ​ to​ ​ protect​ ​ from​ ​ unauthorized​ ​ user.
//  The number of star will be equal to the number of characters hidden, and make this program dynamic.

function Hide() {
    email = prompt("Enter Email");
    let domain = "";
    for(let i = email.length-1; i>=0; i--){
        if(email[i] == '@'){
            domain = '@'+domain
            break
        }
        domain = email[i]+domain;
    }
    if (email.length <= domain.length+2) {
        if (email.length == domain.length+1) {
            alert("*" + email.slice(-domain.length));
            return;
        }
        alert(email[0] + "*" + email.slice(-domain.length));
        return;
    }
    let username = (email.length < domain.length+5) ? email.substring(0, 1) : email.substring(0, 2);
    let i = (email.length < domain.length+5) ? 1 : 2;
    while (email[i + 1] != '@') {
        username += '*';
        i++;
    }
    username += email[i] + email.slice(-domain.length);
    alert(username);
}
Hide();




