const { getEventById, updateEvent } = require("../events/events-controller");
const Booking = require("./bookings-model");

const createBooking = async (bookingData) => {
    try {
        // calculate total price
        // totalPrice = eventPrice * quantity
        // event - eventPrice (bookingdata.event)
        //quantity - bookingData
        const event = await getEventById(bookingData.event);

        // This is found by looking at the object. Properties are needed for the math to work.
        const totalPrice = await bookingData.quantity * event.price;
        // Add the totalPrice calculation to incoming bookingData object
        bookingData.totalPrice = totalPrice;

        // Decrease avaialable tickets from event
        // calculate tickets available 
        // This is found by looking ar the objects and its properties.
        const newAvailableTickets = event.availableTickets - bookingData.quantity;
        // update event with the new amount of tickets
        // only need to update ticket amount, we don't need a variable for the event data
        await updateEvent(bookingData.event, { availableTickets: newAvailableTickets })

        const booking = await Booking.create(bookingData);
        return booking;

    } catch (error) {
        throw error
    }
}

module.exports = { createBooking }