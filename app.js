const express = require('express');
const { logErrors,boomErrorHandler,errorHandler,errorJson } = require('./middleware/errorMiddleware');
require('./lib/dbmongo');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json('Welcome to Advising');
});

app.use('/', require('./router/'));


app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
app.use(errorJson);


app.listen(port, () => {
    console.log('Server started on port 3000');
})