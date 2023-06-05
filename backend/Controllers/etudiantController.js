const Etudiant = require('../models/etudiant');
const bcrypt = require('bcryptjs');
const Questionnaire = require('../models/questionnaire');


exports.getProfile = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    res.json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    if (req.body.nom != null) {
    etudiant.nom = req.body.nom ;
    }
    if (req.body.prenom != null) {
    etudiant.prenom = req.body.prenom;
    }
    if (req.body.telephone != null) {    
    etudiant.telephone = req.body.telephone;
    }
    if (req.body.adresse != null) {
    etudiant.adresse = req.body.adresse;
    }
    if (req.body.niveau != null) {
    etudiant.niveau = req.body.niveau;
    }
    if (req.file != null) {
    etudiant.photo = req.file.filename ;
    }
    const updatedEtudiant = await etudiant.save();
    const imageUrl = req.file ? req.file.filename : etudiant.photo;
    res.json({ ...updatedEtudiant.toObject(), imageUrl });
  } catch (error) {
    //console.error(error);
    res.status(400).json({ message: error.message });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePassword = async (req, res) => {
    try {
      const { ancienMotDePasse, nouveauMotDePasse } = req.body;
  
      // Vérifier si l'étudiant est connecté
      const etudiant = await Etudiant.findById(req.userId);
      if (!etudiant) {
        return res.status(404).json({ message: "L'étudiant n'existe pas" });
      }
  
      // Vérifier si l'ancien mot de passe correspond au mot de passe de l'étudiant
      const motDePasseEstCorrect = await bcrypt.compare(ancienMotDePasse, etudiant.motDePasse);
      if (!motDePasseEstCorrect) {
        return res.status(401).json({ message: 'Le mot de passe actuel est incorrect' });
      }
  
      // Crypter le nouveau mot de passe
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(nouveauMotDePasse, salt);
  
      // Mettre à jour le mot de passe de l'étudiant dans la base de données
      const nouveauEtudiant = await Etudiant.findByIdAndUpdate(req.userId, { motDePasse: hash }, { new: true });
  
      return res.status(200).json({ message: 'Le mot de passe a été mis à jour avec succès', etudiant: nouveauEtudiant });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du mot de passe' });
    }
  };
  
exports.encryptData = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId);
    etudiant.nom = 'anonymouse';
    etudiant.prenom = 'anonymouse';
    etudiant.photo = 'anonymous.png';
    await etudiant.save();
    res.json({ message: 'Data encrypted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all published questionnaires for current student
exports.getPublishedQuestionnaires = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId).populate('publishedQuestions');
    if (!etudiant) {
      return res.status(404).json({ message: "L'étudiant n'existe pas" });
    }

    const unansweredQuestionnaires = etudiant.publishedQuestions.filter((q) => {
      // Check if the questionnaire is published and not answered by the current student
      return q.published && !q.answeredBy.includes(etudiant._id);
    });

    res.status(200).json(unansweredQuestionnaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get by id
exports.getPublishedQuestionnaireById = async (req, res) => {
  try {
    const { id } = req.params;
    const etudiant = await Etudiant.findById(req.userId).populate('publishedQuestions');
    if (!etudiant) {
      return res.status(404).json({ message: "L'étudiant n'existe pas" });
    }

    const questionnaire = etudiant.publishedQuestions.find(q => q._id.toString() === id && q.published);
    if (!questionnaire) {
      return res.status(404).json({ message: "Le questionnaire n'existe pas ou n'est pas publié" });
    }
    res.status(200).json(questionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

 // Submit answers for a questionnaire
exports.submitAnswers = async (req, res) => {
  try {
    const { questionnaireId } = req.params;
    const { answers } = req.body;

    const etudiant = await Etudiant.findById(req.userId);
    if (!etudiant) {
      return res.status(404).json({ message: "L'étudiant n'existe pas" });
    }

    const questionnaire = await Questionnaire.findById(questionnaireId);
    if (!questionnaire) {
      return res.status(404).json({ message: "Le questionnaire n'existe pas" });
    }

    if (!etudiant.publishedQuestions.includes(questionnaire._id)) {
      return res.status(403).json({ message: "L'étudiant n'est pas autorisé à répondre à ce questionnaire" });
    }

    const submittedAnswers = [];

    for (const answer of answers) {
      const question = questionnaire.questions.find(q => q._id.toString() === answer.questionId);
      if (!question) {
        continue; // Skip answers for non-existent questions
      }

      let submittedAnswer = '';

      if (question.type === 'text' || question.type === 'paragraph') {
        submittedAnswer = answer.text;
      } else if (question.type === 'checkboxes' || question.type === 'multiplechoice') {
        const selectedOptions = question.options.filter(option =>
          answer.selectedOptions.includes(option._id.toString())
        );
        submittedAnswer = selectedOptions.map(option => option.text);
      }

      submittedAnswers.push({
        question: question._id,
        answer: submittedAnswer,
      });
    }

    etudiant.answers.push({
      questionnaire: questionnaire._id,
      answers: submittedAnswers,
    });

    await etudiant.save();

    // Check if the student ID already exists in the answeredBy list
    if (!questionnaire.answeredBy.includes(etudiant._id)) {
      questionnaire.answeredBy.push(etudiant._id);
    }

    questionnaire.answers.push({
      student: etudiant._id,
      answers: submittedAnswers,
    });

    await questionnaire.save();

    res.status(200).json({ message: 'Answers submitted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error' });
  }
};


//get answered questionnaire
exports.getAnsweredQuestionnaires = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId).populate('publishedQuestions');
    if (!etudiant) {
      return res.status(404).json({ message: "L'étudiant n'existe pas" });
    }

    const answeredQuestionnaires = etudiant.publishedQuestions.filter((q) => {
      // Check if the questionnaire is published and answered by the current student
      return q.published && q.answeredBy.includes(etudiant._id);
    });

    res.status(200).json(answeredQuestionnaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


//get answered questionnaire by id 
exports.getAnsweredQuestionsById = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId).populate('publishedQuestions');
    if (!etudiant) {
      return res.status(404).json({ message: "L'étudiant n'existe pas" });
    }

    const answeredQuestionnaires = etudiant.publishedQuestions.filter((q) => {
      // Check if the questionnaire is published and answered by the current student
      return q.published && q.answeredBy.includes(etudiant._id);
    });

    res.status(200).json(answeredQuestionnaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
