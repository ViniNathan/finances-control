import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
    },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
