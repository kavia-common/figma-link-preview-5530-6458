import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import DashboardFrame12322695 from "./pages/DashboardFrame12322695";

/**
 * Simple client-side router without extra deps.
 * Supports:
 *  - navigateTo(path) using History API
 *  - popstate handling
 */
function useSimpleRouter() {
  const [path, setPath] = useState(() => window.location.pathname || "/");

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigateTo = (nextPath) => {
    try {
      if (typeof nextPath !== "string") return;
      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, "", nextPath);
        setPath(nextPath);
      }
      // Shift focus to main content if available
      setTimeout(() => {
        const main = document.querySelector("main[role='main']") || document.getElementById("root");
        main && main.focus && main.focus();
      }, 0);
    } catch {
      // noop
    }
  };

  return { path, navigateTo };
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const { path, navigateTo } = useSimpleRouter();

  // Apply theme to :root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Route: Dashboard - frame
  if (path === "/dashboard-123-22695") {
    return (
      <div className="App">
        <header className="App-header" style={{ minHeight: "auto", padding: "16px 0" }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Back to Home for convenience */}
          <nav aria-label="Primary" style={{ marginTop: 64 }}>
            <button
              onClick={() => navigateTo("/")}
              className="App-link"
              style={{ background: "transparent", border: 0, cursor: "pointer" }}
              aria-label="Go to Home"
            >
              ← Back to Home
            </button>
          </nav>
        </header>

        {/* Dashboard Figma screen */}
        <DashboardFrame12322695 />
      </div>
    );
  }

  // Default Home
  return (
    <div className="App">
      <header className="App-header">
        {/* Skip link for keyboard users */}
        <a href="#app-main" className="visually-hidden">
          Skip to content
        </a>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <img src={logo} className="App-logo" alt="logo" />
        <p id="app-main" tabIndex="-1">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>

        {/* Quick entry to the new Dashboard route */}
        <p>
          <a
            href="/dashboard-123-22695"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/dashboard-123-22695");
            }}
            className="App-link"
            aria-label="Open Dashboard - frame (Figma 123:22695)"
          >
            View Dashboard - frame demo
          </a>
        </p>

        {/* Preserve existing link for tests */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
