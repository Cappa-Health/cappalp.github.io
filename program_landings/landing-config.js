(function () {
  var cfg = Object.assign({}, window.LANDING_CONFIG || {});

  document.querySelectorAll("[data-config-text]").forEach(function (el) {
    var key = el.getAttribute("data-config-text");
    if (cfg[key]) {
      el.textContent = cfg[key];
    }
  });

  document.querySelectorAll("[data-config-href]").forEach(function (el) {
    var key = el.getAttribute("data-config-href");
    if (cfg[key]) {
      el.setAttribute("href", cfg[key]);
    }
  });

  document.querySelectorAll("[data-config-src]").forEach(function (el) {
    var key = el.getAttribute("data-config-src");
    if (cfg[key]) {
      el.setAttribute("src", cfg[key]);
    }
  });

  document.querySelectorAll("[data-config-alt]").forEach(function (el) {
    var key = el.getAttribute("data-config-alt");
    if (cfg[key]) {
      el.setAttribute("alt", cfg[key]);
    }
  });

  document.querySelectorAll("[data-config-mailto]").forEach(function (el) {
    var key = el.getAttribute("data-config-mailto");
    if (cfg[key]) {
      el.setAttribute("href", "mailto:" + cfg[key]);
      el.textContent = cfg[key];
    }
  });

  document.querySelectorAll("[data-config-html]").forEach(function (el) {
    var key = el.getAttribute("data-config-html");
    if (cfg[key]) {
      el.innerHTML = cfg[key];
    }
  });

  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildAccordion(locations, el) {
    var accordionId = el.id || "accordion";
    el.innerHTML = locations
      .map(function (loc) {
        var safeId = loc.city.replace(/[^a-zA-Z0-9]/g, "");
        var headingId = "heading" + safeId;
        var collapseId = "collapse" + safeId;
        var bodyHtml = loc.providers
          .map(function (p) {
            return (
              "<strong>" + escHtml(p.name) + "</strong>\n" + escHtml(p.details)
            );
          })
          .join("\n\n");
        return (
          '<div class="panel panel-default">' +
          '<div class="panel-heading" id="' +
          headingId +
          '">' +
          '<h4 class="panel-title">' +
          '<a class="collapsed" role="button" data-toggle="collapse"' +
          ' data-parent="#' +
          accordionId +
          '"' +
          ' href="#' +
          collapseId +
          '"' +
          ' aria-expanded="false"' +
          ' aria-controls="' +
          collapseId +
          '">' +
          "<strong>" +
          escHtml(loc.city) +
          "</strong>" +
          "</a>" +
          "</h4>" +
          "</div>" +
          '<div id="' +
          collapseId +
          '" class="panel-collapse collapse"' +
          ' aria-labelledby="' +
          headingId +
          '">' +
          '<div class="panel-body" style="white-space: pre-wrap">' +
          bodyHtml +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  document.querySelectorAll("[data-config-locations]").forEach(function (el) {
    var key = el.getAttribute("data-config-locations");
    if (cfg[key] && cfg[key].length) {
      buildAccordion(cfg[key], el);
    }
  });

  function bindGetStartedModal() {
    var button = document.getElementById("get-started");
    if (!button) {
      return;
    }

    button.addEventListener("click", function () {
      if (window.jQuery && window.jQuery.fn && window.jQuery.fn.modal) {
        window.jQuery("#inquiry-form").modal("show");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindGetStartedModal);
  } else {
    bindGetStartedModal();
  }
})();
