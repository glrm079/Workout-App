import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Navbar } from "./components/Navbar";

export default function App() {
  return <MantineProvider>{<Navbar />}</MantineProvider>;
}
