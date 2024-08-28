import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 
import { auth } from "../services/firebase";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate(); 
  const toast = useToast(); 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Conectado con éxito",
        description: "Has iniciado sesión correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/photos"); 
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: "Usuario no existe o contraseña incorrecta.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Conectado con Google",
        description: "Has iniciado sesión correctamente con Google.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/photos"); 
    } catch (error) {
      toast({
        title: "Error al iniciar sesión con Google",
        description:
          "Hubo un problema al iniciar sesión con Google. Por favor intenta nuevamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.50">
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        width={{ base: "90%", sm: "400px" }} 
      >
        <Image
          src="https://i.ibb.co/4RL86mk/Captura-de-pantalla-2024-08-28-a-la-s-4-23-47-p-m.png" 
          borderRadius="full"
          boxSize="100px"
          mx="auto"
          mb={4}
        />
        <Heading as="h2" size="lg" textAlign="center" color="orange.500" mb={6}>
          Iniciar Sesión
        </Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            variant="outline"
          />
          <Input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            variant="outline"
          />
          <Button onClick={handleLogin} colorScheme="orange" width="full">
            Iniciar Sesión
          </Button>
          <Button onClick={handleGoogleLogin} colorScheme="gray" width="full">
            Iniciar Sesión con Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default AuthForm;