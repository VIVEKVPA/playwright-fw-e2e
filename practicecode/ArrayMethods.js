//Get the passed students, capitalize their name, get the total score of passed students
const students = [
    {name : 'Raj', score : 37},
    {name : 'Rani',score : 35},
    {name : 'Med',score : 88},
    {name : 'Lata',score : 99},
    {name : 'Soni',score : 33},
]

// Get the passed students - apply filter

const passedStudents = students.filter(student => student.score > 35)
console.log(passedStudents)

//capitalize their name - apply map

const passedStudentsCap = passedStudents.map(student => student.name.toUpperCase())
console.log(passedStudentsCap)

//get the total score of passed students - apply reduce

const totalScore = passedStudents.reduce((totalScore, student) => {
    totalScore = totalScore + student.score
    return totalScore
}, 0)

console.log(totalScore)

