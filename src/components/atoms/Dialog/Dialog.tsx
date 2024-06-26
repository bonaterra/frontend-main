import React from "react";
import { DialogProps } from "./Dialog.types";
import { Dialog as PiDialog } from "primereact/dialog";
import Card from "../Card/Card";
import { Button } from "primereact/button";

const Dialog: React.FC<DialogProps> = ({
  visible,
  title,
  footer,
  children,
  onHide,
  className,
}) => {
  const HeaderTemplate = () => {
    return (
      <div className="flex flex-row justify-content-evenly mx-3 align-items-center">
        <div className="flex flex-row w-full justify-content-start align-items-center">
          <p className="text-primary text-xl align-items-center">{title}</p>
        </div>
        <div className="flex flex-row justify-content-end">
          <Button
            className="p-button-secondary"
            text
            icon="pi pi-times"
            onClick={onHide}
          />
        </div>
      </div>
    );
  };

  return (
    <PiDialog
      modal={true}
      visible={visible}
      content={
        <Card header={<HeaderTemplate />} footer={footer} className={className}>
          {children}
        </Card>
      }
      onHide={onHide}
    ></PiDialog>
  );
};

export default Dialog;
