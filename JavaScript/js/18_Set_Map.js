

let map = new Map();

map.set('1', 'str1'); 
map.set(1, 'num1');    
map.set(true, 'bool1');

console.log( map.get(1)   );
console.log( map.get('1') );
console.log( map.size ); 

const arr = [1,2,3,4,5,6,66,3,3];
let arrSet = new Set(arr);

console.log(arr);
console.log(arrSet)

// Tasks

// Filter unique array members


function unique(arr) {
      let st = new Set(arr);
      return [...st]
  }
  
  let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  
  console.log( unique(values) );

//   2 Filter Anagrams

let arr2 = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
function aclean(arr){
    let ans = [];
    let st = new Set();
    for(let i = 0; i<arr.length; i++){
        let str = arr[i].toUpperCase();
        str = str.split("").sort().join("");
        if(st.has(str)){
            continue;
        }else{
            ans.push(arr[i])
            st.add(str)
        }
    }
    return ans;
}

console.log(aclean(arr2) ); 
console.log(arr2);

// 3 Iterable keys

let mp = new Map();
mp.set("name", "John");
let keys = Array.from(map.keys());
keys.push("more");
console.log(keys);


// 4 hasDuplicate 

function  hasDuplicate(arr) {
    return new Set(arr).size == arr.length;
}

console.log(hasDuplicate([11,2,34,5]));