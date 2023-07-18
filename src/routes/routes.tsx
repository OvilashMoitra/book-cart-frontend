import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AllBooks from "../pages/AllBooks";
import AddBooks from "../pages/AddBooks";
import BookDetails from "../pages/BookDetails";
import EditBook from "../pages/EditBook";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/books",
      element: <AllBooks/>,
    },
    {
      path: "/book/:id",
      element: <BookDetails/>,
    },
    {
      path: "/addBooks",
      element: <AddBooks/>,
    },
    {
      path: "/editBook/:id",
      element: <EditBook/>,
    },
  ]);
  