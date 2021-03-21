import {applyStyle} from './text.utils';

export interface SvgToCanvas {
  canvas: HTMLCanvasElement;
  index: number;
}

export const appendContent = ({text, content, svg}: {text: SVGTextElement; content: HTMLElement; svg: SVGGraphicsElement}) => {
  const tspans: NodeListOf<SVGTSpanElement> | undefined = text.querySelectorAll('tspan');

  if (tspans?.length > 0) {
    [...Array.from(tspans)].forEach((tspan: SVGTSpanElement) => {
      const deckGoDrr: HTMLElement = transformText({text, svg, tspan});
      content.append(deckGoDrr);
    });

    return;
  }

  const deckGoDrr: HTMLElement = transformText({text, svg});
  content.append(deckGoDrr);
};

const transformText = ({text, svg, tspan}: {text: SVGTextElement; svg: SVGGraphicsElement; tspan?: SVGTSpanElement}): HTMLElement => {
  const deckGoDrr: HTMLElement = initDeckGoDRR({text, svg, tspan});

  const section: HTMLElement = document.createElement('section');
  applyStyle({section, text});
  section.innerHTML = tspan ? tspan.innerHTML : text.innerHTML;

  deckGoDrr.append(section);

  return deckGoDrr;
};

export const initContent = (): HTMLElement => {
  return document.createElement('aside');
};

const initDeckGoDRR = ({text, svg, tspan}: {text: SVGTextElement; svg: SVGGraphicsElement; tspan?: SVGTSpanElement}): HTMLElement => {
  const deckGoDrr: HTMLElement = document.createElement('deckgo-drr');

  deckGoDrr.setAttribute('text', 'true');
  deckGoDrr.setAttribute('slot', '');

  if (typeof svg.getBBox !== 'function') {
    return deckGoDrr;
  }

  const svgBbox: DOMRect = svg.getBBox();
  const textBbox: DOMRect = (tspan || text).getBBox();

  const translate: RegExpExecArray | null = /translate\((.*?)\)/g.exec(text.getAttribute('transform') || '');

  let y: number = textBbox.y;
  let x: number = textBbox.x;

  // If the text element has a translate style we have to apply the delta "manually" to the tspan child
  if (tspan && translate) {
    const deltaX: number = parseInt(translate[1].split(' ')?.[0]) || 0;
    const deltaY: number = parseInt(translate[1].split(' ')?.[1]) || 0;

    if (!isNaN(deltaX) && !isNaN(deltaY)) {
      y += deltaY;
      x += deltaX;
    }
  }

  const targetY: number = (100 * y) / (svgBbox.height - svgBbox.y);
  const targetX: number = (100 * x) / (svgBbox.width - svgBbox.x);

  deckGoDrr.style.setProperty('--top', `${targetY}%`);
  deckGoDrr.style.setProperty('--left', `${targetX}%`);

  const rotate: RegExpExecArray | null = /rotate\((.*?)\)/g.exec(text.getAttribute('transform') || '');
  if (rotate) {
    deckGoDrr.style.setProperty('--rotate', `${rotate[1]}deg`);
  }

  return deckGoDrr;
};

export const renderSvg = ({container, svg}: {container: HTMLDivElement; svg: Uint8Array}) => {
  const divElement: HTMLDivElement = document.createElement('div');
  divElement.innerHTML = new TextDecoder().decode(svg);

  container.appendChild(divElement);
};

export const transformCanvas = ({index}: Frame): Promise<SvgToCanvas | undefined> => {
  return new Promise<SvgToCanvas | undefined>((resolve) => {
    const svg: SVGGraphicsElement | null = document.querySelector(`div:nth-child(${index + 1}) svg`);

    if (!svg) {
      resolve(undefined);
      return;
    }

    const {width, height} = svg.getBBox();

    const blob: Blob = new Blob([svg.outerHTML], {type: 'image/svg+xml;charset=utf-8'});
    const blobURL: string = URL.createObjectURL(blob);

    const image = new Image();

    image.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');

      canvas.width = width;
      canvas.height = height;

      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
      context?.drawImage(image, 0, 0, width, height);

      URL.revokeObjectURL(blobURL);

      resolve({
        canvas,
        index
      });
    };

    image.src = blobURL;
  });
};
