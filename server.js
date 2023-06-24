let path = require("path");
let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let dotenv = require("dotenv");
dotenv.config();

let app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/getEmployees", async (req, res) => {
  let employeesData = await Employee.find();

  res.json(employeesData);
});

app.listen(3456, () => {
  console.log("Listening to port 3456");
});

let connectToMDB = async () => {
  try {
    //await mongoose.connect("mongodb://localhost:27017/Batch2302");
    await mongoose.connect(process.env.mdburl);
    console.log("connected to mdb");
    saveToDB();
  } catch {
    console.log("unable to connect to mdb");
  }
};

let employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Too small name"],
    maxLength: [20, "Too big name"],
  },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["male", "female"],
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    required: [true, "User phone number required"],
  },
  age: {
    type: Number,
    min: [18, "You are too young to create account"],
    max: [100, "You are too old to create account"],
    required: true,
  },
  department: String,
  location: String,
});

let Employee = new mongoose.model("employee", employeeSchema);

let saveToDB = async () => {
  try {
    let prajay = new Employee({
      name: "Anitha",
      gender: "Female",
      email: "anitha@gmail.com",
      age: 25,
      department: "Marketing",
      location: "Hyderabad",
    });

    Employee.insertMany([prajay]);
    console.log("saved to db successfully");
  } catch {
    console.log("Unable to save to db");
  }
};

connectToMDB();
