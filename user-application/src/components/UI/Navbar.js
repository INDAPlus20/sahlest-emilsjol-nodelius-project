import React from "react";
import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav >
        <ul>
          <li>
            <NavLink activeClassName={styles.active} to="/" exact>Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/AudioRecording">Audio Recording</NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/FileAnalyzer">File Analyzer</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
