const router = require("express").Router();
const homeService = require("../services/homeService");

router.get("/", async (req, res) => {
  try {
    const lastThreeCourses = await homeService.getLastThreeCourses();
    res.render("home", { lastThreeCourses });
  } catch (error) {
    console.error("Error in homeController:", error);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
