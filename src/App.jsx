import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "./firebase";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Player = lazy(() => import("./pages/Player/Player"));
const Search = lazy(() => import("./pages/Search/Search"));
const Browse = lazy(() => import("./pages/Browse/Browse"));

// SEO-friendly content pages (INDEXABLE)
const MovieReview = lazy(() => import("./pages/MovieReview/MovieReview"));
const CastPage = lazy(() => import("./pages/CastPage/CastPage"));
const EndingExplained = lazy(() => import("./pages/EndingExplained/EndingExplained"));
const SimilarContent = lazy(() => import("./pages/SimilarContent/SimilarContent"));

// Loading component
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: '#000',
    color: '#fff',
    fontSize: '24px'
  }}>
    Loading...
  </div>
);

const App = () => {
  const navigate = useNavigate();
  
  // Removed authentication requirement - users can browse without logging in
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       console.log("Logged In");
  //       navigate("/");
  //     } else {
  //       console.log("Logged Out");
  //       navigate("/login");
  //     }
  //   });
  // }, []);
  
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/browse/:type" element={<Browse />} />
          
          {/* Player Routes (NOINDEX - Not for search engines) */}
          <Route path="/player/:id" element={<Player />} />
          <Route path="/player/:type/:id" element={<Player />} />
          
          {/* SEO-Friendly Content Pages (INDEXABLE) */}
          {/* Movie Routes */}
          <Route path="/movie/:slug/review" element={<MovieReview />} />
          <Route path="/movie/:slug/cast" element={<CastPage />} />
          <Route path="/movie/:slug/ending-explained" element={<EndingExplained />} />
          <Route path="/movie/:slug/similar" element={<SimilarContent />} />
          
          {/* TV Series Routes */}
          <Route path="/series/:slug/review" element={<MovieReview />} />
          <Route path="/series/:slug/cast" element={<CastPage />} />
          <Route path="/series/:slug/ending-explained" element={<EndingExplained />} />
          <Route path="/series/:slug/similar" element={<SimilarContent />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
