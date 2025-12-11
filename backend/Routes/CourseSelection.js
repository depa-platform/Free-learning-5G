import sql from "../utils/db.js";
import { Router } from "express";

const CourseSelection = Router();

// GET courseName
CourseSelection.get("/getCourse", async (req, res) => {
    try {
        const [rows] = await sql.query(
            "SELECT * FROM 5G_DB.courseName"
        );

        // Combine course names into one JSON
        const courses = rows.map(row => row.courseName);

        return res.json({ courses }); // { "courses": ["testJa_1", "testJa_2", "testJa_3"] }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default CourseSelection