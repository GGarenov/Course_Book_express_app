const Post = require("../models/Post");

exports.create = (postData) => Post.create(postData);

exports.getAll = () => Post.find();

exports.singlePost = (postId) => Post.findById(postId).populate("owner").populate("signUpList");

exports.update = (postId, postData) => Post.findByIdAndUpdate(postId, postData);

exports.delete = (postId) => Post.findByIdAndDelete(postId);

exports.addSignUpList = async (postId, userId) => {
  const post = await this.singlePost(postId);
  const isExistinginSignUpList = post.signUpList.some((s) => s?.toString() === userId);

  if (isExistinginSignUpList) {
    return;
  }

  post.signUpList.push(userId);
  return post.save();
};

exports.getMyPosts = (ownerId) => Post.find({ owner: ownerId }).populate("owner");

exports.getSignedUpCourses = (userId) => Post.find({ signUpList: userId }).populate("signUpList");

exports.getSignedUpCourseCount = async (userId) => {
  const courses = await this.getSignedUpCourses(userId);
  return courses.length;
};
