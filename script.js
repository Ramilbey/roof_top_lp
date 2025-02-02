import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL bilan bog‘lanish
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rooftop_energy"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// ✅ Callback so‘rovni qabul qilish
app.post("/callback", (req, res) => {
    const { name, contact } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ message: "Name and contact are required" });
    }

    const query = "INSERT INTO callbacks (name, contact) VALUES (?, ?)";
    db.query(query, [name, contact], (err, result) => {
        if (err) {
            console.error("Error inserting into database:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Callback request saved successfully" });
    });
});

// ✅ Serverni ishga tushirish
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
