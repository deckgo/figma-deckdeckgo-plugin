// SVG Properties and CSS: https://css-tricks.com/svg-properties-and-css/#shared-properties

// TODO: Find a better algorithm to apply the ratio on font size
const baseFontSize: number = 24;

export const applyStyle = ({section, text}: {section: HTMLElement; text: SVGTextElement}) => {
  section.style.whiteSpace = text.style.whiteSpace;

  section.style.transform = transform(text.getAttribute('transform') || '');

  section.style.font = text.getAttribute('font') || '';
  section.style.fontFamily = text.getAttribute('font-family') || '';
  section.style.fontSizeAdjust = text.getAttribute('font-size-adjust') || '';
  section.style.fontStretch = text.getAttribute('font-stretch') || '';
  section.style.fontStyle = text.getAttribute('font-style') || '';
  section.style.fontVariant = text.getAttribute('font-variant') || '';
  section.style.fontWeight = text.getAttribute('font-weight') || '';

  const fontSize: number = parseInt(text.getAttribute('font-size') || '') / baseFontSize;
  section.style.fontSize = !isNaN(fontSize) ? `${fontSize}rem` : '';

  section.style.direction = text.getAttribute('direction') || '';
  section.style.letterSpacing = text.getAttribute('letter-spacing') || '';
  section.style.textDecoration = text.getAttribute('text-decoration') || '';
  section.style.unicodeBidi = text.getAttribute('unicode-bidi') || '';
  section.style.wordSpacing = text.getAttribute('word-spacing') || '';
  section.style.writingMode = text.getAttribute('writing-mode') || '';

  section.style.color = text.getAttribute('fill') || '';
  section.style.opacity = text.getAttribute('fill-opacity') || '';

  section.style.webkitTextStrokeColor = text.getAttribute('stroke-width') || '';
  section.style.webkitTextStrokeColor = text.getAttribute('stroke') || '';
};

const transform = (transform: string): string => {
  const matrix: RegExpExecArray | null = /matrix\((.*)\)/g.exec(transform);
  if (matrix) {
    return `matrix(${matrix[1].replace(/ /g, ',')})`;
  }

  return '';
};
