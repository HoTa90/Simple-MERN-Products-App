import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CreatePage() {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddProduct = () => {
		console.log(newProduct);
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>
				<Box
					w={"full"}
					bg={useColorModeValue("white", "gray.900")}
					p={6}
					rounded={"lg"}
					shadow={"md"}>
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
