import fruitRouter from "./fruits.router.js";
import usersRouter from "./users.router.js";
import postRouter from "./posts.router.js";
// bulk routing
const routes = [
  {
    path: "/fruits",
    router: fruitRouter,
  },
  {
    path: "/users",
    router: usersRouter,
  },
  {
    path: "/posts",
    router: postRouter,
  },
];

export default routes;
