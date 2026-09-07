# Polling and Voting App

A simple and interactive Polling and Voting Web Application built using HTML5, CSS3, JavaScript, and LocalStorage.

Users can create polls with multiple options, vote on polls, and view live voting results through percentage-based progress bars.

## Features

- Create polls with a custom question
- Add multiple voting options
- Vote on available polls
- Prevent duplicate voting for the same poll
- Display live voting results
- Calculate vote percentages dynamically
- Display total votes
- Store poll data using LocalStorage
- Store voting status using LocalStorage
- Responsive design for desktop and mobile
- No external libraries or frameworks required

## Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage

## Project Structure

```text
polling-voting-app/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Download or clone this project.

2. Make sure all files are inside the same folder.

3. Open the following file in any modern web browser:

```text
index.html
```

4. The application will start running immediately.

No server, database, or additional installation is required.

## How to Use

### Create a Poll

1. Enter your question in the Poll Question field.
2. Enter at least two options.
3. Click the `+ Add Option` button to add more options if required.
4. Click the `Create Poll` button.
5. The newly created poll will appear under the Available Polls section.

### Vote on a Poll

1. Select one option from the poll.
2. Click the `Vote` button.
3. The selected option's vote count will increase.
4. The results will automatically update.

### View Results

Each poll displays:

- Option name
- Percentage of votes
- Number of votes
- Total number of votes
- Visual percentage bar

Example:

```text
JavaScript                         60.0%
████████████████████████████

Python                             40.0%
██████████████████

Total Votes: 10
```

## Vote Restriction

The application prevents users from voting more than once in the same poll.

When a user votes, the poll ID is stored in LocalStorage.

```javascript
localStorage.setItem(
    "votedPolls",
    JSON.stringify(votedPolls)
);
```

When the user tries to vote again, the application checks whether the poll ID already exists.

If the user has already voted, the Vote button becomes disabled and displays:

```text
Already Voted
```

## Data Storage

The application uses the browser's LocalStorage API to store poll information.

A poll is stored using JavaScript objects.

Example:

```javascript
{
    id: 123456789,
    question: "Which programming language do you prefer?",
    options: [
        {
            text: "JavaScript",
            votes: 5
        },
        {
            text: "Python",
            votes: 3
        },
        {
            text: "C++",
            votes: 2
        }
    ]
}
```

The stored data remains available even after refreshing the browser.

## Percentage Calculation

The percentage for each option is calculated dynamically using the following formula:

```text
Percentage = (Option Votes / Total Votes) × 100
```

For example, if a poll has 10 total votes and an option receives 6 votes:

```text
(6 / 10) × 100 = 60%
```

The application then uses this percentage to control the width of the result bar.

## LocalStorage

The application uses two LocalStorage entries.

### Poll Data

```text
polls
```

This stores:

- Poll ID
- Poll question
- Poll options
- Vote counts

### Voting Status

```text
votedPolls
```

This stores the IDs of polls that the user has already voted in.

This allows the application to prevent duplicate voting for each poll.

## Reset Application Data

To remove all polls and voting history, open the browser's Developer Console and run:

```javascript
localStorage.clear();
```

Then refresh the page.

Note: This will remove all data stored by this application in LocalStorage.

## Learning Objectives

This project helps practice the following concepts:

- HTML5 structure
- CSS3 styling
- Responsive web design
- JavaScript DOM manipulation
- JavaScript event handling
- Arrays
- Objects
- Functions
- Conditional statements
- Form handling
- State management
- LocalStorage API
- Dynamic HTML generation
- Data visualization
- Vote restriction logic

## Future Improvements

The project can be improved by adding:

- User authentication
- Backend database
- Cloud-based poll storage
- Poll sharing through unique links
- Poll expiration dates
- Anonymous voting
- Admin dashboard
- Pie charts and doughnut charts
- Real-time voting using WebSockets
- Delete poll functionality
- Edit poll functionality
- Export poll results
- Dark mode
- Search and filter functionality

## Project Objective

The main objective of this project is to build a functional polling system while practicing state management, data visualization, LocalStorage, and vote-restriction logic using vanilla JavaScript.

## Conclusion

The Polling and Voting App demonstrates how HTML, CSS, and JavaScript can be combined to create an interactive web application without using external frameworks or libraries.

The project provides a simple way to create polls, collect votes, prevent duplicate voting, and display results dynamically.

## License

This project is created for educational and learning purposes.

You are free to modify and improve this project for your own learning, portfolio, and practice.