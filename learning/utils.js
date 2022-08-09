console.log("loading utils.js")

const person = {
    name: "max",
    age: 29,
    greet() {
        console.log("hi this is " + this.name);
    }
}

const add = (a, b) => {
    return a + b
}

module.exports = {
    person,
    add
}

