import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("#e6e6ebff", "#10042cff")}>
			<NavBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/create" element={<CreatePage />} />
			</Routes>
		</Box>
	);
}

export default App;
