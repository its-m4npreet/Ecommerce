const mongoose = require("mongoose");
dotenv = require("dotenv");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: process.env.Default_Avatar,
    },
    phoneNumber: {
      type: String,
      default: null,
      trim: true
    },
    address: {
      type: String,
      default: null,
      trim: true
    },
    country: {
      type: String,
      default: null,
      trim: true
    },
    dob: {
      type: String,
      default: null
    },
    creditCard: {
      type: String,
      default: null,
      trim: true
    },
    upiId: {
      type: String,
      default: null,
      trim: true
    },
    cardHolderName: {
      type: String,
      default: null,
      trim: true
    },
    expiryDate: {
      type: String,
      default: null,
      trim: true
    },
    addresses: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      mobile: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true,
        trim: true
      },
      city: {
        type: String,
        trim: true,
        default: ''
      },
      state: {
        type: String,
        trim: true,
        default: ''
      },
      zipCode: {
        type: String,
        trim: true,
        default: ''
      },
      tag: {
        type: String,
        enum: ['HOME', 'WORK', 'OTHER'],
        default: 'HOME'
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    }]
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
