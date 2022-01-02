const mongoose = require('mongoose');

const allpostsSchema = new mongoose.Schema(
  {
    inventory: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    provenance: {
      type: String,
      trim: true,
    },
    editiondata: {
      type: String,
      trim: true,
    },
    acquisition: {
      type: String,
      trim: true,
    },
    bookform: {
      type: String,
      trim: true,
    },
    fragment: {
      type: String,
      trim: true,
    },
    dimension: {
      type: String,
      trim: true,
    },
    cartonnage: {
      type: String,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    papyrusId: {
      type: String,
      trim: true,
    },
    editionName: {
      type: String,
      trim: true,
    },
    inventoryNumber: {
      type: String,
      trim: true,
    },
    LDAB: {
      type: String,
      trim: true,
    },
    TM: {
      type: String,
      trim: true,
    },
    MP3: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    recto: {
      type: String,
      trim: true,
    },
    reused: {
      type: String,
      trim: true,
    },
    columns: {
      type: String,
      trim: true,
    },
    upperMargin: {
      type: String,
      trim: true,
    },
    lowerMargin: {
      type: String,
      trim: true,
    },
    objectiveElements: {
      type: String,
      trim: true,
    },
    scriptDescription: {
      type: String,
      trim: true,
    },
    philologicalFeatures: {
      type: String,
      trim: true,
    },
    bibliography: {
      type: String,
      trim: true,
    },
    corrections: {
      type: String,
      trim: true,
    },
    paratextualFeatures: {
      type: String,
      trim: true,
    },
    signs: {
      type: String,
      trim: true,
    },
    annotations: {
      type: String,
      trim: true,
    },
    archiveDossier: {
      type: String,
      trim: true,
    },
    possibleReconstructions: {
      type: String,
      trim: true,
    },
    noteDate: {
      type: String,
      trim: true,
    },
    noteONPA: {
      type: String,
      trim: true,
    },
    intercolumnspace:{
      type: String,
      trim: true,
    },
    linespercolumn:{
      type: String,
      trim: true,
    },
    numberoffolios:{
      type: String,
      trim: true,
    },
    externalMargin:{
      type: String,
      trim: true,
    },
    innerMargin:{
      type: String,
      trim: true,
    },
    lateralMargin:{
      type: String,
      trim: true,
    },
    number:{
      type: Number
    },
    PN:{
      type: String,
      trim: true,
    },
    work:{
      type: String,
      trim: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('Allpost', allpostsSchema);
