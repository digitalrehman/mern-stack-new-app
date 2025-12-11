import News from "../model/News.js";
import User from "../model/User.js";
import cloudinary from "../config/clodinary.js";

export let createNews = async (req, res) => {
    try {
        let userId = req.userId
        let { title, description, category } = req.body;
        let file = req.file
        if (!file) {
            return res.status(404).json({
                message: "image is required"
            })
        }
        let checkUser = await User.findById(userId);
        if (!checkUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        // image upload cloudinary 
        let result = await cloudinary.uploader.upload(file.path, {
            folder: "news_images",
        });
        let news = new News({
            title,
            description,
            image: result.secure_url,
            category,
            author: userId
        });
        await news.save();
        return res.status(201).json({
            message: "News created successfully",
            news
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server error"
        })
    }
}
export let updateNews = async (req, res) => { }
export let deleteNews = async (req, res) => { }
export let getNews = async (req, res) => {
    try {
        let allNews = await News.find().populate("category").populate("author").sort({ createdAt: -1 });
        return res.status(200).json({
            message: "All News",
            allNews
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server error"
        })
    }
}
