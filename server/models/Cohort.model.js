
const mongoose = require("mongoose")

const cohortSchema = new mongoose.Schema({
  inProgress: {type: Boolean, default: false},
  cohortSlug: {type: String},
  cohortName: {type: String},
  program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
  format: {type: String, enum: ["Full Time", "Part Time"]},
  campus: {type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},

  startDate: {type: Date, default: Date.now},
  endDate: {type: Date},
  programManager: {type: String, required: true},
  leadTeacher: {type: String, required: true},
  totalHours: {type: Number, default: 360}

});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;