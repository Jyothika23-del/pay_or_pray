const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 3000;


// ==============================
// MIDDLEWARE
// ==============================

app.use(express.json());

app.use(express.static(__dirname));


// ==============================
// SAVE GAME RESULT
// ==============================

app.post("/save-result", (req, res) => {

    const gameData = req.body;

    console.log("Game Result Received:");
    console.log(gameData);


    // Create data object with date

    const result = {

        ...gameData,

        date: new Date().toLocaleString()

    };


    const filePath =
        path.join(__dirname, "data.json");


    let previousData = [];


    // Read existing data

    if (fs.existsSync(filePath)) {

        try {

            const fileData =
                fs.readFileSync(filePath, "utf8");

            if (fileData) {

                previousData =
                    JSON.parse(fileData);

            }

        } catch (error) {

            console.log(
                "Error reading data:",
                error
            );

        }

    }


    // Add new result

    previousData.push(result);


    // Save data

    fs.writeFileSync(

        filePath,

        JSON.stringify(
            previousData,
            null,
            2
        )

    );


    console.log(
        "Result saved successfully!"
    );


    res.json({

        success: true,

        message:
            "Game result saved successfully!"

    });

});


// ==============================
// START SERVER
// ==============================

app.listen(PORT, () => {

    console.log("");
    console.log("==============================");

    console.log(
        "Server is running!"
    );

    console.log(
        "Open: http://localhost:3000"
    );

    console.log("==============================");

});