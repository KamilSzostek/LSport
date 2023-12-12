import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Table from "./pages/Table/Table";


function App() {

  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/page/:pageNumber" element={<Home/>}/>
          </Route>
          <Route path="/table" element={<Table />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
