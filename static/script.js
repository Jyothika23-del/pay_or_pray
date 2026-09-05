/* =========================
   VARIABLES
========================= */

let participants = [];
let selectedMethod = "";
let currentWinnerIndex = -1;

/* =========================
   PAGE NAVIGATION
========================= */

function goToPage(pageNumber) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document
        .getElementById("page" + pageNumber)
        .classList.add("active");
}


/* =========================
   FUNNY COMMENTS
========================= */

const funnyMessages = [

    "Decision edukkan pattunnille? Skill issue. 😌",
    "Your money is NOT safe here. 💸",
    "Trust the process. Actually... don't.",
    "Ith oru bad financial decision aakaan chance und. 💀",
    "Good luck. You'll definitely need it.",
    "Life already confusing alle? Kurach koodi aakkam.",
    "Ninte fate ippo njangalde kayyil aanu 👀",
    "Paisa poyaal software-ne blame cheyyaruthu.",
    "Nee ivide vannath thanne oru red flag aanu. 🚩",
    "At least this is more fun than studying. 😭",
    "Please don't cry. Yet.",
    "Somebody is paying today. We just don't know who."

];

let messageIndex = 0;

setInterval(() => {

    const text = document.getElementById("funnyText");

    if (!text) return;

    text.style.opacity = "0";

    setTimeout(() => {

        messageIndex++;

        text.textContent =
            funnyMessages[
                messageIndex % funnyMessages.length
            ];

        text.style.opacity = "1";

    }, 250);

}, 2500);


/* =========================
   ADD PARTICIPANT
========================= */

function addParticipant() {

    const input =
        document.getElementById("nameInput");

    const name =
        input.value.trim();

    if (name === "") {

        alert("Oru peru engilum kodukkeda 😭");
        return;

    }

    if (participants.includes(name)) {

        alert("Ith already undallo 👀");
        return;

    }

    participants.push(name);

    input.value = "";

    displayParticipants();
}


/* =========================
   DISPLAY PARTICIPANTS
========================= */

function displayParticipants() {

    const container =
        document.getElementById("participants");

    container.innerHTML = "";

    participants.forEach((name, index) => {

        const div =
            document.createElement("div");

        div.className = "participant";

        div.innerHTML = `
            ${name}
            <button onclick="removeParticipant(${index})">
                ×
            </button>
        `;

        container.appendChild(div);

    });
}


/* =========================
   REMOVE PARTICIPANT
========================= */

function removeParticipant(index) {

    participants.splice(index, 1);

    displayParticipants();
}


/* =========================
   PAGE 3 → PAGE 4
========================= */

function goToMethodPage() {

    const amount =
        document.getElementById("amount").value;

    if (!amount || amount <= 0) {

        alert("Amount enter cheyyu da 💸");
        return;

    }

    if (participants.length < 2) {

        alert("At least 2 participants venam 😭");
        return;

    }

    goToPage(4);
}


/* =========================
   SELECT METHOD
========================= */

function selectMethod(method, card) {

    selectedMethod = method;

    document
        .querySelectorAll(".method")
        .forEach(item => {

            item.classList.remove("selected");

        });

    card.classList.add("selected");

    document
        .getElementById("fateButton")
        .classList.remove("disabled");
}


/* =========================
   START GAME
========================= */

function startGame() {

    if (!selectedMethod) return;

    goToPage(5);

    document.getElementById("wheelResult").style.display = "none";
    document.getElementById("diceResult").style.display = "none";
    document.getElementById("chitResult").style.display = "none";
    document.getElementById("finalResult").style.display = "none";


    if (selectedMethod === "wheel") {

        document.getElementById("wheelResult").style.display = "block";

        createWheel();

        setTimeout(() => {
            spinWheel();
        }, 300);

    }


    else if (selectedMethod === "dice") {

        document.getElementById("diceResult").style.display = "block";

        createDiceNames();

        setTimeout(() => {
            rollDice();
        }, 300);

    }


    else if (selectedMethod === "chit") {

        document.getElementById("chitResult").style.display = "block";

        setTimeout(() => {
            pickChit();
        }, 300);

    }
}


/* =========================
   CHIT GAME
========================= */

