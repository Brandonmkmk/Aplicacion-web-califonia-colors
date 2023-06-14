import { useRef, useState } from "react";
import "../agregarpromociones.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Boton } from "./Buttons/Button";
export let promociones = [];

export const FormPromociones = () => {
  const [promocionesData, setPromocionesData] = useState({
    imagen: "",
    titulo: "",
    descripcion: "",
    precio: "",
  });
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDeleteError, setModalDeleteError] = useState(false);
  const [modalViewPromotions, setModalViewPromotions] = useState(false);
  const formRefs = useRef({
    imagenRef: useRef(),
    tituloRef: useRef(),
    descripcionRef: useRef(),
    precioRef: useRef(),
  });

  const resetInputs = () => {
    formRefs.current.imagenRef.current.files = null;
    formRefs.current.tituloRef.current.value = "";
    formRefs.current.descripcionRef.current.value = "";
    formRefs.current.precioRef.current.value = "";
  };
  const handleFile = (event) => {
    /*se obtiene la imagen seleccionada mediante la propiedad target.files[0]*/
    const image = event.target.files[0];
    /*se valida que la imagen seleccionada sea del tipo image/ para asegurarse de que se esta cargando unicamente una imagen, si la imagen es valida se crea una URL temporal con el metodo URL.createObjectURL(image) y se actualiza el estado de la variable en setImagen con la url temporal generada, que se utilizara para posteriormente mostrar la imagen en el componente Promociones.js*/
    if (image.type.startsWith("image/")) {
      setPromocionesData({
        ...promocionesData,
        imagen: URL.createObjectURL(image),
      });
    }
  };

  const handleTitulo = (event) => {
    setPromocionesData({ ...promocionesData, titulo: event.target.value });
  };
  const handleDescripcion = (event) => {
    setPromocionesData({ ...promocionesData, descripcion: event.target.value });
  };
  const handlePrecio = (event) => {
    setPromocionesData({ ...promocionesData, precio: event.target.value });
  };
  const insertPromotion = () => {
    if (
      formRefs.current.imagenRef.current.files &&
      formRefs.current.tituloRef.current.value &&
      formRefs.current.descripcionRef.current.value &&
      formRefs.current.precioRef.current.value
    ) {
      let nuevaPromocion = {
        id: promociones.length,
        imagen: promocionesData.imagen,
        titulo: promocionesData.titulo,
        descripcion: promocionesData.descripcion,
        precio: promocionesData.precio,
      };
      promociones = [...promociones, nuevaPromocion];
      resetInputs();
      setModal(true);
      setModalError(false);
    } else {
      setModalError(true);
      setModal(false);
    }
  };

  const deleteAllPromotions = () => {
    if (promociones.length === 0) {
      setModalDeleteError(true);
    } else {
      promociones = [];
      setModalDelete(true);
    }
  };

  return (
    <>
      <div className="form-agregar">
        <div className="modal">
          <Modal show={modal} onHide={() => setModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "green" }}>Correcto!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tu promocion se agrego con exito</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setModal(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={modalError} onHide={() => setModalError(false)}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "red" }}>Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Debes llenar todos los campos</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setModalError(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={modalDelete} onHide={() => setModalDelete(false)}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "green" }}>Correcto!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Todas tus promociones se eliminaron correctamente
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setModalDelete(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={modalDeleteError}
            onHide={() => setModalDeleteError(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "red" }}>Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>no tienes ninguna pomocion</Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => setModalDeleteError(false)}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            fullscreen={true}
            size="lg"
            show={modalViewPromotions}
            onHide={() => setModalViewPromotions(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "green" }}>
                Tus promociones:
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", flexWrap: "wrap" }}>
              {promociones.length > 0 ? (
                promociones.map((e) => {
                  return (
                    <div className="card" style={{ width: "18rem" }} key={e.id}>
                      <img className="card-img-top img" src={e.imagen} />
                      <div className="card-body">
                        <h5 className="card-title">{e.titulo}</h5>
                        <p className="card-text">{e.descripcion}</p>
                        <p>{e.precio}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1 style={{ color: "black" }}>No tienes ninguna promocion</h1>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => setModalViewPromotions(false)}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <h1>¡Agrega una promocion!</h1>
        <div className="agregar-promocion">
          <label htmlFor="imagen">Añade una imagen:</label>
          <input
            ref={formRefs.current.imagenRef}
            onChange={handleFile}
            type="file"
            id="imagen"
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100 border-b-2 border-blue-700 border-t-0 border-r-0 border-l-0"
          />
          <label htmlFor="input1">Nombre de tu promocion:</label>
          <input
            ref={formRefs.current.tituloRef}
            id="input1"
            onChange={handleTitulo}
            type="text"
            className="border-b-2 border-blue-500 border-t-0 border-r-0 border-l-0 focus:outline-none"
          />
          <label htmlFor="input2">Descripcion de la promocion:</label>
          <input
            ref={formRefs.current.descripcionRef}
            id="input2"
            onChange={handleDescripcion}
            type="text"
            className="border-b-2 border-blue-500 border-t-0 border-r-0 border-l-0 focus:outline-none"
          />
          <label htmlFor="input3">Precio de la promocion:</label>
          <input
            ref={formRefs.current.precioRef}
            id="input3"
            onChange={handlePrecio}
            type="text"
            className="border-b-2 border-blue-500 border-t-0 border-r-0 border-l-0 focus:outline-none"
          />
          <Boton
            color="primary"
            texto="insertar promocion"
            click={insertPromotion}
          />

          {/* <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <h2>Exito</h2>
          <p>Se agrego la e con exito</p>
        </Modal> */}
          <Boton
            color="primary"
            texto="visualizar promociones"
            click={() => setModalViewPromotions(true)}
          />
          <Boton
            color="primary"
            texto="eliminar promociones"
            click={deleteAllPromotions}
          />
        </div>
      </div>
    </>
  );
};
