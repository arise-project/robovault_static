const express = require('express');
const app = express();

app.use(express.static("web/"))
app.listen(process.env.PORT || 3007);
