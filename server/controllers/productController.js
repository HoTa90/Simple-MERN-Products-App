import mongoose from "mongoose";
import Product from "../models/Products.js";

export default {
	getAll: async (req, res) => {
		try {
			const products = await Product.find({});
			res.status(200).json({ sucess: true, data: products });
		} catch (err) {
			console.log("Error fetching products", err.message);
			res.status(500).json({ sucess: false, message: "Server Error" });
		}
	},
	createProduct: async (req, res) => {
		const { name, price, image } = req.body;

		if (!name || !price || !image) {
			return res
				.status(400)
				.json({ success: false, message: "Please fill all fields" });
		}

		const newProduct = new Product({ name, price: Number(price), image });

		try {
			await newProduct.save();
			res.status(201).json({ success: true, data: newProduct });
		} catch (err) {
			console.error("Error creating producst:", err.message);
			res.status(500).json({ success: false, message: "Server Error" });
		}
	},
	updateProduct: async (req, res) => {
		const { id } = req.params;
		const { name, price, image } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(404)
				.json({ success: false, message: "Producst id not found" });
		}

		try {
			const updatedProduct = await Product.findByIdAndUpdate(
				id,
				{ name, price, image },
				{ new: true }
			);
			res.status(200).json({
				success: true,
				data: updatedProduct,
				message: "Product Updated",
			});
		} catch (err) {
			console.log("Error:", err.message);
			res.status(500).json({ sucess: false, message: "Server Error" });
		}
	},

	deleteProduct: async (req, res) => {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(404)
				.json({ success: false, message: "Producst id not found" });
		}

		try {
			await Product.findByIdAndDelete(id);
			res.status(200).json({ success: true, message: "Product deleted" });
		} catch (err) {
			console.log(
				`Error deleting producst with id: ${id}`,
				"Error:",
				err.message
			);
			res.status(500).json({
				success: false,
				message: "Server ERROR",
			});
		}
	},
};
