import sql from "../utils/db.js";
import { Router } from "express";

const registeration = Router();
// POST /Upload Info
registeration.post("/uploadRegist_Info", async (req, res) => {
    try {
        const data = req.body;

        // แปลง object เป็น array ตามลำดับ column
        const values = [
            data.name,
            data.surname,
            data.id,
            data.email,
            data.dob,
            data.phoneNumber,
            data.internet || null ,// ถ้าเป็น "" ให้เป็น null
            data.file_name,
        ];

        const sqlQuery = `
            INSERT INTO Registeration 
            (name, surname, id, email, dob, phonenumber, internet,file_name) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await sql.query(sqlQuery, values);
        console.log("Insert success:", result);
        res.json({ message: "Insert success", result });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Insert failed", error: err });
    }
});


// // POST /Upload Blob type
// registeration.post("/uploadRegist_Info/Certificate", (req, res) => {
//     const data = req.body;

//     res.json({
//         message: "User created",
//         received: data
//     });
// });

// // GET /Image from Blob type
// registeration.get("/getRegist_Info/Certificate", async (req, res) => {
//     res.json({
//         name: "Poomipat",
//         status: "active"
//     });
// });


// GET /Check Database
registeration.get("/getRegist_Info/CheckList", async (req, res) => {
    let {id} = req.query;
    const [rows] = await sql.query(
            "SELECT id FROM Registeration WHERE id = ?",
            [id]
    );
    if (rows.length > 0) {
        return res.status(200).json({ status: true });
    }else{
        return res.status(200).json({ status: false });
    }
});

export default registeration;
