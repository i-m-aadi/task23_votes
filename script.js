const pollForm = document.getElementById("pollForm");
const questionInput = document.getElementById("question");
const optionsContainer = document.getElementById("optionsContainer");
const addOptionButton = document.getElementById("addOption");
const pollsContainer = document.getElementById("pollsContainer");


let polls = JSON.parse(localStorage.getItem("polls")) || [];


addOptionButton.addEventListener("click", function () {

    const optionCount =
        optionsContainer.querySelectorAll(".option").length;

    const newOption = document.createElement("input");

    newOption.type = "text";
    newOption.className = "option";
    newOption.placeholder = `Option ${optionCount + 1}`;

    optionsContainer.appendChild(newOption);
});

pollForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const question = questionInput.value.trim();

    const optionInputs =
        optionsContainer.querySelectorAll(".option");

    const options = [];

    optionInputs.forEach(function (input) {

        const value = input.value.trim();

        if (value !== "") {

            options.push({
                text: value,
                votes: 0
            });

        }

    });

  
    if (question === "") {
        alert("Please enter a poll question.");
        return;
    }

    if (options.length < 2) {
        alert("A poll must have at least two options.");
        return;
    }

    const newPoll = {

        id: Date.now(),

        question: question,

        options: options

    };

  
    polls.push(newPoll);

 
    savePolls();

    pollForm.reset();


    optionsContainer.innerHTML = `
        <input
            type="text"
            class="option"
            placeholder="Option 1"
            required
        >

        <input
            type="text"
            class="option"
            placeholder="Option 2"
            required
        >
    `;


    displayPolls();

    alert("Poll created successfully!");

});

function savePolls() {

    localStorage.setItem(
        "polls",
        JSON.stringify(polls)
    );

}


function displayPolls() {

    pollsContainer.innerHTML = "";

    if (polls.length === 0) {

        pollsContainer.innerHTML = `
            <div class="empty-message">
                <p>No polls available.</p>
                <p>Create your first poll above!</p>
            </div>
        `;

        return;
    }

    polls.forEach(function (poll) {

        const pollCard = createPollElement(poll);

        pollsContainer.appendChild(pollCard);

    });

}

// ==========================================
// Create Poll HTML
// ==========================================

function createPollElement(poll) {

    const card = document.createElement("div");

    card.className = "poll-card";

    const alreadyVoted = hasVoted(poll.id);

    let optionsHTML = "";

    poll.options.forEach(function (option, index) {

        optionsHTML += `
            <label class="poll-option">

                <input
                    type="radio"
                    name="poll-${poll.id}"
                    value="${index}"
                    ${alreadyVoted ? "disabled" : ""}
                >

                <span>${escapeHTML(option.text)}</span>

            </label>
        `;

    });

    card.innerHTML = `

        <h3>${escapeHTML(poll.question)}</h3>

        <div class="options">
            ${optionsHTML}
        </div>

        <button
            class="vote-btn"
            onclick="vote(${poll.id})"
            ${alreadyVoted ? "disabled" : ""}
        >
            ${alreadyVoted ? "Already Voted" : "Vote"}
        </button>

        <div class="results">

            <h4>Live Results</h4>

            ${createResultsHTML(poll)}

        </div>

        ${
            alreadyVoted
                ? `
                    <div class="voted-message">
                        ✓ You have already voted in this poll.
                    </div>
                `
                : ""
        }

    `;

    return card;

}


function createResultsHTML(poll) {

    const totalVotes = poll.options.reduce(
        function (total, option) {
            return total + option.votes;
        },
        0
    );

    let resultsHTML = "";

    poll.options.forEach(function (option) {

        let percentage = 0;

        if (totalVotes > 0) {

            percentage =
                (option.votes / totalVotes) * 100;

        }

        resultsHTML += `

            <div class="result-item">

                <div class="result-header">

                    <span>
                        ${escapeHTML(option.text)}
                    </span>

                    <strong>
                        ${percentage.toFixed(1)}%
                    </strong>

                </div>

                <div class="progress-container">

                    <div
                        class="progress-bar"
                        style="width: ${percentage}%"
                    ></div>

                </div>

                <small>
                    ${option.votes}
                    ${option.votes === 1 ? "vote" : "votes"}
                </small>

            </div>

        `;

    });

    resultsHTML += `

        <div class="total-votes">
            Total Votes: ${totalVotes}
        </div>

    `;

    return resultsHTML;

}

// ==========================================
// Vote
// ==========================================

function vote(pollId) {

    // Find poll
    const poll = polls.find(function (item) {

        return item.id === pollId;

    });

    if (!poll) {

        alert("Poll not found.");

        return;

    }

    // Check if user already voted
    if (hasVoted(pollId)) {

        alert("You have already voted in this poll.");

        return;

    }

    // Find selected option
    const selectedOption = document.querySelector(
        `input[name="poll-${pollId}"]:checked`
    );

    if (!selectedOption) {

        alert("Please select an option before voting.");

        return;

    }

    const optionIndex =
        Number(selectedOption.value);

    // Increase vote count
    poll.options[optionIndex].votes++;

    // Mark this poll as voted
    markAsVoted(pollId);

    // Save updated data
    savePolls();

    // Refresh UI
    displayPolls();

}

function hasVoted(pollId) {

    const votedPolls =
        JSON.parse(
            localStorage.getItem("votedPolls")
        ) || [];

    return votedPolls.includes(pollId);

}

// ==========================================
// Mark Poll As Voted
// ==========================================

function markAsVoted(pollId) {

    let votedPolls =
        JSON.parse(
            localStorage.getItem("votedPolls")
        ) || [];

    votedPolls.push(pollId);

    localStorage.setItem(
        "votedPolls",
        JSON.stringify(votedPolls)
    );

}

// ==========================================
// Security Helper
// ==========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
displayPolls();