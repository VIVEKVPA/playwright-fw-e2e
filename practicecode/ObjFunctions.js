//JS Object holds functions

const person = {
    name : 'Vivek',
    age : 33,
    greet : function () {
        console.log('Welcome to JS, '+ this.name)
    }
}

console.log(person.name)
person.greet()

function getAge() {
    return person.age
}

console.log(getAge())

const message = function (name) {
    return 'Come on '+ name
}

console.log(message(person.name))