function pickChit() {

    const pickedChit =
        document.getElementById("pickedChit");

    const bowl =
        document.querySelector(".bowl-glass");


    /* RANDOM WINNER */

    const winnerIndex =
        Math.floor(
            Math.random() * participants.length
        );

    const winner =
        participants[winnerIndex];


    /* RESET CHIT */

    pickedChit.classList.remove("pick-animation");

    pickedChit.style.opacity = "0";

    pickedChit.textContent = "?";


    /* SHAKE BOWL */

    if (bowl) {

        bowl.classList.remove("bowl-shake");

        void bowl.offsetWidth;

        bowl.classList.add("bowl-shake");

    }


    /* CHIT COMES OUT */

    setTimeout(() => {

        pickedChit.style.opacity = "1";

        void pickedChit.offsetWidth;

        pickedChit.classList.add("pick-animation");

    }, 1800);


    /* SHOW NAME */

    setTimeout(() => {

        pickedChit.textContent =
            winner.toUpperCase();

    }, 3500);


    /* FINAL RESULT */

    setTimeout(() => {

        showWinner(winnerIndex);

    }, 5200);

}


/* =========================
   DICE NAMES
========================= */

function createDiceNames() {

    const container =
        document.getElementById("diceNames");

    container.innerHTML = "";


    participants.forEach((name, index) => {

        const div =
            document.createElement("div");

        div.className = "dice-person";

        div.id =
            "dice-person-" + index;

        div.innerHTML = `
            <span>${index + 1}</span>
            ${name}
        `;

        container.appendChild(div);

    });
}


/* =========================
   DICE GAME
========================= */

function rollDice() {

    const dice =
        document.getElementById("dice");

    const number =
        document.getElementById("diceNumber");


    const winnerIndex =
        Math.floor(
            Math.random() * participants.length
        );

    const result =
        winnerIndex + 1;


    dice.style.animation = "none";

    void dice.offsetWidth;

    dice.style.animation =
        "diceRoll 2s ease";


    let count = 0;


    const interval =
        setInterval(() => {

            const randomNumber =
                Math.floor(
                    Math.random() *
                    participants.length
                ) + 1;

            number.textContent =
                randomNumber;

            count++;


            if (count >= 12) {

                clearInterval(interval);

                number.textContent =
                    result;


                document
                    .querySelectorAll(".dice-person")
                    .forEach(person => {

                        person.classList.remove(
                            "active-person"
                        );

                    });


                document
                    .getElementById(
                        "dice-person-" + winnerIndex
                    )
                    .classList.add(
                        "active-person"
                    );


                setTimeout(() => {

                    showWinner(winnerIndex);

                }, 700);

            }

        }, 150);

}


/* =========================
   CREATE WHEEL
========================= */

function createWheel() {

    const wheel = document.getElementById("wheel");

    wheel.innerHTML = "";

    const total = participants.length;

    if (total === 0) return;

    const angle = 360 / total;


    // Wheel colors

    const colors = [
        "#ff8fab",
        "#f9c74f",
        "#90be6d",
        "#577590",
        "#cdb4db",
        "#f4a261"
    ];


    // Create wheel background

    let gradient = "conic-gradient(";

    participants.forEach((name, index) => {

        const start = index * angle;
        const end = (index + 1) * angle;

        gradient +=
            `${colors[index % colors.length]} ${start}deg ${end}deg,`;

    });

    gradient = gradient.slice(0, -1) + ")";

    wheel.style.background = gradient;


    // Add names

    participants.forEach((name, index) => {

        const nameElement =
            document.createElement("div");

        nameElement.className = "wheel-name";

        nameElement.textContent = name;


        // Center of each slice

        const rotation =
            index * angle + angle / 2;


        nameElement.style.transform = `
            rotate(${rotation}deg)
            translateY(-115px)
            rotate(${-rotation}deg)
        `;


        wheel.appendChild(nameElement);

    });


    // Center circle

    const center =
        document.createElement("div");

    center.className = "wheel-center";

    center.textContent = "💸";

    wheel.appendChild(center);


    // Reset wheel

    wheel.style.transition = "none";

    wheel.style.transform = "rotate(0deg)";

}


