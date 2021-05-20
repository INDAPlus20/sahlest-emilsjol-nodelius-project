import React from "react";
import styles from "./Navbar.module.css";

import { NavLink, BrowserRouter as Router } from "react-router-dom";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav >
        <ul>
          <Router forceRefresh>
            <li>
                <NavLink activeClassName={styles.active} to="/" exact>Home</NavLink>
            </li>
          </Router>
          <li>
            <Router forceRefresh>
              <NavLink activeClassName={styles.active} to="/AudioRecording">Audio Recording</NavLink>
            </Router>
          </li>
          <li>
            <Router forceRefresh>
              <NavLink activeClassName={styles.active} to="/FileAnalyzer">File Analyzer</NavLink>
            </Router>
          </li>
          <li>
            <Router forceRefresh>
              <NavLink activeClassName={styles.active} to="/Chatbot">Chatbot</NavLink>
            </Router>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
