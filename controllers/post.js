exports.getPost = (req, res, next) => {
  res.status(200).json([
    { id: 1, title: "First Post", description: "First Post's Description" },
    { id: 2, title: "Second Post", description: "Second Post's Description" },
  ]);
};

exports.createPost = (req, res, next) => {
  res.status(201).json([
    {
      message: "Post has been created",
      data: req.body,
    },
  ]);
};
