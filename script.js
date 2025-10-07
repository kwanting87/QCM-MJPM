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
    };
    qcmBox.appendChild(btn);
  });
}

qcmData.santé.débutant = [
  {
    question: "Quel organisme attribue la CMU-C ?",
    options: ["CAF", "MDPH", "CPAM", "Conseil départemental"],
    answer: 2
  },
  {
    question: "Quel document permet de formaliser les volontés du majeur en matière de soins ?",
    options: ["Carte vitale", "Directives anticipées", "Mandat de protection future", "Projet de vie"],
    answer: 1
  },
  {
    question: "Quel professionnel peut prescrire un certificat médical circonstancié ?",
    options: ["Médecin généraliste", "Psychologue", "Infirmier", "Travailleur social"],
    answer: 0
  },
  {
    question: "Quel droit fondamental est lié au consentement aux soins ?",
    options: ["Droit à l’éducation", "Droit à la vie privée", "Droit à la santé", "Droit à l’autonomie"],
    answer: 3
  },
  {
    question: "Quel document est requis pour une hospitalisation sous contrainte ?",
    options: ["Ordonnance du médecin", "Certificat médical circonstancié", "Décision du juge", "Lettre du MJPM"],
    answer: 2
  },
  {
    question: "Quel organisme gère la Complémentaire Santé Solidaire ?",
    options: ["CPAM", "CAF", "MDPH", "ARS"],
    answer: 0
  },
  {
    question: "Quel professionnel peut évaluer les capacités cognitives du majeur ?",
    options: ["Médecin généraliste", "Psychologue", "Infirmier", "Travailleur social"],
    answer: 1
  },
  {
    question: "Quel document permet de désigner un représentant pour les soins ?",
    options: ["Carte vitale", "Mandat de protection future", "Attestation d’hébergement", "Relevé bancaire"],
    answer: 1
  },
  {
    question: "Quel principe impose de recueillir le consentement du majeur pour les soins ?",
    options: ["Neutralité", "Autonomie", "Confidentialité", "Subsidiarité"],
    answer: 1
  },
  {
    question: "Quel organisme peut attribuer l’AAH ?",
    options: ["CAF", "MDPH", "CPAM", "Conseil départemental"],
    answer: 1
  },
  {
    question: "Quel professionnel peut accompagner le majeur dans ses démarches de santé ?",
    options: ["MJPM", "Médecin", "Travailleur social", "Avocat"],
    answer: 2
  },
  {
    question: "Quel document est utilisé pour évaluer l’autonomie d’une personne âgée ?",
    options: ["Grille AGGIR", "Grille CNIL", "Grille RGPD", "Grille fiscale"],
    answer: 0
  },
  {
    question: "Quel droit est protégé par le secret médical ?",
    options: ["Droit à l’information", "Droit à la vie privée", "Droit à l’éducation", "Droit à la mobilité"],
    answer: 1
  },
  {
    question: "Quel professionnel peut rédiger un projet de soins ?",
    options: ["MJPM", "Médecin", "Psychologue", "Avocat"],
    answer: 1
  },
  {
    question: "Quel organisme peut intervenir en cas de maltraitance en établissement ?",
    options: ["ARS", "CAF", "MDPH", "CPAM"],
    answer: 0
  },
  {
    question: "Quel document est nécessaire pour une demande d’aide médicale d’État ?",
    options: ["Carte vitale", "Justificatif de domicile", "Relevé bancaire", "Attestation de CMU-C"],
    answer: 1
  },
  {
    question: "Quel professionnel peut accompagner le majeur dans la rédaction de ses directives anticipées ?",
    options: ["Médecin", "MJPM", "Avocat", "Infirmier"],
    answer: 0
  },
  {
    question: "Quel organisme peut financer un fauteuil roulant ?",
    options: ["CAF", "MDPH", "CPAM", "Conseil départemental"],
    answer: 2
  },
  {
    question: "Quel document est requis pour une demande de PCH ?",
    options: ["Dossier MDPH", "Carte vitale", "Relevé bancaire", "Attestation d’hébergement"],
    answer: 0
  },
  {
    question: "Quel professionnel peut intervenir dans une équipe mobile de soins palliatifs ?",
    options: ["Psychologue", "Avocat", "MJPM", "Notaire"],
    answer: 0
  }
];
qcmData.santé.intermédiaire = [
  {
    question: "Quel principe impose de recueillir le consentement du majeur pour les soins ?",
    options: ["Neutralité", "Autonomie", "Confidentialité", "Subsidiarité"],
    answer: 1
  },
  {
    question: "Quel professionnel peut évaluer les capacités cognitives du majeur ?",
    options: ["Médecin généraliste", "Psychologue", "Infirmier", "Travailleur social"],
    answer: 1
  },
  {
    question: "Quel document est requis pour une hospitalisation sous contrainte ?",
    options: ["Ordonnance du médecin", "Certificat médical circonstancié", "Décision du juge", "Lettre du MJPM"],
    answer: 2
  },
  {
    question: "Quel organisme peut attribuer l’AAH ?",
    options: ["CAF", "MDPH", "CPAM", "Conseil départemental"],
    answer: 1
  },
  {
    question: "Quel document est utilisé pour évaluer l’autonomie d’une personne âgée ?",
    options: ["Grille AGGIR", "Grille CNIL", "Grille RGPD", "Grille fiscale"],
    answer: 0
  },
  {
    question: "Quel professionnel peut rédiger un projet de soins ?",
    options: ["MJPM", "Médecin", "Psychologue", "Avocat"],
    answer: 1
  },
  {
    question: "Quel organisme peut intervenir en cas de maltraitance en établissement ?",
    options: ["ARS", "CAF", "MDPH", "CPAM"],
    answer: 0
  },
  {
    question: "Quel document est nécessaire pour une demande d’aide médicale d’État ?",
    options: ["Carte vitale", "Justificatif de domicile", "Relevé bancaire", "Attestation de CMU-C"],
    answer: 1
  },
  {
    question: "Quel professionnel peut accompagner le majeur dans la rédaction de ses directives anticipées ?",
    options: ["Médecin", "MJPM", "Avocat", "Infirmier"],
    answer: 0
  },
  {
    question: "Quel organisme peut financer un fauteuil roulant ?",
    options: ["CAF", "MDPH", "CPAM", "Conseil départemental"],
    answer: 2
  },
  {
    question: "Quel document est requis pour une demande de PCH ?",
    options: ["Dossier MDPH", "Carte vitale", "Relevé bancaire", "Attestation d’hébergement"],
    answer: 0
  },
  {
    question: "Quel professionnel peut intervenir dans une équipe mobile de soins palliatifs ?",
    options: ["Psychologue", "Avocat", "MJPM", "Notaire"],
    answer: 0
  },
  {
    question: "Quel organisme peut attribuer une aide technique pour le maintien à domicile ?",
    options: ["ARS", "MDPH", "CAF", "CPAM"],
    answer: 1
  },
  {
    question: "Quel document permet de désigner un représentant pour les soins ?",
    options: ["Carte vitale", "Mandat de protection future", "Attestation d’hébergement", "Relevé bancaire"],
    answer: 1
  },
  {
    question: "Quel professionnel peut établir un certificat d’hospitalisation ?",
    options: ["Médecin", "MJPM", "Psychologue", "Infirmier"],
    answer: 0
  },
  {
    question: "Quel organisme peut être saisi en cas de refus de soins injustifié ?",
    options: ["ARS", "MDPH", "CAF", "CPAM"],
    answer: 0
  },
  {
    question: "Quel document est utile pour évaluer les besoins en soins d’un majeur protégé ?",
    options: ["Projet de vie", "Bilan médical", "Relevé bancaire", "Attestation de domicile"],
    answer: 1
  },
  {
    question: "Quel professionnel peut accompagner le majeur dans ses démarches de santé ?",
    options: ["MJPM", "Médecin", "Travailleur social", "Avocat"],
    answer: 2
  },
  {
    question: "Quel organisme peut attribuer une aide pour les frais d’hébergement en EHPAD ?",
    options: ["CAF", "MDPH", "Conseil départemental", "CPAM"],
    answer: 2
  },
  {
    question: "Quel document est requis pour une demande d’aide à domicile ?",
    options: ["Carte vitale", "Dossier MDPH", "Relevé bancaire", "Lettre du MJPM"],
    answer: 1
  }
];
qcmData.santé.expérimenté = [
  {
    question: "Quel recours est possible en cas de refus de soins par un majeur protégé ?",
    options: ["Saisine du juge", "Signalement à la CPAM", "Demande à la MDPH", "Appel au MJPM"],
    answer: 0
  },
  {
    question: "Quel document est requis pour autoriser une hospitalisation sous contrainte ?",
    options: ["Ordonnance du médecin", "Certificat médical circonstancié", "Décision du juge", "Lettre du MJPM"],
    answer: 2
  },
  {
    question: "Quel professionnel peut évaluer la capacité de discernement du majeur ?",
    options: ["Médecin", "Psychiatre", "MJPM", "Infirmier"],
    answer: 1
  },
  {
    question: "Quel principe impose de respecter les volontés du majeur dans son parcours de soins ?",
    options: ["Neutralité", "Autonomie", "Confidentialité", "Subsidiarité"],
    answer: 1
  },
  {
    question: "Quel organisme peut être saisi en cas de non-respect des droits du patient ?",
    options: ["ARS", "MDPH", "CPAM", "CAF"],
    answer: 0
  },
  {
    question: "Quel document peut être utilisé pour contester une décision médicale ?",
    options: ["Lettre du MJPM", "Certificat médical", "Requête au juge", "Dossier médical"],
    answer: 2
  },
  {
    question: "Quel professionnel peut accompagner le majeur dans une procédure de soins sans consentement ?",
    options: ["MJPM", "Avocat", "Médecin", "Psychologue"],
    answer: 0
  },
  {
    question: "Quel organisme peut attribuer une aide exceptionnelle pour des soins coûteux ?",
    options: ["CAF", "CPAM", "MDPH", "Conseil départemental"],
    answer: 1
  },
  {
    question: "Quel document est requis pour une demande de reconnaissance de handicap ?",
    options: ["Certificat médical", "Carte vitale", "Relevé bancaire", "Lettre du MJPM"],
    answer: 0
  },
  {
    question: "Quel professionnel peut intervenir dans une procédure de soins psychiatriques ?",
    options: ["Psychiatre", "MJPM", "Avocat", "Infirmier"],
    answer: 0
  },
  {
    question: "Quel organisme peut être saisi en cas de refus d’accès au dossier médical ?",
    options: ["CNIL", "ARS", "MDPH", "CPAM"],
    answer: 0
  },
  {
    question: "Quel document permet de formaliser les souhaits du majeur en fin de vie ?",
    options: ["Directives anticipées", "Projet de vie", "Mandat de protection future", "Carte vitale"],
    answer: 0
  },
  {
    question: "Quel professionnel peut accompagner le majeur dans la rédaction de ses directives anticipées ?",
    options: ["Médecin", "MJPM", "Avocat", "Infirmier"],
    answer: 0
  },
  {
    question: "Quel organisme peut attribuer une aide technique pour le maintien à domicile ?",
    options: ["ARS", "MDPH", "CAF", "CPAM"],
    answer: 1
  },
  {
    question: "Quel document est requis pour une demande de PCH ?",
    options: ["Dossier MDPH", "Carte vitale", "Relevé bancaire", "Attestation d’hébergement"],
    answer: 0
  },
  {
    question: "Quel professionnel peut intervenir dans une équipe mobile de soins palliatifs ?",
    options: ["Psychologue", "Avocat", "MJPM", "Notaire"],
    answer: 0
  },
  {
    question: "Quel organisme peut attribuer une aide pour les frais d’hébergement en EHPAD ?",
    options: ["CAF", "MDPH", "Conseil départemental", "CPAM"],
    answer: 2
  },
    {
    question: "Quel document est requis pour une demande d’aide à domicile ?",
    options: ["Carte vitale", "Dossier MDPH", "Relevé bancaire", "Lettre du MJPM"],
    answer: 1
  },
  {
    question: "Quel professionnel peut être sollicité pour une expertise médicale judiciaire ?",
    options: ["Psychologue", "Médecin expert", "MJPM", "Infirmier coordinateur"],
    answer: 1
  },
  {
    question: "Quel recours peut être engagé en cas de soins non conformes aux droits du patient ?",
    options: ["Plainte à l’ARS", "Saisine du juge des tutelles", "Demande à la CPAM", "Signalement à la MDPH"],
    answer: 0
  },
  {
    question: "Quel document est utilisé pour suivre les traitements médicaux du majeur protégé ?",
    options: ["Dossier médical partagé", "Carte vitale", "Projet de vie", "Relevé bancaire"],
    answer: 0
  },
  {
    question: "Quel organisme peut attribuer une aide exceptionnelle pour des soins coûteux ?",
    options: ["CAF", "CPAM", "MDPH", "Conseil départemental"],
    answer: 1
  },
  {
    question: "Quel professionnel peut intervenir dans une procédure de soins psychiatriques sans consentement ?",
    options: ["Psychiatre", "MJPM", "Avocat", "Infirmier"],
    answer: 0
  },
  {
    question: "Quel document permet de contester une décision médicale prise sans consentement ?",
    options: ["Requête au juge", "Lettre du MJPM", "Certificat médical", "Attestation de soins"],
    answer: 0
  },
  {
    question: "Quel organisme peut être saisi en cas de refus d’accès au dossier médical ?",
    options: ["CNIL", "ARS", "MDPH", "CPAM"],
    answer: 0
  },
  {
    question: "Quel professionnel peut accompagner le majeur dans une procédure de soins sans consentement ?",
    options: ["MJPM", "Avocat", "Médecin", "Psychologue"],
    answer: 0
  },
  {
    question: "Quel document est requis pour une demande de reconnaissance de handicap ?",
    options: ["Certificat médical", "Carte vitale", "Relevé bancaire", "Lettre du MJPM"],
    answer: 0
  }
];




