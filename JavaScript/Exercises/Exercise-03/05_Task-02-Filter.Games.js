// Write​ ​ a ​ ​ JavaScript​ ​ program ​ that​ ​ displays​ ​ a list​ ​ of​ ​ names​ ​ according​ ​ to​ ​ the sports​ group.


let arr = [{
    Name: 'Ravindra',
    Sports: ['Chess', 'Cricket'],
    },
  {
    Name: 'Ravi',
    Sports: ['Cricket', 'Football'],
  },
  {
    Name: 'Rishabh',
    Sports: ['Table-Tennis', 'Football'],
  },]

  let games = [];
  for(let i = 0; i<arr.length; i++){
     let inner = arr[i].Sports;
     for(let j = 0; j<inner.length; j++){
        if (!games[inner[j]]) {
            games[inner[j]] = [arr[i].Name];
          } else {
            games[inner[j]].push(arr[i].Name);
          }
     }
  }

  console.log(games);

