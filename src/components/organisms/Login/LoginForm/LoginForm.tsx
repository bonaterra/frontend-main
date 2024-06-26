import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ILogin } from "../../../../models/ILogin";
import { login } from "../../../../services/auth.service";
import { setNotification } from "../../../../state/notificationSlice";
import { setUser } from "../../../../state/userSlice";
import { setLocalStorage } from "../../../../utils/localStorage";
import Input from "../../../atoms/Input/InputText";
import { LoginFormProps } from "./LoginForm.types";

const LoginForm: React.FC<LoginFormProps> = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues: ILogin = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values: ILogin) => {
    setLoading(true);
    login(values)
      .then((response) => {
        setLoading(true);
        setLocalStorage("user", response);
        dispatch(setUser(response));
        navigate("/invoices");
      })
      .catch((error) => {
        dispatch(
          setNotification({
            message: "Los datos ingresados son incorrectos",
            severity: "warn",
            summary: "Login error",
          })
        );
        console.log({ error });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form className="z-5 w-18rem md:w-full max-w-28rem">
          <Card
            className="border-1 border-round-3xl shadow-6"
            children={
              <div className="flex flex-column justify-content-center align-items-center gap-4 ">
                <img
                  alt="Card"
                  src="/public/logo.png"
                  style={{ width: "150px" }}
                />
                <p className="text-3xl m-0">Iniciar Sesion</p>

                <Input
                  name="username"
                  label="Usuario"
                  type="text"
                  size="small"
                  className="w-16rem md:w-20rem"
                  value={values.username}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.username}
                  error={errors.username}
                  required
                />

                <Input
                  name="password"
                  type="password"
                  label="Contraseña"
                  size="small"
                  className="w-16rem md:w-20rem"
                  value={values.password}
                  placeholder="Password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.password}
                  error={errors.password}
                  required
                />

                <Button
                  className="w-full max-w-20rem flex justify-content-center align-items-center"
                  size="small"
                  loading={loading}
                  type="submit"
                >
                  {!loading && "Iniciar Sesion"}
                </Button>
              </div>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
