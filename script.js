console.log("✅ script.js bien chargé !");

const qcmData = {
  santé: { débutant: [], intermédiaire: [], expérimenté: [] },
  patrimoine: { débutant: [], intermédiaire: [], expérimenté: [] },
  famille: { débutant: [], intermédiaire: [], expérimenté: [] },
  procédures: { débutant: [], intermédiaire: [], expérimenté: [] },
  action: { débutant: [], intermédiaire: [], expérimenté: [] }
};

let score = 0;
let totalRéponses = 0;
const questionsDéjàPosées = {};

function loadQuiz() {
  const theme = document.getElementById("theme").value;
  const niveau = document.getElementById("niveau").value;
  const qcmBox = document.getElementById("qcm");
  qcmBox.innerHTML = "";

  if (!questionsDéjàPosées[theme]) questionsDéjàPosées[theme] = {};
  if (!questionsDéjàPosées[theme][niveau]) questionsDéjàPosées[theme][niveau] = [];

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

  const block = document.createElement("div");
  block.className = "qcm-block";

  const titre = document.createElement("h3");
  titre.textContent = `🧠 Question ${totalRéponses + 1}`;
  block.appendChild(titre);

  const questionText = document.createElement("div");
  questionText.className = "question";
  questionText.textContent = q.question;
  block.appendChild(questionText);

  const optionsList = document.createElement("ul");
  optionsList.className = "options";

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = `${String.fromCharCode(65 + i)}) ${opt}`;
    li.onclick = () => {
      totalRéponses++;
      const allOptions = optionsList.querySelectorAll("li");
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
      scoreEl.innerHTML = `🧮 <strong>Score :</strong> ${score} / ${totalRéponses}`;
      block.appendChild(scoreEl);

      const explicationEl = document.createElement("div");
      explicationEl.className = "explanation";
      explicationEl.innerHTML = `💡 <strong>Explication :</strong> ${q.explanation}`;
      block.appendChild(explicationEl);
    };
    optionsList.appendChild(li);
  });

  block.appendChild(optionsList);
  qcmBox.appendChild(block);
}

window.loadQuiz = loadQuiz;

