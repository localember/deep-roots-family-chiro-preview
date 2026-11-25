(function () {
  "use strict";

  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-read-more]").forEach(function (btn) {
    var targetId = btn.getAttribute("aria-controls");
    var target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      target.hidden = expanded;
      btn.textContent = expanded ? "Read more" : "Read less";
    });
  });

  function goToThankYou(form) {
    var email = form.querySelector("#email");
    var fname = form.querySelector("#fname");
    var lname = form.querySelector("#lname");
    var hp = form.querySelector("#hpname");
    if (hp && hp.value) return;
    if (!fname.value.trim() || !lname.value.trim() || !email.value.trim() || !email.checkValidity()) {
      form.reportValidity();
      return;
    }
    window.location.href = "thank-you/";
  }

  document.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.target && event.target.id === "waitlist-form") {
        goToThankYou(event.target);
      }
      return false;
    },
    true
  );

  document.addEventListener(
    "click",
    function (event) {
      var el = event.target.closest("button[type='submit'], input[type='submit']");
      if (!el) return;
      event.preventDefault();
      event.stopPropagation();
      var form = el.form || el.closest("form");
      if (form && form.id === "waitlist-form") {
        goToThankYou(form);
      }
      return false;
    },
    true
  );
})();
