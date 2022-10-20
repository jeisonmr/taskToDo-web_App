import { React, useEffect, useState } from "react";

function useLocalStorage(itemsTodos, initialValues) {
  // Estado inicial de nuestros TODOs
  const [item, setItem] = useState(initialValues);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hook de efecto useEffect.
  useEffect(() => {
    setTimeout(() => {
    try {
        // Declaración y creación del LocalStorage.
        const localStorageTodos = localStorage.getItem(itemsTodos);

        // Declarando los datos de la item de estados que obtiene del localStorage
        let parsedItem;
  
        // Condicion que devuelve si el LocalStorage esta vacio no muestra To Do, pero si tiene data la muestra.
        if (!localStorageTodos) {
          localStorage.setItem(itemsTodos, JSON.stringify([]));
  
          // Array vacio para la item de To Do
          let parsedItem = initialValues;
        } else {
          parsedItem = JSON.parse(localStorageTodos);
        }
        setItem(parsedItem);
        setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    }, 2000);
  }, []);

  // Guardar los cambios sea eliminar o completar el To Do.
  const saveTodos = (newSaveTodos) => {
    try {
      const stringifyTodos = JSON.stringify(newSaveTodos);

      localStorage.setItem(itemsTodos, stringifyTodos);
  
      setItem(newSaveTodos);  
    
    } catch (error) {
      setError(error);
    }
    
  };

  return {
    item,
    saveTodos,
    loading,
    error,
  };
}

export { useLocalStorage };
