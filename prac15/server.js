const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Session configuration
app.use(
  session({
    secret: "library-portal-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

// Routes
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("login");
  }
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("login");
  }
});

app.post("/login", (req, res) => {
  const { name } = req.body;

  if (name && name.trim()) {
    // Create session with additional information
    req.session.user = {
      name: name.trim(),
      loginTime: new Date().toLocaleString(),
      sessionId: req.sessionID,
      loginTimestamp: new Date().getTime(),
    };

    console.log(
      `User logged in: ${name.trim()} at ${new Date().toLocaleString()}`
    );
    res.redirect("/profile");
  } else {
    res.render("login", { error: "Please enter your name to continue" });
  }
});

app.get("/profile", (req, res) => {
  if (req.session.user) {
    // Calculate session duration
    const sessionDuration = Date.now() - req.session.user.loginTimestamp;
    const minutes = Math.floor(sessionDuration / 60000);
    const seconds = Math.floor((sessionDuration % 60000) / 1000);

    const userWithDuration = {
      ...req.session.user,
      sessionDuration: `${minutes}m ${seconds}s`,
    };

    res.render("profile", { user: userWithDuration });
  } else {
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  const userName = req.session.user ? req.session.user.name : "Unknown";

  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.redirect("/profile");
    }

    console.log(
      `User logged out: ${userName} at ${new Date().toLocaleString()}`
    );
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.redirect("/login");
  });
});

app.listen(PORT, () => {
  console.log(`Library Portal running on http://localhost:${PORT}`);
});
