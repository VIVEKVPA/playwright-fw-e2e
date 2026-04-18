//Difference between var, let and const

//function scope - redeclare - update
function varDeclare() {

    var x = 2

    if (true) {
        x = 3
        y = 4
        console.log(x)
        var x = 6
    }
    console.log(x)
    console.log(y)
}

// varDeclare()

//block scope - No redeclare - update
function letDeclare() {

    let x = 12

    if (true) {
        let x = 34
        let y = 4
        // let x = 55 - Identifier 'x' has already been declared
        console.log(x)
        console.log(y)
        x = 55
        console.log(x)
    }
    console.log(x)
    // console.log(y) - y is not defined
}

letDeclare()

//block-scope - No redeclare - No update
function constDeclare() {

    const x = 12

    if (true) {
        const x = 34
        const y = 4
        // const x = 55 - Identifier 'x' has already been declared
        console.log(x)
        console.log(y)
        // x = 55 - Assignment to constant variable.
        console.log(x)
    }
    console.log(x)
    // console.log(y) - y is not defined
}
// constDeclare()