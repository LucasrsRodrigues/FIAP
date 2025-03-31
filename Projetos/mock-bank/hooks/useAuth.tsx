import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface IUsuarioProps {
    apelido: string;
    cpf: string;
    createdAt: string;
    dataNascimento: string | null;
    email: string | null;
    endereco: string | null;
    id:number;
    nome: string;
    saldo:number;
    telefone: string | null;
    tipoConta: string;
    updatedAt: string;
}

interface IAuthContextProps {
    token: string;
    handleLogin: (apelido: string, senha: string) => void;
    handleLogout: () => void;
    usuario: IUsuarioProps;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextProps);

function AuthProvider({ children }: IAuthProviderProps) {
    const [token, setToken] = useState("");
    const [usuario, setUsuario] = useState({} as IUsuarioProps);

    const router = useRouter();

    async function getToken() {
        const token = await AsyncStorage.getItem("@token");

        if (token === null || token === undefined) {
            router.push("/(auth)/Login");
            return;
        }

        setToken(token);
    }

    async function handleLogin(apelido: string, senha: string) {
        try {
            if (apelido.trim() === '' || senha.trim() === '') {
                Alert.alert('Erro', 'Por favor, preencha todos os campos');
                return;
            }

            // Aqui você implementaria a lógica de autenticação
            const datToSend = {
                apelido,
                senha,
            }

            const response = await
                fetch("https://mock-bank-mock-back.yexuz7.easypanel.host/auth/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(datToSend)
                });

            if (!response.ok) {
                const dataError = await response.json();

                throw new Error(dataError?.message);
            }

            const data = await response.json();

            await AsyncStorage.setItem("@token", data.token);
            await getProfileInfo();
            router.push("/(authenticated)/Dashboard");
        } catch (error) {
            Alert.alert(error?.message);
        }
    }

    async function handleLogout() {
        await AsyncStorage.removeItem("@token");
        router.push("/(auth)/Login");
    }

    async function getProfileInfo() {
        try {

            const response = await
                fetch("https://mock-bank-mock-back.yexuz7.easypanel.host/contas/perfil", {
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                });

            const data = await response.json();

            setUsuario(data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, handleLogin, handleLogout, usuario }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within as AuthProvider");
    }


    return context;
}

export {
    AuthProvider,
    useAuth
}