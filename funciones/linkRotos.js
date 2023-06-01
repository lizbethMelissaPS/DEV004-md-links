//El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
export const contarEnlacesRotos = (links) => {
  console.log('contarEnlacesRotos : ');
    const brokenLinks = links.filter((link) => link.status === 404);
    return brokenLinks.length;
  };