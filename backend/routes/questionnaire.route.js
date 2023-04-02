const express = require('express');
const questionnaireController = require('../controllers/questionnaireController');

const router = express.Router();
//questionnaires
router.get('/', questionnaireController.getQuestionnaires);
router.get('/:id', questionnaireController.getQuestionnaireById);
router.post('/', questionnaireController.createQuestionnaire);
router.put('/:id', questionnaireController.updateQuestionnaire);
router.delete('/:id', questionnaireController.deleteQuestionnaire);

//questions
router.post('/:id/questions', questionnaireController.createQuestion);
router.put('/:questionnaireId/questions/:questionId', questionnaireController.updateQuestion);
router.delete('/:questionnaireId/questions/:questionId', questionnaireController.deleteQuestion);

//options
router.get('/:id/questions/:questionId/options', questionnaireController.getOptions);
router.post('/:id/questions/:questionId/options', questionnaireController.addOption);
router.delete('/:id/questions/:questionId/options/:optionId', questionnaireController.deleteOption);

module.exports = router;