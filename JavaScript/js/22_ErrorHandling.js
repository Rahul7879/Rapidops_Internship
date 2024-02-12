try {
    console.log('Start of try runs');  // (1) <--
    // ...no errors here
    console.log(a);
    console.log('End of try runs');   // (2) <--
  } catch (err) {
    console.log('Catch is ignored, because there are no errors'); // (3)
  }

  try {
    // setTimeout(function() {
    //     console.log("fine")
    //   noSuchVariable; // script will die here
    // }, 1000);
    ajshfj
  } catch (err) {
    console.log("won't work");
    console.log(err.name);
    console.log(err.message);
  }


  // throw 

  let json = '{ "age": 30 }';

try {
  let user = JSON.parse(json);
  if (!user.name) {
    throw new SyntaxError("Incomplete data");
  }
  console.log( user.name );
} catch (err) {
  console.log( "JSON error" + err.message );
}

 