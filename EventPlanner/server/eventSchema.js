const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// const subSchema = new mongoose.Schema()

const eventSchema = new mongoose.Schema(
  {
    //_id: ObjectId,
    eventName: String,
    isPrivate: Boolean,
    eventDescription: String,
    eventType: String,
    eventTheme: String,
    startDate: Date,
    endDate: Date,
    venueName: String,
    venueAddress: String,
    organizerContact: String,
    ticketPrice: Number,
    expectedAttendees: Number,
    ticketBooked: Number,
    useOtherServices: {
      hosting: Boolean,
      parking:Boolean,
      catering:Boolean,
      photography:Boolean
    },
    eventStatus: Number,
    eventPoster: String,
    userId: ObjectId,
    registeredUsers: [{
      email: String,
      noOfTickets: Number
    }]
}
);
module.exports = mongoose.model('events', eventSchema);