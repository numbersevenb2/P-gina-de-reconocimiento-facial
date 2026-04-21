import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification";

export default function FaceLogin() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const cameraRef = useRef(null);
  const hasChecked = useRef(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    hasChecked.current = false; // reinicia detección al entrar

    const faceDetection = new window.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.7,
    });

    faceDetection.onResults(async (results) => {
      if (results.detections.length > 0 && !hasChecked.current) {
        hasChecked.current = true;

        const currentEmbedding = [0.12, -0.34, 0.56]; // simulado
        const { data: profiles } = await supabase.from("profiles").select("*");

        const match = profiles.find(
          (p) =>
            JSON.stringify(p.face_embedding) ===
            JSON.stringify(currentEmbedding)
        );

        if (match) {
          setNotification({ message: "Login facial exitoso", type: "success" });
          if (cameraRef.current) cameraRef.current.stop();
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          setNotification({ message: "No se encontró coincidencia facial", type: "error" });
          if (cameraRef.current) cameraRef.current.stop();
        }
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

  return (
    <div className="container">
      <h2>Login facial</h2>
      <Notification message={notification.message} type={notification.type} />
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
}
