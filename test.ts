class person {
    constructor(first, last){
        this.first = first
        this.last = last
    }

    getName() {
        return `${this.first} ${this.last}`
    }
}

class student extends person {
    constructor(first, last, studentNo) {
        super(first, last)
        this.studentNo = studentNo
    }

    getInfo () {
        return `student ${studentNo} name is ${this.first} ${this.last}`
    }
}

const student= new student('john','dow','12345')
console.log(student.getInfo())