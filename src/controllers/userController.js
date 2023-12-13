const router = require("express").Router();
const userService = require("../services/userService");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, repassword } = req.body;
  try {
    const token = await userService.register({ username, email, password, repassword });
    await userService.login(email, password);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("users/register", { errorMessages });
  }
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("users/login", { errorMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
