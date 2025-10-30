# 📸 Where’s Waldo – Photo Tagging Game

A **full-stack web app** built with **Angular** and **Node.js**, inspired by the classic *Where’s Waldo* puzzle.
Players find and tag hidden characters in a large image — the faster they finish, the higher they rank on the leaderboard.

---

## 🧩 Overview

* Interactive photo tagging game with real-time feedback.
* Tracks player time and stores scores in a leaderboard.
* Responsive, smooth, and optimized for all devices.

---

## 🖥️ Tech Stack

**Frontend:** Angular

**Backend:** Node.js / Express

**Database:** PostgreSQL

---

## ⚙️ Core Features

* Click-based tagging with coordinate validation.
* Instant ✅ / ❌ feedback from the backend.
* Timer starts on image load, stops when all characters are found.
* Score submission + leaderboard tracking.
* Secure API with server-side time verification and input sanitization.

---

## 🧠 Game Flow

1. Player starts a new session.
2. Clicks image → selects a character.
3. Backend validates position → returns result.
4. All characters found → score recorded on leaderboard.
