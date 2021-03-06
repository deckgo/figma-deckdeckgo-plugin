// SVG Properties and CSS: https://css-tricks.com/svg-properties-and-css/#shared-properties

const baseFontSize: number = 24;

export const applyStyle = ({section, text, svgWidth}: {section: HTMLElement; text: SVGTextElement; svgWidth: number}) => {
  section.style.whiteSpace = text.style.whiteSpace;

  section.style.transform = transform(text.getAttribute('transform') || '');

  section.style.font = text.getAttribute('font') || '';
  section.style.fontFamily = text.getAttribute('font-family') || '';
  section.style.fontSizeAdjust = text.getAttribute('font-size-adjust') || '';
  section.style.fontStretch = text.getAttribute('font-stretch') || '';
  section.style.fontStyle = text.getAttribute('font-style') || '';
  section.style.fontVariant = text.getAttribute('font-variant') || '';
  section.style.fontWeight = text.getAttribute('font-weight') || '';

  // 576px height = font-size 16px or 1em (relative to the font-size of its direct or nearest parent)
  // See initFontSize in core
  const ratioFontSize: number = svgWidth / 16 * 9 / 576;

  const fontSize: number = parseInt(text.getAttribute('font-size') || '') / (baseFontSize * ratioFontSize);
  section.style.fontSize = !isNaN(fontSize) ? `${fontSize}em` : '';

  section.style.direction = text.getAttribute('direction') || '';
  section.style.letterSpacing = text.getAttribute('letter-spacing') || '';
  section.style.textDecoration = text.getAttribute('text-decoration') || '';
  section.style.unicodeBidi = text.getAttribute('unicode-bidi') || '';
  section.style.wordSpacing = text.getAttribute('word-spacing') || '';
  section.style.writingMode = text.getAttribute('writing-mode') || '';

  // We want to avoid a textual color (such as "black") and always get the rgb values
  const color: string = text.getAttribute('fill') ? window.getComputedStyle(text)?.fill : '';
  section.style.color = color || '';

  section.style.opacity = text.getAttribute('fill-opacity') || '';

  section.style.webkitTextStrokeWidth = text.getAttribute('stroke-width') || '';
  section.style.webkitTextStrokeColor = text.getAttribute('stroke') || '';
};

const transform = (transform: string): string => {
  const matrix: RegExpExecArray | null = /matrix\((.*)\)/g.exec(transform);
  if (matrix) {
    return `matrix(${matrix[1].replace(/ /g, ',')})`;
  }

  return '';
};
