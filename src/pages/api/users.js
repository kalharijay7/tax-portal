import fs from "fs";
import path from "path";
import { Client } from "@hubspot/api-client";

const filePath = path.join(process.cwd(), "users.json");

// initialize HubSpot client with API key (from .env.local)
const hubspotClient = new Client({ apiKey: process.env.HUBSPOT_ACCESS_TOKEN });

export default async function handler(req, res) {
    if (req.method === "GET") {
        // Read users
        const users = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
            : [];
        res.status(200).json(users);
    } else if (req.method === "POST") {
        // Load existing users
        const { user } = req.body;
        const users = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
            : [];

        const existingUser = users.find(
            (u) => u.email.toLowerCase() === user.email.toLowerCase()
        );

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Add a new user    
        users.push(user);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        // Save to HubSpot
        try {
            if (!process.env.HUBSPOT_ACCESS_TOKEN) {
                await hubspotClient.crm.contacts.basicApi.create({
                    properties: {
                        firstname: user.firstName,
                        lastname: user.lastName,
                        email: user.email,
                        user_type: user.userType,
                    },
                });
            }
        } catch (err) {
            console.error("Error saving to HubSpot:", err);
        }

        res.status(201).json({ message: "User added successfully" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}