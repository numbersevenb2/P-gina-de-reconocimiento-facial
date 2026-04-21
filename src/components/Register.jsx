import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import Notification from "./Notification";

export default function Register() {
  const videoRef = useRef(null);
  const [embedding, setEmbedding] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const cameraRef = useRef(null);
  const hasChecked = useRef(false);

  useEffect(() => {
    const faceDetection = new window.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.7,
    });

    faceDetection.onResults((results) => {
      if (results.detections.length > 0 && !hasChecked.current) {
        hasChecked.current = true;
        const fakeEmbedding = [0.12, -0.34, 0.56];
        setEmbedding(fakeEmbedding);
        setNotification({ message: "Rostro detectado correctamente", type: "success" });
      }
    });

    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        await faceDetection.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    cameraRef.current = camera;
    camera.start();

    return () => {
      if (cameraRef.current) cameraRef.current.stop();
    };
  }, []);

  const handleRegister = async () => {
    if (!embedding) {
      setNotification({ message: "No se detectó rostro", type: "error" });
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: `${Date.now()}@face.local`,
      password: "face-only",
    });

    if (authError) {
      setNotification({ message: "Error en registro: " + authError.message, type: "error" });
      return;
    }

    const userId = authData.user.id;

    const { error: profileError } = await supabase.from("profiles").insert([
      { id: userId, face_embedding: embedding },
    ]);

    if (profileError) {
      setNotification({ message: "Error al guardar perfil: " + profileError.message, type: "error" });
    } else {
      setNotification({ message: "Usuario registrado con éxito", type: "success" });
      if (cameraRef.current) cameraRef.current.stop();
      setTimeout(() => navigate("/"), 1500); // redirige al login tras 1.5s
    }
  };

  return (
    <div className="container">
      <h2>Registro facial</h2>
      <Notification message={notification.message} type={notification.type} />
      <video ref={videoRef} autoPlay playsInline></video>
      <button onClick={handleRegister}>Registrar rostro</button>
      <p style={{ marginTop: "20px" }}>¿No quieres registrarte?</p>
      <Link to="/" style={{ color: "#4facfe", fontWeight: "500" }}>
        Volver al login
      </Link>
    </div>
  );
}
