const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "resume-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
  // Check MIME type
  if (file.mimetype === "application/pdf") {
    // Additional check for file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".pdf") {
      cb(null, true);
    } else {
      cb(new Error("File extension must be .pdf"), false);
    }
  } else {
    cb(
      new Error("Only PDF files are allowed! Please upload a PDF document."),
      false
    );
  }
};

// Configure multer with file size limit (2MB)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB in bytes
  },
  fileFilter: fileFilter,
});

// Serve static files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Resume upload endpoint
app.post("/upload-resume", (req, res) => {
  upload.single("resume")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      let message = "Upload failed.";

      if (err.code === "LIMIT_FILE_SIZE") {
        message =
          "📄 File too large! Please upload a PDF file smaller than 2MB.";
      } else if (err.code === "LIMIT_FILE_COUNT") {
        message = "📄 Too many files! Please upload one PDF file at a time.";
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message =
          "📄 Unexpected file field! Please use the correct upload form.";
      }

      return res.status(400).json({
        success: false,
        message: message,
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: `❌ ${err.message}`,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "📄 Please select a PDF file to upload.",
      });
    }

    // Log successful upload
    console.log(
      `Resume uploaded: ${req.file.filename} (${req.file.size} bytes)`
    );

    res.json({
      success: true,
      message:
        "🎉 Resume uploaded successfully! Your application has been received.",
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      uploadDate: new Date().toISOString(),
    });
  });
});

// Get uploaded resumes list
app.get("/resumes", (req, res) => {
  fs.readdir("./uploads", (err, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error reading uploads directory",
      });
    }

    const resumes = files.map((file) => ({
      filename: file,
      uploadDate: fs.statSync(`./uploads/${file}`).mtime,
    }));

    res.json({
      success: true,
      resumes: resumes,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Job Portal server running on http://localhost:${PORT}`);
});
