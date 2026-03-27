const Event = require("./events-model");

// queryData = req.query
// in router we will call getAllEvents with the query data like so:
// getAllEvents(req.query)
const getAllEvents = async (queryData) => {
    try {
         // Objects that will keep track of our filter queries
        const filterObject = {};

        // add the property to our filterObject
        if(queryData.category){
            filterObject.category = queryData.category;
        }

        if(queryData.date){
            filterObject.date = queryData.date;
        }
        
        // dealing with price
        // deal with a arange, getting everything between the min price and the max price
        if(queryData.minPrice && queryData.maxPrice){
            // $gte - greater than or equal to
            // $lte - less than or equal to
            filterObject.price = {
                $gte: queryData.minPrice || 0, // if no min, default to 0
                $lte: queryData.maxPrice || Infinity
            }
        }

        const events = await Event.find(filterObject);
        return events;
    } catch (error) {
        throw error
    }
}

const getEventById = async (eventId) => {
    try {
       const event = await Event.findById(eventId);

       if(!event) {
        throw Error ("Event Not Found!")
       }

       return event
    } catch (error) {
        throw error
    }
}

const updateEvent = async (eventId, eventData) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            eventData,
            { new: true }
        )

        if(!updatedEvent){
            throw Error ("Event Not Found!")
        }

        return updatedEvent
    } catch (error) {
        throw error 
    }
}

const createEvent = async (eventData) => {
    try {
        const newEvent = await Event.create(eventData);
        return newEvent
    } catch (error) {
        throw error
    }
}

const deleteEvent = async (eventId) => {
    try {
        const EventToDelete = await Event.findByIdAndDelete(eventId);

        if(!EventToDelete){
            throw Error ("Event Not Found!")
        }
        return EventToDelete
    } catch (error) {
        throw error
    }
}

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };