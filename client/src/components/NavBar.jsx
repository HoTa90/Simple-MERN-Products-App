import {
	Button,
	Container,
	Flex,
	HStack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { FaPlusSquare } from "react-icons/fa";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

import { Link } from "react-router";

export default function NavBar() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}>
				<Text
					bgGradient="linear(to-l, #7928CA, #FF0080)"
					bgClip="text"
					fontSize={{ base: "22", sm: "28" }}
					fontWeight="bold"
					textAlign={"cent"}>
					<Link to={"/"}>Product Store</Link>
				</Text>
				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<FaPlusSquare fontSize={22} />
						</Button>
					</Link>
					<Button fontSize={22} onClick={toggleColorMode}>
						{colorMode === "light" ? (
							<IoMoonSharp />
						) : (
							<IoSunnySharp />
						)}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
}