qcmData.santé.débutant = [
  {
    question: "Quel organisme délivre la Carte Vitale ?",
    options: ["La CAF", "La CPAM", "L’ARS", "La MDPH"],
    answer: 1,
    explanation: "La CPAM délivre la Carte Vitale aux assurés sociaux."
  },
  {
    question: "Que signifie le sigle CMU-C ?",
    options: ["Carte Médicale Universelle Complémentaire", "Couverture Maladie Universelle Complémentaire", "Centre Médical Universel Communal", "Convention Médicale Unique Complémentaire"],
    answer: 1,
    explanation: "La CMU-C est une aide complémentaire santé pour les personnes à faibles revenus."
  },
  {
    question: "Quel professionnel peut établir un certificat médical ?",
    options: ["Un médecin", "Un pharmacien", "Un infirmier", "Un assistant social"],
    answer: 0,
    explanation: "Seul un médecin est habilité à établir un certificat médical."
  },
  {
    question: "Quel est le rôle du médecin traitant ?",
    options: ["Organiser les urgences", "Coordonner les soins", "Contrôler les pharmacies", "Gérer les hôpitaux"],
    answer: 1,
    explanation: "Le médecin traitant coordonne les soins et oriente vers les spécialistes."
  },
  {
    question: "Quel est le rôle principal de l'ARS ?",
    options: ["Gérer les hôpitaux privés", "Organiser les élections", "Piloter la politique de santé publique régionale", "Contrôler les pharmacies"],
    answer: 2,
    explanation: "L'ARS pilote la politique de santé publique dans sa région."
  },
  {
    question: "Que signifie le sigle HAS ?",
    options: ["Haute Autorité de Santé", "Hôpital d’Accueil Scolaire", "Habilitation Administrative Spéciale", "Hébergement Assisté Sanitaire"],
    answer: 0,
    explanation: "La HAS est chargée d’évaluer les pratiques médicales et les produits de santé."
  },
  {
    question: "Quel document est nécessaire pour bénéficier de la CSS ?",
    options: ["Un passeport", "Une carte bancaire", "Une déclaration de ressources", "Un contrat de travail"],
    answer: 2,
    explanation: "La Complémentaire Santé Solidaire est attribuée sur critères de ressources."
  },
  {
    question: "Quel organisme gère l’assurance maladie ?",
    options: ["La CAF", "La CPAM", "La MSA", "L’ARS"],
    answer: 1,
    explanation: "La CPAM gère l’assurance maladie pour les salariés."
  },
  {
    question: "Quel professionnel peut prescrire un arrêt de travail ?",
    options: ["Un pharmacien", "Un médecin", "Un kinésithérapeute", "Un psychologue"],
    answer: 1,
    explanation: "Seul un médecin peut prescrire un arrêt de travail."
  },
  {
    question: "Quel est le rôle de la MDPH ?",
    options: ["Gérer les hôpitaux", "Attribuer les aides aux personnes handicapées", "Contrôler les médecins", "Organiser les campagnes de vaccination"],
    answer: 1,
    explanation: "La MDPH reconnaît les droits des personnes en situation de handicap."
  },
  {
    question: "Quel est le rôle de l’INPES ?",
    options: ["Former les médecins", "Gérer les urgences", "Promouvoir la santé publique", "Contrôler les pharmacies"],
    answer: 2,
    explanation: "L’INPES (devenu Santé publique France) est chargé de la prévention."
  },
  {
    question: "Quel est le rôle d’un psychologue dans le suivi médical ?",
    options: ["Prescrire des médicaments", "Évaluer l’état psychique", "Faire des analyses biologiques", "Gérer les urgences"],
    answer: 1,
    explanation: "Le psychologue évalue l’état psychique mais ne prescrit pas."
  },
  {
    question: "Quel est le rôle d’un infirmier libéral ?",
    options: ["Faire des diagnostics", "Prescrire des médicaments", "Réaliser des soins à domicile", "Gérer les urgences"],
    answer: 2,
    explanation: "L’infirmier libéral réalise des soins prescrits à domicile."
  },
  {
    question: "Quel est le rôle d’un pharmacien ?",
    options: ["Diagnostiquer une maladie", "Prescrire des soins", "Délivrer les médicaments", "Réaliser des examens médicaux"],
    answer: 2,
    explanation: "Le pharmacien délivre les médicaments prescrits."
  },
  {
    question: "Quel est le rôle de la Sécurité Sociale ?",
    options: ["Gérer les hôpitaux", "Organiser les élections", "Protéger contre les risques sociaux", "Contrôler les pharmacies"],
    answer: 2,
    explanation: "La Sécurité Sociale protège contre les risques maladie, vieillesse, etc."
  },
  {
    question: "Quel est le rôle d’un assistant social ?",
    options: ["Prescrire des soins", "Gérer les urgences", "Accompagner les personnes en difficulté", "Faire des diagnostics médicaux"],
    answer: 2,
    explanation: "L’assistant social accompagne les personnes dans leurs démarches."
  },
  {
    question: "Quel est le rôle de la carte Vitale ?",
    options: ["Payer les soins", "Identifier le médecin", "Transmettre les informations de remboursement", "Servir de carte bancaire"],
    answer: 2,
    explanation: "La carte Vitale permet la transmission des données de remboursement."
  },
  {
    question: "Quel est le rôle de la CPAM ?",
    options: ["Gérer les retraites", "Gérer l’assurance maladie", "Gérer les allocations familiales", "Gérer les hôpitaux"],
    answer: 1,
    explanation: "La CPAM gère l’assurance maladie pour les assurés sociaux."
  },
  {
    question: "Quel est le rôle de la CSS ?",
    options: ["Financer les hôpitaux", "Offrir une complémentaire santé gratuite ou à faible coût", "Organiser les soins urgents", "Contrôler les pharmacies"],
    answer: 1,
    explanation: "La Complémentaire Santé Solidaire aide les personnes à faibles revenus."
  },
  {
    question: "Quel est le rôle de Santé publique France ?",
    options: ["Gérer les hôpitaux", "Organiser les élections", "Promouvoir la santé et prévenir les risques", "Contrôler les pharmacies"],
    answer: 2,
    explanation: "Santé publique France est l’agence nationale de prévention et d’éducation à la santé."
  }
],
qcmData.santé.intermédiaire = [
  {
    question: "Quel est le rôle du Conseil National de l’Ordre des Médecins ?",
    options: [
      "Gérer les hôpitaux publics",
      "Sanctionner les patients",
      "Veiller au respect de la déontologie médicale",
      "Organiser les concours médicaux"
    ],
    answer: 2,
    explanation: "Le Conseil National veille au respect des règles déontologiques et à la qualité de l’exercice médical."
  },
  {
    question: "Quel organisme est compétent pour autoriser l’accès au dossier médical d’un majeur protégé ?",
    options: [
      "Le médecin traitant",
      "Le MJPM",
      "Le juge des contentieux de la protection",
      "La CPAM"
    ],
    answer: 2,
    explanation: "L’accès au dossier médical par le MJPM nécessite l’autorisation du juge des contentieux de la protection."
  },
  {
    question: "Quel est le rôle de Santé publique France ?",
    options: [
      "Gérer les hôpitaux",
      "Organiser les élections",
      "Promouvoir la santé et prévenir les risques",
      "Contrôler les pharmacies"
    ],
    answer: 2,
    explanation: "Santé publique France est l’agence nationale de prévention et d’éducation à la santé."
  },
  {
    question: "Quel est le rôle du médecin coordonnateur en EHPAD ?",
    options: [
      "Prescrire les traitements",
      "Gérer les urgences",
      "Évaluer les besoins médicaux collectifs",
      "Organiser les admissions"
    ],
    answer: 2,
    explanation: "Le médecin coordonnateur évalue les besoins médicaux et coordonne les soins au sein de l’établissement."
  },
  {
    question: "Quel est le rôle du MJPM dans le suivi médical d’un majeur protégé ?",
    options: [
      "Il décide des traitements",
      "Il accompagne le majeur dans ses démarches",
      "Il rédige les ordonnances",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM accompagne le majeur dans ses démarches de santé sans se substituer aux professionnels."
  },
  {
    question: "Quel est le rôle du juge des contentieux de la protection en matière de soins psychiatriques ?",
    options: [
      "Il prescrit les traitements",
      "Il autorise ou conteste les soins sans consentement",
      "Il organise les hospitalisations",
      "Il rédige les certificats médicaux"
    ],
    answer: 1,
    explanation: "Le juge peut autoriser ou contester une mesure de soins psychiatriques sans consentement."
  },
  {
    question: "Quel est le rôle du MJPM dans le refus de soins d’un majeur protégé ?",
    options: [
      "Il impose les soins",
      "Il peut accompagner le majeur et alerter le juge si nécessaire",
      "Il rédige les ordonnances",
      "Il décide seul"
    ],
    answer: 1,
    explanation: "Le MJPM accompagne le majeur dans ses choix et peut alerter le juge en cas de danger."
  },
  {
    question: "Quel est le rôle du médecin dans une hospitalisation sous contrainte ?",
    options: [
      "Il informe le MJPM",
      "Il rédige les certificats médicaux nécessaires",
      "Il décide seul de l’hospitalisation",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le médecin rédige les certificats médicaux qui justifient l’hospitalisation sous contrainte."
  },
  {
    question: "Quel est le rôle du MJPM dans une demande d’accès aux droits de santé ?",
    options: [
      "Il peut effectuer les démarches administratives",
      "Il décide des traitements",
      "Il rédige les ordonnances",
      "Il organise les soins"
    ],
    answer: 0,
    explanation: "Le MJPM peut effectuer les démarches pour que le majeur accède à ses droits de santé (CMU, CSS, etc.)."
  },
  {
    question: "Quel est le rôle du médecin dans la reconnaissance du handicap ?",
    options: [
      "Il rédige un certificat médical pour la MDPH",
      "Il décide de l’attribution de l’AAH",
      "Il organise les soins",
      "Il contrôle les aides sociales"
    ],
    answer: 0,
    explanation: "Le médecin rédige un certificat médical qui accompagne la demande auprès de la MDPH."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des rendez-vous médicaux ?",
    options: [
      "Il choisit les traitements",
      "Il peut prendre les rendez-vous si le majeur est empêché",
      "Il rédige les prescriptions",
      "Il contrôle les médecins"
    ],
    answer: 1,
    explanation: "Le MJPM peut organiser les rendez-vous médicaux si le majeur ne peut le faire seul."
  },
  {
    question: "Quel est le rôle du médecin dans l’évaluation de la capacité juridique ?",
    options: [
      "Il rédige un certificat circonstancié",
      "Il décide de la mesure de protection",
      "Il convoque le juge",
      "Il organise les soins"
    ],
    answer: 0,
    explanation: "Le médecin rédige un certificat circonstancié qui appuie la demande de mesure de protection."
  },
  {
    question: "Quel est le rôle du MJPM dans le renouvellement de la CSS ?",
    options: [
      "Il rédige les certificats médicaux",
      "Il peut accompagner le majeur dans les démarches",
      "Il décide de l’attribution",
      "Il contrôle les médecins"
    ],
    answer: 1,
    explanation: "Le MJPM peut aider le majeur à renouveler sa Complémentaire Santé Solidaire."
  },
  {
    question: "Quel est le rôle du médecin dans la procédure de soins sans consentement ?",
    options: [
      "Il rédige les certificats médicaux",
      "Il convoque le juge",
      "Il décide de la mesure de protection",
      "Il organise les soins"
    ],
    answer: 0,
    explanation: "Le médecin rédige les certificats qui justifient la procédure de soins sans consentement."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion du dossier médical ?",
    options: [
      "Il peut y accéder avec autorisation du juge",
      "Il rédige les comptes rendus",
      "Il décide des traitements",
      "Il organise les soins"
    ],
    answer: 0,
    explanation: "Le MJPM peut accéder au dossier médical du majeur protégé avec autorisation du juge."
  },
  {
    question: "Quel est le rôle du médecin dans la procédure de mise sous protection ?",
    options: [
      "Il rédige un certificat circonstancié",
      "Il convoque le MJPM",
      "Il décide de la mesure",
      "Il organise les soins"
    ],
    answer: 0,
    explanation: "Le médecin rédige un certificat circonstancié qui appuie la demande de protection juridique."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des urgences médicales ?",
    options: [
      "Il décide des soins",
      "Il peut être informé et intervenir si le majeur est en danger",
      "Il rédige les ordonnances",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut intervenir en cas d’urgence si le majeur est en danger ou incapable de décider."
  },
  {
    question: "Quel est le rôle du médecin dans la procédure d’hospitalisation d’office ?",
    options: [
      "Il rédige les certificats médicaux",
      "Il convoque le juge",
      "Il décide de la mesure de protection",
      "Il organise les soins"
    ],
    answer: 0,
    explanation: "Le médecin rédige les certificats qui justifient l’hospitalisation d’office."
  },
  {
    question: "Quel est le rôle du MJPM dans la demande d’AAH ?",
    options: [
      "Il décide de l’attribution",
      "Il peut accompagner le majeur dans les démarches",
      "Il rédige les certificats médicaux",
      "Il contrôle les médecins"
    ],
    answer: 1,
    explanation: "Le MJPM peut aider le majeur à constituer son dossier pour l’Allocation Adulte Handicapé."
  },
  {
    question: "Quel est le rôle du médecin dans la procédure de soins psychiatriques ?",
    options: [
      "Il rédige les certificats",
      "Il convoque le juge",
      "Il organise les soins",
      "Il décide de la mesure de protection"
    ],
    answer: 0,
    explanation: "Le médecin rédige les certificats médicaux nécessaires à la mise en œuvre des soins psychiatriques."
  }
],
qcmData.santé.expérimenté = [
  {
    question: "Dans quel cas le MJPM peut accéder au dossier médical d’un majeur protégé ?",
    options: [
      "Toujours, sans condition",
      "Avec l’accord du médecin",
      "Avec l’autorisation du juge",
      "Jamais"
    ],
    answer: 2,
    explanation: "L’accès au dossier médical nécessite l’autorisation du juge des contentieux de la protection."
  },
  {
    question: "Que doit faire le MJPM si un majeur protégé refuse des soins vitaux ?",
    options: [
      "Respecter le refus sans condition",
      "Imposer les soins",
      "Alerter le juge des contentieux de la protection",
      "Demander l’avis du médecin traitant"
    ],
    answer: 2,
    explanation: "Le MJPM doit alerter le juge si le refus de soins met en danger la vie du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une hospitalisation sous contrainte ?",
    options: [
      "Il rédige les certificats",
      "Il peut contester la mesure ou demander sa levée",
      "Il décide de l’hospitalisation",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut contester une hospitalisation sous contrainte ou demander sa levée."
  },
  {
    question: "Comment le MJPM doit-il gérer une situation de soins psychiatriques sans consentement ?",
    options: [
      "Il impose les soins",
      "Il informe la famille",
      "Il veille au respect des droits du majeur et peut saisir le juge",
      "Il rédige les certificats médicaux"
    ],
    answer: 2,
    explanation: "Le MJPM veille au respect des droits du majeur et peut saisir le juge si nécessaire."
  },
  {
    question: "Quel est le rôle du MJPM dans la demande d’aide médicale d’État (AME) ?",
    options: [
      "Il décide de l’attribution",
      "Il peut accompagner le majeur dans les démarches",
      "Il rédige les certificats médicaux",
      "Il contrôle les médecins"
    ],
    answer: 1,
    explanation: "Le MJPM peut aider le majeur à constituer son dossier pour l’AME."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est hospitalisé sans l’avoir informé ?",
    options: [
      "Demander des explications à l’établissement",
      "Saisir le juge immédiatement",
      "Ignorer la situation",
      "Demander l’accès au dossier médical sans autorisation"
    ],
    answer: 0,
    explanation: "Le MJPM peut demander des explications à l’établissement et vérifier la légalité de la procédure."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des soins palliatifs ?",
    options: [
      "Il décide de l’arrêt des traitements",
      "Il accompagne le majeur et veille au respect de ses volontés",
      "Il rédige les prescriptions",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM veille au respect des volontés du majeur en fin de vie."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est victime de maltraitance médicale ?",
    options: [
      "Rédiger un certificat",
      "Saisir le procureur ou le juge",
      "Ignorer la situation",
      "Demander un changement de médecin"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir les autorités compétentes en cas de maltraitance."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des soins à domicile ?",
    options: [
      "Il organise les soins",
      "Il choisit les prestataires",
      "Il accompagne le majeur dans la mise en place des soins",
      "Il rédige les ordonnances"
    ],
    answer: 2,
    explanation: "Le MJPM accompagne le majeur dans la mise en place des soins sans se substituer aux professionnels."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est en rupture de droits de santé ?",
    options: [
      "Attendre que le majeur agisse",
      "Saisir le juge",
      "Effectuer les démarches nécessaires",
      "Demander à l’ARS d’intervenir"
    ],
    answer: 2,
    explanation: "Le MJPM doit agir pour rétablir les droits de santé du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des soins en EHPAD ?",
    options: [
      "Il décide des traitements",
      "Il coordonne les soins",
      "Il veille au respect des droits du majeur",
      "Il rédige les prescriptions"
    ],
    answer: 2,
    explanation: "Le MJPM veille au respect des droits du majeur sans interférer dans les décisions médicales."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est hospitalisé en urgence ?",
    options: [
      "Demander l’accès au dossier médical",
      "Saisir le juge",
      "Se rendre sur place et s’informer",
      "Ignorer la situation"
    ],
    answer: 2,
    explanation: "Le MJPM doit se rendre sur place et s’informer pour assurer le suivi de la mesure."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des soins psychiatriques ambulatoires ?",
    options: [
      "Il impose les soins",
      "Il accompagne le majeur dans le respect du protocole",
      "Il rédige les certificats",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM accompagne le majeur dans le respect du protocole sans imposer les soins."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est en errance médicale ?",
    options: [
      "Saisir le juge",
      "Organiser les soins",
      "Accompagner le majeur vers une prise en charge adaptée",
      "Demander une hospitalisation d’office"
    ],
    answer: 2,
    explanation: "Le MJPM accompagne le majeur vers une prise en charge adaptée."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des soins en psychiatrie ?",
    options: [
      "Il décide des traitements",
      "Il rédige les certificats",
      "Il veille au respect des droits et peut saisir le juge",
      "Il organise les soins"
    ],
    answer: 2,
    explanation: "Le MJPM veille au respect des droits du majeur et peut saisir le juge si nécessaire."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est privé de soins ?",
    options: [
      "Respecter la décision médicale",
      "Saisir le juge ou le procureur",
      "Ignorer la situation",
      "Demander un changement d’établissement"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir les autorités compétentes si le majeur est privé de soins."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des soins en milieu pénitentiaire ?",
    options: [
      "Il décide des soins",
      "Il rédige les certificats",
      "Il veille au respect des droits du majeur",
      "Il organise les soins"
    ],
    answer: 2,
    explanation: "Le MJPM veille au respect des droits du majeur même en détention."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est hospitalisé sans consentement ?",
    options: [
      "Demander l’accès au dossier",
      "Saisir le juge pour contester la mesure",
      "Ignorer la situation",
      "Demander un changement de médecin"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge pour contester une hospitalisation sans consentement."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des soins en situation de précarité ?",
    options: [
      "Il organise les soins",
      "Il accompagne le majeur vers les dispositifs adaptés",
      "Il rédige les ordonnances",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM accompagne le majeur vers les dispositifs adaptés (PASS, AME, etc.)."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est victime de refus de soins ?",
    options: [
      "Saisir le juge ou le procureur",
      "Respecter la décision médicale",
      "Ignorer la situation",
      "Demander un changement de médecin"
    ],
    answer: 0,
    explanation: "Le MJPM doit saisir les autorités compétentes en cas de refus de soins injustifié."
  },
qcmData.patrimoine.débutant = [
  {
    question: "Qu’est-ce qu’un patrimoine ?",
    options: [
      "Un ensemble de dettes",
      "Un ensemble de biens et de droits",
      "Un contrat d’assurance",
      "Un document fiscal"
    ],
    answer: 1,
    explanation: "Le patrimoine regroupe l’ensemble des biens, droits et obligations d’une personne."
  },
  {
    question: "Quel document permet de prouver la propriété d’un bien immobilier ?",
    options: [
      "Une facture",
      "Un bail",
      "Un acte notarié",
      "Une carte Vitale"
    ],
    answer: 2,
    explanation: "L’acte notarié est le document officiel qui atteste de la propriété d’un bien immobilier."
  },
  {
    question: "Qu’est-ce qu’un livret A ?",
    options: [
      "Un contrat de travail",
      "Un compte bancaire réglementé",
      "Un document fiscal",
      "Un titre de propriété"
    ],
    answer: 1,
    explanation: "Le livret A est un compte d’épargne réglementé, accessible à tous."
  },
  {
    question: "Quel professionnel gère les successions ?",
    options: [
      "Le médecin",
      "Le notaire",
      "Le banquier",
      "Le MJPM"
    ],
    answer: 1,
    explanation: "Le notaire est compétent pour gérer les successions et établir les actes de partage."
  },
  {
    question: "Qu’est-ce qu’un bien meuble ?",
    options: [
      "Un appartement",
      "Une voiture",
      "Un terrain",
      "Un immeuble"
    ],
    answer: 1,
    explanation: "Un bien meuble est un bien mobile comme une voiture, un meuble ou un objet."
  },
  {
    question: "Qu’est-ce qu’un bien immeuble ?",
    options: [
      "Une télévision",
      "Un terrain",
      "Une voiture",
      "Un compte bancaire"
    ],
    answer: 1,
    explanation: "Un bien immeuble est un bien fixé au sol comme un terrain ou un bâtiment."
  },
  {
    question: "Quel document atteste de la propriété d’un véhicule ?",
    options: [
      "La carte grise",
      "Le permis de conduire",
      "Le contrat d’assurance",
      "Le livret de famille"
    ],
    answer: 0,
    explanation: "La carte grise est le certificat d’immatriculation du véhicule, preuve de propriété."
  },
  {
    question: "Qu’est-ce qu’un compte courant ?",
    options: [
      "Un compte d’épargne",
      "Un compte utilisé pour les opérations bancaires quotidiennes",
      "Un compte bloqué",
      "Un compte fiscal"
    ],
    answer: 1,
    explanation: "Le compte courant est utilisé pour les opérations bancaires courantes (virements, retraits, etc.)."
  },
  {
    question: "Quel organisme gère les comptes bancaires ?",
    options: [
      "La CPAM",
      "La CAF",
      "La banque",
      "Le notaire"
    ],
    answer: 2,
    explanation: "Les banques gèrent les comptes bancaires et les opérations financières."
  },
  {
    question: "Qu’est-ce qu’un héritier ?",
    options: [
      "Une personne qui reçoit un salaire",
      "Une personne qui reçoit des biens après un décès",
      "Une personne qui loue un logement",
      "Une personne qui rembourse un prêt"
    ],
    answer: 1,
    explanation: "Un héritier est une personne qui reçoit les biens d’un défunt selon la loi ou un testament."
  },
  {
    question: "Qu’est-ce qu’un testament ?",
    options: [
      "Un contrat de travail",
      "Un document médical",
      "Un document par lequel une personne organise sa succession",
      "Un acte de naissance"
    ],
    answer: 2,
    explanation: "Le testament permet à une personne de désigner ses héritiers et de répartir ses biens."
  },
  {
    question: "Quel professionnel peut rédiger un testament authentique ?",
    options: [
      "Un avocat",
      "Un notaire",
      "Un médecin",
      "Un banquier"
    ],
    answer: 1,
    explanation: "Le testament authentique est rédigé par un notaire en présence de témoins."
  },
  {
    question: "Qu’est-ce qu’un usufruit ?",
    options: [
      "Le droit de vendre un bien",
      "Le droit d’utiliser un bien et d’en percevoir les revenus",
      "Le droit de le donner",
      "Le droit de le louer"
    ],
    answer: 1,
    explanation: "L’usufruit permet d’utiliser un bien et d’en percevoir les revenus sans en être propriétaire."
  },
  {
    question: "Qu’est-ce qu’un bien indivis ?",
    options: [
      "Un bien appartenant à une seule personne",
      "Un bien partagé entre plusieurs personnes",
      "Un bien loué",
      "Un bien hypothéqué"
    ],
    answer: 1,
    explanation: "Un bien indivis est un bien détenu par plusieurs personnes sans division matérielle."
  },
  {
    question: "Qu’est-ce qu’un bail ?",
    options: [
      "Un contrat de vente",
      "Un contrat de location",
      "Un contrat de travail",
      "Un contrat d’assurance"
    ],
    answer: 1,
    explanation: "Le bail est un contrat de location entre un propriétaire et un locataire."
  },
  {
    question: "Quel document est nécessaire pour ouvrir un compte bancaire ?",
    options: [
      "Un acte de naissance",
      "Une carte Vitale",
      "Une pièce d’identité",
      "Un contrat de travail"
    ],
    answer: 2,
    explanation: "Une pièce d’identité est obligatoire pour ouvrir un compte bancaire."
  },
  {
    question: "Qu’est-ce qu’un revenu foncier ?",
    options: [
      "Un salaire",
      "Une pension",
      "Un revenu issu de la location d’un bien immobilier",
      "Une aide sociale"
    ],
    answer: 2,
    explanation: "Le revenu foncier est généré par la location de biens immobiliers."
  },
  {
    question: "Qu’est-ce qu’un compte joint ?",
    options: [
      "Un compte partagé entre plusieurs titulaires",
      "Un compte bloqué",
      "Un compte professionnel",
      "Un compte d’épargne"
    ],
    answer: 0,
    explanation: "Un compte joint est un compte bancaire ouvert par plusieurs personnes."
  },
  {
    question: "Qu’est-ce qu’un prêt immobilier ?",
    options: [
      "Un prêt pour acheter un véhicule",
      "Un prêt pour financer des études",
      "Un prêt pour acheter un bien immobilier",
      "Un prêt pour payer des soins"
    ],
    answer: 2,
    explanation: "Le prêt immobilier permet de financer l’achat d’un logement ou d’un terrain."
  },
  {
    question: "Qu’est-ce qu’un relevé de compte ?",
    options: [
      "Un document médical",
      "Un document fiscal",
      "Un document bancaire qui récapitule les opérations",
      "Un contrat de travail"
    ],
    answer: 2,
    explanation: "Le relevé de compte est un document bancaire qui détaille les opérations effectuées."
  }
],
qcmData.patrimoine.intermédiaire = [
  {
    question: "Quel document le MJPM doit-il produire pour vendre un bien immobilier du majeur protégé ?",
    options: [
      "Une autorisation du juge",
      "Une carte d’identité",
      "Un contrat de bail",
      "Un certificat médical"
    ],
    answer: 0,
    explanation: "La vente d’un bien immobilier nécessite l’autorisation préalable du juge des contentieux de la protection."
  },
  {
    question: "Quel est le rôle du notaire dans une succession ?",
    options: [
      "Il rédige les ordonnances",
      "Il établit les actes de partage et vérifie les droits des héritiers",
      "Il organise les soins",
      "Il contrôle les comptes bancaires"
    ],
    answer: 1,
    explanation: "Le notaire est chargé de gérer les successions et d’établir les actes de partage."
  },
  {
    question: "Qu’est-ce qu’un inventaire patrimonial ?",
    options: [
      "Une liste des dettes fiscales",
      "Un relevé bancaire",
      "Un état des biens, droits et obligations du majeur",
      "Un contrat de location"
    ],
    answer: 2,
    explanation: "L’inventaire patrimonial recense les biens, droits et dettes du majeur protégé."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des comptes bancaires ?",
    options: [
      "Il peut ouvrir, clôturer et gérer les comptes avec autorisation",
      "Il rédige les relevés",
      "Il contrôle les banques",
      "Il décide des placements sans contrôle"
    ],
    answer: 0,
    explanation: "Le MJPM peut gérer les comptes bancaires du majeur dans le cadre de sa mission."
  },
  {
    question: "Qu’est-ce qu’un compte-titres ?",
    options: [
      "Un compte d’épargne réglementé",
      "Un compte dédié aux placements financiers",
      "Un compte bancaire classique",
      "Un compte fiscal"
    ],
    answer: 1,
    explanation: "Le compte-titres permet de détenir des actions, obligations et autres produits financiers."
  },
  {
    question: "Quel est le rôle du MJPM dans la déclaration fiscale du majeur protégé ?",
    options: [
      "Il rédige les lois fiscales",
      "Il peut établir et transmettre la déclaration",
      "Il contrôle les impôts",
      "Il organise les paiements"
    ],
    answer: 1,
    explanation: "Le MJPM peut établir et transmettre la déclaration fiscale du majeur protégé."
  },
  {
    question: "Qu’est-ce qu’un usufruitier ne peut pas faire ?",
    options: [
      "Utiliser le bien",
      "Percevoir les revenus",
      "Vendre le bien",
      "Entretenir le bien"
    ],
    answer: 2,
    explanation: "L’usufruitier ne peut pas vendre le bien, seul le nu-propriétaire le peut."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession ?",
    options: [
      "Il rédige le testament",
      "Il peut accepter ou refuser la succession avec autorisation du juge",
      "Il décide seul du partage",
      "Il organise les funérailles"
    ],
    answer: 1,
    explanation: "Le MJPM peut accepter ou refuser une succession avec autorisation du juge."
  },
  {
    question: "Qu’est-ce qu’un bien indivis ?",
    options: [
      "Un bien appartenant à une seule personne",
      "Un bien partagé entre plusieurs personnes sans division",
      "Un bien loué",
      "Un bien hypothéqué"
    ],
    answer: 1,
    explanation: "Un bien indivis est détenu par plusieurs personnes sans division matérielle."
  },
  {
    question: "Quel est le rôle du juge dans la gestion patrimoniale du majeur protégé ?",
    options: [
      "Il rédige les actes de vente",
      "Il autorise les actes de disposition importants",
      "Il contrôle les banques",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le juge autorise les actes de disposition comme la vente d’un bien immobilier."
  },
  {
    question: "Qu’est-ce qu’un placement à risque ?",
    options: [
      "Un compte courant",
      "Un livret A",
      "Une action en bourse",
      "Un contrat de travail"
    ],
    answer: 2,
    explanation: "Les actions en bourse sont des placements à risque soumis aux fluctuations du marché."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion locative ?",
    options: [
      "Il rédige les baux",
      "Il peut gérer les loyers et les charges",
      "Il décide des travaux",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut gérer les loyers et charges dans le cadre de la protection."
  },
  {
    question: "Qu’est-ce qu’un acte de disposition ?",
    options: [
      "Un acte courant",
      "Un acte qui modifie durablement le patrimoine",
      "Un acte médical",
      "Un acte de naissance"
    ],
    answer: 1,
    explanation: "Un acte de disposition modifie durablement le patrimoine (vente, donation, etc.)."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien immobilier ?",
    options: [
      "Il peut vendre sans autorisation",
      "Il peut gérer les travaux et les charges",
      "Il rédige les actes notariés",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut gérer les travaux et charges, mais la vente nécessite une autorisation."
  },
  {
    question: "Qu’est-ce qu’un contrat d’assurance vie ?",
    options: [
      "Un contrat de travail",
      "Un contrat de location",
      "Un produit d’épargne avec bénéficiaire",
      "Un contrat médical"
    ],
    answer: 2,
    explanation: "L’assurance vie est un produit d’épargne avec clause bénéficiaire."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un contrat d’assurance ?",
    options: [
      "Il peut souscrire ou résilier avec autorisation",
      "Il rédige les contrats",
      "Il contrôle les compagnies",
      "Il organise les soins"
    ],
    answer: 0,
    explanation: "Le MJPM peut souscrire ou résilier un contrat d’assurance avec autorisation du juge."
  },
  {
    question: "Qu’est-ce qu’un bien propre ?",
    options: [
      "Un bien loué",
      "Un bien appartenant à une seule personne",
      "Un bien en indivision",
      "Un bien hypothéqué"
    ],
    answer: 1,
    explanation: "Un bien propre est un bien appartenant exclusivement à une personne."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des dettes ?",
    options: [
      "Il peut contester les dettes",
      "Il peut négocier et payer les dettes dans le cadre de sa mission",
      "Il rédige les contrats",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut négocier et payer les dettes du majeur protégé."
  },
  {
    question: "Qu’est-ce qu’un acte conservatoire ?",
    options: [
      "Un acte qui modifie le patrimoine",
      "Un acte qui protège le patrimoine sans le modifier",
      "Un acte médical",
      "Un acte de naissance"
    ],
    answer: 1,
    explanation: "Un acte conservatoire vise à protéger le patrimoine sans le modifier (réparations urgentes, etc.)."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des successions complexes ?",
    options: [
      "Il décide seul",
      "Il peut demander l’aide d’un notaire et saisir le juge",
      "Il rédige les actes",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut faire appel à un notaire et saisir le juge en cas de succession complexe."
  }
],
qcmData.patrimoine.expérimenté = [
  {
    question: "Que doit faire le MJPM avant de vendre un bien immobilier appartenant au majeur protégé ?",
    options: [
      "Obtenir l’accord du notaire",
      "Demander l’autorisation du juge",
      "Informer la famille",
      "Signer un bail"
    ],
    answer: 1,
    explanation: "La vente d’un bien immobilier nécessite l’autorisation préalable du juge des contentieux de la protection."
  },
  {
    question: "Dans quel cas le MJPM peut refuser une succession ?",
    options: [
      "Si elle est déficitaire et avec autorisation du juge",
      "Si elle contient un bien immobilier",
      "Si elle est imposable",
      "Si elle est en indivision"
    ],
    answer: 0,
    explanation: "Le MJPM peut refuser une succession déficitaire avec autorisation du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une indivision successorale ?",
    options: [
      "Il peut vendre seul les biens",
      "Il peut demander le partage judiciaire",
      "Il rédige les actes notariés",
      "Il décide du maintien en indivision"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander le partage judiciaire pour sortir d’une indivision complexe."
  },
  {
    question: "Que doit faire le MJPM en cas de litige entre héritiers ?",
    options: [
      "Organiser une médiation",
      "Saisir le juge des tutelles",
      "Ignorer le conflit",
      "Rédiger un testament"
    ],
    answer: 1,
    explanation: "Le MJPM saisit le juge pour arbitrer les conflits successoraux."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien loué ?",
    options: [
      "Il peut gérer les loyers et charges",
      "Il rédige les actes de vente",
      "Il décide des travaux sans autorisation",
      "Il organise les soins"
    ],
    answer: 0,
    explanation: "Le MJPM peut gérer les loyers et charges dans le cadre de la protection."
  },
  {
    question: "Que doit faire le MJPM pour souscrire un contrat d’assurance vie ?",
    options: [
      "Rien, il est autorisé automatiquement",
      "Obtenir l’accord du banquier",
      "Demander l’autorisation du juge",
      "Signer un bail"
    ],
    answer: 2,
    explanation: "La souscription d’un contrat d’assurance vie est un acte de disposition soumis à autorisation."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un portefeuille de titres ?",
    options: [
      "Il peut vendre et acheter librement",
      "Il doit obtenir l’autorisation du juge pour tout acte",
      "Il peut gérer les arbitrages avec prudence",
      "Il rédige les contrats"
    ],
    answer: 2,
    explanation: "Le MJPM peut gérer les arbitrages dans le respect du mandat et avec prudence."
  },
  {
    question: "Que doit faire le MJPM en cas de saisie sur compte bancaire du majeur ?",
    options: [
      "Ignorer la procédure",
      "Contester la saisie auprès du juge",
      "Demander une mainlevée au banquier",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut contester la saisie auprès du juge compétent."
  },
  {
    question: "Quel est le rôle du MJPM dans la régularisation d’une dette fiscale ?",
    options: [
      "Il peut négocier un échéancier",
      "Il rédige les lois fiscales",
      "Il organise les soins",
      "Il décide des impôts"
    ],
    answer: 0,
    explanation: "Le MJPM peut négocier un échéancier avec l’administration fiscale."
  },
  {
    question: "Que doit faire le MJPM en cas de donation envisagée par le majeur protégé ?",
    options: [
      "L’autoriser sans condition",
      "Demander l’autorisation du juge",
      "Rédiger l’acte",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Toute donation nécessite l’autorisation du juge des contentieux de la protection."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien en indivision ?",
    options: [
      "Il peut vendre sans autorisation",
      "Il peut demander le partage ou la vente avec autorisation",
      "Il rédige les actes notariés",
      "Il décide seul"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander le partage ou la vente avec autorisation du juge."
  },
  {
    question: "Que doit faire le MJPM en cas de litige avec un locataire ?",
    options: [
      "Saisir le juge compétent",
      "Organiser une médiation",
      "Ignorer le conflit",
      "Rédiger un bail"
    ],
    answer: 0,
    explanation: "Le MJPM peut saisir le juge compétent pour résoudre le litige."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien hypothéqué ?",
    options: [
      "Il peut le vendre librement",
      "Il doit obtenir l’autorisation du juge",
      "Il rédige les actes",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "La vente d’un bien hypothéqué nécessite l’autorisation du juge."
  },
  {
    question: "Que doit faire le MJPM en cas de succession internationale ?",
    options: [
      "Saisir le juge français",
      "Contacter un notaire spécialisé",
      "Ignorer la succession",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM doit faire appel à un notaire spécialisé en droit international privé."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un patrimoine professionnel ?",
    options: [
      "Il peut gérer l’activité sans autorisation",
      "Il doit obtenir l’autorisation du juge pour tout acte",
      "Il rédige les contrats",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "La gestion d’un patrimoine professionnel nécessite l’autorisation du juge pour les actes importants."
  },
  {
    question: "Que doit faire le MJPM en cas de vente d’un bien mobilier de valeur ?",
    options: [
      "Rien, il est autorisé automatiquement",
      "Demander l’autorisation du juge",
      "Organiser les soins",
      "Rédiger un bail"
    ],
    answer: 1,
    explanation: "La vente d’un bien mobilier de valeur est un acte de disposition soumis à autorisation."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un contrat de prêt ?",
    options: [
      "Il peut le signer librement",
      "Il doit obtenir l’autorisation du juge",
      "Il rédige les contrats",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "La souscription d’un prêt est un acte de disposition nécessitant l’autorisation du juge."
  },
  {
    question: "Que doit faire le MJPM en cas de contestation d’un acte de gestion ?",
    options: [
      "Saisir le juge",
      "Organiser une médiation",
      "Ignorer la contestation",
      "Rédiger un contrat"
    ],
    answer: 0,
    explanation: "Le MJPM peut saisir le juge pour valider ou contester un acte de gestion."
  },
  {
    question: "Quel est le rôle du MJPM dans la protection du patrimoine numérique ?",
    options: [
      "Il peut accéder aux comptes sans autorisation",
      "Il doit obtenir l’autorisation du juge pour les actes sensibles",
      "Il rédige les contrats",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "La gestion du patrimoine numérique peut nécessiter une autorisation selon les enjeux."
  },
  {
    question: "Que doit faire le MJPM en cas de litige fiscal complexe ?",
    options: [
      "Saisir le juge",
      "Organiser les soins",
      "Rédiger les lois",
      "Ignorer le litige"
    ],
    answer: 0,
    explanation: "Le MJPM peut saisir le juge ou faire appel à un professionnel pour résoudre un litige fiscal complexe."
  }
],
qcmData.famille.débutant = [
  {
    question: "Qu’est-ce qu’un livret de famille ?",
    options: [
      "Un document fiscal",
      "Un document médical",
      "Un document officiel regroupant les actes d’état civil",
      "Un contrat de travail"
    ],
    answer: 2,
    explanation: "Le livret de famille contient les actes d’état civil des membres d’une famille."
  },
  {
    question: "Qui délivre le livret de famille ?",
    options: [
      "Le médecin",
      "La mairie",
      "La CAF",
      "Le notaire"
    ],
    answer: 1,
    explanation: "Le livret de famille est délivré par la mairie lors d’un mariage ou d’une naissance."
  },
  {
    question: "Qu’est-ce qu’un acte de naissance ?",
    options: [
      "Un document bancaire",
      "Un document médical",
      "Un document d’état civil attestant de la naissance",
      "Un contrat de travail"
    ],
    answer: 2,
    explanation: "L’acte de naissance est un document officiel attestant de la naissance d’une personne."
  },
  {
    question: "Qui peut demander un acte de naissance ?",
    options: [
      "Uniquement les parents",
      "Toute personne majeure",
      "Le médecin traitant",
      "Le banquier"
    ],
    answer: 1,
    explanation: "Toute personne majeure peut demander son acte de naissance ou celui de ses enfants."
  },
  {
    question: "Qu’est-ce qu’un mariage civil ?",
    options: [
      "Un contrat de travail",
      "Une cérémonie religieuse",
      "Une union reconnue par la loi",
      "Un acte médical"
    ],
    answer: 2,
    explanation: "Le mariage civil est une union légale célébrée en mairie."
  },
  {
    question: "Quel document atteste d’un mariage civil ?",
    options: [
      "Un certificat médical",
      "Un acte de mariage",
      "Un livret de famille",
      "Un contrat de bail"
    ],
    answer: 1,
    explanation: "L’acte de mariage est le document officiel attestant de l’union civile."
  },
  {
    question: "Qu’est-ce qu’un PACS ?",
    options: [
      "Un contrat de travail",
      "Un contrat d’union civile entre deux personnes",
      "Un acte médical",
      "Un document fiscal"
    ],
    answer: 1,
    explanation: "Le PACS est un contrat d’union civile entre deux personnes majeures."
  },
  {
    question: "Où peut-on enregistrer un PACS ?",
    options: [
      "À l’hôpital",
      "À la banque",
      "À la mairie ou chez le notaire",
      "À la CAF"
    ],
    answer: 2,
    explanation: "Le PACS peut être enregistré à la mairie ou chez un notaire."
  },
  {
    question: "Qu’est-ce qu’un divorce ?",
    options: [
      "Une séparation légale entre époux",
      "Un contrat de travail",
      "Un acte de naissance",
      "Un document médical"
    ],
    answer: 0,
    explanation: "Le divorce est la rupture légale du mariage entre deux époux."
  },
  {
    question: "Quel document atteste d’un divorce ?",
    options: [
      "Un acte de naissance",
      "Un jugement de divorce",
      "Un certificat médical",
      "Un contrat de bail"
    ],
    answer: 1,
    explanation: "Le jugement de divorce est le document officiel prononçant la séparation."
  },
  {
    question: "Qu’est-ce qu’une pension alimentaire ?",
    options: [
      "Une aide versée pour les frais médicaux",
      "Une aide versée pour l’entretien d’un enfant ou d’un ex-conjoint",
      "Un revenu foncier",
      "Un prêt bancaire"
    ],
    answer: 1,
    explanation: "La pension alimentaire est une somme versée pour subvenir aux besoins d’un enfant ou d’un ex-conjoint."
  },
  {
    question: "Qui peut fixer une pension alimentaire ?",
    options: [
      "Le médecin",
      "Le juge aux affaires familiales",
      "Le banquier",
      "Le MJPM"
    ],
    answer: 1,
    explanation: "Le juge aux affaires familiales fixe le montant de la pension alimentaire."
  },
  {
    question: "Qu’est-ce qu’une filiation ?",
    options: [
      "Un lien fiscal",
      "Un lien de parenté entre un enfant et ses parents",
      "Un contrat de travail",
      "Un acte médical"
    ],
    answer: 1,
    explanation: "La filiation est le lien juridique entre un enfant et ses parents."
  },
  {
    question: "Qu’est-ce qu’une autorité parentale ?",
    options: [
      "Le droit de vote",
      "Le droit de gérer les biens d’un enfant",
      "L’ensemble des droits et devoirs des parents envers leur enfant",
      "Un contrat de travail"
    ],
    answer: 2,
    explanation: "L’autorité parentale regroupe les droits et devoirs des parents pour protéger et éduquer leur enfant."
  },
  {
    question: "Qui exerce l’autorité parentale ?",
    options: [
      "Le médecin",
      "Les parents",
      "Le juge",
      "Le banquier"
    ],
    answer: 1,
    explanation: "L’autorité parentale est exercée par les parents, sauf décision contraire du juge."
  },
  {
    question: "Qu’est-ce qu’une tutelle pour mineur ?",
    options: [
      "Une mesure de protection juridique pour un adulte",
      "Une mesure de protection pour un enfant sans parents",
      "Un contrat de travail",
      "Un acte médical"
    ],
    answer: 1,
    explanation: "La tutelle pour mineur est une mesure de protection lorsqu’aucun parent ne peut exercer l’autorité."
  },
  {
    question: "Qu’est-ce qu’une résidence alternée ?",
    options: [
      "Un logement partagé entre colocataires",
      "Une organisation de la garde d’un enfant entre les deux parents",
      "Un contrat de location",
      "Un acte de naissance"
    ],
    answer: 1,
    explanation: "La résidence alternée permet à l’enfant de vivre chez chacun de ses parents selon un rythme défini."
  },
  {
    question: "Qu’est-ce qu’un juge aux affaires familiales ?",
    options: [
      "Un juge qui gère les litiges fiscaux",
      "Un juge qui traite les conflits familiaux",
      "Un juge qui organise les soins",
      "Un juge qui rédige les contrats de travail"
    ],
    answer: 1,
    explanation: "Le juge aux affaires familiales traite les conflits liés au divorce, à la garde, à la pension, etc."
  },
  {
    question: "Qu’est-ce qu’une reconnaissance de paternité ?",
    options: [
      "Un acte médical",
      "Un acte par lequel un homme reconnaît être le père d’un enfant",
      "Un contrat de travail",
      "Un document bancaire"
    ],
    answer: 1,
    explanation: "La reconnaissance de paternité est un acte officiel établissant le lien de filiation."
  },
  {
    question: "Qu’est-ce qu’un enfant naturel ?",
    options: [
      "Un enfant né hors mariage",
      "Un enfant adopté",
      "Un enfant né à l’étranger",
      "Un enfant sans filiation"
    ],
    answer: 0,
    explanation: "Un enfant naturel est un enfant né hors mariage, mais dont la filiation peut être établie."
  }
],
qcmData.famille.intermédiaire = [
  {
    question: "Quel juge est compétent pour les conflits liés à la garde d’un enfant ?",
    options: [
      "Le juge des contentieux de la protection",
      "Le juge pénal",
      "Le juge aux affaires familiales",
      "Le juge administratif"
    ],
    answer: 2,
    explanation: "Le juge aux affaires familiales est compétent pour les litiges concernant la garde, la pension, etc."
  },
  {
    question: "Qu’est-ce qu’une mesure d’assistance éducative ?",
    options: [
      "Une mesure fiscale",
      "Une mesure judiciaire pour protéger un enfant",
      "Un contrat de travail",
      "Un acte médical"
    ],
    answer: 1,
    explanation: "L’assistance éducative est une mesure judiciaire visant à protéger un enfant en danger."
  },
  {
    question: "Qui peut demander une mesure de protection pour un majeur vulnérable ?",
    options: [
      "Uniquement le médecin",
      "Uniquement le MJPM",
      "Toute personne intéressée ou le procureur",
      "Uniquement la famille"
    ],
    answer: 2,
    explanation: "Toute personne intéressée ou le procureur peut saisir le juge pour une mesure de protection."
  },
  {
    question: "Qu’est-ce qu’une habilitation familiale ?",
    options: [
      "Une mesure de protection confiée à un membre de la famille",
      "Un contrat de travail",
      "Un acte médical",
      "Une mesure éducative"
    ],
    answer: 0,
    explanation: "L’habilitation familiale permet à un proche d’agir au nom du majeur sans contrôle judiciaire permanent."
  },
  {
    question: "Quel document est nécessaire pour établir une filiation par reconnaissance ?",
    options: [
      "Un acte de naissance",
      "Un jugement",
      "Une déclaration en mairie ou chez le notaire",
      "Un certificat médical"
    ],
    answer: 2,
    explanation: "La reconnaissance peut être faite en mairie ou chez le notaire pour établir la filiation."
  },
  {
    question: "Qu’est-ce qu’une tutelle pour majeur ?",
    options: [
      "Une mesure éducative",
      "Une mesure de protection juridique avec contrôle du juge",
      "Un contrat de travail",
      "Un acte médical"
    ],
    answer: 1,
    explanation: "La tutelle est une mesure de protection juridique avec contrôle du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une mesure de tutelle ?",
    options: [
      "Il organise les soins",
      "Il exerce les actes de gestion avec autorisation du juge",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM exerce les actes de gestion et demande l’autorisation du juge pour les actes de disposition."
  },
  {
    question: "Qu’est-ce qu’un mandat de protection future ?",
    options: [
      "Un contrat de travail",
      "Un acte médical",
      "Un contrat permettant d’anticiper une protection juridique",
      "Un acte de naissance"
    ],
    answer: 2,
    explanation: "Le mandat de protection future permet d’anticiper une protection juridique en cas d’incapacité."
  },
  {
    question: "Qui peut être désigné comme tuteur ?",
    options: [
      "Uniquement un professionnel",
      "Uniquement un membre de la famille",
      "Toute personne physique ou morale agréée",
      "Uniquement le médecin"
    ],
    answer: 2,
    explanation: "Le tuteur peut être un proche ou un professionnel agréé."
  },
  {
    question: "Qu’est-ce qu’un juge des contentieux de la protection ?",
    options: [
      "Un juge fiscal",
      "Un juge chargé des mesures de protection des majeurs",
      "Un juge pénal",
      "Un juge administratif"
    ],
    answer: 1,
    explanation: "Le juge des contentieux de la protection est compétent pour les mesures de protection juridique."
  },
  {
    question: "Qu’est-ce qu’une curatelle ?",
    options: [
      "Une mesure de protection plus légère que la tutelle",
      "Un contrat de travail",
      "Un acte médical",
      "Une mesure éducative"
    ],
    answer: 0,
    explanation: "La curatelle est une mesure de protection intermédiaire entre sauvegarde et tutelle."
  },
  {
    question: "Quel est le rôle du curateur ?",
    options: [
      "Il décide seul",
      "Il contrôle les actes du majeur et l’assiste",
      "Il rédige les actes médicaux",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le curateur assiste le majeur dans les actes importants sans se substituer à lui."
  },
  {
    question: "Qu’est-ce qu’une sauvegarde de justice ?",
    options: [
      "Une mesure de protection temporaire et légère",
      "Un contrat de travail",
      "Un acte médical",
      "Une mesure éducative"
    ],
    answer: 0,
    explanation: "La sauvegarde de justice est une mesure temporaire et légère de protection."
  },
  {
    question: "Quel est le rôle du MJPM dans une sauvegarde de justice ?",
    options: [
      "Il organise les soins",
      "Il peut intervenir ponctuellement sans autorisation systématique",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut intervenir ponctuellement dans une sauvegarde de justice."
  },
  {
    question: "Qu’est-ce qu’un conflit de filiation ?",
    options: [
      "Un conflit fiscal",
      "Un désaccord sur l’origine parentale d’un enfant",
      "Un contrat de travail",
      "Un acte médical"
    ],
    answer: 1,
    explanation: "Un conflit de filiation concerne l’origine parentale d’un enfant."
  },
  {
    question: "Qui peut contester une filiation ?",
    options: [
      "Uniquement le médecin",
      "Uniquement le MJPM",
      "Toute personne intéressée devant le juge",
      "Uniquement la mairie"
    ],
    answer: 2,
    explanation: "Toute personne intéressée peut contester une filiation devant le juge compétent."
  },
  {
    question: "Qu’est-ce qu’une mesure d’accompagnement judiciaire (MAJ) ?",
    options: [
      "Une mesure éducative",
      "Une mesure de protection des ressources",
      "Un contrat de travail",
      "Un acte médical"
    ],
    answer: 1,
    explanation: "La MAJ est une mesure judiciaire pour accompagner la gestion des prestations sociales."
  },
  {
    question: "Quel est le rôle du MJPM dans une MAJ ?",
    options: [
      "Il rédige les actes médicaux",
      "Il organise les soins",
      "Il accompagne la gestion des prestations sociales",
      "Il décide des traitements"
    ],
    answer: 2,
    explanation: "Le MJPM accompagne le majeur dans la gestion de ses prestations sociales."
  },
  {
    question: "Qu’est-ce qu’un conflit familial lié à une mesure de protection ?",
    options: [
      "Un désaccord sur les soins",
      "Un désaccord sur la désignation du MJPM ou les actes de gestion",
      "Un conflit fiscal",
      "Un acte médical"
    ],
    answer: 1,
    explanation: "Un conflit familial peut porter sur la désignation du MJPM ou les décisions prises."
  },
  {
    question: "Que peut faire le juge en cas de conflit familial autour d’un majeur protégé ?",
    options: [
      "Ignorer le conflit",
      "Organiser une médiation",
      "Changer le MJPM ou encadrer les actes",
      "Rédiger un contrat de travail"
    ],
    answer: 2,
    explanation: "Le juge peut modifier la mesure ou encadrer les actes pour protéger le majeur."
  }
],
qcmData.famille.expérimenté = [
  {
    question: "Que doit faire le MJPM si un conflit familial nuit à la mesure de protection ?",
    options: [
      "Ignorer le conflit",
      "Saisir le juge des contentieux de la protection",
      "Organiser une médiation",
      "Demander un certificat médical"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir le juge si un conflit familial compromet la protection du majeur."
  },
  {
    question: "Dans quel cas le MJPM peut demander le changement de régime de protection ?",
    options: [
      "Si le majeur déménage",
      "Si les besoins évoluent ou si la mesure devient inadaptée",
      "Si la famille le demande",
      "Si le médecin change"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander un changement de régime si la mesure ne correspond plus aux besoins du majeur."
  },
  {
    question: "Que doit faire le MJPM si la famille conteste ses décisions ?",
    options: [
      "Ignorer les contestations",
      "Saisir le juge pour arbitrage",
      "Changer de mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge pour arbitrer les contestations familiales."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession conflictuelle entre héritiers ?",
    options: [
      "Il rédige les actes",
      "Il peut demander l’intervention du notaire et du juge",
      "Il décide seul du partage",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut faire appel au notaire et au juge pour résoudre les conflits successoraux."
  },
  {
    question: "Que doit faire le MJPM si un membre de la famille souhaite contester la mesure ?",
    options: [
      "Lui transmettre les coordonnées du juge",
      "Ignorer la demande",
      "Modifier la mesure",
      "Organiser une réunion"
    ],
    answer: 0,
    explanation: "Le MJPM doit orienter vers le juge compétent pour toute contestation de la mesure."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de rupture familiale ?",
    options: [
      "Il organise les soins",
      "Il veille à maintenir le lien social du majeur",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM veille à préserver le lien social du majeur même en cas de rupture familiale."
  },
  {
    question: "Que doit faire le MJPM si la famille refuse de coopérer ?",
    options: [
      "Saisir le juge",
      "Organiser une médiation",
      "Modifier la mesure",
      "Ignorer la situation"
    ],
    answer: 0,
    explanation: "Le MJPM peut saisir le juge si la famille entrave la mesure de protection."
  },
  {
    question: "Quel est le rôle du MJPM dans une mesure d’habilitation familiale ?",
    options: [
      "Il est remplacé par un membre de la famille",
      "Il rédige les actes",
      "Il organise les soins",
      "Il contrôle les décisions médicales"
    ],
    answer: 0,
    explanation: "L’habilitation familiale permet à un proche d’agir à la place du MJPM."
  },
  {
    question: "Que doit faire le MJPM si un conflit de filiation impacte la protection ?",
    options: [
      "Organiser les soins",
      "Saisir le juge compétent",
      "Modifier la mesure",
      "Ignorer le conflit"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge compétent en cas de conflit de filiation impactant la mesure."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de maltraitance familiale ?",
    options: [
      "Ignorer la situation",
      "Saisir le procureur ou le juge",
      "Organiser une médiation",
      "Demander un certificat médical"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir les autorités compétentes en cas de maltraitance familiale."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé souhaite renouer avec sa famille ?",
    options: [
      "Organiser les soins",
      "Favoriser le lien dans le respect de la volonté du majeur",
      "Ignorer la demande",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM doit favoriser le lien familial si le majeur le souhaite."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de conflit entre enfants du majeur ?",
    options: [
      "Il décide du partage des biens",
      "Il organise les soins",
      "Il peut saisir le juge pour arbitrage",
      "Il rédige les actes médicaux"
    ],
    answer: 2,
    explanation: "Le MJPM peut saisir le juge si un conflit entre enfants impacte la mesure."
  },
  {
    question: "Que doit faire le MJPM si la famille veut imposer un changement de domicile ?",
    options: [
      "Accepter sans condition",
      "Saisir le juge si cela va à l’encontre de l’intérêt du majeur",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir le juge si le changement de domicile est contesté ou inadapté."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de recomposition familiale ?",
    options: [
      "Il organise les soins",
      "Il veille à l’équilibre du majeur et peut saisir le juge",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM veille à l’équilibre du majeur dans une recomposition familiale."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé souhaite exclure un proche ?",
    options: [
      "Respecter la volonté du majeur",
      "Organiser une médiation",
      "Modifier la mesure",
      "Ignorer la demande"
    ],
    answer: 0,
    explanation: "Le MJPM doit respecter la volonté du majeur dans ses relations personnelles."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de conflit entre tuteurs familiaux ?",
    options: [
      "Il organise les soins",
      "Il peut demander la désignation d’un professionnel",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander au juge de désigner un professionnel en cas de conflit familial."
  },
  {
    question: "Que doit faire le MJPM si la famille refuse l’accès au majeur protégé ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge pour garantir le droit de visite",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge pour garantir le droit de visite ou d’accès au majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de conflit d’héritage entre enfants ?",
    options: [
      "Il rédige les actes",
      "Il peut saisir le juge ou le notaire",
      "Il décide du partage",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge ou le notaire pour arbitrer un conflit d’héritage."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est manipulé par un proche ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge pour protéger le majeur",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir le juge si un proche manipule ou influence le majeur protégé."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de rupture familiale avec dépendance affective ?",
    options: [
      "Il organise les soins",
      "Il veille à préserver l’autonomie du majeur et peut saisir le juge",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM veille à préserver l’autonomie du majeur dans une situation de dépendance affective."
  }
],
qcmData.procédures.débutant = [
  {
    question: "Qu’est-ce qu’un tribunal ?",
    options: [
      "Un hôpital",
      "Un lieu où l’on vote",
      "Un lieu où la justice est rendue",
      "Un centre administratif"
    ],
    answer: 2,
    explanation: "Le tribunal est l’institution où les juges rendent la justice."
  },
  {
    question: "Qui rend les décisions de justice dans un tribunal ?",
    options: [
      "Le maire",
      "Le juge",
      "Le médecin",
      "Le policier"
    ],
    answer: 1,
    explanation: "Le juge est le professionnel chargé de rendre les décisions de justice."
  },
  {
    question: "Qu’est-ce qu’un greffier ?",
    options: [
      "Un avocat",
      "Un agent d’accueil",
      "Un professionnel qui assiste le juge et rédige les actes",
      "Un policier"
    ],
    answer: 2,
    explanation: "Le greffier assiste le juge et assure la rédaction des actes de procédure."
  },
  {
    question: "Qu’est-ce qu’un avocat ?",
    options: [
      "Un professionnel de santé",
      "Un professionnel qui défend les intérêts d’une personne en justice",
      "Un agent administratif",
      "Un juge"
    ],
    answer: 1,
    explanation: "L’avocat conseille et défend les personnes devant les juridictions."
  },
  {
    question: "Qu’est-ce qu’une audience ?",
    options: [
      "Une réunion familiale",
      "Un rendez-vous médical",
      "Une séance où le juge entend les parties",
      "Un entretien d’embauche"
    ],
    answer: 2,
    explanation: "L’audience est le moment où le juge entend les parties et examine l’affaire."
  },
  {
    question: "Qu’est-ce qu’un jugement ?",
    options: [
      "Un avis médical",
      "Une décision rendue par un juge",
      "Un contrat de travail",
      "Un acte de naissance"
    ],
    answer: 1,
    explanation: "Le jugement est la décision rendue par le juge à l’issue d’une procédure."
  },
  {
    question: "Qu’est-ce qu’un recours ?",
    options: [
      "Une demande de soins",
      "Une demande d’aide sociale",
      "Une contestation d’une décision de justice",
      "Une demande de logement"
    ],
    answer: 2,
    explanation: "Le recours permet de contester une décision devant une juridiction supérieure."
  },
  {
    question: "Qu’est-ce qu’un dossier judiciaire ?",
    options: [
      "Un dossier médical",
      "Un ensemble de documents relatifs à une affaire",
      "Un contrat de travail",
      "Un acte de naissance"
    ],
    answer: 1,
    explanation: "Le dossier judiciaire regroupe tous les documents utiles à l’instruction d’une affaire."
  },
  {
    question: "Qu’est-ce qu’un juge des contentieux de la protection ?",
    options: [
      "Un juge pénal",
      "Un juge chargé des mesures de protection des majeurs",
      "Un juge administratif",
      "Un juge fiscal"
    ],
    answer: 1,
    explanation: "Ce juge est compétent pour les mesures de protection juridique des majeurs."
  },
  {
    question: "Qu’est-ce qu’une convocation ?",
    options: [
      "Un contrat de travail",
      "Un document invitant à se présenter devant une autorité",
      "Un acte de naissance",
      "Un certificat médical"
    ],
    answer: 1,
    explanation: "La convocation est un document officiel invitant une personne à se présenter devant une autorité."
  },
  {
    question: "Qu’est-ce qu’un tribunal judiciaire ?",
    options: [
      "Un tribunal militaire",
      "Un tribunal compétent pour les litiges civils et familiaux",
      "Un tribunal administratif",
      "Un tribunal de commerce"
    ],
    answer: 1,
    explanation: "Le tribunal judiciaire traite les litiges civils, familiaux et les mesures de protection."
  },
  {
    question: "Qu’est-ce qu’un acte de procédure ?",
    options: [
      "Un acte médical",
      "Un document officiel dans une affaire judiciaire",
      "Un contrat de travail",
      "Un acte de naissance"
    ],
    answer: 1,
    explanation: "Un acte de procédure est un document officiel utilisé dans le cadre d’une affaire judiciaire."
  },
  {
    question: "Qu’est-ce qu’un délai de recours ?",
    options: [
      "Le temps pour obtenir un logement",
      "Le temps pour contester une décision de justice",
      "Le temps pour recevoir un jugement",
      "Le temps pour organiser une audience"
    ],
    answer: 1,
    explanation: "Le délai de recours est le temps légal pour contester une décision."
  },
  {
    question: "Qu’est-ce qu’un huissier de justice ?",
    options: [
      "Un juge",
      "Un avocat",
      "Un professionnel chargé de signifier les actes et exécuter les décisions",
      "Un greffier"
    ],
    answer: 2,
    explanation: "L’huissier signifie les actes et met en œuvre les décisions de justice."
  },
  {
    question: "Qu’est-ce qu’un référé ?",
    options: [
      "Une procédure rapide en cas d’urgence",
      "Un contrat de travail",
      "Un acte de naissance",
      "Un jugement définitif"
    ],
    answer: 0,
    explanation: "Le référé est une procédure rapide pour obtenir une décision provisoire en urgence."
  },
  {
    question: "Qu’est-ce qu’un appel ?",
    options: [
      "Une demande de logement",
      "Une demande d’aide sociale",
      "Une contestation d’un jugement devant une juridiction supérieure",
      "Une convocation"
    ],
    answer: 2,
    explanation: "L’appel permet de contester un jugement devant une juridiction supérieure."
  },
  {
    question: "Qu’est-ce qu’un avocat commis d’office ?",
    options: [
      "Un avocat choisi par la famille",
      "Un avocat désigné par le juge pour une personne sans défense",
      "Un avocat spécialisé en fiscalité",
      "Un avocat militaire"
    ],
    answer: 1,
    explanation: "L’avocat commis d’office est désigné pour défendre une personne qui n’en a pas."
  },
  {
    question: "Qu’est-ce qu’un jugement exécutoire ?",
    options: [
      "Un jugement qui peut être mis en œuvre",
      "Un jugement provisoire",
      "Un jugement contesté",
      "Un jugement médical"
    ],
    answer: 0,
    explanation: "Un jugement exécutoire peut être mis en œuvre par voie d’huissier ou autre."
  },
  {
    question: "Qu’est-ce qu’un tribunal administratif ?",
    options: [
      "Un tribunal qui juge les litiges entre particuliers",
      "Un tribunal qui juge les litiges avec l’administration",
      "Un tribunal pénal",
      "Un tribunal militaire"
    ],
    answer: 1,
    explanation: "Le tribunal administratif est compétent pour les litiges entre citoyens et administration."
  },
  {
    question: "Qu’est-ce qu’un jugement contradictoire ?",
    options: [
      "Un jugement rendu sans audience",
      "Un jugement rendu après que les deux parties ont été entendues",
      "Un jugement rendu par un huissier",
      "Un jugement rendu par un avocat"
    ],
    answer: 1,
    explanation: "Un jugement contradictoire est rendu après que les deux parties ont pu présenter leurs arguments."
  }
],
qcmData.procédures.intermédiaire = [
  {
    question: "Quel est le rôle du juge des contentieux de la protection ?",
    options: [
      "Il juge les affaires pénales",
      "Il statue sur les mesures de protection des majeurs",
      "Il organise les soins médicaux",
      "Il rédige les actes notariés"
    ],
    answer: 1,
    explanation: "Le juge des contentieux de la protection est compétent pour les mesures de protection juridique."
  },
  {
    question: "Quel document est nécessaire pour demander une mesure de protection ?",
    options: [
      "Un acte de naissance",
      "Un certificat médical circonstancié",
      "Un contrat de travail",
      "Un jugement antérieur"
    ],
    answer: 1,
    explanation: "Le certificat médical circonstancié est obligatoire pour saisir le juge en vue d’une mesure de protection."
  },
  {
    question: "Quel est le rôle du greffier dans une procédure judiciaire ?",
    options: [
      "Il défend les parties",
      "Il rend les décisions",
      "Il assiste le juge et rédige les actes",
      "Il organise les soins"
    ],
    answer: 2,
    explanation: "Le greffier assiste le juge et assure la rédaction et la conservation des actes de procédure."
  },
  {
    question: "Qu’est-ce qu’un jugement en dernier ressort ?",
    options: [
      "Un jugement provisoire",
      "Un jugement qui ne peut pas être contesté par appel",
      "Un jugement médical",
      "Un jugement contradictoire"
    ],
    answer: 1,
    explanation: "Un jugement en dernier ressort ne peut pas faire l’objet d’un appel."
  },
  {
    question: "Quel est le rôle de l’avocat dans une procédure civile ?",
    options: [
      "Il rend les décisions",
      "Il assiste et représente les parties",
      "Il rédige les jugements",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "L’avocat conseille, assiste et représente les parties devant les juridictions civiles."
  },
  {
    question: "Qu’est-ce qu’un appel ?",
    options: [
      "Une demande de logement",
      "Une contestation d’un jugement devant une juridiction supérieure",
      "Une convocation",
      "Un acte médical"
    ],
    answer: 1,
    explanation: "L’appel permet de contester un jugement devant une juridiction supérieure."
  },
  {
    question: "Quel est le délai pour faire appel d’un jugement civil ?",
    options: [
      "8 jours",
      "1 mois",
      "3 mois",
      "1 semaine"
    ],
    answer: 1,
    explanation: "Le délai d’appel en matière civile est généralement d’un mois à compter de la notification du jugement."
  },
  {
    question: "Qu’est-ce qu’un référé ?",
    options: [
      "Une procédure rapide en cas d’urgence",
      "Un jugement définitif",
      "Un acte médical",
      "Un contrat de travail"
    ],
    answer: 0,
    explanation: "Le référé est une procédure rapide permettant d’obtenir une décision provisoire en urgence."
  },
  {
    question: "Qu’est-ce qu’une requête ?",
    options: [
      "Une demande adressée au juge sans audience",
      "Un acte médical",
      "Un contrat de travail",
      "Une convocation"
    ],
    answer: 0,
    explanation: "La requête est une demande écrite adressée au juge, souvent sans audience."
  },
  {
    question: "Qu’est-ce qu’un jugement contradictoire ?",
    options: [
      "Un jugement rendu sans audience",
      "Un jugement rendu après que les deux parties ont été entendues",
      "Un jugement médical",
      "Un jugement administratif"
    ],
    answer: 1,
    explanation: "Un jugement contradictoire est rendu après que les deux parties ont pu présenter leurs arguments."
  },
  {
    question: "Qu’est-ce qu’un jugement par défaut ?",
    options: [
      "Un jugement rendu en l’absence d’une des parties",
      "Un jugement médical",
      "Un jugement administratif",
      "Un jugement fiscal"
    ],
    answer: 0,
    explanation: "Un jugement par défaut est rendu lorsque l’une des parties ne comparaît pas."
  },
  {
    question: "Qu’est-ce qu’une notification de jugement ?",
    options: [
      "Un acte médical",
      "Un document informant les parties de la décision rendue",
      "Un contrat de travail",
      "Un acte de naissance"
    ],
    answer: 1,
    explanation: "La notification informe officiellement les parties du contenu du jugement."
  },
  {
    question: "Qu’est-ce qu’une exécution provisoire ?",
    options: [
      "Une décision qui peut être mise en œuvre immédiatement",
      "Un jugement définitif",
      "Un acte médical",
      "Un contrat de travail"
    ],
    answer: 0,
    explanation: "L’exécution provisoire permet de mettre en œuvre une décision avant qu’elle ne soit définitive."
  },
  {
    question: "Quel est le rôle de l’huissier dans l’exécution d’un jugement ?",
    options: [
      "Il rédige les jugements",
      "Il signifie les actes et met en œuvre les décisions",
      "Il défend les parties",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "L’huissier signifie les actes et met en œuvre les décisions de justice."
  },
  {
    question: "Qu’est-ce qu’un recours gracieux ?",
    options: [
      "Un recours devant une juridiction supérieure",
      "Une demande adressée à l’autorité qui a pris la décision",
      "Un acte médical",
      "Un contrat de travail"
    ],
    answer: 1,
    explanation: "Le recours gracieux est une demande de réexamen adressée à l’auteur de la décision."
  },
  {
    question: "Qu’est-ce qu’un recours hiérarchique ?",
    options: [
      "Un recours devant une juridiction pénale",
      "Un recours devant l’autorité supérieure de celle qui a pris la décision",
      "Un acte médical",
      "Un contrat de travail"
    ],
    answer: 1,
    explanation: "Le recours hiérarchique est adressé à l’autorité supérieure de celle qui a pris la décision contestée."
  },
  {
    question: "Qu’est-ce qu’une assignation ?",
    options: [
      "Un acte médical",
      "Un acte par lequel une personne est appelée à comparaître devant le juge",
      "Un contrat de travail",
      "Un acte de naissance"
    ],
    answer: 1,
    explanation: "L’assignation est un acte par lequel une personne est appelée à comparaître devant le juge."
  },
  {
    question: "Qu’est-ce qu’un jugement définitif ?",
    options: [
      "Un jugement qui peut être contesté",
      "Un jugement qui ne peut plus faire l’objet de recours",
      "Un jugement médical",
      "Un jugement provisoire"
    ],
    answer: 1,
    explanation: "Un jugement définitif ne peut plus être contesté par voie de recours."
  },
  {
    question: "Qu’est-ce qu’un délai de prescription ?",
    options: [
      "Le temps pour organiser une audience",
      "Le temps au-delà duquel une action en justice n’est plus possible",
      "Le temps pour recevoir un jugement",
      "Le temps pour contester une décision"
    ],
    answer: 1,
    explanation: "Le délai de prescription est le temps au-delà duquel une action en justice n’est plus recevable."
  },
  {
    question: "Qu’est-ce qu’un tribunal de proximité ?",
    options: [
      "Un tribunal militaire",
      "Un tribunal compétent pour les litiges civils simples",
      "Un tribunal administratif",
      "Un tribunal pénal"
    ],
    answer: 1,
    explanation: "Le tribunal de proximité traite les litiges civils simples et de faible montant."
  }
],
qcmData.procédures.expérimenté = [
  {
    question: "Que doit faire le MJPM en cas de contestation d’un acte de gestion par la famille ?",
    options: [
      "Modifier la mesure",
      "Saisir le juge des contentieux de la protection",
      "Ignorer la contestation",
      "Organiser une médiation"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir le juge pour arbitrer toute contestation portant sur ses actes de gestion."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de mainlevée d’une mesure de protection ?",
    options: [
      "Il rédige le jugement",
      "Il peut transmettre les éléments au juge si le majeur retrouve ses capacités",
      "Il décide seul de la levée",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut alerter le juge si la mesure devient injustifiée."
  },
  {
    question: "Que doit faire le MJPM en cas de refus de transmission de dossier par un professionnel ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou l’ordre professionnel",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge ou l’ordre concerné pour obtenir les documents nécessaires."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure d’appel ?",
    options: [
      "Il rédige le jugement",
      "Il peut accompagner le majeur dans la rédaction et le dépôt de l’appel",
      "Il décide seul",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut accompagner le majeur dans l’exercice de ses voies de recours."
  },
  {
    question: "Que doit faire le MJPM si un jugement est rendu sans sa présence ?",
    options: [
      "Demander l’annulation automatique",
      "Saisir le juge pour contester ou demander un réexamen",
      "Ignorer la décision",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut contester ou demander un réexamen si la décision impacte la mesure."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de contestation de curatelle renforcée ?",
    options: [
      "Il organise les soins",
      "Il peut saisir le juge pour réévaluer la mesure",
      "Il rédige les actes médicaux",
      "Il décide seul"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander au juge de réévaluer la mesure si elle devient inadaptée."
  },
  {
    question: "Que doit faire le MJPM en cas de conflit entre deux juridictions ?",
    options: [
      "Saisir le juge des contentieux de la protection pour arbitrage",
      "Organiser les soins",
      "Ignorer le conflit",
      "Modifier la mesure"
    ],
    answer: 0,
    explanation: "Le MJPM peut saisir le juge compétent pour arbitrer un conflit de compétence."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de désignation d’un nouveau tuteur ?",
    options: [
      "Il décide seul",
      "Il peut proposer un changement au juge",
      "Il rédige les actes",
      "Il organise les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut proposer au juge un changement de tuteur en cas de difficulté."
  },
  {
    question: "Que doit faire le MJPM si une décision judiciaire est contraire à l’intérêt du majeur ?",
    options: [
      "Ignorer la décision",
      "Saisir le juge ou faire appel",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut contester la décision ou faire appel si elle nuit au majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de contestation d’habilitation familiale ?",
    options: [
      "Il organise les soins",
      "Il peut saisir le juge pour réévaluer la mesure",
      "Il rédige les actes médicaux",
      "Il décide seul"
    ],
    answer: 1,
    explanation: "Le MJPM peut contester une habilitation familiale s’il estime qu’elle nuit au majeur."
  },
  {
    question: "Que doit faire le MJPM en cas de non-respect d’un jugement par un tiers ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou l’huissier pour exécution",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge ou l’huissier pour faire exécuter le jugement."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de contestation de comptes de gestion ?",
    options: [
      "Il décide seul",
      "Il peut répondre aux observations du juge ou du greffier",
      "Il organise les soins",
      "Il rédige les actes médicaux"
    ],
    answer: 1,
    explanation: "Le MJPM peut répondre aux observations du juge ou du greffier sur les comptes."
  },
  {
    question: "Que doit faire le MJPM en cas de refus d’audition du majeur par le juge ?",
    options: [
      "Ignorer la situation",
      "Demander une audience ou un recours",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander une audience ou un recours si le majeur n’a pas été entendu."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de désignation d’un subrogé tuteur ?",
    options: [
      "Il organise les soins",
      "Il peut proposer un nom au juge",
      "Il rédige les actes médicaux",
      "Il décide seul"
    ],
    answer: 1,
    explanation: "Le MJPM peut proposer un subrogé tuteur en cas de conflit d’intérêt."
  },
  {
    question: "Que doit faire le MJPM si une décision judiciaire est mal appliquée ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou demander l’exécution forcée",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander l’exécution forcée ou saisir le juge en cas de mauvaise application."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de contestation d’un acte notarié ?",
    options: [
      "Il organise les soins",
      "Il peut saisir le juge ou demander une vérification",
      "Il rédige les actes médicaux",
      "Il décide seul"
    ],
    answer: 1,
    explanation: "Le MJPM peut contester un acte notarié s’il estime qu’il porte atteinte aux droits du majeur."
  },
  {
    question: "Que doit faire le MJPM en cas de refus d’accès au dossier judiciaire ?",
    options: [
      "Ignorer la situation",
      "Demander l’accès au juge ou au greffe",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander l’accès au dossier auprès du juge ou du greffe."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de contestation d’une mesure de sauvegarde ?",
    options: [
      "Il organise les soins",
      "Il peut demander une mesure plus adaptée",
      "Il rédige les actes médicaux",
      "Il décide seul"
    ],
    answer: 1,
    explanation: "Le MJPM peut demander une mesure plus adaptée si la sauvegarde est insuffisante."
  },
  {
    question: "Que doit faire le MJPM si une décision judiciaire est contraire à l’avis médical ?",
    options: [
      "Ignorer l’avis médical",
      "Saisir le juge avec un nouveau certificat",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge avec un nouveau certificat pour réévaluer la décision."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de contestation d’une mesure d’habilitation familiale ?",
    options: [
      "Il organise les soins",
      "Il peut saisir le juge pour réévaluer ou annuler la mesure",
      "Il rédige les actes médicaux",
      "Il décide seul"
    ],
    answer: 1,
    explanation: "Le MJPM peut contester une habilitation familiale s’il estime qu’elle nuit au majeur."
  }
],
qcmData.action.débutant = [
  {
    question: "Quel est le rôle principal du MJPM ?",
    options: [
      "Soigner les majeurs protégés",
      "Gérer les hôpitaux",
      "Protéger les intérêts des majeurs sous mesure",
      "Organiser les élections"
    ],
    answer: 2,
    explanation: "Le MJPM protège les intérêts des majeurs sous mesure de protection juridique."
  },
  {
    question: "Que signifie MJPM ?",
    options: [
      "Mandataire Judiciaire à la Protection des Majeurs",
      "Médecin Juridique pour Personnes Malades",
      "Magistrat de Justice pour Personnes Majeures",
      "Mandat Juridique pour Personnes Mineures"
    ],
    answer: 0,
    explanation: "MJPM signifie Mandataire Judiciaire à la Protection des Majeurs."
  },
  {
    question: "Quel document autorise le MJPM à intervenir ?",
    options: [
      "Un contrat de travail",
      "Un jugement du juge des contentieux de la protection",
      "Un certificat médical",
      "Une carte Vitale"
    ],
    answer: 1,
    explanation: "Le MJPM agit sur la base d’un jugement rendu par le juge des contentieux de la protection."
  },
  {
    question: "Quel est le rôle du MJPM dans la vie quotidienne du majeur ?",
    options: [
      "Décider des soins médicaux",
      "Organiser les loisirs",
      "Assurer la gestion administrative et financière",
      "Rédiger les ordonnances"
    ],
    answer: 2,
    explanation: "Le MJPM assure la gestion administrative et financière du majeur protégé."
  },
  {
    question: "Quel type de mesure peut être confiée au MJPM ?",
    options: [
      "Tutelle, curatelle, sauvegarde de justice",
      "Contrat de travail",
      "Acte médical",
      "Mandat fiscal"
    ],
    answer: 0,
    explanation: "Le MJPM peut exercer une tutelle, une curatelle ou une sauvegarde de justice."
  },
  {
    question: "Quel est le rôle du MJPM dans une curatelle simple ?",
    options: [
      "Décider seul",
      "Assister le majeur dans certains actes",
      "Organiser les soins",
      "Rédiger les jugements"
    ],
    answer: 1,
    explanation: "En curatelle simple, le MJPM assiste le majeur dans les actes importants."
  },
  {
    question: "Quel est le rôle du MJPM dans une tutelle ?",
    options: [
      "Il assiste le majeur",
      "Il organise les soins",
      "Il représente le majeur dans les actes civils",
      "Il rédige les ordonnances"
    ],
    answer: 2,
    explanation: "En tutelle, le MJPM représente le majeur dans les actes civils."
  },
  {
    question: "Quel est le rôle du MJPM dans une sauvegarde de justice ?",
    options: [
      "Il organise les soins",
      "Il intervient ponctuellement pour protéger les intérêts",
      "Il rédige les jugements",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "En sauvegarde de justice, le MJPM intervient ponctuellement pour protéger les intérêts du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion du budget ?",
    options: [
      "Il rédige les lois fiscales",
      "Il peut établir un budget adapté aux besoins du majeur",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM établit un budget adapté aux besoins et ressources du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des aides sociales ?",
    options: [
      "Il rédige les ordonnances",
      "Il peut effectuer les démarches administratives",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut effectuer les démarches pour obtenir les aides sociales du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la relation avec les établissements ?",
    options: [
      "Il organise les soins",
      "Il peut échanger avec les professionnels pour défendre les intérêts du majeur",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM échange avec les établissements pour défendre les intérêts du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion du logement ?",
    options: [
      "Il organise les soins",
      "Il peut signer un bail ou résilier avec autorisation",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut gérer le logement du majeur dans le cadre de sa mission."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des comptes bancaires ?",
    options: [
      "Il rédige les contrats",
      "Il peut gérer les comptes avec autorisation du juge",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut gérer les comptes bancaires du majeur selon le cadre légal."
  },
  {
    question: "Quel est le rôle du MJPM dans la vie sociale du majeur ?",
    options: [
      "Il organise les soins",
      "Il favorise le maintien du lien social",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM veille à préserver le lien social du majeur protégé."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des dettes ?",
    options: [
      "Il rédige les lois fiscales",
      "Il peut négocier et régler les dettes",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut négocier et régler les dettes du majeur dans le cadre de sa mission."
  },
  {
    question: "Quel est le rôle du MJPM dans la déclaration fiscale ?",
    options: [
      "Il rédige les lois",
      "Il peut établir et transmettre la déclaration",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut établir et transmettre la déclaration fiscale du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des prestations sociales ?",
    options: [
      "Il rédige les ordonnances",
      "Il peut effectuer les démarches pour obtenir les aides",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut effectuer les démarches pour obtenir les prestations sociales du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la relation avec la famille ?",
    options: [
      "Il organise les soins",
      "Il peut dialoguer avec la famille dans l’intérêt du majeur",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut dialoguer avec la famille pour préserver l’intérêt du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des documents administratifs ?",
    options: [
      "Il rédige les lois",
      "Il peut classer, conserver et transmettre les documents utiles",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM gère les documents administratifs du majeur dans le cadre de sa mission."
  },
  {
    question: "Quel est le rôle du MJPM dans la protection juridique ?",
    options: [
      "Il organise les soins",
      "Il veille au respect des droits et libertés du majeur",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM veille au respect des droits et libertés du majeur protégé."
  }
],
qcmData.action.intermédiaire = [
  {
    question: "Quel est le rôle du MJPM dans la gestion des actes de disposition ?",
    options: [
      "Il les réalise librement",
      "Il les réalise avec autorisation du juge",
      "Il les délègue à la famille",
      "Il les refuse systématiquement"
    ],
    answer: 1,
    explanation: "Les actes de disposition (vente, donation...) nécessitent l’autorisation du juge."
  },
  {
    question: "Que doit faire le MJPM avant de signer un bail pour le majeur protégé ?",
    options: [
      "Rien, il est libre",
      "Obtenir l’autorisation du juge si le bail engage fortement le patrimoine",
      "Demander l’avis du médecin",
      "Organiser une médiation"
    ],
    answer: 1,
    explanation: "Certains baux nécessitent l’autorisation du juge selon leur impact patrimonial."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des prestations sociales ?",
    options: [
      "Il les perçoit pour lui-même",
      "Il peut les demander et les gérer pour le majeur",
      "Il les refuse",
      "Il les délègue au médecin"
    ],
    answer: 1,
    explanation: "Le MJPM peut effectuer les démarches pour obtenir et gérer les prestations sociales du majeur."
  },
  {
    question: "Que doit faire le MJPM en cas de refus de soins par le majeur ?",
    options: [
      "Imposer les soins",
      "Respecter le refus et alerter le juge si nécessaire",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM respecte la volonté du majeur mais peut alerter le juge en cas de danger."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des comptes bancaires ?",
    options: [
      "Il peut ouvrir, clôturer et gérer les comptes avec autorisation",
      "Il rédige les contrats",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 0,
    explanation: "Le MJPM peut gérer les comptes bancaires dans le cadre de sa mission."
  },
  {
    question: "Que doit faire le MJPM en cas de litige avec un organisme ?",
    options: [
      "Ignorer le litige",
      "Saisir le juge ou engager un recours",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM peut engager un recours ou saisir le juge pour défendre les droits du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion du logement ?",
    options: [
      "Il peut signer ou résilier un bail avec autorisation",
      "Il rédige les actes médicaux",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 0,
    explanation: "Le MJPM peut gérer le logement du majeur dans le cadre de sa mission."
  },
  {
    question: "Que doit faire le MJPM pour établir un budget ?",
    options: [
      "Rien, ce n’est pas son rôle",
      "Évaluer les ressources et les besoins du majeur",
      "Organiser les soins",
      "Demander l’avis du médecin"
    ],
    answer: 1,
    explanation: "Le MJPM établit un budget adapté aux ressources et aux besoins du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la déclaration fiscale ?",
    options: [
      "Il rédige les lois",
      "Il peut établir et transmettre la déclaration",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut établir et transmettre la déclaration fiscale du majeur."
  },
  {
    question: "Que doit faire le MJPM en cas de rupture de droits sociaux ?",
    options: [
      "Ignorer la situation",
      "Effectuer les démarches pour rétablir les droits",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM doit agir pour rétablir les droits sociaux du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des dettes ?",
    options: [
      "Il les ignore",
      "Il peut les contester ou les régler dans le cadre de sa mission",
      "Il les délègue au juge",
      "Il les transmet au médecin"
    ],
    answer: 1,
    explanation: "Le MJPM peut contester ou régler les dettes du majeur protégé."
  },
  {
    question: "Que doit faire le MJPM en cas de refus d’accès à un service ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou engager un recours",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM peut engager un recours ou saisir le juge pour garantir l’accès aux droits."
  },
  {
    question: "Quel est le rôle du MJPM dans la relation avec les établissements ?",
    options: [
      "Il organise les soins",
      "Il peut échanger avec les professionnels pour défendre les intérêts du majeur",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM échange avec les établissements pour défendre les intérêts du majeur."
  },
  {
    question: "Que doit faire le MJPM en cas de changement de situation du majeur ?",
    options: [
      "Ignorer le changement",
      "Adapter sa gestion et informer le juge si nécessaire",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM adapte sa gestion et peut informer le juge si la situation évolue."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des aides au logement ?",
    options: [
      "Il rédige les lois",
      "Il peut effectuer les démarches pour obtenir les aides",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut effectuer les démarches pour obtenir les aides au logement."
  },
  {
    question: "Que doit faire le MJPM en cas de refus de soins injustifié ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou le procureur",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge ou le procureur en cas de refus de soins injustifié."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des relations familiales ?",
    options: [
      "Il organise les soins",
      "Il peut favoriser le lien familial dans l’intérêt du majeur",
      "Il rédige les actes médicaux",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut favoriser le lien familial si cela est dans l’intérêt du majeur."
  },
  {
    question: "Que doit faire le MJPM en cas de conflit avec un professionnel ?",
    options: [
      "Ignorer le conflit",
      "Saisir le juge ou engager une médiation",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge ou engager une médiation en cas de conflit."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des démarches administratives ?",
    options: [
      "Il rédige les lois",
      "Il peut effectuer les démarches pour le majeur",
      "Il organise les soins",
      "Il décide des traitements"
    ],
    answer: 1,
    explanation: "Le MJPM peut effectuer les démarches administratives dans le cadre de sa mission."
  },
  {
    question: "Que doit faire le MJPM en cas de difficulté d’accès aux droits ?",
    options: [
      "Ignorer la situation",
      "Agir pour rétablir les droits et saisir le juge si nécessaire",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM agit pour rétablir les droits du majeur et peut saisir le juge si nécessaire."
  }
],
qcmData.action.expérimenté = [
  {
    question: "Que doit faire le MJPM si le majeur protégé refuse une aide essentielle ?",
    options: [
      "Respecter le refus sans condition",
      "Imposer l’aide",
      "Évaluer la capacité de discernement et saisir le juge si nécessaire",
      "Ignorer la situation"
    ],
    answer: 2,
    explanation: "Le MJPM doit évaluer la capacité du majeur et saisir le juge si le refus met en péril ses droits."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de rupture de droits sociaux ?",
    options: [
      "Ignorer la situation",
      "Agir immédiatement pour rétablir les droits et alerter les partenaires",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM doit réagir rapidement pour rétablir les droits sociaux et mobiliser les partenaires."
  },
  {
    question: "Que doit faire le MJPM en cas de conflit avec un établissement ?",
    options: [
      "Ignorer le conflit",
      "Saisir le juge ou engager une médiation",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge ou engager une médiation pour défendre les intérêts du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de maltraitance institutionnelle ?",
    options: [
      "Ignorer la situation",
      "Saisir le procureur ou le juge",
      "Organiser les soins",
      "Modifier la mesure"
    ],
    answer: 1,
    explanation: "Le MJPM doit alerter les autorités compétentes en cas de maltraitance institutionnelle."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est manipulé par un tiers ?",
    options: [
      "Respecter la relation",
      "Ignorer la situation",
      "Saisir le juge pour protéger le majeur",
      "Modifier la mesure"
    ],
    answer: 2,
    explanation: "Le MJPM doit saisir le juge si un tiers manipule ou influence le majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de conflit familial complexe ?",
    options: [
      "Organiser les soins",
      "Saisir le juge pour arbitrage et préserver l’intérêt du majeur",
      "Modifier la mesure",
      "Ignorer le conflit"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge pour arbitrer un conflit familial qui nuit à la mesure."
  },
  {
    question: "Que doit faire le MJPM en cas de refus de coopération d’un professionnel ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou l’ordre professionnel",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge ou l’ordre concerné pour garantir la coopération."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de précarité extrême ?",
    options: [
      "Organiser les soins",
      "Mobiliser les dispositifs d’urgence et alerter les partenaires",
      "Modifier la mesure",
      "Ignorer la situation"
    ],
    answer: 1,
    explanation: "Le MJPM doit mobiliser les dispositifs adaptés et alerter les partenaires en cas de précarité extrême."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est en errance ?",
    options: [
      "Ignorer la situation",
      "Organiser les soins",
      "Mobiliser les partenaires pour une prise en charge adaptée",
      "Modifier la mesure"
    ],
    answer: 2,
    explanation: "Le MJPM doit mobiliser les partenaires pour une prise en charge adaptée."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de dépendance affective ?",
    options: [
      "Respecter la relation sans condition",
      "Ignorer la situation",
      "Veiller à préserver l’autonomie du majeur et saisir le juge si nécessaire",
      "Modifier la mesure"
    ],
    answer: 2,
    explanation: "Le MJPM veille à préserver l’autonomie du majeur dans une relation de dépendance affective."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est victime d’abus de faiblesse ?",
    options: [
      "Ignorer la situation",
      "Saisir le procureur ou le juge",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir les autorités compétentes en cas d’abus de faiblesse."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de conflit entre professionnels ?",
    options: [
      "Ignorer le conflit",
      "Saisir le juge ou organiser une médiation",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le juge ou organiser une médiation pour préserver l’intérêt du majeur."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est hospitalisé sans information ?",
    options: [
      "Ignorer la situation",
      "Se rendre sur place et demander des explications",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM doit se rendre sur place et demander des explications pour assurer le suivi."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de rupture de soins ?",
    options: [
      "Ignorer la situation",
      "Organiser les soins",
      "Mobiliser les partenaires et saisir le juge si nécessaire",
      "Modifier la mesure"
    ],
    answer: 2,
    explanation: "Le MJPM doit mobiliser les partenaires et saisir le juge si la rupture de soins met en danger le majeur."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est victime de discrimination ?",
    options: [
      "Ignorer la situation",
      "Saisir le défenseur des droits ou le juge",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM peut saisir le défenseur des droits ou le juge en cas de discrimination."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de refus d’accès à un droit fondamental ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou engager un recours",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM doit agir pour garantir l’accès aux droits fondamentaux du majeur."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est en danger immédiat ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou le procureur sans délai",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM doit alerter immédiatement le juge ou le procureur en cas de danger."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de conflit d’intérêt ?",
    options: [
      "Ignorer le conflit",
      "Demander la désignation d’un subrogé ou d’un autre MJPM",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM doit demander la désignation d’un subrogé ou d’un autre MJPM en cas de conflit d’intérêt."
  },
  {
    question: "Que doit faire le MJPM si le majeur protégé est privé de liberté sans justification ?",
    options: [
      "Ignorer la situation",
      "Saisir le juge ou le procureur",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM doit saisir les autorités compétentes en cas de privation de liberté injustifiée."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de rupture de lien social ?",
    options: [
      "Ignorer la situation",
      "Favoriser la reconstruction du lien social et mobiliser les partenaires",
      "Modifier la mesure",
      "Organiser les soins"
    ],
    answer: 1,
    explanation: "Le MJPM veille à préserver ou reconstruire le lien social du majeur protégé."
}
]
}
};













