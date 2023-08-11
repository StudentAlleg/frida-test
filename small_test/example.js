console.log("Script Started");

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
        args[0] = ptr(500);
        //send this new changed value
        send(args[0]);
    }
});