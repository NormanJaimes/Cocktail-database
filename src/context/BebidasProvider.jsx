import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState('');
  const [receta, setReceta] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    const obtenerReceta = async () => {
      if (!bebidaId) return;

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;

        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  const consultarBebidas = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
      const { data } = await axios(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClick = () => {
    setModal(!modal);
  };
  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };
  return (
    <BebidasContext.Provider
      value={{
        consultarBebidas,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        receta,
        cargando,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
