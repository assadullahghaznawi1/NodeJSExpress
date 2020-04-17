const mongoLocal = require("mongoose");
const schema = new mongoLocal.Schema({ name: {type: String}, priority: {type: String}, description: {type: String} });
mongoLocal.model("agenda", schema,"Tasks");

const newSchema = mongoLocal.Schema({name: {type: String, required: true}, lastName: {type:String}, password : {type: String, required = true}});
mongoLocal.model("loginModel", newSchema, "logins");