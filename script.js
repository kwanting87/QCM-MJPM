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
  question: "Quel organisme délivre la Carte Vitale ?",
  options: [
    "La CAF",
    "La CPAM",
    "L’ARS",
    "La MDPH"
  ],
  answer: 1,
  explanation: "La CPAM (Caisse Primaire d’Assurance Maladie) délivre la Carte Vitale aux assurés sociaux."
},
{
  question: "Quel professionnel peut établir un certificat médical ?",
  options: [
    "Un médecin",
    "Un pharmacien",
    "Un infirmier",
    "Un assistant social"
  ],
  answer: 0,
  explanation: "Seul un médecin est habilité à établir un certificat médical."
},
{
  question: "Quel est le rôle de la MDPH ?",
  options: [
    "Gérer les hôpitaux",
    "Attribuer les aides aux personnes handicapées",
    "Contrôler les médecins",
    "Organiser les campagnes de vaccination"
  ],
  answer: 1,
  explanation: "La MDPH attribue les aides et reconnaît les droits des personnes en situation de handicap."
},
{
  question: "Que signifie le sigle CMU-C ?",
  options: [
    "Carte Médicale Universelle Complémentaire",
    "Couverture Maladie Universelle Complémentaire",
    "Centre Médical Universel Communal",
    "Convention Médicale Unique Complémentaire"
  ],
  answer: 1,
  explanation: "La CMU-C est la Couverture Maladie Universelle Complémentaire, destinée aux personnes à faibles ressources."
},
{
  question: "Quel est le rôle du médecin traitant dans le parcours de soins ?",
  options: [
    "Il rédige les ordonnances hospitalières",
    "Il coordonne les soins et oriente vers les spécialistes",
    "Il contrôle les pharmacies",
    "Il organise les urgences"
  ],
  answer: 1,
  explanation: "Le médecin traitant est le pivot du parcours de soins coordonné."
}
];


