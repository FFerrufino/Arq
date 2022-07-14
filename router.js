const express = require("express");
const router = express.Router();
const app = express();

// app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./db/mongo/db");

router.get("/msj", (req, res) => {
  console.log("Hola mundo");
  res.send("Hola mundo");
});
router.get("/findAll/:collection", db.findAll);
router.post("/insert/:collection", db.insert);
router.delete("/delete/:collection/:name", db.delete);

module.exports = router;

app.use("/api", router);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
