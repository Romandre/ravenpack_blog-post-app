import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./DataProvider";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";

function App() {
  return (
    <Router>
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/post/:postId" element={<Post />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
