import { createRoot } from "react-dom/client";
import App from './App'
import React from 'react';
import './styles.css';


const rootElement = document.querySelector("#root")!;
const root = createRoot(rootElement);
root.render(<App />);