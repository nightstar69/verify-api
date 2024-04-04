// Backend code to receive email from frontend and send request to Google Apps Script using Axios

const express = require("express");
const axios = require("axios");
// const nodemon = require("nodemon");
const app = express();
const port = 3000;

const cors = require('cors'); // Import the cors middleware
app.use(express.json());

app.use(cors()); // Enable CORS for all routes
app.post("/verify", async (req, res) => {
  try {
    const  email  = req.body.email;
    // console.log(req.body);
    // const email_code = email;
    const url = `https://script.google.com/macros/s/AKfycbw7WAK6ZuwIRfJXFNP1GUmFK-XZGIch-rjzpZqwKp6zUmqu8JAxMXjTLukFHngxL7Yaeg/exec?email=${email}`;
    // Send request to Google Apps Script using Axios
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error('Failed to verify certificate');
    }
    
    const data = response.data;
    const userDetails = data.data; // Extracting the first element from the data array
    // const { name, domain } = userDetails;
    
    // console.log('Email:', email);
    // console.log('Name:', name);
    // console.log('Domain:', domain);
    res.json(userDetails);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
