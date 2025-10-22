import Event from "../models/event.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, location } = req.body;

    if (!title || !description || !date || !location?.city ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const event = await Event.create({
      title,
      description,
      category: category || "General",
      date,
      location: {
        city: location.city,
        ...(location.lat !== undefined && location.lat !== null && location.lat !== '' ? { lat: location.lat } : {}),
        ...(location.lng !== undefined && location.lng !== null && location.lng !== '' ? { lng: location.lng } : {})
      },
      organizer: req.user.id
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({createdAt:-1})
      .populate("organizer", "username email")
      .populate("attendees", "username email");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Event
export const getEvent = async (req, res) => {
  try {
    // Check if the ID is a valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const event = await Event.findById(req.params.id)
      .populate("organizer", "username email")
      .populate("attendees", "username email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Join Event
export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    const updatedEvent = await Event.findById(req.params.id)
      .populate("organizer", "username email")
      .populate("attendees", "username email");

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
