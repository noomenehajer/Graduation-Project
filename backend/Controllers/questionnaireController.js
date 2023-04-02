const Questionnaire = require('../models/questionnaire');

exports.getQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find();
    res.status(200).json(questionnaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getQuestionnaireById = async (req, res) => {
  const { id } = req.params;

  try {
    const questionnaire = await Questionnaire.findById(id);
    res.status(200).json(questionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createQuestionnaire = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const newQuestionnaire = new Questionnaire({
      title,
      description,
      questions
    });

    const savedQuestionnaire = await newQuestionnaire.save();

    res.status(201).json(savedQuestionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateQuestionnaire = async (req, res) => {
  const { id } = req.params;
  const { title, description, questions } = req.body;

  try {
    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(id, {
      title,
      description,
      questions
    });

    res.status(200).json(updatedQuestionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteQuestionnaire = async (req, res) => {
  const { id } = req.params;

  try {
    await Questionnaire.findByIdAndDelete(id);
    res.status(200).json({ message: 'Questionnaire deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createQuestion = async (req, res) => {
  const { id } = req.params;
  const { text, type, answer } = req.body;
  let { options } = req.body;
  if (!options) options = [];

  try {
    const questionnaire = await Questionnaire.findById(id);

    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    questionnaire.questions.push({
      text,
      type,
      options,
      answer
    });

    const savedQuestionnaire = await questionnaire.save();

    res.status(201).json(savedQuestionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateQuestion = async (req, res) => {
  const { questionnaireId, questionId } = req.params;
  const { text, type, options, answer } = req.body;

  try {
    const questionnaire = await Questionnaire.findById(questionnaireId);

    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    const question = questionnaire.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    question.text = text;
    question.type = type;
    question.options = options;

    // update options
    const existingOptions = question.options.map(option => option.value);
    const newOptions = options.filter(option => !existingOptions.includes(option.value));
    const deletedOptions = existingOptions.filter(option => !options.some(o => o.value === option));
    for (const option of newOptions) {
      await addOption(questionnaireId, questionId, option);
    }
    for (const option of deletedOptions) {
      await deleteOption(questionnaireId, questionId, option);
    }

    question.answer = answer;

    const savedQuestionnaire = await questionnaire.save();

    res.status(200).json(savedQuestionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { questionnaireId, questionId } = req.params;

  try {
    const questionnaire = await Questionnaire.findById(questionnaireId);
    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    const question = questionnaire.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // delete options
    for (const option of question.options) {
      await deleteOption(questionnaireId, questionId, option.value);
    }

    question.remove();

    const savedQuestionnaire = await questionnaire.save();

    res.status(200).json(savedQuestionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
          
exports.getOptions = async (req, res) => {
  const { questionnaireId, questionId } = req.params;

  try {
    const questionnaire = await Questionnaire.findById(questionnaireId);

    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    const question = questionnaire.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const options = question.options;

    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addOption = async (req, res) => {
  const { questionnaireId, questionId } = req.params;
  const { option } = req.body;

  try {
    const questionnaire = await Questionnaire.findById(questionnaireId);

    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    const question = questionnaire.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    question.options.push(option);

    const savedQuestionnaire = await questionnaire.save();

    res.status(201).json(savedQuestionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteOption = async (req, res) => {
  const { questionnaireId, questionId, optionId } = req.params;

  try {
    const questionnaire = await Questionnaire.findById(questionnaireId);

    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    const question = questionnaire.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const option = question.options.id(optionId);
    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    option.remove();

    const savedQuestionnaire = await questionnaire.save();

    res.status(200).json(savedQuestionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
