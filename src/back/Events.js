import alumniData from "./alumni.json"

export function getOngoingEvent(userID){

    var returnVal = {
        "type": "no ongoing event"
    }

    alumniData.forEach((alumni) => {
        if (alumni.id === userID){
            var event = alumni.event_history[0]
            if (event.type === "pending"){
                returnVal = event
            }
        }
    })

    return returnVal
}