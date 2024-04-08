import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Dialog from "../../components/atoms/Dialog/Dialog";
import Layout from "../../components/layout/Layout";
import AdsForm from "../../components/molecules/Ads/AdsForm/AdsForm";
import AdsHeader from "../../components/molecules/Ads/AdsHeader/AdsHeader";
import AdsTable from "../../components/molecules/Ads/AdsTable/AdsTable";
import { IAds } from "../../models/IAds";
import {
  createAd,
  deleteAd,
  getAds,
  updateAd,
} from "../../services/ads.service";
import { setNotification } from "../../state/notificationSlice";

const AdsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [ads, setAds] = useState<IAds[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [ad, setAd] = useState<IAds | null>(null);
  const getAllAds = useCallback(() => {
    setLoading(true);
    getAds()
      .then((response) => {
        console.log(response);
        setAds(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getAllAds();
  }, [getAllAds]);

  const handleCreateAd = () => {
    setAd(null);
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    console.log("delete", id);
    setLoading(true);
    deleteAd(id)
      .then((response) => {
        console.log(response);
        dispatch(
          setNotification({
            severity: "success",
            summary: "Exito",
            message: "Anuncio eliminado con exito",
          })
        );
        getAllAds();
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          setNotification({
            severity: "error",
            summary: "Error",
            message: "Error al eliminar el anuncio",
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (ad: IAds) => {
    setShowDialog(true);
    setAd(ad);
  };

  const handleSave = (ad: IAds) => {
    setLoading(true);
    setShowDialog(false);
    console.log(ad);

    if (ad.id !== 0) {
      console.log("edit");
      updateAd(ad.id, ad)
        .then((response) => {
          console.log(response);
          dispatch(
            setNotification({
              severity: "success",
              summary: "Exito",
              message: "Anuncio actualizado con exito",
            })
          );
          getAllAds();
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            setNotification({
              severity: "error",
              summary: "Error",
              message: "Error al actualizar el anuncio",
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("create");

      createAd(ad)
        .then((response) => {
          console.log(response);
          dispatch(
            setNotification({
              severity: "success",
              summary: "Exito",
              message: "Anuncio creado con exito",
            })
          );
          getAllAds();
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            setNotification({
              severity: "error",
              summary: "Error",
              message: "Error al crear el anuncio",
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Layout header={<AdsHeader onCreateAd={handleCreateAd} />} title="Ads">
      <Dialog
        className="w-20rem md:w-30rem"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        title={ad ? "Editar anuncio" : "Crear anuncio"}
      >
        <AdsForm
          ad={ad ?? ({} as IAds)}
          onSubmit={handleSave}
          onCancel={() => setShowDialog(false)}
        />
      </Dialog>
      <AdsTable
        ads={ads}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Layout>
  );
};

export default AdsPage;
