import {createBrowserRouter, RouterProvider} from "react-router-dom";
import{
  Root,
  NotFound,
  Login,
  Register,
  MyRoutine,
  Home,
  Routine,
  Activity
} from "./pages"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "myRoutine",
        element: <MyRoutine />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path:"routine",
        element: <Routine />
      },
      {
        path:"activity",
        element: <Activity/>
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
