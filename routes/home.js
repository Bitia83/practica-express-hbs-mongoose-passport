const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  const urls = [
    { origin: "www.google.com/bluuweb1", shortURL: "kjghjhg1" },
    { origin: "www.google.com/bluuweb2", shortURL: "kjghjhg2" },
    { origin: "www.google.com/bluuweb3", shortURL: "kjghjhg3" },
  ]
  res.render("home", { urls: urls });
});



module.export = router;

