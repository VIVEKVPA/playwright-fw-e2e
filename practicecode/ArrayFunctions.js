let fruits = ['Banana', 'Apple', 'Mango']

console.log(fruits)

//Add item at the last index
fruits.push('Chikku')
console.log(fruits)

//Remove item from last index
fruits.pop()
console.log(fruits)

//Add item at the first index
fruits.unshift('Papaya')
console.log(fruits)

//Remove item from first index
fruits.shift()
console.log(fruits)

//subset of main array
let slicedFruits = fruits.slice(1, fruits.length-1)
console.log(slicedFruits)

//get the item's Index
console.log(fruits[0])

//get index of item
console.log(fruits.indexOf('Apple'))

//iterate over array

fruits.forEach((fruit, index) => {
console.log(`${index} : ${fruit}`)
})


