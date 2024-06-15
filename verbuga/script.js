let verbs = {};
let selectedVerbs = [];
let selectedTenses = [];
let currentVerb = '';
let currentTense = '';
let currentTenseIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadVerbs().then(() => {
        populateVerbSelect();
    });
});

function loadVerbs() {
    return fetch('verbs.json')
        .then(response => response.json())
        .then(data => {
            verbs = data;
        });
}

function populateVerbSelect() {
    const verbSelect = document.getElementById('verbSelect');
    for (const verb in verbs) {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = verb;
        checkbox.id = verb;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(verb));
        verbSelect.appendChild(label);
    }
}

function confirmSelection() {
    const verbCheckboxes = document.querySelectorAll('#verbSelect input[type="checkbox"]:checked');
    selectedVerbs = Array.from(verbCheckboxes).map(checkbox => checkbox.value);

    const tenseCheckboxes = document.querySelectorAll('#tenseSelect input[type="checkbox"]:checked');
    selectedTenses = Array.from(tenseCheckboxes).map(checkbox => checkbox.value);

    if (selectedVerbs.length > 0 && selectedTenses.length > 0) {
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('exercise').classList.remove('hidden');
        setNewVerb();
    } else {
        alert('Selecteer alstublieft minstens één werkwoord en één tijd.');
    }
}

function setNewVerb() {
    currentVerb = selectedVerbs[Math.floor(Math.random() * selectedVerbs.length)];
    currentTense = selectedTenses[Math.floor(Math.random() * selectedTenses.length)];
    currentTenseIndex = Math.floor(Math.random() * 6); // 6 vervoegingen per tijd

    const tenses = ["ik", "jij", "hij/zij/het", "wij", "jullie", "zij"];
    document.getElementById('verbPrompt').textContent = currentVerb;
    document.getElementById('tensePrompt').textContent = `${currentTense} (${tenses[currentTenseIndex]})`;

    document.getElementById('userInput').value = '';
    document.getElementById('result').textContent = '';
}

function checkAnswer() {
    const userInput = document.getElementById('userInput').value.trim();
    const correctAnswer = verbs[currentVerb][currentTense][currentTenseIndex];
    const result = document.getElementById('result');
    if (userInput === correctAnswer) {
        result.textContent = 'Correct!';
        result.style.color = 'green';
    } else {
        result.textContent = `Fout! Het juiste antwoord is "${correctAnswer}".`;
        result.style.color = 'red';
    }
    setTimeout(setNewVerb, 2000); // Wacht 2 seconden voordat een nieuwe vraag wordt getoond
}
