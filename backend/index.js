const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));

app.listen(port, () => {
  console.log(`Inotebook backend listening on port ${port}`);
});
