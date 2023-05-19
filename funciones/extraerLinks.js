export function getLink(data, path) {
    const patronLink = /\[.*\]\(https?:\/{2}[\w\-.]+\/?.*\)/g
    const patronhref = /https?:\/{2}.*?(?=\))/g
    const patronText = /(?!\[).*(?=\])/g
    const linkMatch = data.match(patronLink);// El método match() devuelve todas las ocurrencias de una expresión regular dentro de una cadena
    const links = [];
    if (linkMatch) {
      linkMatch.forEach((link) => {
        links.push({
          href: link.match(patronhref).toString(),
          text: link.match(patronText)[0].toString(),
          file: path,
        });
      });
    } else {
      links.push({
        href: 'no links found',
        text: 'no links found',
        file: path,
      });
      return links.flat(); //El método flat() crea una nueva matriz con todos los elementos de la sub-matriz concatenados recursivamente hasta la profundidad especificada.
    }
    return links.flat();
  }