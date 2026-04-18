import Collage from "./Collage.js"

class Classroom extends Collage {

    constructor(name, foundedyear, count, type) {
        super(name, foundedyear)
        this.count = count
        this.type = type
    }

    getClassroomDetails() {
        const collageData = super.getCollageDetails()
        return `${collageData} It has ${this.count} Number of classrooms of type ${this.type}`
    }
}

export default Classroom