const fs = require("fs");

const visitors = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/visitors.json`)
);

exports.getAllVisitors = (req, res) => {
  res.status(200).json({
    status: "succes",
    results: visitors.length,
    data: {
      visitors,
    },
  });
};

exports.getVisitor = (req, res) => {
  const visitor = visitors.find(
    (visitor) => visitor.id === Number(req.params.id)
  );

  if (!visitor) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "succes",
    data: {
      visitor,
    },
  });
};

exports.createVisitor = (req, res) => {
  const newId = visitors[visitors.length - 1].id + 1;
  const newVisitor = Object.assign({ id: newId }, req.body);

  visitors.push(newVisitor);

  fs.writeFile(
    `${__dirname}/data/visitors.json`,
    JSON.stringify(visitors),
    () => {
      res.status(201).json({
        status: "success",
        data: {
          visitor: newVisitor,
        },
      });
    }
  );
};

exports.updateVisitor = (req, res) => {
  if (req.params.id >= visitors.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      visitor: "<Updated visitor here...>",
    },
  });
};

exports.deleteVisitor = (req, res) => {
  if (req.params.id >= visitors.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
