import { Routes, Route, NavLink } from "react-router";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import Kpop from "./pages/Kpop";
import Coffee from "./pages/Coffee";

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-1.5 text-sm ${
    isActive 
      ? "bg-sky-300 font-semibold text-slate-900"
      : "border border-slate-600 text-slate-300 hover:border-sky-300"
  }`;
  
function App () {
  return (
    <div className="min-h-screen bg-slate-900 n-6 text-white">
      <header className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-sky-300"> Fan Hub </h1>
        <nav className="mt-4 flex flex-wrap justify-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/anime" className={linkClass}>
            Anime
          </NavLink>
          <NavLink to="/kpop" className={linkClass}>
            Kpop
          </NavLink>
          <NavLink to="/coffee" className={linkClass}>
            Coffee
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto mt-8 max-w-4xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/kpop" element={<Kpop />} />
          <Route path="/coffee" element={<Coffee />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;