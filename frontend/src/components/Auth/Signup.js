import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

//CONEXIÓN CON LA API
const Signup = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {};

  const submitHandler = async () => {
    console.log(name, email, password, confirmpassword);
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Porfavor rellenar todos los campos requeridos *",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Las contraseñas no coinciden",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registro correcto",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history("/chats");
    } catch (error) {
      toast({
        title: "Ocurrio un error!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  // Formulario para el registro (INTERFAZ)
  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Ingrese su nombre"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      {/* Campo para reingresar la contraseña */}
      <FormControl id="password" isRequired>
        <FormLabel>Confirme contraseña</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirme su contraseña"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width={"4rem"} paddingRight={"5px"}>
            <Button height={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Ocultar" : "Mostrar"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Sube tu foto</FormLabel>
        <Input
          type="file"
          p={"1.5"}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>

      <Button
        colorScheme="yellow"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Registrarse
      </Button>
    </VStack>
  );
};

export default Signup;
