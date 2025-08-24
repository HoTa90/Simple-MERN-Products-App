import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProducts } from "../hooks/products.js";

export default function CreatePage() {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const { createProduct } = useProducts();
	const toast = useToast();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);

		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}

		setNewProduct({ name: "", price: "", image: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>
				<Box
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					p={6}
					rounded={"lg"}
					boxShadow={useColorModeValue(
						"0 0 1em 0 rgb(0, 0 ,0, 0.5)",
						"0 0 1em 0 rgb(255, 255 ,255, 0.5)"
					)}>
					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={handleChange}
						/>
						<Input
							placeholder="Price"
							name="price"
							value={newProduct.price}
							onChange={handleChange}
						/>
						<Input
							placeholder="Image URL"
							name="image"
							value={newProduct.image}
							onChange={handleChange}
						/>
						<Button
							colorScheme="blue"
							onClick={handleAddProduct}
							w={"full"}
							fontSize={24}>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
}
