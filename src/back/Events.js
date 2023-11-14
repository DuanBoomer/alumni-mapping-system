import alumniData from "./alumni.json"

export function getOngoingEvent(userID){

    var returnVal = {
        "type": "no ongoing event"
    }

    alumniData.forEach((alumni) => {
        if (alumni.id === userID){
            if (alumni.event_history.length > 0){
                var event = alumni.event_history[0]
                if (event.type === "pending") {
                    returnVal = event
                }
            }
            else{}
            
        }
    })

    return returnVal
}

export function getEventsHistory(userID){

    var returnVal = ["no events hosted"]

    alumniData.forEach((alumni) => {
        if (alumni.id === userID) {
            if (alumni.event_history.length > 0) {
                returnVal = alumni.event_history.filter((item) => item.type === "done")
            }
            else { }

        }
    })

    return returnVal
}

export function getEvent(userID, eventID){
    var returnVal = {}

    alumniData.forEach((alumni) => {
        if (alumni.id === userID) {
            if (alumni.event_history.length > 0) {
                alumni.event_history.map((item) => {
                    if (item.id === eventID){
                        returnVal = item
                    }
                    return null;
                })
                // returnVal = alumni.event_history.filter((item) => item.type === "done")
            }
            else { }

        }
    })

    return returnVal
}