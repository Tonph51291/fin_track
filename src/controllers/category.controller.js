const addCategory = (req, res) => {
  res.json({ message: "Add new category successfully" });
};

const getCategoriesByUser = (req, res) => {
  res.json({
    message: "Get all categories by user",
    userId: req.params.userId,
  });
};

const updateCategory = (req, res) => {
  res.json({ message: "Update category successfully", id: req.params.id });
};

const deleteCategory = (req, res) => {
  res.json({ message: "Delete category successfully", id: req.params.id });
};

module.exports = {
  addCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
};
