# 🎼 Tonalys – Piano Harmony Assistant

**Tonalys** is a Progressive Web App designed to help musicians, composers, and learners explore musical harmony. Powered by music theory and intelligent matching algorithms, Tonalys makes it easy to understand the relationship between scales, chords, and notes.

---

## ✨ Features

### 🎵 1. List All Musical Scales

Browse all available **scales**, including different **modes** such as:

- Major
- Minor (Natural)
- Dorian  
_(More modes coming soon!)_

Each scale is defined by its tonic and mode, and displays all the notes that compose it.

---

### 🎹 2. Get Compatible Chords for a Scale

For every scale, Tonalys automatically computes the **compatible chords** built on each degree of the scale.

- Example:  
  For `C Major`, you'll find chords like:  
  `C Major`, `D Minor`, `E Minor`, `F Major`, `G Major`, `A Minor`, `B Diminished`

---

### 🎼 3. Decompose Any Chord into Notes

Tonalys lets you explore the internal structure of any chord.

- Supported chord types:  
  `Major`, `Minor`, `Diminished`, `Augmented`, `Dom7`, `Maj7`, `Min7`

- Example:  
  `G7` = `G`, `B`, `D`, `F`

---

### 🎯 4. Find Matching Scales for Given Chords

Give Tonalys one or more chords, and it will find all the scales that include **all the notes of those chords**.

- Use case:  
  You wrote a progression like `D Minor → G7 → C Major` and want to know which scale(s) fit.

- Result:  
  `C Major`, `A Minor`, `D Dorian`, etc. (depending on matches)

---

## 🧱 Architecture (Backend)

Tonalys is built around a clean and extensible music theory engine, with:

- **Notes** – 12 chromatic steps, enharmonic aliases supported
- **Chord Types** – structured by intervals (e.g. Major = `[0, 4, 7]`)
- **Modes** – scale formulas by name (e.g. Minor = `[0, 2, 3, 5, 7, 8, 10]`)
- **Chords** – computed from root + type
- **Scales** – defined by tonic + mode, include compatibility logic

All operations are pure, cached, and testable.

---

## 🚀 Roadmap

- Add support for chord inversions and extensions
- Introduce more modes (Lydian, Mixolydian, etc.)
- Add piano visualizer and playback
- Add user favorites & history

---

## 🛠 Tech Stack

- **Frontend**: Angular + Ionic
- **Backend Logic**: TypeScript (Clean Architecture)
- **PWA**: Service Worker, Offline Support
- **Tests**: Jest (TDD-ready domain models)

---

## 📦 Installation (Dev)

```bash
git clone https://github.com/naofel-eal/tonalys.git
cd tonalys
npm install
npm start
```

---

## 🙌 Contribution
Tonalys is a personal learning project, but feedback, improvements and forks are always welcome.

---

## 📜 License
MIT – feel free to build on top of it.

---
