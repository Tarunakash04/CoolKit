# CoolKit — The Operating System for Student Clubs

**CoolKit** is a centralized digital platform designed to help student clubs and communities manage their operations efficiently. It provides a clean, card-based dashboard for members, a dedicated workspace for each club, and role-based membership management.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Problem Statement](#problem-statement)
4. [Installation & Setup](#installation--setup)
5. [Usage](#usage)
6. [Technology Stack](#technology-stack)
7. [Future Roadmap](#future-roadmap)
8. [License](#license)

---

## Project Overview

Student clubs often rely on multiple disconnected tools for communication, event management, and member coordination, resulting in inefficient workflows and missed updates. **CoolKit** provides a unified platform where users can:

- View all clubs they are part of on a personalized dashboard
- Create new clubs or join existing ones
- Access dedicated workspaces for each club with organized features
- Manage roles and permissions within clubs

The platform is designed to be scalable, allowing easy integration of advanced collaboration tools in future releases.

---

## Features

- **Secure Google Sign-In** — quick and reliable authentication
- **Personalized Dashboard** — shows all clubs a user is part of using interactive cards
- **Create & Join Clubs** — easy onboarding for new and existing communities
- **Dedicated Club Workspaces** — each club has its own space for collaboration
- **Role-Based Membership** — differentiates between administrators and regular members
- **Interactive Card-Based UI** — clean design with hover animations and responsive layouts
- **Future-Proof Architecture** — allows integration of events, messaging, and file sharing

---

## Problem Statement

Clubs and student organizations struggle with fragmented workflows:  
- Multiple apps for messaging, events, and resources  
- Disorganized communication  
- Inefficient management of members and tasks  

**CoolKit** solves this by consolidating these tools into a single, user-friendly platform.

---

## Installation & Setup

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/CoolKit.git
cd CoolKit
```

2. **Install Dependencies**
```bash
npm install
```
*(if using React or Node backend; otherwise just open `index.html` in browser for static version)*

3. **Configure Firebase**
- Go to [Firebase Console](https://console.firebase.google.com/) and create a new project
- Enable Firestore and Authentication (Google Sign-In)
- Replace `firebaseConfig` in `script.js` with your project credentials

4. **Run the Application**
- **Static Version:** Open `index.html` in a browser  
- **React Version (future):**  
```bash
npm start
```

---

## Usage

- Log in using Google account
- Access your personalized dashboard with all enrolled clubs
- Click a club card to enter its workspace
- Create or join new clubs using the buttons above the club list
- Manage roles, resources, and features within each club workspace (admin only)

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

**Tagline:** *CoolKit — The Operating System for Student Clubs.*