import {appendContent, transformCanvas, renderSvg, SvgToCanvas, initContent} from './svg.utils';

interface ContentText {
  content: HTMLElement;
  index: number;
}

export const renderFrames = async ({frames, extractText}: {frames: Frame[]; extractText: boolean}) => {
  const container: HTMLDivElement | null = document.querySelector('div.container');

  if (!container) {
    return;
  }

  frames.forEach(({svg}: Frame, index: number) => {
    renderSvg({container, svg, index});
  });

  if (extractText) {
    await extractSvgText({container, frames});
  }

  await extractCanvas({container, frames});
};

const extractCanvas = async ({container, frames}: {container: HTMLDivElement; frames: Frame[]}) => {
  const promises: Promise<SvgToCanvas | undefined>[] = frames.map((frame: Frame) => transformCanvas(frame));
  const canvas: (SvgToCanvas | undefined)[] = await Promise.all(promises);

  const attachPromises: Promise<void>[] = canvas.map((canvas: SvgToCanvas | undefined) => renderCanvas({container, canvas}));
  await Promise.all(attachPromises);
};

const renderCanvas = async ({container, canvas}: {container: HTMLDivElement; canvas: SvgToCanvas | undefined}) => {
  if (!canvas) {
    return;
  }

  const div: HTMLDivElement | null = container.querySelector(`div[frame="${canvas.index}"]`);

  div?.appendChild(canvas.canvas);
};

const extractSvgText = async ({container, frames}: {container: HTMLDivElement; frames: Frame[]}) => {
  const promises: Promise<ContentText | undefined>[] = frames.map((frame: Frame) => extractText(frame));
  const elements: (ContentText | undefined)[] = await Promise.all(promises);

  const attachPromises: Promise<void>[] = elements.map((element: ContentText | undefined) => renderContent({container, element}));
  await Promise.all(attachPromises);
};

const renderContent = async ({container, element}: {container: HTMLDivElement; element: ContentText | undefined}) => {
  if (!element) {
    return;
  }

  const div: HTMLDivElement | null = container.querySelector(`div[frame="${element.index}"]`);

  div?.appendChild(element.content);
};

export const extractText = async ({index}: Frame): Promise<ContentText | undefined> => {
  const svg: SVGGraphicsElement | null = document.querySelector(`div[frame="${index}"] svg`);

  if (!svg) {
    return undefined;
  }

  const textList: NodeListOf<SVGTextElement> | undefined = svg?.querySelectorAll('text');

  if (!textList || textList.length <= 0) {
    return undefined;
  }

  const content: HTMLElement = initContent();

  [...Array.from(textList)].forEach((text: SVGTextElement) => {
    appendContent({text, content, svg});
    text.parentElement?.removeChild(text);
  });

  return {
    content,
    index
  };
};
