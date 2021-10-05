const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware;
app.use(cors())
// Getting data from client side (allowing us access to request.body)
app.use(express.json())

// ROUTES //
app.get("/locations/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const location = await pool.query("SELECT * FROM british_locations WHERE location_name = $1", [
            name
        ]);

        res.json(location.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
})

// Get location
// app.get()

app.listen(5000, () => {
    console.log("server started on port 5000")
})