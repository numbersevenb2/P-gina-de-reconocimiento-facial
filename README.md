# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Face Auth App

Proyecto de autenticación facial con **React**, **Supabase** y **MediaPipe Face Detection**.  
Permite registro y login de usuarios utilizando detección facial en tiempo real desde la cámara del navegador.

---

## Tecnologías utilizadas

- [React](https://react.dev/) — Librería principal para la interfaz.
- [Vite](https://vitejs.dev/) — Bundler y servidor de desarrollo rápido.
- [Supabase](https://supabase.com/) — Base de datos y backend para almacenar perfiles y embeddings.
- [MediaPipe Face Detection](https://developers.google.com/mediapipe) — Detección facial en tiempo real.
- [React Router](https://reactrouter.com/) — Navegación entre pantallas.
- [UUID](https://www.npmjs.com/package/uuid) *(opcional)* — Generación de identificadores únicos.

---

## Instalación de dependencias

Ejecuta en la raíz del proyecto:

```bash
npm install react react-dom react-router-dom
npm install @supabase/supabase-js
npm install @mediapipe/face_detection @mediapipe/camera_utils
