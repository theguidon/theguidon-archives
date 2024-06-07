import { useSelector } from "react-redux";
import "./index.css";

function AlertBar() {
  const active = useSelector((state) => state.alertBar.active);
  const text = useSelector((state) => state.alertBar.text);

  return (
    <div id="alert-bar" className={active ? "active" : ""}>
      {text}
    </div>
  );
}

export default AlertBar;
