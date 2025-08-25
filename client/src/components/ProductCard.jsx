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
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProducts } from "../hooks/products.js";
import { useRef, useState } from "react";

export default function ProductCard({ product }) {
	const textColor = useColorModeValue("gray.600", "gray.400");
	const backgroundColor = useColorModeValue("white", "gray.800");
	const { deleteProduct } = useProducts();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const [isDeleting, setIsDeleting] = useState(false);

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

	const onConfirmDelete = async (id) => {
		try {
			setIsDeleting(true);
			const ok = await handleDelete(id);
			if (ok) onClose();
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
					/>
					<IconButton
						aria-label="Delete product"
						fontSize={25}
						icon={<MdDelete />}
						colorScheme="red"
						onClick={onOpen}
					/>
				</HStack>

				<AlertDialog
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					onClose={isDeleting ? undefined : onClose}
					isCentered>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontSize="lg" fontWeight="bold">
								Delete Product
							</AlertDialogHeader>

							<AlertDialogBody>
								Are you sure you want to delete {product.name}? You can't undo this action
								afterwards.
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button
									ref={cancelRef}
									onClick={onClose}
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
		</Box>
	);
}
