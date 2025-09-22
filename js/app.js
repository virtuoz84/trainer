class CELPIPTest {
    constructor() {
        this.currentPart = 1;
        this.userAnswers = {
            part1: {},
            part2: {},
            part3: {},
            part4: {}
        };
        this.initializeEventListeners();
        this.loadTestData();
        testTimer.updateDisplay();
        testTimer.start();
    }

    initializeEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPart(parseInt(e.target.dataset.part));
            });
        });

        // Control buttons
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousPart();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextPart();
        });

        document.getElementById('check-answers').addEventListener('click', () => {
            this.checkAnswers();
        });

        document.getElementById('close-results').addEventListener('click', () => {
            document.getElementById('results-modal').style.display = 'none';
        });

        // Answer selection
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('answer-select')) {
                const questionId = e.target.dataset.questionId;
                this.userAnswers[`part${this.currentPart}`][questionId] = e.target.value;
            }
        });
    }

// В методе switchPart добавьте вызов таймера:
switchPart(partNumber) {
    // Hide all parts
    document.querySelectorAll('.test-part').forEach(part => {
        part.classList.remove('active');
    });

    // Deactivate all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected part
    document.getElementById(`part-${partNumber}`).classList.add('active');
    
    // Activate corresponding nav button
    document.querySelector(`.nav-btn[data-part="${partNumber}"]`).classList.add('active');
    
    this.currentPart = partNumber;
    
    // Update timer for the current part
    testTimer.switchPart(partNumber);
}

    previousPart() {
        if (this.currentPart > 1) {
            this.switchPart(this.currentPart - 1);
        }
    }

    nextPart() {
        if (this.currentPart < 4) {
            this.switchPart(this.currentPart + 1);
        }
    }

    loadTestData() {
        // Load Part 1
        this.loadPart1();
        this.loadPart2();
        this.loadPart3();
        this.loadPart4();
    }

    loadPart1() {
        const contentDiv = document.getElementById('part1-content');
        const questionsDiv = document.getElementById('part1-questions');
        
        contentDiv.innerHTML = `
            <div class="correspondence">
                <h3>${testData.part1.correspondence.title}</h3>
                <p><strong>To:</strong> ${testData.part1.correspondence.to}</p>
                <p><strong>From:</strong> ${testData.part1.correspondence.from}</p>
                <div class="message-content">
                    ${testData.part1.correspondence.content}
                </div>
            </div>
        `;

        questionsDiv.innerHTML = testData.part1.questions.map((q, index) => `
            <div class="question">
                <div class="question-text">${q.text}</div>
                <select class="answer-select" data-question-id="${index}">
                    <option value="">-- Select Answer --</option>
                    ${q.options.map((opt, optIndex) => `
                        <option value="${optIndex}">${opt}</option>
                    `).join('')}
                </select>
            </div>
        `).join('');
    }

    loadPart2() {
        const contentDiv = document.getElementById('part2-content');
        const questionsDiv = document.getElementById('part2-questions');
        
        contentDiv.innerHTML = `
            <div class="advertisement">
                <h3>${testData.part2.advertisement.title}</h3>
                ${testData.part2.advertisement.content}
            </div>
            <div class="email">
                <p><strong>To:</strong> ${testData.part2.email.to}</p>
                <p><strong>From:</strong> ${testData.part2.email.from}</p>
                <div class="message-content">
                    ${testData.part2.email.content}
                </div>
            </div>
        `;

        questionsDiv.innerHTML = testData.part2.questions.map((q, index) => `
            <div class="question">
                <div class="question-text">${q.text}</div>
                <select class="answer-select" data-question-id="${index}">
                    <option value="">-- Select Answer --</option>
                    ${q.options.map((opt, optIndex) => `
                        <option value="${optIndex}">${opt}</option>
                    `).join('')}
                </select>
            </div>
        `).join('');
    }

    loadPart3() {
        const contentDiv = document.getElementById('part3-content');
        const questionsDiv = document.getElementById('part3-questions');
        
        contentDiv.innerHTML = testData.part3.content.map(paragraph => `
            <div class="paragraph">
                <strong>${paragraph.letter}:</strong> ${paragraph.text}
            </div>
        `).join('');

        questionsDiv.innerHTML = testData.part3.questions.map((q, index) => `
            <div class="question">
                <div class="question-text">${q.text}</div>
                <select class="answer-select" data-question-id="${index}">
                    <option value="">-- Select Answer --</option>
                    ${q.options.map((opt, optIndex) => `
                        <option value="${optIndex}">${opt}</option>
                    `).join('')}
                </select>
            </div>
        `).join('');
    }

    loadPart4() {
        const contentDiv = document.getElementById('part4-content');
        const questionsDiv = document.getElementById('part4-questions');
        
        contentDiv.innerHTML = `
            <div class="article">
                ${testData.part4.content}
            </div>
        `;

        questionsDiv.innerHTML = testData.part4.questions.map((q, index) => `
            <div class="question">
                <div class="question-text">${q.text}</div>
                <select class="answer-select" data-question-id="${index}">
                    <option value="">-- Select Answer --</option>
                    ${q.options.map((opt, optIndex) => `
                        <option value="${optIndex}">${opt}</option>
                    `).join('')}
                </select>
            </div>
        `).join('');
    }

    checkAnswers() {
        testTimer.stop();
        
        let totalCorrect = 0;
        let totalQuestions = 0;
        let resultsHTML = '';

        // Check each part
        for (let part = 1; part <= 4; part++) {
            const partData = testData[`part${part}`];
            const userAnswers = this.userAnswers[`part${part}`];
            
            resultsHTML += `<h3>Part ${part} Results</h3>`;
            
            partData.questions.forEach((question, index) => {
                totalQuestions++;
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer == question.correctAnswer;
                
                if (isCorrect) totalCorrect++;
                
                resultsHTML += `
                    <div class="result-item ${isCorrect ? 'correct-answer' : 'incorrect-answer'}">
                        <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
                        <p>Your answer: <span style="color: ${isCorrect ? 'green' : 'red'}">${userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}</span></p>
                        <p>Correct answer: <span style="color: green">${question.options[question.correctAnswer]}</span></p>
                        ${!isCorrect ? `<p><em>Explanation:</em> ${question.explanation || ''}</p>` : ''}
                    </div>
                `;
            });
        }

        const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100);
        
        resultsHTML = `
            <div class="score-display">
                Your Score: ${totalCorrect}/${totalQuestions} (${scorePercentage}%)
            </div>
            ${resultsHTML}
        `;

        document.getElementById('results-content').innerHTML = resultsHTML;
        document.getElementById('results-modal').style.display = 'block';
    }
}

// Initialize the test when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const test = new CELPIPTest();
});
