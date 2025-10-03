let currentTheme = "";
let currentLevel = "";
let questions = {};

function loadQuiz(theme, level) {
  currentTheme = theme;
  currentLevel = level;
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  document.getElementById("result").innerHTML = "";

  const quiz = qcmData[theme][level];
  quiz.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.question}</p>`;
    q.options.forEach((opt, i) => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}">
          ${opt}
        </label><br>`;
    });
    container.appendChild(div);
  });
}

document.getElementById("submit-btn").addEventListener("click", () => {
  const quiz = qcmData[currentTheme][currentLevel];
  let score = 0;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  quiz.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const feedback = document.createElement("p");

    if (selected) {
      const userAnswer = parseInt(selected.value);
      if (userAnswer === q.answer) {
        score++;
        feedback.innerHTML = `✅ Q${index + 1} : Bonne réponse !`;
        feedback.style.color = "green";
      } else {
        feedback.innerHTML = `❌ Q${index + 1} : Mauvaise réponse. La bonne réponse était : <strong>${q.options[q.answer]}</strong>`;
        feedback.style.color = "red";
      }
    } else {
      feedback.innerHTML = `⚠️ Q${index + 1} : Aucune réponse sélectionnée.`;
      feedback.style.color = "orange";
    }

    resultDiv.appendChild(feedback);
  });

  const finalScore = document.createElement("h3");
  finalScore.innerHTML = `🎯 Score final : ${score} / ${quiz.length}`;
  resultDiv.prepend(finalScore);
});

// Exemple de base de données QCM (à compléter avec 20 questions par thème et niveau)
const qcmData = {
  sante: {
    facile: [
      {
        question: "Quel article du Code civil définit la protection juridique des majeurs ?",
        options: ["Article 415", "Article 459", "Article L1111-4", "Article 1240"],
        answer: 0
      },
      {
        question: "Qui peut consentir aux soins pour un majeur sous tutelle ?",
        options: ["Le majeur uniquement", "Le tuteur uniquement", "Le juge", "Le tuteur avec autorisation du juge si le majeur est incapable"],
        answer: 3
      }
      // ... ajoute 18 autres questions ici
    ],
    moyen: [/* 20 questions */],
    difficile: [/* 20 questions */]
  },
  patrimoine: {
    facile: [/* 20 questions */],
    moyen: [/* 20 questions */],
    difficile: [/* 20 questions */]
  },
  famille: {
    facile: [/* 20 questions */],
    moyen: [/* 20 questions */],
    difficile: [/* 20 questions */]
  },
  procedures: {
    facile: [/* 20 questions */],
    moyen: [/* 20 questions */],
    difficile: [/* 20 questions */]
  }
};
