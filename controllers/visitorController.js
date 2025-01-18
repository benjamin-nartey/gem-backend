const Visitor = require("../models/visitorModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllVisitors = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    res.status(200).json({
      status: "succes",
      data: {
        visitor,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createVisitor = async (req, res) => {
  try {
    const newVisitor = await Visitor.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        visitor: newVisitor,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        visitor,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteVisitor = async (req, res) => {
  try {
    await Visitor.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
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

exports.getVisitorsByMonth = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getVisitorsStats = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
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
