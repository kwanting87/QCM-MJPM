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
qcmData.santé.débutant = [
  {
    question: "Quel est le rôle principal de l'Agence Régionale de Santé (ARS) ?"
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
qcmData.santé.intermédiaire = [
  {
    question: "Quel est le rôle du Conseil National de l’Ordre des Médecins ?"
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
  {
    question: "Quel est le rôle de la Conférence Régionale de la Santé et de l’Autonomie (CRSA) ?"
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
qcmData.santé.expérimenté = [
  {
    question: "Quel article du Code civil encadre la protection juridique des majeurs ?"
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
],
qcmData.patrimoine.débutant = [
  {
    question: "Qu’est-ce que le patrimoine d’une personne ?"
    options: [
      "L’ensemble de ses biens et de ses dettes",
      "Uniquement ses biens immobiliers",
      "Ses diplômes et compétences",
      "Son état de santé"
    ],
    answer: [0],
    explanation: "Le patrimoine regroupe l’ensemble des biens, droits et obligations à caractère économique d’une personne."
  },
  {
    question: "Quel document permet de prouver la propriété d’un bien immobilier ?",
    options: [
      "La carte vitale",
      "Le livret de famille",
      "L’acte notarié",
      "Le contrat de travail"
    ],
    answer: [2],
    explanation: "L’acte notarié, enregistré au service de publicité foncière, atteste de la propriété d’un bien immobilier."
  },
  {
    question: "Qui peut établir un inventaire du patrimoine d’un majeur protégé ?",
    options: [
      "Le médecin traitant",
      "Le MJPM",
      "Le juge des tutelles",
      "Le notaire uniquement"
    ],
    answer: [1],
    explanation: "Le MJPM peut établir un inventaire du patrimoine dans le cadre de sa mission de protection."
  },
  {
    question: "Quel bien fait partie du patrimoine mobilier ?",
    options: [
      "Une maison",
      "Un terrain",
      "Une voiture",
      "Un appartement"
    ],
    answer: [2],
    explanation: "Les biens mobiliers sont les objets que l’on peut déplacer, comme une voiture ou des meubles."
  },
  {
    question: "Quel bien fait partie du patrimoine immobilier ?",
    options: [
      "Un compte bancaire",
      "Une œuvre d’art",
      "Un appartement",
      "Une voiture"
    ],
    answer: [2],
    explanation: "Les biens immobiliers sont les biens fixés au sol, comme les maisons ou les appartements."
  },
  {
    question: "Quel organisme gère les comptes bancaires d’un majeur protégé ?",
    options: [
      "La CAF",
      "La CPAM",
      "La banque",
      "Le MJPM"
    ],
    answer: [3],
    explanation: "Le MJPM gère les comptes bancaires du majeur protégé dans le respect de ses intérêts."
  },
  {
    question: "Quel document permet de suivre les mouvements d’un compte bancaire ?",
    options: [
      "Le relevé de compte",
      "Le livret de famille",
      "La carte bancaire",
      "Le contrat de curatelle"
    ],
    answer: [0],
    explanation: "Le relevé de compte détaille les opérations effectuées sur un compte bancaire."
  },
  {
    question: "Quel professionnel peut aider à estimer la valeur d’un bien immobilier ?",
    options: [
      "Un MJPM",
      "Un médecin",
      "Un agent immobilier",
      "Un avocat"
    ],
    answer: [2],
    explanation: "L’agent immobilier est compétent pour estimer la valeur d’un bien immobilier."
  },
  {
    question: "Quel est le rôle du notaire dans la gestion du patrimoine ?",
    options: [
      "Soigner les patients",
      "Gérer les comptes bancaires",
      "Rédiger les actes juridiques et authentifier les transactions",
      "Organiser les soins médicaux"
    ],
    answer: [2],
    explanation: "Le notaire rédige les actes de vente, de donation, de succession et les authentifie."
  },
  {
    question: "Quel document est nécessaire pour vendre un bien immobilier ?",
    options: [
      "Un certificat médical",
      "Un acte de naissance",
      "Un acte de propriété",
      "Une carte d’identité"
    ],
    answer: [2],
    explanation: "L’acte de propriété prouve que la personne est bien propriétaire du bien à vendre."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion du patrimoine ?",
    options: [
      "Décider seul des ventes",
      "Gérer les biens dans l’intérêt du majeur protégé",
      "Investir librement en bourse",
      "Organiser les soins médicaux"
    ],
    answer: [1],
    explanation: "Le MJPM agit dans l’intérêt du majeur protégé, avec autorisation du juge si nécessaire."
  },
  {
    question: "Quel bien peut être considéré comme un actif financier ?",
    options: [
      "Une voiture",
      "Un compte bancaire",
      "Un contrat de travail",
      "Un certificat médical"
    ],
    answer: [1],
    explanation: "Les actifs financiers regroupent les comptes, livrets, actions, obligations, etc."
  },
  {
    question: "Quel document est utilisé pour déclarer les revenus et le patrimoine ?",
    options: [
      "La carte vitale",
      "La déclaration d’impôts",
      "Le livret de famille",
      "Le contrat de travail"
    ],
    answer: [1],
    explanation: "La déclaration d’impôts permet de déclarer les revenus et certains éléments du patrimoine."
  },
  {
    question: "Quel bien peut être transmis par donation ?",
    options: [
      "Uniquement les biens immobiliers",
      "Uniquement les comptes bancaires",
      "Tout type de bien, mobilier ou immobilier",
      "Uniquement les voitures"
    ],
    answer: [2],
    explanation: "La donation peut porter sur tout type de bien, mobilier ou immobilier."
  },
  {
    question: "Quel est le rôle du juge des tutelles dans la gestion du patrimoine ?",
    options: [
      "Décider des soins médicaux",
      "Autoriser certains actes de disposition",
      "Gérer les comptes bancaires",
      "Organiser les animations"
    ],
    answer: [1],
    explanation: "Le juge autorise les actes importants comme la vente d’un bien ou une donation."
  },
  {
    question: "Quel document peut attester de la valeur d’un bien mobilier ?",
    options: [
      "Un certificat médical",
      "Une facture",
      "Un acte de naissance",
      "Un contrat de travail"
    ],
    answer: [1],
    explanation: "La facture permet d’attester de la valeur d’un bien mobilier."
  },
  {
    question: "Quel bien peut être considéré comme un passif ?",
    options: [
      "Un compte bancaire",
      "Une dette",
      "Une maison",
      "Une voiture"
    ],
    answer: [1],
    explanation: "Le passif regroupe les dettes et obligations financières d’une personne."
  },
  {
    question: "Quel est le rôle du livret A ?",
    options: [
      "Stocker les données médicales",
      "Servir de carte d’identité",
      "Permettre une épargne sécurisée",
      "Gérer les soins médicaux"
    ],
    answer: [2],
    explanation: "Le livret A est un produit d’épargne réglementé, accessible à tous."
  },
  {
    question: "Quel professionnel peut être sollicité pour gérer un patrimoine complexe ?",
    options: [
      "Un médecin",
      "Un avocat",
      "Un gestionnaire de patrimoine",
      "Un pharmacien"
    ],
    answer: [2],
    explanation: "Le gestionnaire de patrimoine conseille et optimise la gestion des biens et placements."
  },
  {
    question: "Quel est le rôle du MJPM face à une succession ?",
    options: [
      "Organiser les funérailles",
      "Refuser les héritiers",
      "Informer le notaire et protéger les intérêts du majeur",
      "Décider seul du partage"
    ],
    answer: [2],
    explanation: "Le MJPM informe le notaire et veille à ce que les droits du majeur soient respectés dans la succession."
  }
qcmData.patrimoine.intermédiaire = [
  {
    question: "Quel acte nécessite l’autorisation du juge des tutelles pour un majeur sous tutelle ?"
    options: [
      "Le retrait d’espèces",
      "La vente d’un bien immobilier",
      "Le paiement d’une facture",
      "L’ouverture d’un livret A"
    ],
    answer: [1],
    explanation: "La vente d’un bien immobilier est un acte de disposition qui nécessite l’autorisation du juge des tutelles."
  },
  {
    question: "Quel document est obligatoire pour accepter une succession au nom d’un majeur protégé ?",
    options: [
      "Un certificat médical",
      "Une autorisation du juge",
      "Un acte de naissance",
      "Un contrat de curatelle"
    ],
    answer: [1],
    explanation: "Le MJPM doit obtenir l’autorisation du juge pour accepter une succession au nom du majeur protégé."
  },
  {
    question: "Quel est le rôle du notaire dans une succession ?",
    options: [
      "Organiser les soins médicaux",
      "Gérer les comptes bancaires",
      "Établir l’acte de notoriété et répartir les biens",
      "Décider des héritiers"
    ],
    answer: [2],
    explanation: "Le notaire établit l’acte de notoriété, identifie les héritiers et répartit les biens selon les règles de succession."
  },
  {
    question: "Quel est le délai légal pour renoncer à une succession ?",
    options: [
      "1 mois",
      "3 mois",
      "6 mois",
      "1 an"
    ],
    answer: [2],
    explanation: "Le délai légal pour renoncer à une succession est de 6 mois à compter du décès."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien locatif ?",
    options: [
      "Signer seul le bail sans autorisation",
      "Gérer les loyers et charges dans l’intérêt du majeur",
      "Vendre le bien sans autorisation",
      "Refuser tout locataire"
    ],
    answer: [1],
    explanation: "Le MJPM peut gérer les loyers et charges, mais doit obtenir l’autorisation du juge pour les actes de disposition."
  },
  {
    question: "Quel est le rôle du juge des tutelles dans une donation ?",
    options: [
      "Il rédige l’acte",
      "Il autorise ou refuse la donation au nom du majeur protégé",
      "Il reçoit les fonds",
      "Il choisit le bénéficiaire"
    ],
    answer: [1],
    explanation: "Le juge autorise ou refuse la donation selon l’intérêt du majeur protégé."
  },
  {
    question: "Quel est le rôle du MJPM dans la déclaration d’impôts ?",
    options: [
      "Il est dispensé de cette obligation",
      "Il doit établir et transmettre la déclaration pour le majeur protégé",
      "Il doit demander au juge de la rédiger",
      "Il doit la confier à un notaire"
    ],
    answer: [1],
    explanation: "Le MJPM est responsable de la déclaration fiscale du majeur protégé."
  },
  {
    question: "Quel est le rôle du livret de famille dans la gestion patrimoniale ?",
    options: [
      "Il permet de prouver la propriété d’un bien",
      "Il contient les informations fiscales",
      "Il atteste des liens familiaux utiles en cas de succession",
      "Il permet d’ouvrir un compte bancaire"
    ],
    answer: [2],
    explanation: "Le livret de famille atteste des liens de parenté, utiles pour identifier les héritiers."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de vente immobilière ?",
    options: [
      "Il peut vendre sans autorisation",
      "Il doit obtenir l’accord du notaire uniquement",
      "Il doit solliciter l’autorisation du juge des tutelles",
      "Il doit consulter le médecin traitant"
    ],
    answer: [2],
    explanation: "La vente d’un bien immobilier par un MJPM nécessite l’autorisation du juge des tutelles."
  },
  {
    question: "Quel est le rôle du compte de gestion annuel ?",
    options: [
      "Il permet de suivre les soins médicaux",
      "Il retrace les opérations patrimoniales du MJPM",
      "Il sert à établir la déclaration d’impôts",
      "Il permet de demander une mesure de protection"
    ],
    answer: [1],
    explanation: "Le compte de gestion annuel retrace toutes les opérations patrimoniales effectuées par le MJPM."
  }
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un portefeuille d’actions ?",
    options: [
      "Investir librement sans autorisation",
      "Demander l’avis du médecin traitant",
      "Gérer les titres avec prudence et autorisation du juge si nécessaire",
      "Vendre tout le portefeuille dès la mesure prononcée"
    ],
    answer: [2],
    explanation: "Le MJPM doit gérer les placements financiers dans l’intérêt du majeur, avec autorisation du juge pour les actes de disposition."
  },
  {
    question: "Quel est le rôle du juge des tutelles dans une renonciation à succession ?",
    options: [
      "Il rédige l’acte",
      "Il autorise ou refuse la renonciation",
      "Il choisit les héritiers",
      "Il gère les biens du défunt"
    ],
    answer: [1],
    explanation: "Le juge doit autoriser la renonciation à succession pour un majeur protégé, après évaluation de son intérêt."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien en indivision ?",
    options: [
      "Il peut vendre seul le bien",
      "Il doit obtenir l’accord des autres indivisaires et du juge si nécessaire",
      "Il peut exclure les autres indivisaires",
      "Il doit transmettre le bien à la mairie"
    ],
    answer: [1],
    explanation: "La gestion d’un bien en indivision nécessite l’accord des co-indivisaires et parfois du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de partage successoral ?",
    options: [
      "Il décide seul du partage",
      "Il représente le majeur et veille à ses intérêts",
      "Il choisit les héritiers",
      "Il rédige les actes notariés"
    ],
    answer: [1],
    explanation: "Le MJPM représente le majeur dans les opérations de partage et veille à la préservation de ses droits."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un contrat d’assurance-vie ?",
    options: [
      "Il peut le modifier librement",
      "Il doit obtenir l’autorisation du juge pour tout rachat ou modification",
      "Il doit le clôturer immédiatement",
      "Il doit le transférer à la banque centrale"
    ],
    answer: [1],
    explanation: "Toute opération sur un contrat d’assurance-vie nécessite l’autorisation du juge pour un majeur protégé."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien loué meublé ?",
    options: [
      "Il peut signer seul le bail",
      "Il doit obtenir l’autorisation du juge pour conclure ou résilier le bail",
      "Il doit vendre le bien",
      "Il doit le transformer en logement social"
    ],
    answer: [1],
    explanation: "La conclusion ou résiliation d’un bail meublé est un acte de disposition nécessitant l’autorisation du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un héritage comportant des dettes ?",
    options: [
      "Il doit accepter sans condition",
      "Il doit refuser systématiquement",
      "Il doit demander l’autorisation du juge et envisager l’acceptation à concurrence de l’actif net",
      "Il doit transmettre l’héritage à la commune"
    ],
    answer: [2],
    explanation: "Le MJPM peut demander l’autorisation du juge pour accepter à concurrence de l’actif net afin de protéger le majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien rural loué ?",
    options: [
      "Il peut le vendre sans autorisation",
      "Il doit respecter le bail rural et obtenir l’autorisation du juge pour toute modification",
      "Il doit le transformer en terrain constructible",
      "Il doit le céder à la SAFER"
    ],
    answer: [1],
    explanation: "Le MJPM doit respecter les règles spécifiques du bail rural et obtenir l’autorisation du juge pour les actes de disposition."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien en usufruit ?",
    options: [
      "Il peut le vendre librement",
      "Il doit respecter les droits du nu-propriétaire et obtenir l’autorisation du juge pour toute aliénation",
      "Il doit le transmettre à l’État",
      "Il doit le transformer en bien indivis"
    ],
    answer: [1],
    explanation: "L’usufruit implique des droits partagés avec le nu-propriétaire, et toute aliénation nécessite l’autorisation du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien reçu par donation ?",
    options: [
      "Il peut le vendre immédiatement",
      "Il doit respecter les clauses de la donation et obtenir l’autorisation du juge pour tout acte de disposition",
      "Il doit le transmettre à la famille",
      "Il doit le transformer en bien public"
    ],
    answer: [1],
    explanation: "Le MJPM doit respecter les clauses de la donation et obtenir l’autorisation du juge pour toute vente ou modification."
  }
],
qcmData.patrimoine.expert = [
  {
    question: "Quel est le rôle du MJPM dans une succession avec passif supérieur à l’actif ?"
    options: [
      "Accepter la succession sans condition",
      "Refuser la succession sans autorisation",
      "Demander l’autorisation du juge pour accepter à concurrence de l’actif net",
      "Transmettre la succession à la commune"
    ],
    answer: [2],
    explanation: "Le MJPM doit demander l’autorisation du juge pour accepter à concurrence de l’actif net afin de protéger le majeur."
  },
  {
    question: "Quel est le rôle du notaire dans une indivision conflictuelle ?",
    options: [
      "Il peut imposer le partage",
      "Il conseille et propose des solutions amiables ou judiciaires",
      "Il désigne les héritiers",
      "Il rédige les actes médicaux"
    ],
    answer: [1],
    explanation: "Le notaire peut proposer des solutions amiables ou saisir le juge en cas de blocage dans l’indivision."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un usufruit successoral ?",
    options: [
      "Il peut vendre le bien librement",
      "Il doit respecter les droits du nu-propriétaire et obtenir l’autorisation du juge",
      "Il doit transformer le bien en indivision",
      "Il doit transmettre le bien à l’État"
    ],
    answer: [1],
    explanation: "L’usufruit implique des droits partagés, toute aliénation nécessite l’autorisation du juge."
  },
  {
    question: "Quel est le rôle du juge des tutelles dans une donation-partage ?",
    options: [
      "Il rédige l’acte",
      "Il autorise ou refuse la donation au nom du majeur protégé",
      "Il choisit les bénéficiaires",
      "Il gère les biens transmis"
    ],
    answer: [1],
    explanation: "Le juge autorise ou refuse la donation-partage selon l’intérêt du majeur protégé."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un contrat de capitalisation ?",
    options: [
      "Il peut le modifier librement",
      "Il doit obtenir l’autorisation du juge pour tout rachat ou arbitrage",
      "Il doit le clôturer immédiatement",
      "Il doit le transmettre à la banque centrale"
    ],
    answer: [1],
    explanation: "Toute opération sur un contrat de capitalisation nécessite l’autorisation du juge pour un majeur protégé."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession internationale ?",
    options: [
      "Il applique le droit français sans exception",
      "Il doit vérifier la loi applicable et solliciter le juge si nécessaire",
      "Il transmet le dossier au consulat",
      "Il refuse systématiquement la succession"
    ],
    answer: [1],
    explanation: "Le MJPM doit vérifier la loi applicable et solliciter le juge pour protéger les intérêts du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de partage judiciaire ?",
    options: [
      "Il rédige les actes",
      "Il représente le majeur et veille à ses intérêts",
      "Il choisit les héritiers",
      "Il organise les soins médicaux"
    ],
    answer: [1],
    explanation: "Le MJPM représente le majeur dans les opérations de partage et veille à la préservation de ses droits."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un bien grevé d’hypothèque ?",
    options: [
      "Il peut le vendre librement",
      "Il doit obtenir l’autorisation du juge et vérifier les conséquences financières",
      "Il doit le transmettre à la commune",
      "Il doit le transformer en bien public"
    ],
    answer: [1],
    explanation: "La vente d’un bien grevé d’hypothèque nécessite l’autorisation du juge et une analyse des conséquences."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de liquidation de communauté ?",
    options: [
      "Il peut liquider seul",
      "Il doit obtenir l’autorisation du juge et veiller à l’équité du partage",
      "Il doit transmettre les biens à la famille",
      "Il doit refuser toute négociation"
    ],
    answer: [1],
    explanation: "Le MJPM doit obtenir l’autorisation du juge et veiller à la préservation des droits du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion d’un patrimoine professionnel ?",
    options: [
      "Il peut gérer librement l’entreprise",
      "Il doit obtenir l’autorisation du juge pour tout acte de disposition",
      "Il doit fermer l’entreprise",
      "Il doit transmettre la gestion à la mairie"
    ],
    answer: [1],
    explanation: "La gestion d’un patrimoine professionnel nécessite prudence et autorisation du juge pour les actes importants."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec testament ?",
    options: [
      "Il peut modifier le testament",
      "Il doit respecter les volontés du défunt et obtenir l’autorisation du juge pour les actes",
      "Il doit refuser la succession",
      "Il doit transmettre le testament au juge"
    ],
    answer: [1],
    explanation: "Le MJPM doit respecter les volontés du défunt et obtenir l’autorisation du juge pour les actes de disposition."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de tontine ?",
    options: [
      "Il peut annuler la clause",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute action",
      "Il doit transmettre le bien à l’État",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause de tontine implique des conséquences patrimoniales complexes, nécessitant l’autorisation du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec legs universel ?",
    options: [
      "Il doit refuser le legs",
      "Il doit accepter sans autorisation",
      "Il doit obtenir l’autorisation du juge pour accepter ou refuser",
      "Il doit transmettre le legs à la commune"
    ],
    answer: [2],
    explanation: "Le MJPM doit obtenir l’autorisation du juge pour accepter ou refuser un legs universel."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec réserve héréditaire ?",
    options: [
      "Il peut ignorer la réserve",
      "Il doit veiller à ce que les droits du majeur soient respectés",
      "Il doit transmettre les biens à l’État",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La réserve héréditaire protège certains héritiers, le MJPM doit veiller à son respect."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause d’inaliénabilité ?",
    options: [
      "Il peut vendre le bien librement",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute dérogation",
      "Il doit transmettre le bien à la commune",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause d’inaliénabilité limite la vente, le MJPM doit respecter cette clause et solliciter le juge si besoin."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec usufruit temporaire ?",
    options: [
      "Il peut vendre le bien",
      "Il doit respecter les droits du nu-propriétaire et obtenir l’autorisation du juge",
      "Il doit transmettre le bien à l’État",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "L’usufruit temporaire implique des droits partagés, toute aliénation nécessite l’autorisation du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de préciput ?",
    options: [
      "Il doit refuser la clause",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour l’appliquer",
      "Il doit transmettre le bien à la commune",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause de préciput permet à un époux de prélever certains biens, le MJPM doit respecter cette clause."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de retour conventionnel ?",
    options: [
      "Il doit refuser la clause",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute action",
      "Il doit transmettre le bien à l’État",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause de retour conventionnel prévoit le retour d’un bien à la famille d’origine, le MJPM doit la respecter."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de retour légal ?",
    options: [
      "Il peut ignorer la clause",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute action",
      "Il doit transmettre le bien à la commune",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause de retour légal prévoit que certains biens reviennent à la famille d’origine ; le MJPM doit la respecter et solliciter le juge si nécessaire."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de réversion d’usufruit ?",
    options: [
      "Il peut vendre le bien librement",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute aliénation",
      "Il doit transmettre le bien à l’État",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause de réversion d’usufruit prévoit le retour de l’usufruit à une personne désignée ; le MJPM doit la respecter."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de substitution ?",
    options: [
      "Il peut modifier les bénéficiaires",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute action",
      "Il doit transmettre le bien à la commune",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause de substitution permet de désigner un bénéficiaire en remplacement ; le MJPM doit la respecter et solliciter le juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de réserve d’usufruit au profit du conjoint survivant ?",
    options: [
      "Il doit ignorer la clause",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute action",
      "Il doit transmettre le bien à la commune",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La réserve d’usufruit au profit du conjoint survivant est une disposition à respecter ; le MJPM doit agir avec autorisation du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de partage anticipé ?",
    options: [
      "Il peut refuser le partage",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour l’appliquer",
      "Il doit transmettre le bien à l’État",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "Le partage anticipé est une disposition à respecter ; le MJPM doit obtenir l’autorisation du juge pour l’appliquer."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause d’exclusion d’un héritier ?",
    options: [
      "Il peut réintégrer l’héritier",
      "Il doit respecter la clause et vérifier sa validité avec le juge",
      "Il doit transmettre le bien à la commune",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "L’exclusion d’un héritier est une clause sensible ; le MJPM doit la respecter et vérifier sa légalité avec le juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de legs particulier ?",
    options: [
      "Il peut modifier le bénéficiaire",
      "Il doit respecter le legs et obtenir l’autorisation du juge pour l’exécuter",
      "Il doit transmettre le bien à l’État",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "Le MJPM doit respecter les legs particuliers et obtenir l’autorisation du juge pour les exécuter."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de réserve d’usufruit sur un bien indivis ?",
    options: [
      "Il peut vendre le bien",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute action",
      "Il doit transmettre le bien à la commune",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La réserve d’usufruit sur un bien indivis impose des contraintes ; le MJPM doit respecter la clause et solliciter le juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de préciput sur un bien immobilier ?",
    options: [
      "Il peut vendre le bien librement",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute aliénation",
      "Il doit transmettre le bien à l’État",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause de préciput permet à un époux de prélever certains biens ; le MJPM doit la respecter et agir avec autorisation."
  },
  {
    question: "Quel est le rôle du MJPM dans une succession avec clause de retour conventionnel sur un bien donné ?",
    options: [
      "Il peut vendre le bien",
      "Il doit respecter la clause et obtenir l’autorisation du juge pour toute action",
      "Il doit transmettre le bien à la commune",
      "Il doit refuser la succession"
    ],
    answer: [1],
    explanation: "La clause de retour conventionnel prévoit le retour du bien à la famille d’origine ; le MJPM doit la respecter."
  }
qcmData.famille.débutant = [
  {
    question: "Qu’est-ce qu’un lien de filiation ?"
    options: [
      "Un lien entre deux époux",
      "Un lien entre un parent et son enfant",
      "Un lien entre deux frères",
      "Un lien entre deux voisins"
    ],
    answer: [1],
    explanation: "La filiation désigne le lien juridique entre un parent et son enfant."
  },
  {
    question: "Quel document atteste de la filiation d’un enfant ?",
    options: [
      "Le livret de famille",
      "La carte vitale",
      "Le contrat de mariage",
      "Le passeport"
    ],
    answer: [0],
    explanation: "Le livret de famille contient les actes de naissance et atteste de la filiation."
  },
  {
    question: "Quel est le rôle du juge aux affaires familiales ?",
    options: [
      "Soigner les patients",
      "Gérer les successions",
      "Régler les conflits familiaux",
      "Organiser les soins médicaux"
    ],
    answer: [2],
    explanation: "Le juge aux affaires familiales intervient dans les conflits liés au divorce, à la garde d’enfants, etc."
  },
  {
    question: "Quel est le rôle du MJPM dans les relations familiales du majeur protégé ?",
    options: [
      "Remplacer la famille",
      "Interdire les visites",
      "Respecter les liens familiaux et favoriser la communication",
      "Organiser les soins médicaux"
    ],
    answer: [2],
    explanation: "Le MJPM doit respecter les liens familiaux et favoriser les relations dans l’intérêt du majeur."
  },
  {
    question: "Quel est le rôle du livret de famille ?",
    options: [
      "Gérer les comptes bancaires",
      "Attester des liens familiaux",
      "Organiser les soins médicaux",
      "Servir de carte d’identité"
    ],
    answer: [1],
    explanation: "Le livret de famille regroupe les actes d’état civil et atteste des liens familiaux."
  },
  {
    question: "Quel est le rôle du MJPM en cas de conflit familial ?",
    options: [
      "Prendre parti",
      "Organiser une médiation",
      "Ignorer le conflit",
      "Refuser tout contact"
    ],
    answer: [1],
    explanation: "Le MJPM peut favoriser la médiation pour préserver les intérêts du majeur protégé."
  },
  {
    question: "Quel est le rôle du juge des tutelles dans les relations familiales ?",
    options: [
      "Organiser les soins médicaux",
      "Décider des visites familiales",
      "Autoriser ou interdire certains actes en cas de conflit",
      "Gérer les comptes bancaires"
    ],
    answer: [2],
    explanation: "Le juge peut intervenir pour autoriser ou interdire certains actes en cas de conflit familial."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de divorce ?",
    options: [
      "Il est partie au divorce",
      "Il représente le majeur protégé si celui-ci est concerné",
      "Il rédige les actes de divorce",
      "Il organise les soins médicaux"
    ],
    answer: [1],
    explanation: "Le MJPM peut représenter le majeur protégé dans une procédure de divorce si celui-ci est concerné."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des relations avec les enfants du majeur protégé ?",
    options: [
      "Interdire les contacts",
      "Organiser les visites",
      "Favoriser les liens familiaux dans l’intérêt du majeur",
      "Décider de la garde"
    ],
    answer: [2],
    explanation: "Le MJPM doit favoriser les liens familiaux dans le respect de la volonté et de l’intérêt du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure d’adoption ?",
    options: [
      "Il adopte le majeur",
      "Il organise les soins médicaux",
      "Il peut être consulté si le majeur protégé est concerné",
      "Il rédige les actes d’adoption"
    ],
    answer: [2],
    explanation: "Le MJPM peut être consulté si le majeur protégé est concerné par une procédure d’adoption."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des relations avec les frères et sœurs du majeur ?",
    options: [
      "Interdire les contacts",
      "Favoriser les liens familiaux",
      "Organiser les soins médicaux",
      "Gérer les comptes bancaires"
    ],
    answer: [1],
    explanation: "Le MJPM doit favoriser les liens familiaux dans le respect de la volonté du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de changement de nom ?",
    options: [
      "Il décide seul",
      "Il organise les soins médicaux",
      "Il peut accompagner le majeur dans la procédure",
      "Il rédige les actes"
    ],
    answer: [2],
    explanation: "Le MJPM peut accompagner le majeur dans une procédure de changement de nom, avec autorisation du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de reconnaissance de paternité ?",
    options: [
      "Il peut représenter le majeur",
      "Il organise les soins médicaux",
      "Il rédige les actes",
      "Il décide seul"
    ],
    answer: [0],
    explanation: "Le MJPM peut représenter le majeur dans une procédure de reconnaissance de paternité."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de contestation de filiation ?",
    options: [
      "Il peut engager la procédure avec autorisation du juge",
      "Il organise les soins médicaux",
      "Il rédige les actes",
      "Il décide seul"
    ],
    answer: [0],
    explanation: "Le MJPM peut engager une procédure de contestation de filiation avec autorisation du juge."
  },
  {
    question: "Quel est le rôle du MJPM dans la gestion des relations avec le conjoint du majeur ?",
    options: [
      "Interdire les contacts",
      "Organiser les soins médicaux",
      "Respecter les liens conjugaux et favoriser la communication",
      "Décider du divorce"
    ],
    answer: [2],
    explanation: "Le MJPM doit respecter les liens conjugaux et favoriser la communication dans l’intérêt du majeur."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de mariage ?",
    options: [
      "Il peut interdire le mariage",
      "Il organise les soins médicaux",
      "Il peut être consulté et le juge peut autoriser ou refuser le mariage",
      "Il rédige les actes"
    ],
    answer: [2],
    explanation: "Le MJPM peut être consulté et le juge décide de l’autorisation du mariage pour un majeur protégé."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de PACS ?",
    options: [
      "Il peut interdire le PACS",
      "Il organise les soins médicaux",
      "Il peut accompagner le majeur et solliciter l’autorisation du juge",
      "Il rédige les actes"
    ],
    answer: [2],
    explanation: "Le MJPM peut accompagner le majeur dans une procédure de PACS, avec autorisation du juge si nécessaire."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de rupture de PACS ?",
    options: [
      "Il peut organiser la rupture seul",
      "Il doit respecter la volonté du majeur et informer le juge",
      "Il rédige les actes",
      "Il organise les soins médicaux"
    ],
    answer: [1],
    explanation: "Le MJPM doit respecter la volonté du majeur et informer le juge en cas de rupture de PACS."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de divorce par consentement mutuel ?",
    options: [
      "Il peut signer seul",
      "Il doit accompagner le majeur et obtenir l’autorisation du juge",
      "Il rédige les actes",
      "Il organise les soins médicaux"
    ],
    answer: [1],
    explanation: "Le MJPM accompagne le majeur et doit obtenir l’autorisation du juge pour signer un divorce par consentement mutuel."
  },
  {
    question: "Quel est le rôle du MJPM dans une procédure de protection de l’enfant du majeur ?",
    options: [
      "Il organise les soins médicaux",
      "Il peut alerter les autorités compétentes",
      "Il rédige les actes",
      "Il décide seul de la garde"
    ],
    answer: [1],
    explanation: "Le MJPM peut alerter les autorités compétentes s’il constate un danger pour l’enfant du majeur protégé."
  }
];













