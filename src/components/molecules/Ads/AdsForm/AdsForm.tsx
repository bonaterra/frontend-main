import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { IAds } from "../../../../models/IAds";
import { uploadImage } from "../../../../services/image.service";
import { setNotification } from "../../../../state/notificationSlice";
import { FormFieldOptions } from "../../../../types/form";
import Input from "../../../atoms/Input/InputText";
import Select from "../../../atoms/Select/Select";
import UploadFile from "../../../atoms/UploadFile/UploadFile";
import FormControl from "../../../atoms/inputContainer/inputContainer";
import { AdsFormProps } from "./AdsForm.types";

const AdsForm: React.FC<AdsFormProps> = ({ ad, onSubmit, onCancel }) => {
  const inputClassName = "my-3 col-12";
  const dynanicFormClassName = `formgrid grid`;
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [imagePath, setImagePath] = React.useState<string>("");

  const imageType: FormFieldOptions[] = [
    { label: "Estatica", value: "STATIC" },
    { label: "Dinamica", value: "DYNAMIC" },
  ];

  const initialValues: IAds = {
    id: ad?.id || 0,
    title: ad?.title || "",
    startAt: ad?.startAt || new Date().toISOString(),
    endAt: ad?.endAt || new Date().toISOString(),
    type: ad?.type || "STATIC",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("El titulo es requerido"),
    startAt: Yup.date().required("La fecha de inicio es requerida"),
    endAt: Yup.date().required("La fecha de finalizacion es requerida"),
  });

  const handleUpload = (file: File) => {
    if (!file)
      return dispatch(
        setNotification({
          severity: "error",
          summary: "Error",
          message: "No se ha seleccionado una imagen",
        })
      );
    setLoading(true);
    uploadImage(file)
      .then((response) => {
        console.log(response);
        setImagePath(response.fileName);
        dispatch(
          setNotification({
            severity: "success",
            summary: "Exito",
            message: "Imagen subida correctamente",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          setNotification({
            severity: "error",
            summary: "Error",
            message: "No se ha podido subir la imagen",
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit({ ...values, image: imagePath })}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
        <Form className={dynanicFormClassName}>
          <Input
            name="title"
            label="Titulo"
            type="text"
            value={values.title}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.title}
            touched={touched.title}
            className={inputClassName}
          />

          <FormControl
            name="startAt"
            label="Fecha de inicio"
            error={errors.startAt}
            touched={touched.startAt}
            className={inputClassName}
          >
            <Calendar
              name="startAt"
              value={new Date(values.startAt)}
              onChange={handleChange}
              onBlur={handleBlur}
              showIcon={true}
              className="w-full"
            />
          </FormControl>

          <FormControl
            name="endAt"
            label="Fecha de finalizacion"
            error={errors.endAt}
            touched={touched.endAt}
            className={inputClassName}
          >
            <Calendar
              name="endAt"
              value={new Date(values.endAt)}
              onChange={handleChange}
              onBlur={handleBlur}
              showIcon={true}
              className="w-full"
            />
          </FormControl>

          <Select
            name="type"
            label="Tipo"
            options={imageType}
            value={values.type}
            handleChange={handleChange}
            optionLabel="label"
            optionValue="value"
            handleBlur={handleBlur}
            error={errors.type}
            touched={touched.type}
            className={inputClassName}
          />

          <div className={inputClassName}>
            <UploadFile
              fileName={imagePath}
              onUpload={(file) => {
                handleChange({
                  target: { name: "image", value: file.name },
                });
                handleUpload(file);
              }}
              onClear={() => setImagePath("")}
            />
          </div>

          <Button
            label="Guardar"
            type="submit"
            className="p-button-primary flex-1 mx-2"
            disabled={
              ad.id > 0 ? !isValid || loading : !isValid || loading || !imagePath
              
            }
          />

          <Button
            label="Cancelar"
            onClick={onCancel}
            type="button"
            className="p-button-danger flex-1 mx-2"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AdsForm;
