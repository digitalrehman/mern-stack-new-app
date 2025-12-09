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
export let getAllCategory = async (req, res) => {
  try {
    let getAll = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "All Category",
      getAll,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export let updateCategory = async (req, res) => {
  try {
    let { id } = req.params;
    let { categoryName } = req.body;
    let check_id = await Category.findById(id);
    if (!check_id) {
      return res.status(404).json({
        message: "category not found",
      });
    }
    let slug = categoryName.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    let newCategory = await Category.findByIdAndUpdate(
      id,
      {
        categoryName,
        slug
      },
      { new: true }
    );
    res.status(200).json({
      message: "category updated successfully!",
      newCategory,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export let deleteCategory = async (req, res) => {
  try {
    let { id } = req.params
    let check_id = await Category.findById(id);
    if (!check_id) {
      return res.status(404).json({
        message: "category not found",
      });
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({
      message: "category deleted successfully!"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
