import { Image, Modal } from 'react-bootstrap';
import useBebidas from '../hooks/useBebidas';

export default function ModalBebida() {
  const { modal, handleModalClick, receta, cargando } = useBebidas();
  const mostrarIngredientes = (e) => {
    let ingredientes = [];

    for (let i = 1; i < 16; i++) {
      if (receta[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={i}>
            {receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    !cargando && (
      <Modal
        show={modal}
        onHide={() => {
          handleModalClick();
        }}
      >
        <Image
          src={receta.strDrinkThumb}
          alt={`Imagen receta ${receta.strDrink}`}
        />
        <Modal.Header>
          <Modal.Title>{receta.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h2>Instrucciones</h2>
            {receta.strInstructions}
            <h2>Cantidades</h2>
            {mostrarIngredientes()}
          </div>
        </Modal.Body>
      </Modal>
    )
  );
}
