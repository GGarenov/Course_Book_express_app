const Post = require("../models/Post");

exports.getLastThreeCourses = async () => {
  try {
    const lastThreeCourses = await Post.find().sort({ createdAt: -1 }).limit(3).lean();
    return lastThreeCourses;
  } catch (error) {
    throw new Error("Error fetching last three courses");
  }
};
