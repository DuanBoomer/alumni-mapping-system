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
        "year": ""
    }

    var returnVal = []

    studentData.forEach((student, index) => {
        if (student.alumni === userID) {

            studentVal.id = student.id
            studentVal.name = student.name
            studentVal.course = student.course
            studentVal.stream = student.stream
            studentVal.year = student.year

            returnVal.push({ ...studentVal })

        }
    })
    return returnVal
}

export function getFullDetails(userID, type){

    // "alumni": "123",
    // id
    // "name": "Kapil",
    // "email": "kapil@sdiet",
    // "password": "123",
    // "course": "BTech",
    // "stream": "CSE",
    // "year": "3"

    
    var returnVal;
    var data = alumniData;

    if (type === "alumni"){
        data = alumniData
        returnVal = {
            "name": "",
            "desc": "",
            "email": "",
            "expertise": "",
            "company": "",
        }
    }
    if (type === 'student'){
        data = studentData
        returnVal = {
            "name": "",
            "email": "",
            "course": "",
            "stream": "",
            "year": "",
            "desc": ""
        }
    }

    data.forEach((person) => {
        if (person.id === userID && type === "alumni"){
            returnVal.name = person.name
            returnVal.desc = person.desc
            returnVal.email = person.email
            returnVal.expertise = person.expertise
            returnVal.company = person.company
        }

        if (person.id === userID && type === "student"){
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