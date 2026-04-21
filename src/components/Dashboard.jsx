import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

export default function Dashboard() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setNotification({ message: "Sesión cerrada correctamente", type: "success" });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="container">
      <h2>Bienvenido al Dashboard</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>Hola</p>
      <button onClick={handleLogout}>Volver al Inicio</button>
    </div>
  );
}
