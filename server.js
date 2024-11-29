// // import express from "express";
// // import bodyParser from "body-parser";
// // import { createObjectCsvWriter } from "csv-writer";
// // import path from "path";

// // const app = express();
// // const PORT = 5173;

// // // Middleware to parse JSON and URL-encoded data
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // // Serve static files
// // app.use(express.static("ecommmerce"));

// // // Route to serve index.html for the root URL
// // app.get("/", (req, res) => {
// //     res.sendFile(path.resolve("register.html"));
// // });

// // // Define CSV Writer
// // const csvWriter = createObjectCsvWriter({
// //     path: "user_data.csv",
// //     header: [
// //         { id: "name", title: "Name" },
// //         { id: "email", title: "Email" },
// //     ],
// //     append: true,
// // });

// // // Handle registration
// // app.post("/register", async (req, res) => {
// //     const { name, email } = req.body;

// //     if (!name || !email) {
// //         return res.status(400).json({ message: "All fields are required!" });
// //     }

// //     try {
// //         await csvWriter.writeRecords([{ name, email }]);
// //         res.status(200).json({ message: "Registration successful!" });
// //     } catch (error) {
// //         console.error("Error writing to CSV:", error);
// //         res.status(500).json({ message: "Server error" });
// //     }
// // });

// // // Handle login
// // app.post("/login", (req, res) => {
// //     const { email } = req.body;

// //     if (!email) {
// //         return res.status(400).json({ message: "Email is required!" });
// //     }

// //     res.status(200).json({ message: "Login successful!" });
// // });

// // // Start server
// // app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// // });
// import express from "express";
// import bodyParser from "body-parser";
// import mysql from "mysql2";

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());

// // MySQL connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "", // Replace with your MySQL password
//     database: "user_database", // Replace with your database name
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err.stack);
//         return;
//     }
//     console.log("Connected to database.");
// });

// // Handle registration
// app.post("/register", (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: "All fields are required!" });
//     }

//     const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
//     db.query(query, [name, email, password], (err) => {
//         if (err) {
//             console.error("Error inserting data:", err);
//             return res.status(500).json({ message: "Database error." });
//         }
//         res.status(200).json({ message: "Registration successful!" });
//     });
// });

// // Handle login
// app.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "All fields are required!" });
//     }

//     const query = "SELECT * FROM users WHERE email = ? AND password = ?";
//     db.query(query, [email, password], (err, results) => {
//         if (err) {
//             console.error("Error querying database:", err);
//             return res.status(500).json({ message: "Database error." });
//         }

//         if (results.length > 0) {
//             res.status(200).json({ message: "Login successful!" });
//         } else {
//             res.status(401).json({ message: "Invalid email or password." });
//         }
//     });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
// import express from "express";
// import bodyParser from "body-parser";
// import { createObjectCsvWriter } from "csv-writer";

// const app = express();
// const PORT = 5173;

// // Middleware to parse JSON and URL-encoded data
// app.use(bodyParser.json());
// app.use(express.static("public"));

// // CSV Writer for login and registration data
// const loginCsvWriter = createObjectCsvWriter({
//     path: "login_data.csv",
//     header: [
//         { id: "email", title: "Email" },
//         { id: "password", title: "Password" },
//     ],
//     append: true,
// });

// const registerCsvWriter = createObjectCsvWriter({
//     path: "register_data.csv",
//     header: [
//         { id: "name", title: "Name" },
//         { id: "email", title: "Email" },
//         { id: "password", title: "Password" },
//     ],
//     append: true,
// });

// // Login API
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and password are required!" });
//     }

//     try {
//         // Append login data to CSV
//         await loginCsvWriter.writeRecords([{ email, password }]);
//         res.status(200).json({ message: "Login successful!" });
//     } catch (error) {
//         console.error("Error writing to CSV:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // Register API
// app.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: "All fields are required!" });
//     }

//     try {
//         // Append registration data to CSV
//         await registerCsvWriter.writeRecords([{ name, email, password }]);
//         res.status(200).json({ message: "Registration successful!" });
//     } catch (error) {
//         console.error("Error writing to CSV:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
import express from "express";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));

const loginCsvWriter = createObjectCsvWriter({
    path: path.join(path.resolve(), "login_data.csv"),
    header: [
        { id: "email", title: "Email" },
        { id: "password", title: "Password" },
    ],
    append: true,
});

const registerCsvWriter = createObjectCsvWriter({
    path: path.join(path.resolve(), "register_data.csv"),
    header: [
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "password", title: "Password" },
    ],
    append: true,
});

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "login.html"));
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    try {
        await loginCsvWriter.writeRecords([{ email, password }]);
        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Error writing to CSV:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        await registerCsvWriter.writeRecords([{ name, email, password }]);
        res.status(200).json({ message: "Registration successful!" });
    } catch (error) {
        console.error("Error writing to CSV:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
