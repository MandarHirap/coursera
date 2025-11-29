const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const AdminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,̀
});
const CourseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: { type: Schema.Types.ObjectId, ref: "admin" },
});
const PurchaseSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "course" },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

const UserModel = mongoose.model("user", UserSchema);
const adminModel = mongoose.model("admin", AdminSchema);
const CourseModel = mongoose.model("course", CourseSchema);
const purchasemodel = mongoose.model("purchase", PurchaseSchema);

module.exports = {
  UserModel,
  adminModel,
  CourseModel,
  purchasemodel,
};
