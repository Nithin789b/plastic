import React, { useState } from "react";
import { Calendar, MapPin, Clock, Users, Info, X, ExternalLink, Share2, Heart } from "lucide-react";

const events = [
  {
    id: "cleanliness",
    title: "Cleanliness Drive",
    datetime: "Sat, Nov 1, 2025 — 08:00 AM to 11:30 AM",
    date: "Saturday, November 1, 2025",
    time: "08:00 AM to 11:30 AM",
    location: "Community Park, Sector 12",
    description: "Join us to keep our neighbourhood clean. Tools will be provided.",
    fullDescription: "Be part of our community cleanliness initiative! We'll be cleaning up Community Park and the surrounding areas. All cleaning tools, gloves, and safety equipment will be provided. This is a great opportunity to meet your neighbors and contribute to a cleaner, healthier environment.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
    registerUrl: "https://example.com/register/cleanliness",
    organizer: "Green Community Initiative",
    capacity: "50 volunteers",
    benefits: ["Free breakfast", "Community service certificate", "Networking opportunity"],
    requirements: ["Comfortable clothing", "Water bottle", "Sun protection"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "awareness",
    title: "Awareness Campaign",
    datetime: "Sun, Nov 2, 2025 — 10:00 AM to 01:00 PM",
    date: "Sunday, November 2, 2025",
    time: "10:00 AM to 01:00 PM",
    location: "Town Hall Auditorium",
    description: "Informative sessions on waste segregation and healthy habits.",
    fullDescription: "Join our comprehensive awareness campaign focused on sustainable living practices. Learn about proper waste segregation, composting techniques, and adopting healthy environmental habits. Expert speakers will share insights and practical tips for making a positive impact.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
    registerUrl: "https://example.com/register/awareness",
    organizer: "Eco Warriors Foundation",
    capacity: "100 participants",
    benefits: ["Free lunch", "Information booklet", "Eco-friendly goodies"],
    requirements: ["Registration confirmation", "Valid ID", "Enthusiasm to learn"],
    color: "from-green-500 to-emerald-600"
  },
  {
    id: "plantation",
    title: "Plantation Drive",
    datetime: "Mon, Nov 3, 2025 — 07:00 AM to 10:00 AM",
    date: "Monday, November 3, 2025",
    time: "07:00 AM to 10:00 AM",
    location: "Riverfront Greenbelt",
    description: "Help us plant native trees — saplings and guidance provided.",
    fullDescription: "Join us in creating a greener future! We'll be planting 200+ native tree saplings along the Riverfront Greenbelt. Expert horticulturists will guide you through the planting process. Each participant will receive a certificate with their tree's GPS location for future visits.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    registerUrl: "https://example.com/register/plantation",
    organizer: "Trees for Tomorrow",
    capacity: "75 volunteers",
    benefits: ["Tree adoption certificate", "Refreshments", "Plantation training"],
    requirements: ["Garden gloves (optional)", "Comfortable footwear", "Early morning enthusiasm"],
    color: "from-teal-500 to-green-600"
  },
];

const EventCards = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState([]);

  const handleRegister = (url, e) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const toggleLike = (eventId, e) => {
    e.stopPropagation();
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const shareEvent = (event, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: event.registerUrl,
      });
    } else {
      alert('Share link: ' + event.registerUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Community Events
          </h1>
          <p className="text-gray-600 text-lg">Join us in making a difference in our community</p>
        </div>
        
        {/* Event Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="group bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2"
            >
              {/* Image with overlay */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-60 group-hover:opacity-50 transition-opacity`}></div>
                
                {/* Like & Share buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => toggleLike(event.id, e)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <Heart 
                      className={`w-5 h-5 ${likedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>
                  <button
                    onClick={(e) => shareEvent(event, e)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-2xl font-bold text-white">
                    {event.title}
                  </h2>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                    <span className="text-sm">{event.datetime}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>

                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => handleRegister(event.registerUrl, e)}
                    className={`flex-1 bg-gradient-to-r ${event.color} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg`}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Page Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
              {/* Modal Header with Image */}
              <div className="relative h-80">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedEvent.color} opacity-70`}></div>
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <h2 className="text-4xl font-black text-white mb-2">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-white/90 text-lg">{selectedEvent.organizer}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Key Info Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                    <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Date</div>
                    <div className="font-bold text-gray-800">{selectedEvent.date}</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
                    <Clock className="w-8 h-8 text-green-600 mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Time</div>
                    <div className="font-bold text-gray-800">{selectedEvent.time}</div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                    <Users className="w-8 h-8 text-purple-600 mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Capacity</div>
                    <div className="font-bold text-gray-800">{selectedEvent.capacity}</div>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-6 h-6 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-800">Location</h3>
                  </div>
                  <p className="text-lg text-gray-700 bg-gray-50 rounded-xl p-4">
                    {selectedEvent.location}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-6 h-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-800">About This Event</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedEvent.fullDescription}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ What You'll Get</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {selectedEvent.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                        <span className="text-green-700 font-semibold">✓ {benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">📋 What to Bring</h3>
                  <div className="space-y-2">
                    {selectedEvent.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-xl transition-all text-lg"
                  >
                    Close
                  </button>
                  <button
                    onClick={(e) => handleRegister(selectedEvent.registerUrl, e)}
                    className={`flex-1 bg-gradient-to-r ${selectedEvent.color} hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg text-lg flex items-center justify-center gap-2`}
                  >
                    Register Now
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EventCards;