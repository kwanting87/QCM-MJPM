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
  const restantes = toutesLesQuestions.filter((q, i) => !questionsDéjàPosées[theme][niveau].includes(i));

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
    };
    qcmBox.appendChild(btn);
  });
}

const santeDebutant = [
  {
    question: "Quel est le rôle principal de l'Agence Régionale de Santé (ARS) ?",
    options: [
      "Contrôler les professions libérales",
      "Gérer les hôpitaux privés",
      "Piloter la politique de santé publique régionale",
      "Organiser les campagnes électorales"
    ],
    answer: [2],
    explanation: "L'ARS pilote la politique de santé publique dans sa région, coordonne les acteurs et veille à la qualité des soins."
  },
  {
    question: "Quel document est nécessaire pour une hospitalisation sans consentement ?",
    options: [
      "Une décision du préfet ou du juge",
      "Un certificat de naissance",
      "Une ordonnance médicale",
      "Une carte vitale"
    ],
    answer: [0],
    explanation: "L'hospitalisation sans consentement nécessite une décision administrative (préfet) ou judiciaire selon les cas."
  },
  {
    question: "Quel professionnel peut établir un certificat médical d'hospitalisation sous contrainte ?",
    options: [
      "Un médecin psychiatre",
      "Un psychologue",
      "Un infirmier",
      "Un médecin généraliste"
    ],
    answer: [0],
    explanation: "Seul un médecin psychiatre est habilité à établir ce type de certificat dans le cadre légal."
  },
  {
    question: "Quel est le rôle du médecin traitant dans le parcours de soins ?",
    options: [
      "Il contrôle les établissements de santé",
      "Il rédige les lois de santé",
      "Il délivre les médicaments",
      "Il coordonne les soins et oriente vers les spécialistes"
    ],
    answer: [3],
    explanation: "Le médecin traitant est le pivot du parcours de soins coordonné, garant de la continuité et de l’orientation médicale."
  },
  {
    question: "Quel organisme gère l’assurance maladie en France ?",
    options: [
      "Le ministère de l’Intérieur",
      "L’ARS",
      "La CAF",
      "La CPAM"
    ],
    answer: [3],
    explanation: "La Caisse Primaire d’Assurance Maladie (CPAM) gère les remboursements et la protection sociale liée à la santé."
  },
  {
    question: "Que signifie le sigle HAS ?",
    options: [
      "Hébergement et Assistance Sociale",
      "Hôpital d’Accueil Sanitaire",
      "Habilitation Administrative Spéciale",
      "Haute Autorité de Santé"
    ],
    answer: [3],
    explanation: "La Haute Autorité de Santé est une instance indépendante chargée d’évaluer les pratiques médicales et les produits de santé."
  },
  {
    question: "Quel est l’objectif principal de la loi Kouchner de 2002 ?",
    options: [
      "Reconnaître les droits des patients",
      "Favoriser la médecine alternative",
      "Renforcer le secret médical",
      "Supprimer les hôpitaux psychiatriques"
    ],
    answer: [0],
    explanation: "La loi du 4 mars 2002 vise à garantir les droits des patients, notamment l’information et le consentement."
  },
  {
    question: "Quel document formalise le consentement éclairé du patient ?",
    options: [
      "Un courrier du médecin",
      "Une ordonnance",
      "Une fiche d’information signée",
      "Un contrat de soins"
    ],
    answer: [2],
    explanation: "Le consentement éclairé est formalisé par une fiche d’information signée, attestant que le patient a compris les enjeux."
  },
  {
    question: "Quel acteur peut saisir la Commission des usagers (CDU) ?",
    options: [
      "Uniquement le directeur d’établissement",
      "Uniquement le juge",
      "Uniquement le médecin",
      "Tout usager ou représentant"
    ],
    answer: [3],
    explanation: "Tout usager ou représentant peut saisir la CDU en cas de litige ou de question sur la prise en charge."
  },
  {
    question: "Quel est le rôle du dossier médical partagé (DMP) ?",
    options: [
      "Remplacer la carte vitale",
      "Partager les données de santé entre professionnels",
      "Servir de carnet de vaccination uniquement",
      "Stocker les données bancaires du patient"
    ],
    answer: [1],
    explanation: "Le DMP permet aux professionnels de santé d’accéder aux informations médicales du patient pour une meilleure coordination."
  },
  {
    question: "Quel acteur peut accéder au DMP d’un patient ?",
    options: [
      "Tout professionnel de santé autorisé",
      "Le pharmacien uniquement",
      "Le juge des tutelles",
      "Le directeur d’établissement"
    ],
    answer: [0],
    explanation: "Tout professionnel de santé autorisé par le patient peut consulter le DMP."
  },
  {
    question: "Quel est le rôle de la Commission des droits et de l’autonomie des personnes handicapées (CDAPH) ?",
    options: [
      "Attribuer les aides sociales aux familles",
      "Décider des mesures de protection juridique",
      "Évaluer les besoins et attribuer les prestations liées au handicap",
      "Contrôler les établissements de santé"
    ],
    answer: [2],
    explanation: "La CDAPH évalue les besoins des personnes handicapées et attribue les prestations adaptées."
  },
  {
    question: "Quel est l’objectif principal du secret médical ?",
    options: [
      "Protéger les données bancaires du patient",
      "Permettre la publicité des traitements",
      "Garantir la confidentialité des informations de santé",
      "Faciliter les échanges entre patients"
    ],
    answer: [2],
    explanation: "Le secret médical garantit la confidentialité des informations de santé du patient."
  },
  {
    question: "Quel texte fonde juridiquement le secret médical ?",
    options: [
      "Le Code de la route",
      "Le Code de déontologie médicale",
      "La Constitution",
      "Le Code du commerce"
    ],
    answer: [1],
    explanation: "Le secret médical est fondé sur le Code de déontologie médicale, notamment l’article R.4127-4 du Code de la santé publique."
  },
  {
    question: "Dans quel cas le secret médical peut-il être levé ?",
    options: [
      "Jamais",
      "Sur demande du voisin",
      "En cas de danger grave pour autrui",
      "Pour faciliter les démarches administratives"
    ],
    answer: [2],
    explanation: "Le secret médical peut être levé en cas de danger grave pour autrui, selon les conditions prévues par la loi."
  },
  {
    question: "Quel est le rôle de la Maison Départementale des Personnes Handicapées (MDPH) ?",
    options: [
      "Gérer les hôpitaux psychiatriques",
      "Attribuer les aides au logement",
      "Accueillir, informer et accompagner les personnes handicapées",
      "Contrôler les professionnels de santé"
    ],
    answer: [2],
    explanation: "La MDPH est un guichet unique pour les démarches liées au handicap."
  },
  {
    question: "Quel est le rôle du médecin coordonnateur en EHPAD ?",
    options: [
      "Assurer les soins médicaux quotidiens",
      "Coordonner les soins et veiller à la qualité médicale",
      "Gérer les finances de l’établissement",
      "Organiser les animations"
    ],
    answer: [1],
    explanation: "Le médecin coordonnateur veille à la qualité des soins et à la coordination médicale en EHPAD."
  },
  {
    question: "Quel est le rôle de l’Ordre des médecins ?",
    options: [
      "Organiser les concours médicaux",
      "Contrôler les diplômes universitaires",
      "Veiller au respect de la déontologie médicale",
      "Gérer les hôpitaux publics"
    ],
    answer: [2],
    explanation: "L’Ordre des médecins veille au respect des règles déontologiques et à la qualité de l’exercice médical."
  },
  {
    question: "Quel est le rôle du MJPM dans le domaine de la santé ?",
    options: [
      "Prescrire des traitements",
      "Assurer le suivi médical du majeur protégé",
      "Garantir l’accès aux soins et le respect des droits du majeur",
      "Remplacer le médecin traitant"
    ],
    answer: [2],
    explanation: "Le MJPM veille à ce que le majeur protégé ait accès aux soins et que ses droits soient respectés."
  }
];
const santeIntermediaire = [
  {
    question: "Quel est le rôle du Conseil National de l’Ordre des Médecins ?",
    options: [
      "Gérer les hôpitaux publics",
      "Sanctionner les patients",
      "Veiller au respect de la déontologie médicale",
      "Organiser les concours médicaux"
    ],
    answer: [2],
    explanation: "Le Conseil National veille au respect des règles déontologiques et à la qualité de l’exercice médical."
  },
  {
    question: "Quel texte encadre les droits des usagers du système de santé ?",
    options: [
      "La loi Veil de 1975",
      "La loi Kouchner de 2002",
      "La loi HPST de 2009",
      "La loi bioéthique de 1994"
    ],
    answer: [1],
    explanation: "La loi du 4 mars 2002 (Kouchner) reconnaît les droits des patients et renforce leur place dans le système de santé."
  },
  {
    question: "Quel est le rôle de la Commission des usagers (CDU) dans un établissement de santé ?",
    options: [
      "Gérer les finances",
      "Représenter les professionnels de santé",
      "Veiller au respect des droits des patients",
      "Organiser les soins médicaux"
    ],
    answer: [2],
    explanation: "La CDU veille au respect des droits des usagers et traite les réclamations liées à leur prise en charge."
  },
  {
    question: "Quel est le rôle du médecin coordonnateur dans une MAS ?",
    options: [
      "Assurer les soins quotidiens",
      "Coordonner les interventions médicales",
      "Gérer les ressources humaines",
      "Organiser les activités culturelles"
    ],
    answer: [1],
    explanation: "Le médecin coordonnateur en MAS organise les soins et assure la cohérence des interventions médicales."
  },
  {
    question: "Que signifie le sigle PUI dans un établissement de santé ?",
    options: [
      "Pharmacie à Usage Interne",
      "Programme Universitaire d’Intégration",
      "Plan d’Urgence Interne",
      "Pôle d’Utilité Institutionnelle"
    ],
    answer: [0],
    explanation: "La PUI est la pharmacie interne de l’établissement, responsable de la gestion des médicaments."
  },
  {
    question: "Quel est le rôle du Comité d’éthique hospitalier ?",
    options: [
      "Sanctionner les fautes médicales",
      "Évaluer les pratiques médicales",
      "Accompagner la réflexion sur les dilemmes éthiques",
      "Gérer les ressources humaines"
    ],
    answer: [2],
    explanation: "Le comité d’éthique aide à réfléchir aux situations complexes impliquant des enjeux moraux ou humains."
  },
  {
    question: "Quel est le rôle de l’ANSM ?",
    options: [
      "Gérer les hôpitaux",
      "Contrôler les médicaments et dispositifs médicaux",
      "Former les professionnels de santé",
      "Organiser les campagnes de prévention"
    ],
    answer: [1],
    explanation: "L’Agence Nationale de Sécurité du Médicament contrôle les produits de santé et veille à leur sécurité."
  },
  {
    question: "Quel est le rôle du médecin inspecteur de santé publique ?",
    options: [
      "Assurer les soins en EHPAD",
      "Contrôler les pratiques médicales",
      "Organiser les campagnes électorales",
      "Gérer les dossiers de retraite"
    ],
    answer: [1],
    explanation: "Le médecin inspecteur contrôle les pratiques et participe à la régulation du système de santé."
  },
  {
    question: "Quel est le rôle du référent handicap dans une structure médico-sociale ?",
    options: [
      "Gérer les dossiers administratifs",
      "Accompagner les personnes en situation de handicap",
      "Organiser les soins médicaux",
      "Contrôler les finances"
    ],
    answer: [1],
    explanation: "Le référent handicap facilite l’accueil, l’accompagnement et l’adaptation des services aux besoins spécifiques."
  },
  {
    question: "Quel est le rôle du médecin de l’ARS dans les procédures d’hospitalisation sous contrainte ?",
    options: [
      "Il délivre les médicaments",
      "Il valide les certificats médicaux",
      "Il contrôle la régularité des procédures",
      "Il organise les soins psychiatriques"
    ],
    answer: [2],
    explanation: "Le médecin de l’ARS vérifie la conformité des procédures d’hospitalisation sans consentement."
  }
];
const santeIntermediaireSuite = [
  {
    question: "Quel est le rôle de la Conférence Régionale de la Santé et de l’Autonomie (CRSA) ?",
    options: [
      "Décider des budgets hospitaliers",
      "Représenter les usagers et proposer des orientations régionales",
      "Sanctionner les professionnels de santé",
      "Gérer les urgences médicales"
    ],
    answer: [1],
    explanation: "La CRSA émet des avis et recommandations sur la politique régionale de santé et représente les usagers."
  },
  {
    question: "Quel est le rôle du Comité de Liaison Alimentation Nutrition (CLAN) ?",
    options: [
      "Contrôler les cantines scolaires",
      "Promouvoir la nutrition dans les établissements de santé",
      "Organiser les repas des professionnels",
      "Gérer les stocks alimentaires"
    ],
    answer: [1],
    explanation: "Le CLAN vise à améliorer la qualité de la prise en charge nutritionnelle des patients."
  },
  {
    question: "Quel est l’objectif du programme PAERPA ?",
    options: [
      "Favoriser l’accès à l’emploi",
      "Améliorer le parcours de santé des personnes âgées en perte d’autonomie",
      "Réduire les dépenses hospitalières",
      "Former les aidants familiaux"
    ],
    answer: [1],
    explanation: "Le programme PAERPA vise à coordonner les soins et services pour les personnes âgées en perte d’autonomie."
  },
  {
    question: "Quel est le rôle du médecin DIM (Département d’Information Médicale) ?",
    options: [
      "Assurer les soins médicaux",
      "Gérer les ressources humaines",
      "Analyser les données médicales pour le financement et la qualité",
      "Organiser les formations internes"
    ],
    answer: [2],
    explanation: "Le médecin DIM analyse les données de santé pour optimiser le financement et la qualité des soins."
  },
  {
    question: "Quel est le rôle du Comité de lutte contre la douleur (CLUD) ?",
    options: [
      "Sanctionner les pratiques douloureuses",
      "Évaluer les traitements médicamenteux",
      "Améliorer la prise en charge de la douleur",
      "Former les patients à la gestion de la douleur"
    ],
    answer: [2],
    explanation: "Le CLUD propose des actions pour améliorer la prévention et le traitement de la douleur dans les établissements."
  },
  {
    question: "Quel est le rôle de l’Agence de la biomédecine ?",
    options: [
      "Gérer les urgences hospitalières",
      "Superviser les greffes, la procréation et la génétique",
      "Contrôler les médicaments",
      "Former les professionnels de santé"
    ],
    answer: [1],
    explanation: "L’Agence de la biomédecine encadre les activités sensibles comme les greffes, la PMA et la génétique."
  },
  {
    question: "Quel est le rôle du Référent Qualité dans un établissement médico-social ?",
    options: [
      "Assurer les soins quotidiens",
      "Contrôler les finances",
      "Piloter les démarches d’amélioration continue",
      "Organiser les activités culturelles"
    ],
    answer: [2],
    explanation: "Le Référent Qualité coordonne les actions visant à améliorer les pratiques et la satisfaction des usagers."
  },
  {
    question: "Quel est le rôle du médecin coordonnateur dans une unité de soins longue durée (USLD) ?",
    options: [
      "Gérer les admissions",
      "Assurer les soins quotidiens",
      "Coordonner les soins et garantir leur qualité",
      "Organiser les animations"
    ],
    answer: [2],
    explanation: "Le médecin coordonnateur veille à la qualité et à la cohérence des soins dans les USLD."
  },
  {
    question: "Quel est le rôle du Comité de pilotage de la bientraitance ?",
    options: [
      "Sanctionner les actes de maltraitance",
      "Former les professionnels à la bientraitance",
      "Évaluer les pratiques et promouvoir le respect des usagers",
      "Gérer les plaintes des familles"
    ],
    answer: [2],
    explanation: "Ce comité propose des actions pour renforcer la culture de la bientraitance dans les établissements."
  },
  {
    question: "Quel est le rôle du MJPM face à une situation de refus de soins ?",
    options: [
      "Obliger le majeur à se soigner",
      "Informer le juge des tutelles",
      "Respecter la volonté du majeur tout en évaluant les risques",
      "Demander l’intervention de la police"
    ],
    answer: [2],
    explanation: "Le MJPM doit respecter la volonté du majeur protégé, sauf danger grave, et alerter si nécessaire."
  }
];
const santeExpert = [
  {
    question: "Quel article du Code civil encadre la protection juridique des majeurs ?",
    options: [
      "Article L.1110-4",
      "Article 414-1",
      "Article R.4127-4",
      "Article L.311-3"
    ],
    answer: [1],
    explanation: "L’article 414-1 du Code civil pose le principe de la capacité juridique et encadre les mesures de protection."
  },
  {
    question: "Quel est le rôle du juge des contentieux de la protection en matière de santé ?",
    options: [
      "Prescrire des traitements",
      "Décider des hospitalisations sans consentement",
      "Gérer les budgets hospitaliers",
      "Organiser les soins psychiatriques"
    ],
    answer: [1],
    explanation: "Le juge des contentieux de la protection peut ordonner une hospitalisation sans consentement dans certains cas."
  },
  {
    question: "Quel est le rôle du MJPM dans le cadre d’une mesure de curatelle renforcée concernant la santé ?",
    options: [
      "Décider seul des soins",
      "Co-signer les décisions médicales avec le majeur",
      "Remplacer le médecin traitant",
      "Informer la famille uniquement"
    ],
    answer: [1],
    explanation: "En curatelle renforcée, le MJPM co-signe les décisions importantes, y compris en matière de santé."
  },
  {
    question: "Quel texte encadre l’hospitalisation sans consentement pour péril imminent ?",
    options: [
      "Code de la sécurité sociale",
      "Code de la santé publique",
      "Code civil",
      "Code pénal"
    ],
    answer: [1],
    explanation: "Le Code de la santé publique encadre les procédures d’hospitalisation sans consentement, notamment pour péril imminent."
  },
  {
    question: "Quel est le rôle du médecin certificateur dans une procédure d’hospitalisation sous contrainte ?",
    options: [
      "Il décide de l’admission",
      "Il rédige un certificat circonstancié",
      "Il informe la famille",
      "Il organise le transfert"
    ],
    answer: [1],
    explanation: "Le médecin certificateur rédige un certificat circonstancié attestant de la nécessité de soins sans consentement."
  },
  {
    question: "Quel est le rôle du Conseil de la Vie Sociale (CVS) dans les établissements médico-sociaux ?",
    options: [
      "Décider des soins médicaux",
      "Représenter les usagers et participer à la vie de l’établissement",
      "Sanctionner les professionnels",
      "Gérer les finances"
    ],
    answer: [1],
    explanation: "Le CVS permet aux usagers de s’exprimer sur le fonctionnement de l’établissement et d’être représentés."
  },
  {
    question: "Quel est le rôle du Comité de Protection des Personnes (CPP) ?",
    options: [
      "Contrôler les hôpitaux",
      "Valider les protocoles de recherche impliquant des personnes",
      "Gérer les plaintes des patients",
      "Former les professionnels de santé"
    ],
    answer: [1],
    explanation: "Le CPP donne son avis sur les protocoles de recherche impliquant la personne humaine."
  },
  {
    question: "Quel est le rôle du Référent déontologie dans une structure médico-sociale ?",
    options: [
      "Organiser les soins",
      "Gérer les ressources humaines",
      "Veiller au respect des principes éthiques et déontologiques",
      "Contrôler les finances"
    ],
    answer: [2],
    explanation: "Le référent déontologie veille à l’application des principes éthiques dans les pratiques professionnelles."
  },
  {
    question: "Quel est le rôle du médecin coordonnateur dans une procédure d’admission en EHPAD ?",
    options: [
      "Décider seul de l’admission",
      "Évaluer l’état de santé et la compatibilité avec la structure",
      "Organiser les animations",
      "Gérer les dossiers financiers"
    ],
    answer: [1],
    explanation: "Le médecin coordonnateur évalue la situation médicale du futur résident et son adéquation avec l’EHPAD."
  },
  {
    question: "Quel est le rôle du MJPM dans le cadre d’une fin de vie médicalisée ?",
    options: [
      "Décider à la place du majeur",
      "Refuser les soins palliatifs",
      "Veiller au respect des directives anticipées et de la volonté du majeur",
      "Organiser les funérailles"
    ],
    answer: [2],
    explanation: "Le MJPM veille au respect des volontés du majeur, notamment en matière de fin de vie et de soins palliatifs."
  }
  {
    question: "Quel est le rôle du Comité d’éthique dans une recherche biomédicale ?",
    options: [
      "Valider les résultats statistiques",
      "Contrôler les budgets de recherche",
      "Garantir le respect des principes éthiques et du consentement",
      "Organiser les publications scientifiques"
    ],
    answer: [2],
    explanation: "Le comité d’éthique veille au respect des principes éthiques, notamment le consentement éclairé des participants."
  },
  {
    question: "Quel est le rôle du médecin traitant dans l’application des directives anticipées ?",
    options: [
      "Les ignorer si elles sont anciennes",
      "Les appliquer sauf avis contraire du MJPM",
      "Les respecter sauf urgence vitale",
      "Les transmettre au juge des tutelles"
    ],
    answer: [2],
    explanation: "Le médecin doit respecter les directives anticipées sauf en cas d’urgence vitale ou d’incompatibilité médicale."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de soins psychiatriques sans consentement ?",
    options: [
      "Décider de l’hospitalisation",
      "Informer le juge et veiller au respect des droits du majeur",
      "Prescrire les traitements",
      "Organiser le transfert vers l’établissement"
    ],
    answer: [1],
    explanation: "Le MJPM veille au respect des droits du majeur et peut alerter le juge en cas d’abus ou de dysfonctionnement."
  },
  {
    question: "Quel est le rôle du Comité de retour d’expérience (CREX) en santé ?",
    options: [
      "Sanctionner les erreurs médicales",
      "Analyser les événements indésirables pour améliorer les pratiques",
      "Gérer les plaintes des patients",
      "Former les professionnels à la gestion de crise"
    ],
    answer: [1],
    explanation: "Le CREX analyse les événements indésirables pour renforcer la sécurité et la qualité des soins."
  },
  {
    question: "Quel est le rôle du médecin légiste dans le cadre d’une mesure de protection ?",
    options: [
      "Évaluer la capacité juridique du majeur",
      "Assurer les soins palliatifs",
      "Organiser les soins psychiatriques",
      "Gérer les dossiers de succession"
    ],
    answer: [0],
    explanation: "Le médecin légiste peut être sollicité pour évaluer la capacité du majeur dans le cadre d’une expertise judiciaire."
  },
  {
    question: "Quel est le rôle du Référent bientraitance dans une structure médico-sociale ?",
    options: [
      "Sanctionner les actes de maltraitance",
      "Former les professionnels à la bientraitance",
      "Coordonner les actions de prévention et de sensibilisation",
      "Gérer les plaintes des familles"
    ],
    answer: [2],
    explanation: "Le référent bientraitance coordonne les actions visant à promouvoir le respect et la dignité des usagers."
  },
  {
    question: "Quel est le rôle du médecin coordonnateur dans la gestion des risques sanitaires ?",
    options: [
      "Organiser les soins quotidiens",
      "Évaluer les risques et mettre en place des protocoles",
      "Gérer les ressources humaines",
      "Informer les familles"
    ],
    answer: [1],
    explanation: "Le médecin coordonnateur participe à l’évaluation des risques et à la mise en œuvre de protocoles adaptés."
  },
  {
    question: "Quel est le rôle du MJPM dans le suivi des soins à domicile ?",
    options: [
      "Prescrire les soins",
      "Organiser les interventions médicales",
      "S’assurer que les soins sont adaptés et respectent les droits du majeur",
      "Gérer les plannings des infirmiers"
    ],
    answer: [2],
    explanation: "Le MJPM veille à ce que les soins soient adaptés, respectueux des droits et coordonnés avec les professionnels."
  },
  {
    question: "Quel est le rôle du Comité de pilotage de la qualité en établissement de santé ?",
    options: [
      "Contrôler les finances",
      "Évaluer les pratiques professionnelles et définir les axes d’amélioration",
      "Sanctionner les erreurs médicales",
      "Organiser les animations"
    ],
    answer: [1],
    explanation: "Ce comité pilote les démarches qualité et sécurité des soins dans les établissements."
  },
  {
    question: "Quel est le rôle du MJPM dans une situation de refus de soins en fin de vie ?",
    options: [
      "Obliger le majeur à accepter les soins",
      "Respecter la volonté du majeur et alerter en cas de conflit",
      "Demander l’intervention du juge",
      "Organiser les soins palliatifs"
    ],
    answer: [1],
    explanation: "Le MJPM doit respecter la volonté du majeur, sauf danger grave, et peut alerter les autorités compétentes."
  }
];










