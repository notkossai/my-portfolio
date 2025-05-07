//Side bar
let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const sideNav = document.querySelector(".side-nav");
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Scrolling down
      sideNav.style.opacity = "0.3";
    } else {
      // Scrolling up
      sideNav.style.opacity = "1";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
  });

//Typing Text
const lines = [
  "Innovating in the shadows,\nbuilding the systems of a new era.",
  "In a world built on code and chaos,\nwe forge clarity through innovation.",
  "Hidden behind every line of code,\nis a future waiting to be unleashed.",
  "Beyond the surface of the web,\na new world is being crafted."
];

let lineIndex = 0;
let charIndex = 0;
const typingSpeed = 50; // typing speed in ms
const delayBetweenLines = 2000; // time before typing next line
const typedTextElement = document.getElementById('typingText');

function typeLine() {
  if (charIndex < lines[lineIndex].length) {
    typedTextElement.innerHTML += lines[lineIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, typingSpeed);
  } else {
    setTimeout(() => {
      eraseLine();
    }, delayBetweenLines);
  }
}

function eraseLine() {
  if (charIndex > 0) {
    typedTextElement.innerHTML = lines[lineIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseLine, typingSpeed / 2);
  } else {
    lineIndex = (lineIndex + 1) % lines.length;
    setTimeout(typeLine, typingSpeed);
  }
}
typeLine();


// Toggle Mode 
const btn = document.getElementById('theme-toggle');
const logoImage = document.getElementById('logoNav');
let darkMode = true;

const themeVariables = [
  'bg',
  'section',
  'primaryText',
  'secondaryText',
  'borders',
  'accent1',
  'accent2',
  'icon',
  'shadow',
  'logo',
  'color1'
];

function switchTheme() {
  darkMode = !darkMode;
  themeVariables.forEach(variable => {
    const newValue = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${variable}-${darkMode ? 'dark' : 'light'}`).trim();
    document.documentElement.style.setProperty(`--${variable}`, newValue);
    });
//  document.querySelector("img.logoNav").src = darkMode ? "Logo/logo-white.png" : "Logo/logo-dark.png";
}

btn.addEventListener('click', switchTheme);



  // Custom smooth scroll with ease-out effect
function scrollToSection(id) {
  const navbarHeight = window.innerHeight * 0.065;
  const target = document.getElementById(id);
  const targetPosition = target.offsetTop - navbarHeight;
  const startPosition = window.scrollY || window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 150; // Scroll duration in milliseconds
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
}

function easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t*(t-2) + b;
}

  requestAnimationFrame(animation);
}
//Indicating Active Page
const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-list li');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id').replace('-page', '');
          
          navItems.forEach(li => {
            li.classList.remove('active');
            if (li.id === id) {
              li.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.6, // 60% of section should be visible
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });

// Map each button or link to its corresponding section
const scrollMap = {
  '#home': 'home-page',
  '.SN.home':'home-page',

  '#about': 'about-page',
  '.scroll-down.toAbout': 'about-page',
  '.SN.about':'about-page',

  '#skills': 'skills-page',
  '.scroll-down.toSkills': 'skills-page',
  '.SN.skill':'skills-page',

  '#projects': 'projects-page',
  '.scroll-down.toProjects': 'projects-page',
  '#view-projects': 'projects-page',
  '.SN.projects':'projects-page',

  '#contact': 'contact-page',
  '.scroll-down.toContact': 'contact-page',
  '.SN.contact' :'contact-page'
  
};

// Attach event listeners
for (const selector in scrollMap) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
      element.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToSection(scrollMap[selector]);
      });
  });
}

