chrome.tabs.query(
  {
    active: true,
    lastFocusedWindow: true
  },
  function (tabs) {
    const urlRequired = "https://web.telegram.org/a/";
    var tab = tabs[0];
    const mainContent = document.querySelector(".main");
    if (tab.url === urlRequired) {
      var contentConfirm = document.createElement("div");
      contentConfirm.classList.add("contentConfirm");
      contentConfirm.innerHTML = "YOU ARE ALREADY AT HOME!";
      mainContent.appendChild(contentConfirm);
      chrome.action.setIcon({ tabId: tab.id, path: "images/active.png" });
      setTimeout(() => {
        window.close();
      }, 2000);
    } else {
      var contentRedirect = document.createElement("div");
      var a = document.createElement("a");
      a.href = urlRequired;
      contentRedirect.classList.add("contentRedirect");
      a.innerHTML = "Redirect to Home";
      mainContent.appendChild(contentRedirect);
      contentRedirect.appendChild(a);
      chrome.action.setIcon({ tabId: tab.id, path: "images/wait.png" });
    }
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      (function () {
        var ln = links[i];
        var location = ln.href;
        ln.onclick = function () {
          chrome.tabs.update({ active: true, url: location });
          window.close();
        };
      })();
    }
  }
);
