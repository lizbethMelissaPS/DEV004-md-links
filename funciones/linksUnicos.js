//El objeto Set le permite almacenar valores únicos de cualquier tipo
//El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
//La propiedad de acceso size devuelve el número de elementos que hay en el objeto Set.
export const contarEnlacesUnicos = (links) => {  
  console.log('contarEnlacesUnicos : ');
    const uniqueLinks = new Set(links.map((link) => link.href));
    return uniqueLinks.size;
  };