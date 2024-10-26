import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import RequireAuth from "./components/RequireAuth.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RequireAuth />}>
                    <Route index element={<EditPage />} />
                    <Route path="list" element={<ListPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;
