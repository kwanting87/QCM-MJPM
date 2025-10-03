const questions = [
  {
    question: "Quel article du Code civil définit la protection juridique des majeurs ?",
    options: ["Article 415", "Article 459", "Article L1111-4", "Article 1240"],
    answer: 0
  },
  {
    question: "Qui peut consentir aux soins pour un majeur sous tutelle ?",
    options: ["Le majeur uniquement", "Le tuteur uniquement", "Le juge", "Le tuteur avec autorisation du juge si le majeur est incapable"],
    answer: 3
  },
  {
    question: "Les directives anticipées sont-elles valables pour un majeur sous curatelle ?",
    options: ["Jamais", "Oui, si le discernement est intact", "Uniquement avec le juge", "Seulement en tutelle"],
    answer: 1
  }
];

const quizContainer = document.getElementById("quiz-container");

questions.forEach((q, index) => {
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
  quizContainer.appendChild(div);
});

document.getElementById("submit-btn").addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });
  document.getElementById("result").innerHTML = `<h3>Résultat : ${score} / ${questions.length}</h3>`;
});
