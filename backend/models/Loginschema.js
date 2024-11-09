const mongoose = require("mongoose");

const Loginschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

});

const Login = mongoose.model("Login", Loginschema);

module.exports = Login;
