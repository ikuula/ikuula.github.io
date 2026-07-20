/* Dark-mode toggle.
   Loaded in <head> so the saved theme is applied before first paint (no flash).
   The toggle switch is injected to the left of the nav hamburger on load. */
(function () {
    var KEY = 'kuula-theme';

    // 1) Apply the saved theme immediately (runs during <head> parse).
    try {
        if (localStorage.getItem(KEY) === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }
    } catch (e) { /* localStorage unavailable — ignore */ }

    // 2) Build and wire the toggle button.
    function makeToggle() {
        var btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle dark mode');
        btn.innerHTML = '<span class="theme-toggle-track"><span class="theme-toggle-knob"></span></span>';
        btn.addEventListener('click', function () {
            var dark = document.documentElement.classList.toggle('dark-mode');
            try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (e) {}
        });
        return btn;
    }

    // 3) Insert it right after the hamburger. Both float right, so the toggle
    //    sits to the hamburger's left and stays put whether the menu is open or
    //    closed. (nav.js finds the menu via .siblings('ul'), so putting the
    //    toggle between the hamburger and the <ul> is safe.)
    function insertToggle() {
        if (document.getElementById('theme-toggle')) return;
        var nav = document.querySelector('nav.navy');
        if (!nav) return;
        var menuBtn = nav.querySelector('#menu-button');
        var toggle = makeToggle();
        if (menuBtn) {
            menuBtn.parentNode.insertBefore(toggle, menuBtn.nextSibling);
        } else {
            nav.appendChild(toggle);
        }
    }

    // nav.js injects #menu-button on DOM-ready; window 'load' fires after that.
    if (document.readyState === 'complete') {
        insertToggle();
    } else {
        window.addEventListener('load', insertToggle);
    }
})();
