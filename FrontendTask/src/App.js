import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import TaskList from "./components/TaskList";

export default function App() {
  const { isLoggedIn } = useSelector((s) => s.auth);

  return <>
  {isLoggedIn ? <TaskList /> : <Auth />}</>;
}
