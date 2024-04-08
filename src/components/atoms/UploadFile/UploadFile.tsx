import React from "react";
import { UploadFileProps } from "./UploadFile.types";
import { Button } from "primereact/button";
import Card from "../Card/Card";

const UploadFile: React.FC<UploadFileProps> = ({
  onUpload,
  fileName,
  onClear,
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const onChange = (e: any) => {
    const fileUploaded = e.target.files[0];
    setFile(fileUploaded);
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  const handleCancel = () => {
    setFile(null);
    onClear();
  };

  return (
    <Card className="shadow-5">
      <div className="flex flex-column card w-full gap-3">
        <Button
          type="button"
          className="w-full"
          label="Seleccionar foto"
          disabled={file !== null}
          icon="pi pi-upload"
          onClick={handleClick}
        />

        <div className="flex flex-column justify-content-center items-center gap-3">
          {!file && (
            <span className="text-center">No se ha seleccionado una foto</span>
          )}
          {file && (
            <>
              <span className="text-center">{file.name}</span>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="max-w-full max-h-12rem"
              />
              <div className="flex flex-row gap-2">
                <Button
                  type="button"
                  className="p-button-success w-full"
                  icon="pi pi-check"
                  disabled={!!fileName}
                  onClick={() => onUpload(file)}
                />
                <Button
                  type="button"
                  className="p-button-danger w-full"
                  icon="pi pi-times"
                  onClick={handleCancel}
                />
              </div>
            </>
          )}
        </div>

        <input
          id="fileInput"
          type="file"
          name="image"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </div>
    </Card>
  );
};

export default UploadFile;
