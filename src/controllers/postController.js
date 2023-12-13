const router = require("express").Router();
const postService = require("../services/postService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/catalog", async (req, res) => {
  const posts = await postService.getAll().lean();
  res.render("posts/catalog", { posts });
});

router.get("/create", isAuth, (req, res) => {
  res.render("posts/create");
});

router.post("/create", async (req, res) => {
  const { title, type, certificate, image, description, price } = req.body;

  const payload = {
    title,
    type,
    certificate,
    image,
    description,
    price,
    owner: req.user,
  };

  try {
    await postService.create(payload);
    res.redirect("/posts/catalog");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("post/create", { errorMessages });
  }
});

router.get("/:postId/details", async (req, res) => {
  const { postId } = req.params;

  const post = await postService.singlePost(postId).lean();
  const { user } = req;
  const { owner } = post;
  const isOwner = user?._id === owner._id.toString(); // Change this line
  const hasSignedUp = post.signUpList?.some((s) => s?._id.toString() === user?._id);
  const joinedEmailsOfOwners = post.signUpList.map((s) => s.email).join(", ");

  res.render("posts/details", { post, isOwner, hasSignedUp, joinedEmailsOfOwners });
});

router.get("/:postId/edit", isAuth, async (req, res) => {
  const { postId } = req.params;

  // Ensure that the user is the owner of the post
  const post = await postService.singlePost(postId).lean();
  if (!post || !req.user || req.user._id !== post.owner._id.toString()) {
    return res.status(403).send("Forbidden");
  }

  res.render("posts/edit", { post });
});

router.post("/:postId/edit", async (req, res) => {
  const { postId } = req.params;
  const { title, type, certificate, image, description, price } = req.body;

  const payload = {
    title,
    type,
    certificate,
    image,
    description,
    price,
    owner: req.user,
  };

  await postService.update(postId, payload);
  res.redirect(`/posts/${postId}/details`);
});

router.get("/:postId/delete", async (req, res) => {
  const { postId } = req.params;

  await postService.delete(postId);
  res.redirect("/posts/catalog");
});

router.get("/:postId/signUp", async (req, res) => {
  const { postId } = req.params;
  const { _id } = req.user;
  console.log({ _id });

  await postService.addSignUpList(postId, _id);

  res.redirect(`/posts/${postId}/details`);
});

router.get("/profile", isAuth, async (req, res) => {
  const { user } = req;

  const myPosts = await postService.getMyPosts(user?._id).lean();
  const signedUpCourses = await postService.getSignedUpCourses(user?._id).lean();
  const signedUpCourseCount = signedUpCourses.length;

  res.render("posts/profile", { myPosts, signedUpCourses, signedUpCourseCount });
});

module.exports = router;
