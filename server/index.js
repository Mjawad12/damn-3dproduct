const express = require("express");

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.static("damn"));

app.get("/", (req, res) => {
  res.sendFile("Damn - Digital Hub.html", { root: "damn" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
