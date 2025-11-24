const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;
console.log("connected to");
mongoose.connect(
  "mongodb+srv://admin:Mandar%402020@cluster0.apqxkyx.mongodb.net/course-selling"
);

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
  lastName: String,
});
const CourseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: objectId,
});
const PurchaseSchema = new Schema({
  userId: objectId,
  courseId: objectId,
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
