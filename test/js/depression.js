let currentQuestion = 0;
let totalScore = 0;

const questions = [
  {
    question: "How often do you feel sad or down?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Rarely", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 }
    ]
  },
  {
    question: "Do you often feel hopeless or helpless?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Have you lost interest or pleasure in activities you once enjoyed?",
    options: [
      { text: "Strongly Disagree", score: 0 },
      { text: "Disagree", score: 1 },
      { text: "Neither Agree nor Disagree", score: 2 },
      { text: "Agree", score: 3 },
      { text: "Strongly Agree", score: 4 }
    ]
  },
  {
    question: "Do you have trouble falling asleep or staying asleep?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you often wake up too early and struggle to get back to sleep?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you sleep excessively?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Have you experienced significant weight loss or gain without trying?",
    options: [
      { text: "No", score: 0 },
      { text: "Yes, but minor", score: 1 },
      { text: "Yes, moderately", score: 2 },
      { text: "Yes, significantly", score: 3 },
      { text: "Yes, extremely", score: 4 }
    ]
  },
  {
    question: "Have you noticed changes in your appetite, such as eating significantly more or less than usual?",
    options: [
      { text: "No", score: 0 },
      { text: "Yes, but minor", score: 1 },
      { text: "Yes, moderately", score: 2 },
      { text: "Yes, significantly", score: 3 },
      { text: "Yes, extremely", score: 4 }
    ]
  },
  {
    question: "Do you feel fatigued or have low energy levels most days?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you have difficulty concentrating, making decisions, or remembering things?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you often feel worthless or excessively guilty?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you blame yourself for things that aren't entirely your fault?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Have you had thoughts of harming yourself or ending your life?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Have you made any suicide attempts in the past?",
    options: [
      { text: "No", score: 0 },
      { text: "Yes, but not recently", score: 2 },
      { text: "Yes, within the last year", score: 3 },
      { text: "Yes, within the last month", score: 4 },
      { text: "Yes, within the last week", score: 5 }
    ]
  },
  {
    question: "Do you experience unexplained aches or pains?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you tend to isolate yourself from friends, family, or social activities?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you often feel irritable or easily angered?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you find it hard to experience pleasure, even in activities or events that you used to enjoy?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you have trouble starting or completing tasks, even simple ones?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you feel like you're a burden to others?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Have you experienced a significant decrease in your motivation levels?",
    options: [
      { text: "No", score: 0 },
      { text: "Yes, but minor", score: 1 },
      { text: "Yes, moderately", score: 2 },
      { text: "Yes, significantly", score: 3 },
      { text: "Yes, extremely", score: 4 }
    ]
  },
  {
    question: "Do you find it challenging to imagine a hopeful or positive future?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Constantly", score: 4 }
    ]
  },
  {
    question: "Do you experience a persistent sense of emptiness or numbness?",
    options: [
      { text: "Not at all", "score": 0 },
      { text: "Rarely", "score": 1 },
      { text: "Sometimes", "score": 2 },
      { text: "Often", "score": 3 },
      { text: "Always", "score": 4 }
    ]
  },
  {
    question: "Have you noticed a decrease in your ability to feel pleasure from things you used to enjoy?",
    options: [
      { text: "Not at all", "score": 0 },
      { text: "Rarely", "score": 1 },
      { text: "Sometimes", "score": 2 },
      { text: "Often", "score": 3 },
      { text: "Always", "score": 4 }
    ]
  },
  {
    question: "Do you have difficulty feeling motivated to engage in activities or pursue goals?",
    options: [
      { text: "Not at all", "score": 0 },
      { text: "Rarely", "score": 1 },
      { text: "Sometimes", "score": 2 },
      { text: "Often", "score": 2 },
      { text: "Always", "score": 3 }
    ]
  },
  {
    question: "Do you find it challenging to connect with others emotionally or socially?",
    options: [
      { text: "Not at all", "score": 0 },
      { text: "Rarely", "score": 1 },
      { text: "Sometimes", "score": 2 },
      { text: "Often", "score": 3 },
      { text: "Always", "score": 4 }
    ]
  }
];
const maxScore = questions.reduce((total, question) => {
  const maxOptionScore = Math.max(...question.options.map(option => option.score));
  return total + maxOptionScore;
}, 0);

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
        innerElement.style.backgroundColor = 'rgb(39, 113, 234)';
        if (rangeStart === 20 && rangeEnd === 34) {
          console.log("You are not depressed.");
        } else if (rangeStart === 35 && rangeEnd === 49) {
          console.log("You have few signs of depression.");
        } else if (rangeStart === 50 && rangeEnd === 70) {
          console.log("You have possible signs of depression.");
        } else if (rangeStart === 71 && rangeEnd === 85) {
          console.log("You have some signs of clinical depression.");
        } else if (rangeStart === 86 && rangeEnd === 100) {
          console.log("You are generally depressed.");
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
