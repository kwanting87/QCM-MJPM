const qcmData = {
  santé: {
    débutant: [/* 20 questions */],
    intermédiaire: [/* 20 questions */],
    expérimenté: [/* 20 questions */]
  },
  patrimoine: {
    débutant: [/* 20 questions */],
    intermédiaire: [/* 20 questions */],
    expérimenté: [/* 20 questions */]
  },
  famille: {
    débutant: [/* 20 questions */],
    intermédiaire: [/* 20 questions */],
    expérimenté: [/* 20 questions */]
  },
  procédures: {
    débutant: [/* 20 questions */],
    intermédiaire: [/* 20 questions */],
    expérimenté: [/* 20 questions */]
  },
  action: {
    débutant: [/* 20 questions */],
    intermédiaire: [/* 20 questions */],
    expérimenté: [/* 20 questions */]
  }
};

let score = 0;
let totalRéponses = 0;
const questionsDéjàPosées = {};

function loadQuestion() {
  const theme = document.getElementById("theme").value;
  const niveau = document.getElementById("niveau").value;
  const qcmBox = document.getElementById("qcm");
  qcmBox.innerHTML = "";

  if (!questionsDéjàPosées[theme]) {
    questionsDéjàPosées[theme] = {};
  }
  if (!questionsDéjàPosées[theme][niveau]) {
    questionsDéjàPosées[theme][niveau] = [];
  }

  const toutesLesQuestions = qcmData[theme][niveau];
  const restantes = toutesLesQuestions.filter((_, i) => !questionsDéjàPosées[theme][niveau].includes(i));

  if (restantes.length === 0) {
    qcmBox.innerHTML = `<p>✅ Toutes les questions ont été posées pour ce thème et ce niveau.</p><p>🎯 Score final : ${score} / ${totalRéponses}</p>`;
    return;
  }

  const indexDansRestantes = Math.floor(Math.random() * restantes.length);
  const questionIndex = toutesLesQuestions.indexOf(restantes[indexDansRestantes]);
  const q = toutesLesQuestions[questionIndex];
  questionsDéjàPosées[theme][niveau].push(questionIndex);

  const questionEl = document.createElement("h3");
  questionEl.textContent = q.question;
  qcmBox.appendChild(questionEl);

  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => {
      totalRéponses++;
      const allOptions = document.querySelectorAll(".option");
      allOptions.forEach((o, index) => {
        o.onclick = null;
        if (index === q.answer) {
          o.classList.add("correct");
          o.textContent += " ✅";
        } else if (index === i) {
          o.classList.add("incorrect");
          o.textContent += " ❌";
        }
      });
      if (i === q.answer) score++;

      const scoreEl = document.createElement("p");
      scoreEl.innerHTML = `🧮 Score : ${score} / ${totalRéponses}`;
      qcmBox.appendChild(scoreEl);

      const explicationEl = document.createElement("p");
      explicationEl.innerHTML = `📘 Explication : ${q.explanation}`;
      qcmBox.appendChild(explicationEl);
    };
    qcmBox.appendChild(btn);
  });
}
qcmData.santé.débutant = [
  {
    question: "Quel est le rôle principal de l'ARS ?",
    options: [
      "Gérer les hôpitaux privés",
      "Organiser les élections",
      "Piloter la politique de santé publique régionale",
      "Contrôler les pharmacies"
    ],
    answer: 2,
    explanation: "L'ARS pilote la politique de santé publique dans sa région."
  },
  {
    question: "Que signifie le sigle HAS ?",
    options: [
      "Haute Autorité de Santé",
      "Hôpital d’Accueil Scolaire",
      "Habilitation Administrative Spéciale",
      "Hébergement Assisté Sanitaire"
    ],
    answer: 0,
    explanation: "La HAS est la Haute Autorité de Santé, chargée d’évaluer les pratiques médicales."
  },
];

