const Categories = require("../models/Category");

// Create a new category
exports.create = async (req, res) => {
	try {
		const user_id = req.headers.user_id;
		const { name } = req.body;
		if (!name) {
			res.status(400).json({ error: "Name is required" });
		}

		const existingCategory = await Categories.findOne({ name });

		if (existingCategory) {
			res.status(400).json({ error: "Category already exists" });
		} else {
			const reqBody = { name: name, user_id: user_id };

			Categories.create(reqBody, (error, data) => {
				if (error) {
					res.status(400).json({ status: "fail", data: error });
				} else {
					res.status(200).json({ status: "Success", data: data });
				}
			});
		}
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};
  // Get a Category by ID
  exports.read = async (req, res) => {
	try {
	  const category = await Categories.findById(req.params.id);
	  // If the Category is not found, return a 404 error
	  if (!category) {
		return res.status(404).json({
		  success: false,
		  message: "Property not found",
		});
	  }
  
	  // Return the Category
	  res.status(200).json({
		success: true,
		message: "Category retrieved successfully",
		data: category,
	  });
	} catch (error) {
	  // If there's an error while retrieving the Category, return a 500 error
	  res.status(500).json({
		success: false,
		message: "Failed to retrieve Property",
		error: error.message,
	  });
	}
  };
  
// ! Update the Categories

exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		const query = { _id: id };
		const { name } = req.body;
		const reqBody = req.body;
		const existingCategory = await Categories.findOne({ name });

		if (existingCategory) {
			res.status(400).json({ error: "Category already exists" })
		}

		else {
			Categories.updateOne(query, reqBody, (error, data) => {
				if (error) {
					res.status(400).json({
						status: "Category Update Failed",
						data: error,
					});
				} else {
					res.status(200).json({
						status: "Category Update Successful",
						data: data,
					});
				}
			})
		}
		;
	} catch (error) {
		res.status(400).json({ error: " Category Update fail" });
	}
};

// ! Get categories

exports.list = async (req, res) => {
	try {
		const user_id = req.headers.user_id;
		const list = await Categories.find({ user_id: user_id });
		res.status(200).json(list);
	} catch (error) {
		res.status(400).json({ error: "No category list" });
	}
};

// ! Delete a category

exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		const query = { _id: id };
		const data = await Categories.deleteOne(query);
		if (data.deletedCount === 1) {
			res.status(200).json({ status: "Category Deleted Scuccessfully", data: data });
		} else {
			res.status(201).json({ status: "Category Not Found To Delete" })
		}

	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};