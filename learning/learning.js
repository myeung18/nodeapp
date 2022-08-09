const fs = require("fs")

const {
    person,
    add
} = require("./utils")

setTimeout(() => {
    person.greet()
}, 500)

console.log(add(3, 4))
