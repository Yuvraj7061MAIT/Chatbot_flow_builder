# 💬 Chatbot Flow Builder

A visual chatbot flow builder built using **React** and **React Flow**, where users can create, connect, and configure messages visually. It supports dragging custom nodes, editing node content, and validating flow before saving

---

## ✨ Features

- ✅ Drag and drop message nodes
- ✅ Connect nodes with visual edges
- ✅ Edit message content via settings panel
- ✅ Save flow with validation logic
- ❌ Prevent saving if multiple nodes are unconnected
- 🧱 Built with modular, extensible architecture

---

## 🧠 Tech Stack

- **React**
- **React Flow**
- **React DnD** (or HTML5 drag & drop)
- **CSS Modules / Inline styles**
- **JavaScript** (or TypeScript if you choose)

---

## 📦 Folder Structure

```

src/
│
├── components/
│   ├── FlowBuilder.jsx
│   ├── NodePanel.jsx
│   ├── SettingsPanel.jsx
│   └── Toast.jsx
│
├── nodes/
│   └── SendMessageNode.jsx
│
└── App.js

````

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/chatbot-flow-builder.git
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The app runs at `http://localhost:3000`

---

## 🧩 How It Works

### 🟦 Nodes Panel

* Drag the **Message Node** into the canvas.
* Each node represents a message in the chatbot.

### 🟨 Connections

* Connect nodes by dragging edges from source handle to target handle.
* One outgoing edge per node; multiple incoming edges are allowed.

### 🟩 Settings Panel

* Click a node to open its **Settings Panel**.
* Edit the message text and click **Save & Back** to return.

### 🔴 Save Logic

* Click **Save Flow** button (top center)
* Shows error if multiple unconnected end nodes exist.
* Shows success toast if validation passes.

---

## 📌 Future Scope

* Add more node types (e.g., Image, Button, Input)
* Export/Import flow as JSON
* Backend integration for saving flow

---

## 🙌 Contributing

Feel free to open issues or submit PRs.

```bash
git checkout -b feature/your-feature
git commit -m "✨ Add new feature"
git push origin feature/your-feature
```

