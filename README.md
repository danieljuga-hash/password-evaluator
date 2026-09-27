# password evaluator
My very first personal project as a Cyber Security student!  A privacy-first password evaluator built with Zero-Knowledge architecture and k-Anonymity protocol.

#  Secure-First Password Evaluator

**Hello, I'm Daniel, a Cyber Security student, and this is my very first software development project!**

As someone deeply passionate about digital defense, I wanted my first public project to solve a fundamental security issue: *How do we help users evaluate their password strength without ever exposing their actual passwords to the internet?* 

Most basic password checkers rely on simple regex rules (like checking for one uppercase letter and a number). I wanted to build something closer to a real-world security tool. This project evaluates password entropy locally and checks against global data breaches, all while maintaining absolute user privacy by design.

###  Security & Privacy Features

*   **Zero-Knowledge Architecture:** The password strength calculation utilizes Dropbox's `zxcvbn` algorithm and runs entirely locally on the client side. Your raw password never leaves your browser.
*   **k-Anonymity Protocol:** To check if a password has been compromised in known data breaches, this application uses the Web Crypto API to hash the input into SHA-1. It then sends **only the first 5 characters** of that hash to the *Have I Been Pwned* API. The server never receives your full hash or password, guaranteeing that your data remains anonymous and secure.
*   **Real-time Entropy Analysis:** Detects common dictionary words, names, and predictable patterns rather than just character types, providing a realistic "time to crack" estimation.

###  Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (No heavy frameworks)
*   **Cryptography:** Native Web Crypto API
*   **Logic & Integration:** `zxcvbn` library, Fetch API

###  Live Demo

You can try the live version of this project here: 
https://github.com/danieljuga-hash/password-evaluator

---
*Built with passion as part of my journey into Cyber Security and Software Development.*
