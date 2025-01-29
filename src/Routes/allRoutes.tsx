import { Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard";

// Auth
import Login from "pages/Authentication/login";
import Logout from "pages/Authentication/Logout";
import UserProfile from "pages/Authentication/user-profile";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import SignUp from "pages/Authentication/Register"
import Stock from "pages/VisoesBI/Stock";
import Revenue from "pages/VisoesBI/Revenue";
import Register from "pages/Register/Empresa";
import User from "pages/Register/Usuario";
import Seller from "pages/Register/Vendedores";
import BIShowcase from "pages/Showcase";
import TvModeConfig from "pages/TVMode/config";
import ProducaoChapas from "pages/VisoesBI/ProduçãoChapas";
import Estoque from "pages/VisoesBI/EstoquePorMaterialEClassificacao";
import VendasPorMaterial from "pages/VisoesBI/VendasPorVendedor";
import Meta from "pages/VisoesBI/Meta";
import VendasPorClassificacao from "pages/VisoesBI/VendasPorClassificacao";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/stock", component: <Stock /> },
  { path: "/revenue", component: <Revenue /> },
  { path: "/register/enterprise", component: <Register /> },
  { path: "/register/user", component: <User /> },
  { path: "/register/seller", component: <Seller /> },
  { path: "/tv-mode/config", component: <TvModeConfig /> },
  { path: "/producao", component: <ProducaoChapas /> },
  { path: "/vendas-by-vendedor", component: <VendasPorMaterial /> },
  { path: "/estoque-by-material-classificacao", component: <Estoque /> },
  { path: "/meta", component: <Meta /> },
  { path: "/vendas-por-classificacao", component: <VendasPorClassificacao /> },

  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/register", component: <SignUp /> }
]
export { authProtectedRoutes, publicRoutes };
