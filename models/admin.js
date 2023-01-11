import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: String,
  hashed_password: String,
});

const Admin = new mongoose.model("Admin", AdminSchema);
export default Admin;
