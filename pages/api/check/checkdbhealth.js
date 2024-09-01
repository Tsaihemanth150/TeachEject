// pages/api/checkdbhealth.js

import { connect } from "@/dbConfig/dbConfig"; // Import the connect function from your database utility file

export default async function handler(req, res) {
  try {
    const isConnected = await connect(); // Call the connect function to check the database status
    if (isConnected) {
      res.status(200).json({ message: "Database is connected." });
    } else {
      res.status(500).json({ message: "Failed to connect to the database." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
