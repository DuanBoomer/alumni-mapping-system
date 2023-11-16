import alumniData from "./alumni.json"
import studentData from "./student.json"

export function getAlumniDetails(userID) {

    var returnVal = {
        "name": "",
        "expertise": [],
        "company": "",
        "desc": "",
        "email": "",
        "response": "not found"
    }

    alumniData.forEach((alumni) => {
        if (alumni.id === userID) {
            returnVal.name = alumni.name
            returnVal.expertise = alumni.expertise
            returnVal.company = alumni.company
            returnVal.desc = alumni.desc
            returnVal.email = alumni.email
            returnVal.response = "found"
        }
    })

    return returnVal
}

export function getStudentDetails(userID) {

    var studentVal = {
        "id": "",
        "name": "",
        "course": "",
        "stream": "",
        "year": "",
        "email": "",
        "desc": ""
    }

    var returnVal = []

    studentData.forEach((student, index) => {
        if (student.alumni === userID) {

            studentVal.id = student.id
            studentVal.name = student.name
            studentVal.course = student.course
            studentVal.stream = student.stream
            studentVal.year = student.year
            studentVal.email = student.email
            studentVal.desc = student.desc

            returnVal.push({ ...studentVal })

        }
    })
    return returnVal
}

export function getFullDetails(userID) {
    var returnVal;
    var data = studentData;

    data = studentData
    returnVal = {
        "name": "",
        "email": "",
        "course": "",
        "stream": "",
        "year": "",
        "desc": ""
    }

    data.forEach((person) => {
        if (person.id === userID) {
            returnVal.name = person.name
            returnVal.email = person.email
            returnVal.course = person.course
            returnVal.stream = person.stream
            returnVal.year = person.year
            returnVal.desc = person.desc
        }
    })

    return returnVal

}