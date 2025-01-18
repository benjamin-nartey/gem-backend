const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A visitor must have a name"],
    trim: true,
  },
  phone: { type: String, trim: true },
  email: { type: String, trim: true },
  residence: {
    type: String,
    required: [true, "A visitor must have a place of residence"],
    trim: true,
  },
  sex: {
    type: String,
    required: [true, "A visitor must have a gender"],
    enum: {
      values: ["male", "female"],
      message: "Sex can either be male or female",
    },
  },
  wouldYouBeMember: {
    type: String,
    required: [true, "This field is required"],
    enum: {
      values: ["yes", "no"],
      message: "wouldYouBeMember can either be yes or no",
    },
  },
  givenLifeToChrist: {
    type: {
      status: {
        type: String,
        required: [true, "Salvation status is required"],
        enum: {
          values: ["yes", "no"],
          message: "givenLifeToChrist status can either be yes or no",
        },
      },
      dateConverted: Date,
      placeOfConvertion: {
        type: String,
        trim: true,
      },
    },
    required: [true, "GivenLifeToChrist field is required"],
  },
  recordOfficer: {
    type: String,
    required: [true, "Name of record officer is required"],
  },
  churchBranch: {
    type: String,
    required: [true, "Name of church branch is required"],
  },
  inviter: {
    type: String,
    required: [true, "Name of inviter is required"],
    trim: true,
  },
  inviterPhone: String,
  firstTimer: {
    type: String,
    required: [true, "FirstTimer field is required"],
    enum: {
      values: ["yes", "no"],
      message: "firstTimer status can either be yes or no",
    },
  },
  purposeOfVisit: { type: String, trim: true },
  maritalStatus: {
    type: String,
    required: [true, "MaritalStatus field is required"],
    enum: {
      values: ["single", "married", "divorce"],
      message: "Marital status can either be single, married or divorce",
    },
  },
  serviceExperience: {
    type: String,
    required: [true, "serviceExperiece field is required"],
    enum: {
      values: ["poor", "normal", "good", "better"],
      message:
        "serviceExperience field can either be poor, normal, good, or better",
    },
  },
  prayerRequest: { type: String, trim: true },
  WantUsToVisit: {
    type: {
      status: {
        type: String,
        required: [true, "WantToVisit field is required"],
        enum: {
          values: ["yes", "no"],
          message: "wantUsToVisit status can either be yes or no",
        },
      },
      day: String,
      time: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
