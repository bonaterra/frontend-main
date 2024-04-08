import React from "react";
import { AdsHeaderProps } from "./AdsHeader.types";
import { Button } from "primereact/button";

const AdsHeader: React.FC<AdsHeaderProps> = ({
  onCreateAd
}) => {
  return (
   <>
    <Button 
      label="Nuevo anuncio"
      icon="pi pi-plus"
      raised
      onClick={onCreateAd}
      className="p-button-primary p-mr-2 w-full md:w-auto"
      />
   </>
  ) ;
};

export default AdsHeader;
