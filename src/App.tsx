import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Table from "./pages/Table/Table";
import MainLayout from "./components/MainLayout/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="table" element={<Table />} />
    </Route>
  )
);

function App() {

  return (
    <>
      <Header />
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </>
  )
}

export default App
