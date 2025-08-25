import {
	Box,
	Heading,
	HStack,
	IconButton,
	Image,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	VStack,
	Input,
	ModalFooter,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProducts } from "../hooks/products.js";
import { useRef, useState } from "react";

export default function ProductCard({ product }) {
	const textColor = useColorModeValue("gray.600", "gray.400");
	const backgroundColor = useColorModeValue("white", "gray.800");
	const { deleteProduct, updateProduct } = useProducts();
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const toast = useToast();
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();
	const cancelRef = useRef();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleUpdateProduct = async (id, updatedProduct) => {
		const { success, message } = await updateProduct(id, updatedProduct);
		console.log(success)
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

		onEditClose();
	};

	const handleDelete = async (id) => {
		const { success, message } = await deleteProduct(id);
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
		return success;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
	};

	const onConfirmDelete = async (id) => {
		try {
			setIsDeleting(true);
			const ok = await handleDelete(id);
			if (ok) onDeleteClose();
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={backgroundColor}>
			<Image
				src={product.image}
				alt={product.name}
				h={48}
				w="full"
				objectFit="cover"
				p={2}
				rounded={"1em"}
			/>

			<Box p={4}>
				<Heading as="h3" size="md" mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton
						aria-label="Edit product"
						fontSize={25}
						icon={<FaEdit />}
						colorScheme="blue"
						onClick={onEditOpen}
					/>
					<IconButton
						aria-label="Delete product"
						fontSize={25}
						icon={<MdDelete />}
						colorScheme="red"
						onClick={onDeleteOpen}
					/>
				</HStack>

				<AlertDialog
					isOpen={isDeleteOpen}
					leastDestructiveRef={cancelRef}
					onClose={isDeleting ? undefined : onDeleteClose}
					isCentered>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontSize="lg" fontWeight="bold">
								Delete Product
							</AlertDialogHeader>

							<AlertDialogBody>
								Are you sure you want to delete {product.name}?
								You can't undo this action afterwards.
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button
									ref={cancelRef}
									onClick={onDeleteClose}
									isDisabled={isDeleting}>
									Cancel
								</Button>
								<Button
									colorScheme="red"
									onClick={() => onConfirmDelete(product._id)}
									ml={3}
									isLoading={isDeleting}
									loadingText="Deleting">
									Delete
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			</Box>

			<Modal isOpen={isEditOpen} onClose={onEditClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={6}>
							<Input
								placeholder="Product Name"
								name="name"
								value={updatedProduct.name}
								onChange={handleChange}
							/>
							<Input
								placeholder="Price"
								name="price"
								type="number"
								value={updatedProduct.price}
								onChange={handleChange}
							/>
							<Input
								placeholder="Image URL"
								name="image"
								value={updatedProduct.image}
								onChange={handleChange}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() =>
								handleUpdateProduct(product._id, updatedProduct)
							}>
							Update
						</Button>
						<Button variant={"ghost"} onClick={onEditClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}
