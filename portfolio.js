function scrollToSection(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var y = el.getBoundingClientRect().top + window.pageYOffset - 60;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

var html = document.documentElement;
var themeBtn = document.getElementById('themeBtn');
html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
themeBtn.addEventListener('click', function() {
  var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
document.querySelectorAll('#hero .reveal').forEach(function(el) { el.classList.add('in'); });

document.addEventListener("DOMContentLoaded", () => {
  const terminalIntro = document.getElementById("terminalIntro");
  const terminalText = document.getElementById("terminalText");
  const terminalPrompt = document.getElementById("pressEnter");
  const hero = document.getElementById("hero");

  if (!terminalIntro || !terminalText || !terminalPrompt || !hero) return;

  const text = "Théo Mayer — Portfolio\n";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      terminalText.innerHTML += text[i++];
      setTimeout(typeWriter, 100);
    } else {
      terminalPrompt.classList.remove("hidden");
      window.addEventListener("keydown", continueSite);
      window.addEventListener("touchstart", continueSite);
    }
  }

  function continueSite(e) {
    if (e.key === "Enter" || e.type === "touchstart") {
      terminalIntro.style.display = "none";
      hero.style.display = "block";
      window.removeEventListener("keydown", continueSite);
      window.removeEventListener("touchstart", continueSite);
    }
  }

  typeWriter();
});

async function handleSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  var btn = form.querySelector('.form-submit');
  btn.textContent = 'Envoi...';
  btn.disabled = true;

  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    form.reset();
    success.classList.remove('hidden');
    setTimeout(function() { success.classList.add('hidden'); }, 4000);
  } else {
    alert('Erreur lors de l\'envoi, réessaie.');
  }
  btn.textContent = 'Envoyer le message';
  btn.disabled = false;
}