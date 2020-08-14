import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    
    //state del provider
    const [ idreceta, guardarIdReceta] = useState(null);
    const [ inforeceta, guardarReceta ] = useState({});

    //una vez que guardamos el id de receta hacer consulta a la API
    useEffect (()=> {
        const obtenerReceta = async () => {
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`

            const resultado = await axios.get(url);
            //console.log(resultado.data.drinks[0]);
            guardarReceta(resultado.data.drinks[0]);
            
        }

        obtenerReceta();
    }, [idreceta, guardarReceta])
    
    return ( 
        <ModalContext.Provider
            value={{
                inforeceta,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;

