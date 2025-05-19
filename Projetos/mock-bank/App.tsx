import "./src/hooks/i18jn";
import Routes from "./src/navigation";
import { AuthProvider } from "./src/hooks/useAuth";

export default function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}