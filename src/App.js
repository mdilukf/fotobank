
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import HeaderUser from "./components/Header/HeaderUser";
import Home from "./components/Home";
import About from "./components/About";
import Registration from "./components/Registration";
import RegistrationUser from "./components/RegistrationUser";
import Gallery from "./components/Gallery";
import Portfolio from "./components/Portfolio";
import Reference from "./components/Reference";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Author from "./components/Author";
import Contacts from "./components/Contacts";
import LichKabinetPolzovat from "./components/LichKabinetPolzovat";
import LichKabinetFotograf from "./components/LichKabinetFotograf";
import Kabinet from "./components/Kabinet";
import Korzina from "./components/Korzina";

import axios from 'axios';
import Cookies from 'js-cookie'

function App() {
  const [tab, setTab] = useState('effect')

  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const session = Cookies.get('session');
    setSessionId(session);
    if (session) {
      axios.get('http://localhost:5000/checkSession', { params: { sessionId: session } }).then(res => {
        setUser(res.data.data[0]);
      }).catch(err => {
        console.log(err);
      });
    } else {
      setUser(null);
    }
  }, []);


  return (
    <>
      <div>
        
        {user  ? (<HeaderUser />): (<Header />)}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/author" element={<Author />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registrationuser" element={<RegistrationUser />} />
        <Route path="/personal_account" element={<LichKabinetPolzovat />} />
        <Route path="/personal_account_fotograf" element={<LichKabinetFotograf />} />
        <Route path="/kabinet" element={<Kabinet />} />
        <Route path="/korzina" element={<Korzina />} />

      </Routes>

      <Footer />

    </>
  );
}

export default App;
