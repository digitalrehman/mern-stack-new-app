import slugify from "slugify";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

categorySchema.pre("save", function (next) {
  if (this.slug) {
    this.slug = slugify(this.categoryName, { lower: true });
  }
  next();
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
