const { MongoClient, ObjectId } = require("mongodb");

const url =
  "mongodb+srv://Nico:nico123@cluster0.rdpm0.mongodb.net/?retryWrites=true&w=majority";
const DB = "test";

const conn = (dbToUse, cb) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, database) => {
    if (err) return console.log(err);
    else {
      db = database.db(dbToUse);
      cb();
    }
  });
};

exports.findAll = (req, res) => {
  conn(DB, (_) => {
    db.collection(req.params.collection)
      .find()
      .toArray((err, dbResult) => {
        if (err)
          res.status(400).json({
            ok: false,
            status: 400,
            httpStatus: 400,
            err,
          });
        else
          res.status(200).json({
            ok: true,
            status: 200,
            httpStatus: 200,
            dbResult,
          });
      });
  });
};

exports.insert = async (req, res) => {
  if (typeof req.body === "string") req.body = JSON.parse(req.body);
  conn(DB, (_) => {
    db.collection(req.params.collection).insert(
      req.body,
      async (err, dbResult) => {
        if (res) {
          if (err)
            res.status(400).json({
              ok: false,
              status: 400,
              httpStatus: 400,
              err,
              result: "error",
            });
          else {
            res.status(200).json({
              ok: true,
              status: 200,
              httpStatus: 200,
              dbResult,
              result: "success",
            });
          }
        }
      }
    );
  });
};

// exports.delete = (req, res) => {
//   conn(DB, (_) => {
//     db.collection(req.params.collection).deleteOne(
//       { _id: req.params._id },
//       (err, dbResult) => {
//         console.log(dbResult);
//         if (err)
//           res.status(400).json({
//             ok: false,
//             status: 400,
//             httpStatus: 400,
//             err,
//           });
//         else
//           res.status(200).json({
//             ok: true,
//             status: 200,
//             httpStatus: 200,
//             dbResult,
//           });
//       }
//     );
//   });
// };

exports.delete = (req, res) => {
  console.log(req.params.name);
  conn(DB, (_) => {
    const productoDelete = db
      .collection(req.params.collection)
      .deleteOne({ usuario: req.params.name });
    console.log(req.params.collection);
    res.send(productoDelete);
  });
};
