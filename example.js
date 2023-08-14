console.log("Script Started");
const sqlite3InitModule = import("./jswasm/sqlite3.mjs");
//const {sqlite3InitModule} = require("./jswasm/sqlite3.mjs");

console.log(sqlite3InitModule);

sqlite3InitModule.then((sqlite3)=>{
  console.log("Loaded sqlite3",sqlite3.version);
});
sqlite3InitModule.finally

//get the base address (where the program starts in memory)
let b = Module.getBaseAddress("small_test");
//let p = DebugSymbol.fromName("_Z5sleepi").address;
//0x00002369




//using cutter, we know that we are interested in 0x00002369
//cutter addresseses are relative, so add it to the base address
let p = ptr(ptr(b).add(ptr(0x00002369)));
console.log(p);

//Now attach to the specified memory (function)
Interceptor.attach(p, {
    //this fires when the specified function has been called, before anything else proceeds
    onEnter(args) {
        //send the original value
        send(args[0]);
        //change it to a value of our choosing
        args[0] = ptr(10000);
        //send this new changed value
        send(args[0]);
        console.log(sqlite3InitModule);
    }
});