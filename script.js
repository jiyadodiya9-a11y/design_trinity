// Navbar helpers
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Update navbar status when a planet is selected
// Call this inside your existing showInfo() function:
function updateNavStatus(planetName) {
  const label = document.getElementById('nav-planet-label');
  const dot = document.querySelector('.nav-dot');
  if (label) label.textContent = planetName ? `Viewing: ${planetName}` : 'No planet selected';
  if (dot) dot.classList.toggle('active', !!planetName);
}

// ⚠️ Patch your existing showInfo() to also call updateNavStatus:
// Example:
// function showInfo(planet) {
//   document.getElementById('planet-info').textContent = planetData[planet];
//   updateNavStatus(planet);   ← add this line
// }

// Highlight the active button when clicked
function setActiveButton(planet) {
  // Remove selected from all buttons
  document.querySelectorAll('.planet-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  // Add selected to the clicked one
  const active = document.querySelector(`.${planet}-btn`);
  if (active) active.classList.add('selected');
}

// ⚠️ Call setActiveButton inside your existing showInfo() like this:
// function showInfo(planet) {
//   document.getElementById('planet-info').textContent = planetData[planet];
//   setActiveButton(planet);   ← add this line
// }
function showInfo(planet){
    {
  alert("You clicked: " + planetName);
}
  let info = "";

  switch(planet){
    case "mercury":
      info="Mercury ☿: Closest planet to the Sun. Very hot during the day.";
      break;
    case "venus":
      info="Venus ♀: The hottest planet due to its thick atmosphere.";
      break;
    case "earth":
      info="Earth 🌍: The only known planet with life.";
      break;
    case "mars":
      info="Mars 🔴: Known as the Red Planet. Scientists search for life here.";
      break;
    case "jupiter":
      info="Jupiter ♃: The largest planet in the solar system.";
      break;
    case "saturn":
      info="Saturn ♄: Famous for its beautiful rings.";
      break;
    case "uranus":
      info="Uranus ⛢: Rotates on its side.";
      break;
    case "neptune":
      info="Neptune ♆: The farthest planet from the Sun.";
      break;
  }

  document.getElementById("planet-info").innerText = info;
}
// ========================
//   FOOTER FACTS
// ========================
const spaceFacts = [
  "☀️ The Sun makes up 99.86% of the total mass of our Solar System.",
  "🪐 Saturn is so light it could float on water!",
  "🌍 Earth is the only planet not named after a Greek or Roman god.",
  "☿ A day on Mercury is longer than its year!",
  "♀️ Venus spins backwards compared to most planets.",
  "🔴 Mars has the largest dust storms in the Solar System.",
  "🌙 Jupiter's moon Ganymede is larger than the planet Mercury.",
  "🔵 Neptune has winds faster than 2,000 km/h.",
  "🌌 Light from the Sun takes 8 minutes to reach Earth.",
  "♄ Saturn has 146 known moons — more than any other planet."
];

let factIndex = 0;

function newFact() {
  factIndex = (factIndex + 1) % spaceFacts.length;
  document.getElementById('footer-fact').textContent = spaceFacts[factIndex];
}

// Show first fact on load
window.addEventListener('load', function () {
  document.getElementById('footer-fact').textContent = spaceFacts[0];
});