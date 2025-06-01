import { City } from '../models/city.model';
import { Faction } from '../models/faction.model';

export const citiesSetup = (
  svg: SVGSVGElement,
  cities: City[],
  factions: Faction[]
) => {
  const paths = svg?.querySelectorAll<SVGPathElement>('path');
  const playerFaction = Object.values(factions).find(
    (faction) => faction.player
  );
  if (paths && paths.length > 0) {
    paths.forEach((path) => {
      const group = path.parentElement;
      const titleElement = group?.querySelector('title');

      if (titleElement) {
        const cityName = titleElement.textContent?.split(' ')[0] || '';
        const currentCity = Object.values(cities).find(
          (city) => city.name.toString() === cityName
        );

        if (currentCity) {
          const currentOwner = currentCity.owner;
          const isPlayerCity = currentOwner?.name === playerFaction?.name;
          if (isPlayerCity) {
            currentCity.mapColor = 'green';
          } else {
            const hasPlayerNeighbor = currentCity.neighbors.some((neighbor) => {
              return neighbor.owner?.name === playerFaction?.name;
            });

            if (hasPlayerNeighbor) {
              currentCity.mapColor = 'orange';
            } else {
              currentCity.mapColor = 'gray';
            }
          }

          currentOwner?.atWar.forEach((enemy) => {
            if (enemy.name === playerFaction?.name) {
              currentCity.mapColor = 'red';
            }
          });

          if (svg && currentOwner) {
            getBlason(svg, path, currentOwner, currentCity);
          }
        }
      }

      path.classList.add('cursor-pointer');
    });
  }
};

function getBlason(
  svg: SVGSVGElement,
  path: SVGPathElement,
  currentOwner: Faction,
  currentCity: City
) {
  let blasonLayer = svg.querySelector('#blason-layer') as SVGGElement;
  if (!blasonLayer) {
    blasonLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    blasonLayer.setAttribute('id', 'blason-layer');
    svg.appendChild(blasonLayer);
  }

  const bbox = path.getBBox();
  const centerX = bbox.x + bbox.width / 2;
  const centerY = bbox.y + bbox.height / 2;

  const blason = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  blason.setAttribute('cx', `${centerX}`);
  blason.setAttribute('cy', `${centerY}`);
  blason.setAttribute('r', '5');
  blason.setAttribute('stroke', 'black');
  blason.setAttribute('stroke-width', '1');
  blason.setAttribute('pointer-events', 'none');
  blason.setAttribute('fill', currentOwner?.color);
  blason.setAttribute('data-city', currentCity.name.toString());

  blasonLayer.appendChild(blason);
}
