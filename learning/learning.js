const person = {
    name: "max",
    age: 29,
    greet() {
        console.log("hi this is " + this.name);
    }
}


person.greet();