const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/", (req, res) => {
  res.send("try /api");
});

module.exports = router;
