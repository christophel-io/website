import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Home } from "./pages/home/Home.tsx"
import { Services } from "./pages/services/Services.tsx"
import { References } from "./pages/references/References.tsx"
import { Contact } from "./pages/contact/Contact.tsx"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#2C3E50" />
        </Helmet>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route exact path="/" component={<Home />} />
            <Route path="/services" component={<Services />} />
            <Route path="/references" component={<References />} />
            <Route path="/contact" component={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
