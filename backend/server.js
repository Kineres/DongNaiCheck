const express = require("express");

const cors = require("cors");

const placeRoutes =
  require("./routes/placeRoute");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
      message:
        "Dong Nai Check API running without database"
  });

});

app.use(
  "/api/places",
  placeRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running: http://localhost:${PORT}`
    );

  }
);