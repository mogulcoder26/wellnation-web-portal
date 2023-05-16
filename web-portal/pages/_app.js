import "@/styles/globals.css";
import React from "react";
import Layout from "@/components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import SocketProvider from "@/providers/Socket.provider";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const queryClient = new QueryClient();
	const [mode, setMode] = React.useState("light");
	const theme = createTheme({
		palette: {
			mode: mode,
		},
	});

	React.useEffect(() => {
		if (localStorage.getItem("dId")) {
			router.push(`/doctors/${localStorage.getItem("dId")}`);
		} else if (localStorage.getItem("hId")) {
			router.push("/");
		}
	}, []);

	return (
		<>
			<Head>
				<title>Hospital Portal</title>
				<meta
					name="description"
					content="WellNation is a portal for hospitals to list 
          their services and manage doctor timings and appointments 
          of patients. It also helps hospitals keep a medical record 
          of patients and provide them with personalized care."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<QueryClientProvider client={queryClient}>
					<SocketProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</SocketProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</>
	);
}
