import Category from "../model/Category.js";

export let createCategory = async (req, res) => {
  try {
    let { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }
    let category = new Category({
      categoryName,
      slug: categoryName,
    });
    await category.save();
    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export let getAllCategory = async(req, res) => {
    try {
        let getAll = await Category.find().sort({createdAt: -1})
        return res.status(200).json({
            message: "All Category",
            getAll,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
};
export let updateCategory = (req, res) => {};
export let deleteCategory = (req, res) => {};
