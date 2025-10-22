import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import EventDetails from "./pages/eventDetails";
import ChatBot from "./pages/ChatBot";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
