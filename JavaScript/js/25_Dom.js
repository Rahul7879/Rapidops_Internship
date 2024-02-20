// getting the Object (tags) 

// let h1 = document.querySelector("h1");
// in this selector we can pass directly of tag but if we want to pass class so we have to right with dot and in case of id we have to pass # 
let h1 = document.getElementById("h1")
h1.style.color = "red"
h1.style.backgroundColor = "grey"
// let h1 = document.getElementsByClassName("h1");
// h1[0].style.color = "red"
// h1[0].style.backgroundColor = "grey"
// it return multiple elements thats why we have do indexing of it 

let Lists = document.getElementsByClassName('list');
Array.from(Lists).forEach(list => {

    list.style.border = "2px solid black"
    list.style.padding = "5px"
    list.style.margin = '10px'
})
Lists[0].style.border = "2px solid black"



// if want to id of any element 
 console.log(h1.id);

 // if want to class of any element 
 console.log(h1.className);

//  h1.innerHTML = "Welcome to Dom Manipulation"
//  h1.textContent = "<h1>hello</h1>"

// innerHTML vs textContent 

// we pass tag in innerhtml than it prints as tag and remove tage part print only contet but 
// in textContent it prints as string including everything you wrote 


// ****************Children: childNodes, firstChild, lastChild************************* 

console.log(document.body.children);
// its not return array return array like object that can be iterable by for of loop 

for(let child of document.body.childNodes){
    console.log(child);
}

// array methods wont works 
// if we want apply aray methods then we can comverts it into array 

// Array.from(document.body.childNodes).filter();

// we can't change the values of original dom collection 

console.log("firstChild",document.body.firstElementChild);


// ***************Siblings and the parent*****************

console.log(document.body.parentElement === document.head.parentElement); 
console.log(document.body.parentElement);

console.log(document.head === document.body.previousElementSibling)
console.log(document.body.previousElementSibling)


// Tasks -01 

let first = document.body.firstElementChild;
console.log("first",first);

let second = document.querySelector("ul");
console.log("second", second);

let third = document.querySelector("ul").lastElementChild;
console.log("third", third);


// task 3 

let cells = document.querySelectorAll("td");
let array = Array.from(cells);
array.forEach((cell)=>{
    cell.style.border = "2px solid black"
    cell.style.margin = "10px"
})

console.log(array);
let count = 0;
for(let i = 0; i<array.length; i++){
    if(count == i){
        array[i].style.backgroundColor = "red";
        count+=6;
    }
}



// ******************Searching: getElement*, querySelector****************
// in js id is  also treats as variable if no such variable not avaible with id name 
list2.style.backgroundColor = "blue"
// if our id containes hypens then we can't access it direcly we can access with window 
window["list-1"].style.backgroundColor = "yellow";

// but all are not preferrable 

// task 

let attr = document.querySelector("#task-2");
console.log(attr.getAttribute("data-widget-name"))
console.log(attr.data)
