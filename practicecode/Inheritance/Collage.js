class Collage {

    constructor(name, foundedyear) {
        this.name = name
        this.foundedyear = foundedyear
    }

    getCollageDetails() {
        return `${this.name} college is founded in year ${this.foundedyear}.`
    }
}

export default Collage