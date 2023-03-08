require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin.route');
mongoose.set('strictQuery', false);
const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.error(error));

app.use(bodyParser.json());

app.use('/admin', adminRoutes);

app.use(express.json());
//questionnaire
const questionnaireRouter = require('./routes/questionnaire.route');
app.use('/questionnaires', questionnaireRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
