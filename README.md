Umbrella Customizer
-------------------------------
This is a small web application where users can preview and customize umbrellas by selecting different colors and uploading their logo. The main goal of the project was to build an interactive preview tool with smooth animations and a simple UI.

Features
-------------------------------
Choose between three umbrella colors (pink, blue, yellow)
Upload a custom logo (PNG/JPG)
Real-time umbrella preview
Color navigation buttons (previous/next)
Basic slide + zoom animations when switching colors
Fully responsive layout

Tech Stack
----------------------------------
React (with TypeScript)
Tailwind CSS
Vite
Lucide React (icons)

Setup
----------------------------------
npm install
npm run dev
click on "http://localhost:5173" server

Build
-------------------------------------
npm run build
npm run preview

How It Works
--------------------------------------
Color Selection: Clicking a swatch changes the umbrella color with a small zoom/rotate animation.
Logo Upload: The selected logo is placed at the center of the umbrella SVG.
Navigation Buttons: Left/right buttons rotate through the available colors.
Animations: Implemented using Tailwind custom keyframes (zoom + slide transitions).

Components (Short Summary)
---------------------------------------
ColorSwatches – Renders color options and highlights the selected one
UmbrellaDisplay – Shows the umbrella SVG, applies color + logo
UmbrellaCustomizer – Handles state (color, logo) and coordinates animations
