import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "users.json");

export default function handler(req, res) {
    if (req.method === "GET") {
        // Read users
        const users = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
            : [];
        res.status(200).json(users);
    } else if (req.method === "POST") {
        // Add a new user
        const { user } = req.body;
        const users = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
            : [];
        users.push(user);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        res.status(201).json({ message: "User added successfully" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}