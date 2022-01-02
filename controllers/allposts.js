const Allposts = require('../models/allposts');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    let allposts = new Allposts(fields);

    if (files.photo) {
      allposts.photo.data = fs.readFileSync(files.photo.path);
      allposts.photo.contentType = files.photo.type;
    }

    allposts.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.allpostsById = (req, res, next, id) => {
  Allposts.findById(id).exec((err, allposts) => {
    if (err || !allposts) {
      return res.status(400).json({
        error: 'allposts not found',
      });
    }
    req.allposts = allposts;
    next();
  });
};

exports.read = (req, res) => {
  req.allposts.photo = undefined;
  return res.json(req.allposts);
};

exports.photo = (req, res, next) => {
  if (req.allposts.photo.data) {
    res.set('Content-Type', req.allposts.photo.contentType);
    return res.send(req.allposts.photo.data);
  }
  next();
};

exports.remove = (req, res) => {
  let allposts = req.allposts;
  allposts.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'post is deleted',
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    let allposts = req.allposts;
    allposts = _.extend(allposts, fields);

    if (files.photo) {
      allposts.photo.data = fs.readFileSync(files.photo.path);
      allposts.photo.contentType = files.photo.type;
    }

    allposts.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.list = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  // let page = req.body.limit;

  await Allposts.find()
    .select('-photo')
    .sort([[sortBy, order]])
    // .limit(page)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.allpostsCount = async (req, res) => {
  let total = await Allposts.find({}).estimatedDocumentCount().exec();
  res.json(total);
};


const handleQuery = async (req, res, query) => {
  const { inventory, author, genre, provenance, material, acquisition, bookform, fragment, 
    dataGt, dataLt, dimension, cartonnage ,TM,inventoryNumber} = query;
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "papyrusId";
    let perPage=10;
    let page=req.body.page;
    if(!page){
      page=1;
    }
  /*if (dataGt || dataLt !== 0) {
    const allposts = await Allposts.find({
      $or: [
        { $and: [{ inventory: { $eq: inventory, $exists: true, $ne: null } }] },
        { $and: [{ author: { $eq: author, $exists: true, $ne: null } }] },
        { $and: [{ genre: { $eq: genre, $exists: true, $ne: null } }] },
        { $and: [{ provenance: { $eq: provenance, $exists: true, $ne: null } }] },
        { $and: [{ editiondata: { $gte: dataGt, $lte: (dataLt < 1 ? 100000 : dataLt), $exists: true, $ne: null } }] },
        { $and: [{ material: { $eq: material, $exists: true, $ne: null } }] },
        { $and: [{ acquisition: { $eq: acquisition, $exists: true, $ne: null } }] },
        { $and: [{ bookform: { $eq: bookform, $exists: true, $ne: null } }] },
        { $and: [{ fragment: { $eq: fragment, $exists: true, $ne: null } }] },
      ]
    })
      .select('-photo')
      .exec();

    res.json(allposts);
  } else*/
   if(dataGt==0&&dataLt==0 && inventory===""&&bookform===""
  &&genre===""&&provenance===""
  && material===""&&acquisition===""&&TM==0&&inventoryNumber===""){
    console.log("test log");
    const allposts = await Allposts.find()
      .select('-photo')
      .sort([[sortBy, order]])
      .limit(perPage)
      .skip(perPage * (page-1))
      .exec();

    //res.json(pagination(allposts,page));
    console.log("all***"+allposts);
    pagination(allposts,page,res)
  }else{
    console.log("test log final");
  var q = {}; // declare the query object
  q['$and']=[]; // filter the search by any criteria given by the user
  if(inventory!=""&&inventory!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ inventory: { $eq: inventory}}, { inventory: {$exists: true}}]}); // add to the query object
  }
  if(author!=""&&author!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ author: { $eq: author}}, { author: {$exists: true}}]});// add to the query object
  }
  if(genre!=""&&genre!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ genre: { $eq: genre}}, { genre: {$exists: true}}]});// add to the query object
  }
  if(provenance!=""&&provenance!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ provenance: { $eq: provenance}}, { provenance: {$exists: true}}]}); // add to the query object
  }
  if(material!=""&&material!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ material: { $eq: material}}, { material: {$exists: true}}]});// add to the query object
  }
  if(acquisition!=""&&acquisition!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ acquisition: { $eq: acquisition}}, { acquisition: {$exists: true}}]});// add to the query object
  }
  if(bookform!=""&&bookform!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ bookform: { $eq: bookform}}, { bookform: {$exists: true}}]}); // add to the query object
  }
  if(fragment!=""&&fragment!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ fragment: { $eq: fragment}}, { fragment: {$exists: true}}]});// add to the query object
  }
  if(TM!=""&&TM!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ TM: { $eq: TM}}, { TM: {$exists: true}}]});// add to the query object
  }
  if(inventoryNumber!=""&&inventoryNumber!=null){ // if the criteria has a value or values
    q["$and"].push( { $and: [{ inventoryNumber: { $eq: inventoryNumber}}, { inventoryNumber: {$exists: true}}]});// add to the query object
  }
  if(dataGt!=0&&dataLt!=0){
    q["$and"].push(  { $and: [{ editiondata: { $gte: dataGt, $lte: (dataLt < 1 ? 100000 : dataLt), $exists: true } }] },)
  }

  console.log("query q::"+JSON.stringify(q));
  const allposts = await Allposts.find(q).select("-photo")
  .limit(perPage)
  .skip(perPage * (page-1))
  .exec();

    //res.json(pagination(allposts,page));
    //console.log(pagination(allposts,page));
    pagination(allposts,page,res,q)
  }
}

