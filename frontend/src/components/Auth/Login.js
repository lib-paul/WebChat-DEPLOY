import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();
  const { setUser } = ChatState();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Porfavor rellenar los campos",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login correcto",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history("/chats");
    } catch (error) {
      toast({
        title: "Ocurrio un error",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    // Formulario para el registro
    <VStack spacing={"5px"}>
      {/* Input para el email  */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Ingrese su email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Campo para la contraseña */}
      <FormControl id="password" isRequired>
        <FormLabel>Contraseña</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Ingrese su contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4rem"} paddingRight={"5px"}>
            <Button height={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Ocultar" : "Mostrar"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Iniciar Sesión
      </Button>
    </VStack>
  );
};

export default Login;
