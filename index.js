const express = require("express");
const ejs = require("ejs");
const path = require("path");
const { processMessage } = require("./NlpManagerComponent");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const messages = [];

app.get("/", (req, res) => {
  res.render("layout", {
    title: "Chat App",
    messages: messages,
  });
});

app.post("/send-message", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  console.log("tes", messages);

  if (message) {
    messages.push({ sender: "user", text: message });
    const response = await processMessage(message);

    const robotResponse =
      response && response.answer
        ? response.answer
        : "Maaf, saya tidak mengerti";
    messages.push({ sender: "robot", text: robotResponse });
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