function pagination( data,page,res,q) {
  Allposts.find(q).count().exec(function(err, count) {
    console.log("count***"+count)
    //console.log("res obj"+JSON.stringify(res));
    if(res!=undefined){
     res.json( {
          data: data,
          page: page,
          pages: Math.round(count / 10)
      });
    }else{
      res.json([]);
    }
  })
}
exports.searchFilters = async (req, res) => {
  // console.log(req.body);
  if (req.body) {
    await handleQuery(req, res, req.body);
  }
}

exports.inventoryNumber= async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "inventoryNumber";
  // let page = req.body.limit;

  await Allposts.find()
    .select('inventoryNumber').distinct( "inventoryNumber" )

    .where("inventoryNumber").ne(null)
    //.sort([[sortBy, order]])
    // .limit(page)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.searchposts= async (req, res) => {
  if (req.body) {
    await handleQueryForSeachPosts(req, res, req.body);
  }
};

const handleQueryForSeachPosts = async (req, res, query) => {
  //const { inputvalue} = query;
  let json=JSON.stringify(query);
  var objectValue = JSON.parse(json);
       const inputvalue=objectValue['val'];
console.log("body"+JSON.stringify(inputvalue));
let order = req.query.order ? req.query.order : "asc";
let sortBy = req.query.sortBy ? req.query.sortBy : "papyrusId";
   if(inputvalue==""){
    console.log("test log");
    const allposts = await Allposts.find()
      .select('-photo')
      .sort([[sortBy, order]])
      .exec();

    res.json(allposts);
  }else{
    console.log("test log final*************"+inputvalue);
  var q = {}; // declare the query object
  q['$or']=[]; // filter the search by any criteria given by the user
   // q["$and"].push( { $or: [{ inventory: { $eq: inputvalue}}, { inventory: {$exists: true}}]}); // add to the query object
      q["$or"].push( { $or: [{ inventoryNumber: { $eq: inputvalue}}]});// add to the query object
      q["$or"].push( { $or: [{ inventory:{ $regex: '.*' + inputvalue + '.*' }}]});
      q["$or"].push( { $or: [{ author: { $eq: inputvalue}}]});
      q["$or"].push( { $or: [{ genre: { $eq: inputvalue}}]});
      q["$or"].push( { $or: [{ provenance: { $eq: inputvalue}}]});
      q["$or"].push( { $or: [{ bookform: { $eq: inputvalue}}]});
      q["$or"].push( { $or: [{ fragment: { $eq: inputvalue}}]});
      q["$or"].push( { $or: [{ TM: { $eq: inputvalue}}]});
      q["$or"].push({$or:[{papyrusId:{ $regex: '.*' + inputvalue + '.*' }}]});
      
 

  console.log("query q::"+JSON.stringify(q));
  const allposts = await Allposts.find(q).select("-photo").exec();

    res.json(allposts);
  }
}