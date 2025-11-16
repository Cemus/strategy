import { City } from '../models/city/city.model';
import { Faction } from '../models/faction/faction.model';
import loadSVG from './svg.utils';

export const citiesSetup = (
  svg: SVGSVGElement,
  cities: City[],
  factions: Faction[],
) => {
  const paths = svg?.querySelectorAll<SVGPathElement>('path');
  const playerFaction = Object.values(factions).find(
    (faction) => faction.player,
  );
  if (paths && paths.length > 0) {
    paths.forEach((path) => {
      const group = path.parentElement;
      const titleElement = group?.querySelector('title');
      if (titleElement) {
        const cityName = titleElement.textContent?.split(' ')[0] || '';
        const currentCity = Object.values(cities).find(
          (city) => city.name.toString() === cityName,
        );

        if (currentCity) {
          const currentfaction = currentCity.faction;
          const isPlayerCity = currentfaction?.name === playerFaction?.name;

          if (isPlayerCity) {
            currentCity.mapColor = 'green';
          } else {
            const hasPlayerNeighbor = currentCity.neighbors.some((neighbor) => {
              return neighbor.faction?.name === playerFaction?.name;
            });

            if (hasPlayerNeighbor) {
              currentCity.mapColor = 'orange';
            } else {
              currentCity.mapColor = 'gray';
            }
          }

          currentfaction?.atWar.forEach((enemy) => {
            if (enemy.name === playerFaction?.name) {
              currentCity.mapColor = 'red';
            }
          });
          getBlason(svg, path, currentfaction, currentCity);
        }
      }

      path.classList.add('cursor-pointer');
    });
  }
};

async function getBlason(
  svg: SVGSVGElement,
  path: SVGPathElement,
  currentfaction: Faction,
  currentCity: City,
) {
  let blasonLayer = svg.querySelector('#blason-layer') as SVGGElement;
  if (!blasonLayer) {
    blasonLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    blasonLayer.setAttribute('id', 'blason-layer');
    svg.appendChild(blasonLayer);
  }
  const bbox = path.getBBox();
  let centerX = bbox.x + bbox.width / 2;
  let centerY = bbox.y + bbox.height / 2;

  //Pas cool
  if (currentCity.name === 'Vabranth') {
    centerX = bbox.x + bbox.width / 2;
    centerY = bbox.y + bbox.height / 3.5;
  } else {
    centerX = bbox.x + bbox.width / 2;
    centerY = bbox.y + bbox.height / 2;
  }

  if (currentCity.isCapital) {
    const capitalSVG = await loadSVG('assets/icons/capital.svg');
    if (!capitalSVG) return;

    const icon = capitalSVG.cloneNode(true) as SVGSVGElement;

    icon.setAttribute('x', `${centerX - 10}`);
    icon.setAttribute('y', `${centerY - 10}`);
    icon.setAttribute('width', '20');
    icon.setAttribute('height', '20');
    icon.setAttribute('pointer-events', 'none');
    icon.setAttribute('fill', currentfaction?.color);
    icon.setAttribute('data-city', currentCity.name.toString());

    blasonLayer.appendChild(icon);
  } else {
    const blason = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle',
    );
    blason.setAttribute('cx', `${centerX}`);
    blason.setAttribute('cy', `${centerY}`);
    blason.setAttribute('r', '5');
    blason.setAttribute('stroke', 'black');
    blason.setAttribute('stroke-width', '1');
    blason.setAttribute('pointer-events', 'none');
    blason.setAttribute('fill', currentfaction?.color);
    blason.setAttribute('data-city', currentCity.name.toString());

    blasonLayer.appendChild(blason);
  }
}
