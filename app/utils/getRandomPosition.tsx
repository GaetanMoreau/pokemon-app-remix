export const getRandomPosition = (className: string) => {
  const randomDivs = document.getElementsByClassName(className);

  if (!randomDivs.length) {
    console.warn(`Aucun élément avec la classe "${className}" trouvé.`);
    return;
  }

  for (const randomDiv of randomDivs) {
    const htmlElement = randomDiv as HTMLElement;

    const maxX = window.innerWidth - randomDiv.clientWidth;
    const maxY = window.innerHeight - randomDiv.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    htmlElement.style.left = `${randomX}px`;
    htmlElement.style.top = `${randomY}px`;
  }
};
