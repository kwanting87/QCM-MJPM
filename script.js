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

function loadQuestion() {
  const theme = document.getElementById("theme").value;
  const niveau = document.getElementById("niveau").value;
  const qcmBox = document.getElementById("qcm");
  qcmBox.innerHTML = "";

  const questions = qcmData[theme][niveau];
  if (!questions || questions.length === 0) {
    qcmBox.innerHTML = "<p>Aucune question disponible pour ce thème et ce niveau.</p>";
    return;
  }

  const q = questions[Math.floor(Math.random() * questions.length)];

  const questionEl = document.createElement("h3");
  questionEl.textContent = q.question;
  qcmBox.appendChild(questionEl);

  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => {
      if (i === q.answer) {
        btn.classList.add("correct");
        btn.textContent += " ✅";
      } else {
        btn.classList.add("incorrect");
        btn.textContent += " ❌";
      }
      document.querySelectorAll(".option").forEach(o => o.onclick = null);
    };
    qcmBox.appendChild(btn);
  });
}
