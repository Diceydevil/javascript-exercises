import App from "./App";
import Pokemon from "./components/Pokemon";
import Collection from "./components/Collection";
import ProjectsList from "./components/ProjectsList";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "projects", element: <ProjectsList /> },
      { path: "pokemon", element: <Pokemon /> },
      { path: "collection", element: <Collection /> },
    ],
  },
];

export default routes;
