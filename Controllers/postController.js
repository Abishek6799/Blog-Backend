import Post from "../Models/postSchema.js";
import sendMail from "../Utils/mail.js";

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = "";
    if(req.file && req.file.path){
      imageUrl= req.file.path;
    }
   
    const newPost = new Post({
      title,
      description,
      image: imageUrl,
      user: req.user._id,
    });

    await newPost.save();
    await sendMail({
      to: req.user.email,
      subject: `${title} Blog Created Successfully`,
      text: `Hello ${req.user.name},\n\nYour blog ${title} has been created successfully.\n\nWait for admin approval.\n\nThank you for using our service.`,
    })
    res
      .status(200)
      .json({ message: "Post Created Successfully", data: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approvePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { approved: true },
        { new: true }
      ).populate("user","name email");

      if(post){
        await sendMail({
          to: post.user.email,
          subject: `${post.title} Blog Approved`,
          text: `Hello ${post.user.name},\n\nYour blog ${post.title} has been approved.`
        }) 
      }
      res.status(200).json({ message: "Post Approved Successfully", data: post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getPost = async (req, res) => {
    try {
      const posts = await Post.find({ approved: true }).populate("user", "name");
      res.status(200).json({ message: "Blog Fetched Successfully", posts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const getUnapprovedPost = async (req, res) => {
    try {
      const posts = await Post.find({ approved: false }).populate("user", "name");
      res.status(200).json({ message: "Blog Fetched Successfully", posts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const deletePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id).populate("user", "name email");
      if(post){
        await sendMail({
          to: post.user.email,
          subject: `${post.title} Blog Deleted`,
          text: `Hello ${post.user.name},\n\nYour blog ${post.title} has been deleted.`
        })
      }
      res.status(200).json({ message: "Blog Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };