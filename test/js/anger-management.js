let currentQuestion = 0;
let totalScore = 0;

const questions = [
    {
        question: "How often do you feel angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How intense is your anger when you experience it?",
        options: [
            { text: "Not intense at all", score: 0 },
            { text: "Mildly intense", score: 1 },
            { text: "Moderately intense", score: 2 },
            { text: "Very intense", score: 3 },
            { text: "Extremely intense", score: 4 }
        ]
    },
    {
        question: "How often do you find yourself becoming angry at minor annoyances?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do specific people or situations often make you angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you find it difficult to control your anger?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you raise your voice when you're angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you ever lash out physically when you're angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you hold grudges against others?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you find yourself feeling angry about past events?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you ever take out your anger on others?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you regret things you said or did while angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you experience physical symptoms such as increased heart rate or tightness in your chest when you're angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you feel the need to walk away from a situation to avoid getting angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you ever find it hard to control your anger without yelling or shouting?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you find yourself feeling angry for no apparent reason?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you blame others for your anger?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you find yourself unable to calm down quickly when you're angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you experience anger outbursts that seem excessive for the situation?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you struggle with forgiving others?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you find yourself holding onto anger even when it doesn't serve you?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you express your anger through physical aggression?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you find yourself struggling to sleep because of anger?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you find it challenging to express your anger in a healthy way?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you find it difficult to let go of anger once it arises?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "Do you experience feelings of guilt or regret after expressing your anger?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How often do you avoid situations because you anticipate becoming angry?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    }
];

const maxScore = questions.reduce((total, question) => {
    const maxOptionScore = Math.max(...question.options.map(option => option.score));
    return total + maxOptionScore;
}, 0);
console.log(maxScore)

function scrollTo(divId) {
    const divElement = document.getElementById(divId);
    if (divElement) {
        divElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    } else {
        console.error(`Element with ID '${divId}' not found.`);
    }
}

function displayQuestion() {
    const currentQuestionObj = questions[currentQuestion];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');

    questionText.textContent = `${currentQuestionObj.question} (${currentQuestion + 1}/26)`;
    optionsContainer.innerHTML = '';

    currentQuestionObj.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option.text;
        optionButton.addEventListener('click', () => selectOption(option.score));
        optionsContainer.appendChild(optionButton);
    });

    if (currentQuestion === questions.length - 1) {
        const optionButtons = document.querySelectorAll('#optionsContainer button');
        optionButtons.forEach(button => {
            button.disabled = true;
        });
        const seeScoreButton = document.getElementById('seeScoreButton')
        seeScoreButton.disabled = false;
        scrollTo('getScore');
        const scorePercentage = (totalScore / maxScore) * 100;
        const ranges = document.querySelectorAll('.range');

        for (let i = 0; i < ranges.length; i++) {
            const range = ranges[i];
            const innerElement = range.querySelector('.inner');
            const rangeValues = innerElement.id.split('-');
            const rangeStart = parseInt(rangeValues[0]);
            const rangeEnd = parseInt(rangeValues[1]);

            if (scorePercentage >= rangeStart && scorePercentage <= rangeEnd) {
                innerElement.style.backgroundColor = 'rgb(255, 105, 40)';
                if (rangeStart === 20 && rangeEnd === 34) {
                    console.log("Excellent Anger Management.");
                } else if (rangeStart === 35 && rangeEnd === 49) {
                    console.log("Good anger management.");
                } else if (rangeStart === 50 && rangeEnd === 70) {
                    console.log("Could do better.");
                } else if (rangeStart === 71 && rangeEnd === 85) {
                    console.log("Struggles with anger.");
                } else if (rangeStart === 86 && rangeEnd === 100) {
                    console.log("No anger management.");
                }
            }
        }
    }
}

function selectOption(score) {
    totalScore += score;
    updateScore();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    }
}
function updateScore() {
    console.log(totalScore)
    const dot = document.getElementsByClassName('dot')[0];
    dot.style.left = `${totalScore}%`;
    const scoreElement = document.querySelector('.score');
    scoreElement.textContent = totalScore;
    const scoreOutOf = document.getElementById('scoreOutOf')
    scoreOutOf.textContent = `${totalScore}/100`;
}

document.getElementById('getScore').addEventListener('submit', async (e) => {
    e.preventDefault();

    const scoreElements = document.getElementsByClassName('score-container');
    const containerElements = document.getElementsByClassName('container');
    const emailScore = document.getElementById('getScore');
    const email = document.getElementById('scoreEmail')
    if (scoreElements.length > 0) {
        const scoreElement = scoreElements[0];
        if (containerElements.length > 0) {
            const container = containerElements[0];

            try {
                container.style.display = 'none';
                if (emailScore) {
                    emailScore.style.display = 'none';
                }
                scoreElement.style.display = 'block';
                const url = 'https://server.codemark.app/sendEmail';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: `${email.value}` })
                };
                fetch(url, options)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Failed to send Email');
                        }
                    })
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('Error: No container element found.');
        }
    } else {
        console.error('Error: No score elements found.');
    }
});

displayQuestion();