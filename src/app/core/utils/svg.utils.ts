export default async function loadSVG(path: string): Promise<SVGSVGElement> {
  const response = await fetch(path);

  if (!response.ok) throw new Error(`Cannot load SVG at ${path}`);

  const svgText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svg = doc.querySelector('svg');

  if (!svg) throw new Error(`Invalid SVG file: ${path}`);

  return svg;
}
