const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minLength: [4, 'username must be atleast 4 characters long'],
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(v);
            },
            message: "must have a validate email address",
        },
    },

    password: {
        type: String,
        required: [true, 'email is required'],
        minLength: [8, 'password must be atleast 8 charcters'],
    }
}, 
    { timestamps: true }
);

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match")
    }
        next();
});

UserSchema.pre("validate", function (next) {
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash;

            next();
        });
});

module.exports = mongoose.model("User", UserSchema);