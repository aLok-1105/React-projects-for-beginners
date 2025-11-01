import { Route, Routes } from "react-router-dom";
import Home from "./landing page/home/HomePage";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react"
import Navbar from "./landing page/Navbar";
import Footer from "./landing page/Footer";
import Modal from "./components/Modal";
import Category from "./pages/Category.jsx";


function App() {
  const [modal, setModal] = useState(false)

  const handleModalOpen = () => {
    setModal(true)
  }

  return (
    <>
      <Navbar modal={modal} handleModalOpen={handleModalOpen} />
      {/* ToastContainer here makes it available throughout the app */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />


      <div className="flex justify-center  absolute -top-10  w-full h-[500px]">
        <Modal modal={modal} setModal={setModal} />
      </div>

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:slug" element={<Category />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
