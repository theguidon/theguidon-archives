import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={GeneralLayout()}>
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

function GeneralLayout() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
export default App;
