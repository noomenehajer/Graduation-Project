const Etudiant = require('../models/etudiant');
const bcrypt = require('bcryptjs');
const Questionnaire = require('../models/questionnaire');
const Question = require('../models/questionnaire');
const Answer = require('../models/questionnaire');

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

    const questionnaires = etudiant.publishedQuestions.filter(q => q.published);
    res.status(200).json(questionnaires);
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
/* exports.submitAnswers = async (req, res) => {
  const { questionnaireId } = req.params;
  const { answers } = req.body;
  try {
    const etudiant = await Etudiant.findById(req.userId);
    if (!etudiant) {
      return res.status(404).json({ message: "L'étudiant n'existe pas" });
    }
    const questionnaire = await Questionnaire.findById(questionnaireId);
    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }
    if (!questionnaire.published) {
      return res.status(400).json({ error: 'Questionnaire is not published yet' });
    }
    if (!questionnaire.publishedTo.includes(etudiant._id)) {
      return res.status(400).json({ error: 'You are not authorized to answer this questionnaire' });
    }
    const answersArray = [];
    for (const { questionId, text, selectedOptions } of answers) {
      const question = questionnaire.questions.id(questionId);
      if (!question) {
        return res.status(400).json({ error: `Question ${questionId} not found` });
      }
      let answer;
      if (question.type === 'text' || question.type === 'paragraph') {
        answer = text;
      } else if (question.type === 'checkboxes') {
        const selectedOptionIds = selectedOptions.map(option => option.id);
        const invalidOptionIds = selectedOptionIds.filter(id => !question.options.some(option => option.id === id));
        if (invalidOptionIds.length > 0) {
          return res.status(400).json({ error: `Invalid option IDs: ${invalidOptionIds}` });
        }
        answer = selectedOptionIds;
      } else if (question.type === 'multipleChoice') {
        const selectedOptionId = selectedOptions[0].id;
        if (!question.options.some(option => option.id === selectedOptionId)) {
          return res.status(400).json({ error: `Invalid option ID: ${selectedOptionId}` });
        }
        answer = selectedOptionId;
      }
    //  answersArray.push({ question: questionId, answer });//
      answersArray.push({ questionId: questionId, answer: text });
    }  
    const reponse = {
      student: etudiant._id,
      answers: answersArray,
    };
    //const savedAnswer = await Answer.create(answer);
    //console.log(savedAnswer);
    await questionnaire.answers.push(reponse);//
    await questionnaire.answeredBy.push(etudiant._id);
    await questionnaire.save();
    await etudiant.answers.push({ questionnaireId, answers });//
    await etudiant.save();
    res.status(200).json({ message: 'Answers submitted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; */

exports.submitAnswers = async (req, res) => {
  const { questionnaireId } = req.params;
  const { answers } = req.body;

  try {
    const etudiant = await Etudiant.findById(req.userId);

    if (!etudiant) {
      return res.status(404).json({ message: "L'étudiant n'existe pas" });
    }

    const questionnaire = await Questionnaire.findById(questionnaireId);

    if (!questionnaire) {
      return res.status(404).json({ message: "Le questionnaire n'existe pas" });
    }

    if (!etudiant.publishedQuestions.includes(questionnaire._id)) {
      return res.status(400).json({ message: "Le questionnaire n'est pas accessible à cet étudiant" });
    }

    // Check if the questionnaire is already answered by the student
    const existingAnswer = questionnaire.answers.find(answer => answer.student.toString() === etudiant._id.toString());
    if (existingAnswer) {
      return res.status(400).json({ message: "Le questionnaire a déjà été répondu par cet étudiant" });
    }

    const formattedAnswers = answers.map(answer => ({
      question: answer.question,
      answer: answer.answer
    }));

    questionnaire.answers.push({
      student: etudiant._id,
      answers: formattedAnswers
    });

    etudiant.answers.push({
      questionnaire: questionnaire._id,
      answers: formattedAnswers
    });

    await questionnaire.save();
    await etudiant.save();

    res.status(200).json({ message: "Les réponses ont été soumises avec succès" });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
