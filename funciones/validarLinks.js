export const validateLinks = (arrLinks) => {
  const linkS = arrLinks.map((link) => {
    console.log('Realizamos la petición')
    return fetch(link.href)
      .then(response => {
        link.status = response.status;
        link.mensage = response.statusText;
        return link
      })
      .catch(() => {
        link.status = "404";
        link.message = "fail";
        return link;
      });
  })
  return Promise.all(linkS);
};