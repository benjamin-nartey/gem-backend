const Visitor = require("../models/visitorModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllVisitors = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Visitor.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const visitors = await features.query;

  res.status(200).json({
    status: "succes",
    results: visitors.length,
    data: {
      visitors,
    },
  });
});

exports.getVisitor = catchAsync(async (req, res, next) => {
  const visitor = await Visitor.findById(req.params.id);

  if (!visitor) {
    return next(new AppError("No visitor found for this ID", 404));
  }

  res.status(200).json({
    status: "succes",
    data: {
      visitor,
    },
  });
});

exports.createVisitor = catchAsync(async (req, res, next) => {
  const newVisitor = await Visitor.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      visitor: newVisitor,
    },
  });
});

exports.updateVisitor = catchAsync(async (req, res, next) => {
  const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!visitor) {
    return next(new AppError("No visitor found for this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      visitor,
    },
  });
});

exports.deleteVisitor = catchAsync(async (req, res, next) => {
  const visitor = await Visitor.findByIdAndDelete(req.params.id);

  if (!visitor) {
    return next(new AppError("No visitor found for this ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

exports.getVisitorsByMonth = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const stats = await Visitor.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        numVisitors: { $sum: 1 },
        visitors: {
          $push: {
            name: "$name",
            phone: "$phone",
            residence: "$residence",
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const formattedStats = stats.map((stat) => ({
    month: monthNames[stat._id - 1],
    numVisitors: stat.numVisitors,
    visitors: stat.visitors,
  }));

  res.status(200).json({
    status: "success",
    data: {
      stats: formattedStats,
    },
  });
});

exports.getVisitorsStats = catchAsync(async (req, res, next) => {
  const stats = await Visitor.aggregate([
    {
      $group: {
        _id: "$residence",
        numVisitors: { $sum: 1 },
        visitors: {
          $push: {
            name: "$name",
            phone: "$phone",
            residence: "$residence",
          },
        },
      },
    },
    {
      $sort: { numVisitors: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
// exports.getVisitorsStats = async (req, res) => {
//   try {
//     const stats = await Visitor.aggregate([
//       {
//         $group: {
//           _id: "$residence",
//           numVisitors: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { numVisitors: -1 },
//       },
//     ]);

//     res.status(200).json({
//       status: "success",
//       data: {
//         stats,
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: "fail",
//       message: error,
//     });
//   }
// };
