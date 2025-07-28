document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-btn');
    const progressElement = document.getElementById('progress');
    const progressTextElement = document.getElementById('progress-text');
    const resultElement = document.getElementById('result');

    let currentQuestionIndex = 0;
    let score = 0;
    let answerSelected = false;

    const questions = [
        {
        
        question: "What is the capital of India?",
        options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
        answer: 2
    },
    {
        question: "Which river is considered the holiest in India?",
        options: ["Yamuna", "Ganges", "Brahmaputra", "Godavari"],
        answer: 1
    },
    {
        question: "Which Indian city is known as the 'Pink City'?",
        options: ["Jaipur", "Udaipur", "Jodhpur", "Bikaner"],
        answer: 0
    },
    {
        question: "Who is known as the 'Father of the Indian Constitution'?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar", "Sardar Patel"],
        answer: 2
    },
    {
        question: "Which festival is known as the 'Festival of Lights' in India?",
        options: ["Holi", "Diwali", "Eid", "Christmas"],
        answer: 1
    },
    {
        question: "Which is the national animal of India?",
        options: ["Lion", "Elephant", "Royal Bengal Tiger", "Leopard"],
        answer: 2
    },
    {
        question: "Which Indian state is famous for its backwaters?",
        options: ["Goa", "Kerala", "Tamil Nadu", "Karnataka"],
        answer: 1
    },
    {
        question: "Which monument is one of the Seven Wonders of the World in India?",
        options: ["Qutub Minar", "Taj Mahal", "Red Fort", "India Gate"],
        answer: 1
    },
    {
        question: "What is the currency of India?",
        options: ["Rupee", "Dollar", "Yen", "Euro"],
        answer: 0
    },
    {
        question: "Which is the largest state in India by area?",
        options: ["Maharashtra", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh"],
        answer: 2
    },

    // Animal Questions (10)
    {
        question: "Which is the fastest land animal?",
        options: ["Lion", "Cheetah", "Leopard", "Horse"],
        answer: 1
    },
    {
        question: "What is a group of lions called?",
        options: ["Herd", "Pack", "Pride", "Flock"],
        answer: 2
    },
    {
        question: "Which animal is known as the 'Ship of the Desert'?",
        options: ["Camel", "Elephant", "Horse", "Yak"],
        answer: 0
    },
    {
        question: "Which bird has the largest wingspan?",
        options: ["Eagle", "Albatross", "Vulture", "Pelican"],
        answer: 1
    },
    {
        question: "What is the only mammal capable of true flight?",
        options: ["Bat", "Flying Squirrel", "Penguin", "Ostrich"],
        answer: 0
    },
    {
        question: "Which animal has the longest lifespan?",
        options: ["Elephant", "Tortoise", "Whale", "Parrot"],
        answer: 1
    },
    {
        question: "What is a baby kangaroo called?",
        options: ["Cub", "Pup", "Joey", "Fawn"],
        answer: 2
    },
    {
        question: "Which fish is known as the 'King of Fish'?",
        options: ["Salmon", "Tuna", "Shark", "Swordfish"],
        answer: 0
    },
    {
        question: "Which animal can turn its head 270 degrees?",
        options: ["Owl", "Giraffe", "Cat", "Dog"],
        answer: 0
    },
    {
        question: "What is the largest species of bear?",
        options: ["Polar Bear", "Grizzly Bear", "Black Bear", "Panda"],
        answer: 0
    },

    {
        question: "Which country hosts the Formula 1 Grand Prix at the Buddh International Circuit?",
        options: ["Japan", "India", "USA", "Brazil"],
        answer: 1
    },
    {
        question: "Which bike brand is known for its 'Bullet' model?",
        options: ["Bajaj", "Royal Enfield", "Hero", "TVS"],
        answer: 1
    },
    {
        question: "In MotoGP, what does 'GP' stand for?",
        options: ["Grand Prix", "Great Performance", "Global Prize", "Grand Performance"],
        answer: 0
    },
    {
        question: "Which Indian rider has competed in MotoGP?",
        options: ["Karun Chandhok", "Narain Karthikeyan", "Gaurav Gill", "None of the above"],
        answer: 3
    },
    {
        question: "What is the most prestigious motorcycle race in the world?",
        options: ["Isle of Man TT", "Dakar Rally", "MotoGP", "Superbike World Championship"],
        answer: 0
    },
    {
        question: "Which company owns the Ducati motorcycle brand?",
        options: ["BMW", "Volkswagen", "Audi", "Mercedes"],
        answer: 2
    },
    {
        question: "What does 'CC' stand for in bike engines?",
        options: ["Cubic Centimeters", "Cycle Count", "Cylinder Capacity", "Combustion Chamber"],
        answer: 0
    },
    {
        question: "Which Indian state hosts the 'Raid de Himalaya' rally?",
        options: ["Uttarakhand", "Himachal Pradesh", "Jammu & Kashmir", "Sikkim"],
        answer: 1
    },
    {
        question: "Which bike is known as the 'Fastest Indian'?",
        options: ["Royal Enfield Classic 350", "Bajaj Pulsar 220", "KTM Duke 390", "None of the above"],
        answer: 3
    },
    {
        question: "What is the maximum engine capacity allowed in Moto3 class?",
        options: ["125cc", "250cc", "300cc", "400cc"],
        answer: 1
    }

    ];

    startBtn.addEventListener("click", startQuiz);
    nextButton.addEventListener("click", nextQuestion);
    function startQuiz() {
        welcomeScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }

    function loadQuestion() {
        answerSelected = false;
        const currentQuestion = questions[currentQuestionIndex];
                questionElement.textContent = currentQuestion.question;
        
        optionsElement.innerHTML = '';
                currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(index));
            optionsElement.appendChild(optionElement);
        });
        
        updateProgress();
        
        nextButton.disabled = true;
    }

    function selectAnswer(selectedIndex) {
        if (answerSelected) return;
        answerSelected = true;
        
        const currentQuestion = questions[currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        options[currentQuestion.answer].classList.add('correct');
        
        if (selectedIndex !== currentQuestion.answer) {
            options[selectedIndex].classList.add('incorrect');
        } else {
            score++;
        }
        
        nextButton.disabled = false;
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function updateProgress() {
        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressElement.style.width = `${progressPercent}%`;
        progressTextElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    function showResult() {
        quizScreen.innerHTML = `
            <div class="result">
                <h2>Quiz Completed!</h2>
                <p>Your score: ${score} out of ${questions.length}</p>
                <button onclick="location.reload()">Restart Quiz</button>
            </div>
        `;
    }
});