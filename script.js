document.addEventListener('DOMContentLoaded', function() {
    // Operadores lógicos com suas tabelas-verdade e dicas
    const logicalOperators = [
        {
            name: "Negação (¬p)",
            symbol: "¬",
            truthTable: [
                ["p", "¬p"],
                ["V", "F"],
                ["F", "V"]
            ],
            tip: "Inverte o valor - o que é V vira F e vice-versa"
        },
        {
            name: "Conjunção (p ∧ q)",
            symbol: "∧",
            truthTable: [
                ["p", "q", "p ∧ q"],
                ["V", "V", "V"],
                ["V", "F", "F"],
                ["F", "V", "F"],
                ["F", "F", "F"]
            ],
            tip: "Só é V quando ambos são V - 'E' exige perfeição"
        },
        {
            name: "Disjunção (p ∨ q)",
            symbol: "∨",
            truthTable: [
                ["p", "q", "p ∨ q"],
                ["V", "V", "V"],
                ["V", "F", "V"],
                ["F", "V", "V"],
                ["F", "F", "F"]
            ],
            tip: "Só é F quando ambos são F - 'OU' é inclusivo"
        },
        {
            name: "Condicional (p → q)",
            symbol: "→",
            truthTable: [
                ["p", "q", "p → q"],
                ["V", "V", "V"],
                ["V", "F", "F"],
                ["F", "V", "V"],
                ["F", "F", "V"]
            ],
            tip: "Só é F quando V→F - 'Vera Fischer é Falsa'"
        },
        {
            name: "Bicondicional (p ↔ q)",
            symbol: "↔",
            truthTable: [
                ["p", "q", "p ↔ q"],
                ["V", "V", "V"],
                ["V", "F", "F"],
                ["F", "V", "F"],
                ["F", "F", "V"]
            ],
            tip: "Só é V quando ambos valores são iguais - gosta de clones"
        },
        {
            name: "OU Exclusivo (p ⊕ q)",
            symbol: "⊕",
            truthTable: [
                ["p", "q", "p ⊕ q"],
                ["V", "V", "F"],
                ["V", "F", "V"],
                ["F", "V", "V"],
                ["F", "F", "F"]
            ],
            tip: "Só é V quando os valores são diferentes - quer um ou outro, nunca ambos"
        }
    ];

    // Elementos da interface
    const tablesSection = document.querySelector('.tables-section');
    const practiceSection = document.querySelector('.practice-section');
    const quizSection = document.querySelector('.quiz-section');
    const tautologySection = document.querySelector('.tautology-section');
    const propositionsSection = document.querySelector('.propositions-section');
    const showAllBtn = document.getElementById('show-all-btn');
    const practiceBtn = document.getElementById('practice-btn');
    const quizBtn = document.getElementById('quiz-btn');
    const tautologyBtn = document.getElementById('tautology-btn');
    const propositionsBtn = document.getElementById('propositions-btn');
    const checkAnswerBtn = document.getElementById('check-answer');
    const exerciseTable = document.querySelector('.exercise-table');
    const feedbackDiv = document.querySelector('.feedback');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.querySelector('.quiz-feedback');
    const quizScore = document.querySelector('.quiz-score');
    const showTautologySolutionBtn = document.getElementById('show-tautology-solution');
    const tautologySolution = document.querySelector('.solution');
    const classifyBtns = document.querySelectorAll('.classify-btn');
    const questionText = document.getElementById('question-text');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const scoreSpan = document.getElementById('score');
    const attemptedSpan = document.getElementById('attempted');
    const feedbackText = document.getElementById('feedback-text');
    const nextQuestionBtn = document.getElementById('next-question');

    // Estado da aplicação
    let currentExercise = null;
    let quizState = {
        score: 0,
        total: 0,
        currentQuestion: null
    };

    // Banco de questões do quiz
    const quizQuestions = [
        {
            question: 'Qual o resultado de p → q quando p=V e q=F?',
            options: ['V', 'F'],
            correct: 1,
            feedback: 'Correto! O condicional só é falso quando V→F (Vera Fischer é Falsa).'
        },
        {
            question: 'Qual o resultado de p ↔ q quando p=V e q=V?',
            options: ['V', 'F'],
            correct: 0,
            feedback: 'Correto! O bicondicional é verdadeiro quando ambos valores são iguais.'
        },
        {
            question: 'Qual o resultado de p ⊕ q quando p=F e q=F?',
            options: ['V', 'F'],
            correct: 1,
            feedback: 'Correto! O OU exclusivo é falso quando ambos valores são iguais.'
        },
        {
            question: 'Qual o resultado de p ∨ q quando p=F e q=F?',
            options: ['V', 'F'],
            correct: 1,
            feedback: 'Correto! O OU inclusivo só é falso quando ambos valores são falsos.'
        },
        {
            question: 'Qual o resultado de p ∧ q quando p=V e q=F?',
            options: ['V', 'F'],
            correct: 1,
            feedback: 'Correto! O E lógico só é verdadeiro quando ambos valores são verdadeiros.'
        }
    ];

    // Funções para alternar entre seções
    function showAllTables() {
        tablesSection.innerHTML = '';
        practiceSection.classList.add('hidden');
        quizSection.classList.add('hidden');
        tautologySection.classList.add('hidden');
        propositionsSection.classList.add('hidden');
        
        logicalOperators.forEach(operator => {
            const tableDiv = document.createElement('div');
            tableDiv.className = 'operator-table';
            
            const title = document.createElement('h3');
            title.textContent = operator.name;
            tableDiv.appendChild(title);
            
            const tip = document.createElement('p');
            tip.className = 'operator-tip';
            tip.textContent = `Macete: ${operator.tip}`;
            tableDiv.appendChild(tip);
            
            const table = document.createElement('table');
            table.className = 'truth-table';
            
            // Cabeçalho
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            operator.truthTable[0].forEach(cell => {
                const th = document.createElement('th');
                th.textContent = cell;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Corpo da tabela
            const tbody = document.createElement('tbody');
            for (let i = 1; i < operator.truthTable.length; i++) {
                const row = document.createElement('tr');
                operator.truthTable[i].forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            }
            table.appendChild(tbody);
            
            tableDiv.appendChild(table);
            tablesSection.appendChild(tableDiv);
        });
    }

    function showTautologySection() {
        tablesSection.innerHTML = '';
        practiceSection.classList.add('hidden');
        quizSection.classList.add('hidden');
        tautologySection.classList.remove('hidden');
        propositionsSection.classList.add('hidden');
        
        // Preenche a tabela do terceiro excluído
        const exampleTable = document.querySelector('.example-table');
        exampleTable.innerHTML = `
            <table class="truth-table">
                <thead>
                    <tr>
                        <th>p</th>
                        <th>¬p</th>
                        <th>p ∨ ¬p</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>V</td>
                        <td>F</td>
                        <td>V</td>
                    </tr>
                    <tr>
                        <td>F</td>
                        <td>V</td>
                        <td>V</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        // Preenche a solução do exercício
        tautologySolution.innerHTML = `
            <p>Tabela-verdade para (p → q) ∨ p:</p>
            <table class="truth-table">
                <thead>
                    <tr>
                        <th>p</th>
                        <th>q</th>
                        <th>p → q</th>
                        <th>(p → q) ∨ p</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>V</td>
                        <td>V</td>
                        <td>V</td>
                        <td>V</td>
                    </tr>
                    <tr>
                        <td>V</td>
                        <td>F</td>
                        <td>F</td>
                        <td>V</td>
                    </tr>
                    <tr>
                        <td>F</td>
                        <td>V</td>
                        <td>V</td>
                        <td>V</td>
                    </tr>
                    <tr>
                        <td>F</td>
                        <td>F</td>
                        <td>V</td>
                        <td>V</td>
                    </tr>
                </tbody>
            </table>
            <p class="correct">É uma tautologia, pois todas as linhas da coluna final são verdadeiras.</p>
        `;
    }

    function showPropositionsSection() {
        tablesSection.innerHTML = '';
        practiceSection.classList.add('hidden');
        quizSection.classList.add('hidden');
        tautologySection.classList.add('hidden');
        propositionsSection.classList.remove('hidden');
    }

    function startPractice() {
        tablesSection.innerHTML = '';
        quizSection.classList.add('hidden');
        tautologySection.classList.add('hidden');
        propositionsSection.classList.add('hidden');
        practiceSection.classList.remove('hidden');
        
        // Seleciona um operador aleatório
        const randomOperator = logicalOperators[Math.floor(Math.random() * logicalOperators.length)];
        currentExercise = randomOperator;
        
        // Cria tabela de exercício
        exerciseTable.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'truth-table';
        
        // Cabeçalho
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        randomOperator.truthTable[0].forEach(cell => {
            const th = document.createElement('th');
            th.textContent = cell;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Corpo da tabela com células editáveis
        const tbody = document.createElement('tbody');
        for (let i = 1; i < randomOperator.truthTable.length; i++) {
            const row = document.createElement('tr');
            randomOperator.truthTable[i].forEach((cell, cellIndex) => {
                const td = document.createElement('td');
                
                // Primeiras colunas são fixas (valores de p e q)
                if (cellIndex < randomOperator.truthTable[0].length - 1) {
                    td.textContent = cell;
                } else {
                    // Última coluna é editável (resultado)
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.style.width = '20px';
                    input.style.textAlign = 'center';
                    input.dataset.expected = randomOperator.truthTable[i][cellIndex];
                    td.appendChild(input);
                }
                
                row.appendChild(td);
            });
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        
        exerciseTable.appendChild(table);
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'feedback';
    }

    function checkPracticeAnswer() {
        const inputs = exerciseTable.querySelectorAll('input');
        let allCorrect = true;
        
        inputs.forEach(input => {
            const userAnswer = input.value.toUpperCase();
            const expected = input.dataset.expected;
            
            if (userAnswer === expected) {
                input.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
            } else {
                input.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            feedbackDiv.textContent = 'Parabéns! Todas respostas corretas!';
            feedbackDiv.className = 'feedback correct';
        } else {
            feedbackDiv.textContent = 'Algumas respostas estão incorretas. Tente novamente!';
            feedbackDiv.className = 'feedback wrong';
        }
    }

    function startQuiz() {
        tablesSection.innerHTML = '';
        practiceSection.classList.add('hidden');
        tautologySection.classList.add('hidden');
        propositionsSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        
        generateQuizQuestion();
    }

    function generateQuizQuestion() {
        if (quizState.currentQuestion > quizQuestions.length) {
            // Quiz completo
            questionText.innerHTML = `Quiz completo!<br>Sua pontuação final: ${quizState.score}/${quizQuestions.length}`;
            document.querySelector('.quiz-options').classList.add('hidden');
            nextQuestionBtn.textContent = 'Reiniciar Quiz';
            nextQuestionBtn.removeEventListener('click', nextQuestion);
            nextQuestionBtn.addEventListener('click', resetQuiz);
            return;
        }
        
        const question = quizQuestions[quizState.currentQuestion - 1];
        questionText.innerHTML = question.question;
        
        quizOptions.forEach((option, index) => {
            option.textContent = question.options[index];
            option.dataset.correct = index === question.correct ? 'true' : 'false';
        });
        
        currentQuestionSpan.textContent = quizState.currentQuestion;
        totalQuestionsSpan.textContent = quizQuestions.length;
        quizFeedback.classList.add('hidden');
    }

    function checkQuizAnswer(selectedOption) {
        quizState.total++;
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        if (isCorrect) {
            quizState.score++;
            quizFeedback.className = 'quiz-feedback correct';
            feedbackText.textContent = quizQuestions[quizState.currentQuestion - 1].feedback;
        } else {
            quizFeedback.className = 'quiz-feedback wrong';
            feedbackText.textContent = quizQuestions[quizState.currentQuestion - 1].feedback;
        }
        
        scoreSpan.textContent = quizState.score;
        attemptedSpan.textContent = quizState.total;
        quizFeedback.classList.remove('hidden');
    }

    function nextQuestion() {
        quizState.currentQuestion++;
        generateQuizQuestion();
    }

    function resetQuiz() {
        quizState = {
            currentQuestion: 1,
            total: 0,
            score: 0
        };
        
        document.querySelector('.quiz-options').classList.remove('hidden');
        nextQuestionBtn.textContent = 'Próxima Questão';
        nextQuestionBtn.removeEventListener('click', resetQuiz);
        nextQuestionBtn.addEventListener('click', nextQuestion);
        generateQuizQuestion();
    }

    // Event listeners
    showAllBtn.addEventListener('click', showAllTables);
    practiceBtn.addEventListener('click', startPractice);
    quizBtn.addEventListener('click', startQuiz);
    tautologyBtn.addEventListener('click', showTautologySection);
    propositionsBtn.addEventListener('click', showPropositionsSection);
    checkAnswerBtn.addEventListener('click', checkPracticeAnswer);
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (!quizFeedback.classList.contains('hidden')) return;
            checkQuizAnswer(this);
        });
    });

    showTautologySolutionBtn.addEventListener('click', function() {
        tautologySolution.classList.toggle('hidden');
        this.textContent = tautologySolution.classList.contains('hidden') ? 
            'Mostrar Solução' : 'Ocultar Solução';
    });

    classifyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const answer = this.dataset.answer;
            const userAnswer = prompt("Esta frase é Proposição (P) ou Não-Proposição (N)?");
            
            if (userAnswer && userAnswer.toUpperCase() === answer) {
                alert("Correto! " + (answer === "P" ? 
                    "Esta é uma proposição lógica válida." : 
                    "Esta não é uma proposição lógica."));
            } else {
                alert("Incorreto! A resposta correta é: " + (answer === "P" ? 
                    "Proposição (pode ser verdadeira ou falsa)" : 
                    "Não-Proposição (não pode ser classificada como V ou F)"));
            }
        });
    });

    nextQuestionBtn.addEventListener('click', nextQuestion);

    // Mostrar todas as tabelas ao carregar
    showAllTables();
});
