import { BrowserRouter as Router, useRoutes } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Home } from "./pages/home/Home"
import { Contact } from "./pages/contact/Contact"

const routes = [
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> }
];

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
