import { useContext } from 'react';
import CategoriasContext from '../context/CategoriasProvider';

const useCategoria = () => {
  return useContext(CategoriasContext);
};

export default useCategoria;