/* =========================
   SPIN WHEEL - CORRECT WINNER
========================= */

function spinWheel() {

    const wheel = document.getElementById("wheel");

    if (!wheel || participants.length === 0) {
        return;
    }


    // Select ONE winner

    currentWinnerIndex =
        Math.floor(
            Math.random() * participants.length
        );


    const total = participants.length;

    const sliceAngle = 360 / total;


    // Center position of winner slice

    const winnerCenter =
        currentWinnerIndex * sliceAngle +
        sliceAngle / 2;


    // Reset animation

    wheel.style.transition = "none";

    wheel.style.transform = "rotate(0deg)";

    void wheel.offsetWidth;


    // Spin animation

    wheel.style.transition =
        "transform 4s cubic-bezier(.12,.75,.15,1)";


    /*
       Pointer is at TOP.

       Move winner slice to TOP.
    */

    const extraSpins = 360 * 6;

    const finalRotation =
        extraSpins +
        (360 - winnerCenter);


    // Start spinning

    wheel.style.transform =
        `rotate(${finalRotation}deg)`;


    // Show EXACT SAME winner

    setTimeout(() => {

        showWinner(currentWinnerIndex);

    }, 4200);

}
/* =========================
   SHOW WINNER
========================= */

function showWinner(index) {

    const winnerIndex =
        index !== undefined
            ? index
            : Math.floor(
                Math.random() *
                participants.length
            );


    const winner =
        participants[winnerIndex];


    const amount =
        document.getElementById("amount").value;


    document.getElementById("wheelResult")
        .style.display = "none";

    document.getElementById("diceResult")
        .style.display = "none";

    document.getElementById("chitResult")
        .style.display = "none";


    document.getElementById("winnerName")
        .textContent =
        winner.toUpperCase();


    document.getElementById("winnerAmount")
        .textContent =
        "₹" + amount;


    const resultMessages = [

        "Congratulations! You have been financially selected. 💀",

        "The universe chose you. Sorry. 😭",

        "Your wallet is crying somewhere. 💸",

        "Don't blame us. Blame fate. 👀",

        "Today you pay. Tomorrow... probably you still pay.",

        "Congratulations! You lost! 🎉",

        "Fate said: ithaan ningalude turn. 😌",

        "Bro really thought they were safe. 💀",

        "Plot twist: it was you all along.",

        "Paisa poyi. Character development vannu. 😭"

    ];


    const randomMessage =
        resultMessages[
            Math.floor(
                Math.random() *
                resultMessages.length
            )
        ];


    document.getElementById("resultMessage")
        .textContent =
        randomMessage;


    document.getElementById("finalResult")
        .style.display =
        "block";


    /* =========================
       SAVE RESULT TO BACKEND
    ========================= */

    saveGameResult(
        winner,
        amount,
        selectedMethod,
        participants
    );

}


/* =========================
   SAVE RESULT
========================= */

function saveGameResult(
    loser,
    amount,
    method,
    participantList
) {

    fetch("/save-result", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body: JSON.stringify({

            loser: loser,

            amount: amount,

            method: method,

            participants: participantList

        })

    })

    .then(response =>
        response.json()
    )

    .then(data => {

        console.log(
            "Saved:",
            data
        );

    })

    .catch(error => {

        console.log(
            "Backend not connected:",
            error
        );

    });

}


/* =========================
   PLAY AGAIN
========================= */

function playAgain() {

    selectedMethod = "";


    document
        .querySelectorAll(".method")
        .forEach(card => {

            card.classList.remove("selected");

        });


    document
        .getElementById("fateButton")
        .classList.add("disabled");


    goToPage(4);

}


/* =========================
   HOME
========================= */

function goHome() {

    participants = [];

    selectedMethod = "";


    document.getElementById("amount")
        .value = "";


    document.getElementById("nameInput")
        .value = "";


    displayParticipants();


    document
        .querySelectorAll(".method")
        .forEach(card => {

            card.classList.remove("selected");

        });


    document
        .getElementById("fateButton")
        .classList.add("disabled");


    goToPage(1);

}


/* =========================
   ENTER KEY
========================= */

document
    .getElementById("nameInput")
    .addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                addParticipant();

            }

        }
    );