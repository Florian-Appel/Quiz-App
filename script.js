// Array mit Fragen & Antworten:

let questions = [
  {
    "question": "Wie viele Einwohner hat Deutschland?",
    "answer_1": "86 Millionen",
    "answer_2": "93 Millionen",
    "answer_3": "83 Millionen",
    "answer_4": "75 Millionen",
    "right_answer": 3
  },
  {
    "question": "Wann wurde die Bundesrepublik Deutschland gegründet?",
    "answer_1": "1945",
    "answer_2": "1962",
    "answer_3": "1989",
    "answer_4": "1990",
    "right_answer": 4
  },
  {
    "question": "Wie hieß der erste Bundeskanzler?",
    "answer_1": "Konrad Adenauer",
    "answer_2": "Helmut Kohl",
    "answer_3": "Willy Brandt",
    "answer_4": "Ludwig Erhard",
    "right_answer": 1
  },
  {
    "question": "Welcher ist der 2. höchste Berg Deutschlands?",
    "answer_1": "Zugspitze",
    "answer_2": "Hochwanner",
    "answer_3": "Watzmann",
    "answer_4": "Leutascher Dreitorspitze",
    "right_answer": 3
  },
  {
    "question": "Mit wie vielen Nachbarländern teilt Deutschland sich eine Grenze?",
    "answer_1": "6",
    "answer_2": "9",
    "answer_3": "8",
    "answer_4": "11",
    "right_answer": 2
  },
];

let rightQuestions = 0; // Variabel für wie viele Fragen wurden richtig beantwortet (jetzt erstmal 0)

let currentQuestion = 0; // Mit welcher Frage soll gestartet werden? Also mit welcher position im Array.

let Sound_Success = new Audio('sounds/success.mp3'); // Sound für Richtig/Falsch
let Sound_Wrong = new Audio('sounds/wrong.mp3'); // Sound für Richtig/Falsch


function init() { // init = initialisierung
  document.getElementById('all-questions').innerHTML = questions.length; // Zeigt am Ende die Gesamtanzahl der Fragen an.

  showQuestion(); // Ruft diese funtion auf.
}

function showQuestion() { // Funktion um die aktuelle Frage anzuzeigen.

  if (currentQuestion >= questions.length) { // Bedeutet: Ist die Aktuelle Frage größer oder gleich die anzahl aller Fragen, dann soll ... passieren.
    document.getElementById('endScreen').style = ''; // Zeigt den Endscreen an (siehe Html)
    document.getElementById('questionBody').style = 'display: none'; // Blendet das Frage/Antwort feld aus.

    document.getElementById('ammountOfQuestions').innerHTML = questions.length; // Greift auf die länge des arrays zu.
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions; // Wie viele Fragen wurden richtig beantwortet?
    document.getElementById('header-image').src = 'img/trophy-ge6f0d9ef3_640.png'; //  Ersetzt das "normale" bild mit dem bild auf den Endscreen. (pokal)
  } else { // Wenn das Kriterium von oben nicht erfüllt wird, dass passiert das hier:

    let percent = (currentQuestion + 1) / questions.length; // Prozentzahl berechnen (für wie weit bist du schon in %) (+1 weil es sonst am ende nicht 100% anzeigt sondern zb. nur 80%)
    percent = percent * 100; // (sonst wird bei % 0,... angezeigt)
    document.getElementById('progress-bar').innerHTML = `${percent}%`; // Zeigt die richtige %-Zahl in der leiste an.
    document.getElementById('progress-bar').style = `width: ${percent}%`; // füllt die leiste zu so viel % aus.

    let question = questions[currentQuestion]; // Mit "question" holst du hier aus dem Array questions das erste element raus.

    document.getElementById('question-number').innerHTML = currentQuestion + 1; // Zeigt an bei welcher Frage du gerade bist. (+1 weil der Computer immer bei 0 anfängt zu zählen)

    document.getElementById('questiontext').innerHTML = question['question']; // Zeigt die Frage an.
    document.getElementById('answer_1').innerHTML = question['answer_1']; // Zeigt die Antwort 1 an.
    document.getElementById('answer_2').innerHTML = question['answer_2']; // Zeigt die Antwort 2 an.
    document.getElementById('answer_3').innerHTML = question['answer_3']; // Zeigt die Antwort 3 an.
    document.getElementById('answer_4').innerHTML = question['answer_4']; // Zeigt die Antwort 4 an.
  }
}

function answer(selection) { // selection ist die Variabel zu answer_1 bis answer_4 (zum besseren Verständnis, siehe Html code)
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1); // Dort wird bei seletion (zb. answer_1) die nummer 1 rausgeholt. Somit ist die zb. Nr. 1 jetzt in der Variabel selectedQuestionNumber. So kann später die richtige antwort ermittelt werden.
  let idOfRightAnswer = `answer_${question['right_answer']}`; // Schaut nach welche die richtige Antwort ist. (siehe wo diese Variabel verwendet wird)

  if (selectedQuestionNumber == question['right_answer']) { // die Variabel selectedQuestionNumber beinhaltet die ausgewählte antwort und mit question['right_answer'] wird auf die richtige antwort zugegriffen.
    document.getElementById(selection).parentNode.classList.add('bg-success'); // Hiermit sagst du was passiert wenn der user auf eine antwort klickt, welche richtig ist. (Es wird eine CSS klasse hinzugefügt, sodass das feld grün wird)
    Sound_Success.play(); // Ton für richtige antwort
    rightQuestions++; // erhöht die anzahl der richtig angeklickten fragen um jeweils um 1. (für die anzeige auf dem endscreen)
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger'); // Wenn der user die falsche antwort anklickt wird das feld rot.
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success'); // Wenn du die falsche Antwort ausgewählt hast wird die hiermit die richtige angezeigt.
    Sound_Wrong.play(); // Ton für falsche antwort
  }
  document.getElementById('next-button').disabled = false; // Macht den Button "Nächste Frage" anklickbar. (Standartmäßig ist es nicht anklickbar)
}

function nextQuestion() {
  currentQuestion++; // Holt das nächste element aus dem array (Die nächste Frage wird angezeigt)
  document.getElementById('next-button').disabled = true; // Der Button wird wieder auf nicht anklickbar gesetzt.
  resetAnswerButtons(); // Ruft diese Funtion auf
  showQuestion(); // Ruft diese Funtion auf
}

function resetAnswerButtons() { // setzt alle farbig makierten antworten zurück auf "normal".
  document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_1').parentNode.classList.remove('bg-success');
  document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_2').parentNode.classList.remove('bg-success');
  document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_3').parentNode.classList.remove('bg-success');
  document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
  document.getElementById('header-image').src = 'img/education-ge0307d2c2_1280.jpg'; // Ändert das bild vom endscreen wieder in das "normale" bild.
  document.getElementById('questionBody').style = ''; // zeigt das Frage/antwort feld wieder an.
  document.getElementById('endScreen').style = 'display: none'; // blendet den endscreen aus.
  rightQuestions = 0; // alles wieder auf 0 setzen
  currentQuestion = 0; // alles wieder auf 0 setzen
  init(); // ruft die funtion für den anfang wieder auf.
}

// Noch kein Clean Code!