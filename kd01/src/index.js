import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import logo from "./assets/logo.png";
import movieImage from "./assets/movieImage.webp";
/* 
  header
      logo
      categories
      search bar
      genera buttons
      notification
  body 
      movie cards
      page numbers
  footer
      Copyrights
      contact us 
      site map
*/
function Header() {
  return (
    <div class="header">
    <div className="header1">
      <div>
        <img src={logo} alt="logo" id="logo" />
      </div>
      <div id="categories1">
        <ul>
          <li>Home</li>
          <li>Web Series</li>
          <li>Dual Audio</li>
          <li>Genre</li>
          <li>By Year</li>
          <li>By Qualities</li>
        </ul>
      </div>
      <div id="search1">
        <input type="text" placeholder="Search.." />
        <button type="button">GO</button>
      </div>
    </div>

    <div className="header2">
      <div id="search2">
        <input type="text" placeholder="Search.." />
        <button type="button">GO</button>
      </div>
      <div id="categories2">
        <ul>
          <li>Home</li>
          <li>Web Series</li>
          <li>Dual Audio</li>
          <li>Genre</li>
          <li>By Year</li>
          <li>By Qualities</li>
        </ul>
      </div>
    </div>
  </div>
  );
}
function MovieCards (){
  return (
    <div class="movieCards">
      <img src={movieImage} class="movieImages" alt="movieImage"/> 
      <h4>Inside the Mind of a Dog 2024 Hindi Dual Audio HDRip 1080p - 720p - 480p</h4>
    </div>
  );
}
function Body (){
  return (
    <div class="movieCardsContainer">
      <MovieCards />
      <MovieCards />
      <MovieCards />
      <MovieCards />
      <MovieCards />
      <MovieCards />
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
