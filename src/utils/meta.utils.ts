import {format} from 'date-fns';

import {Deck, DeckData, FileImportData, Slide, SlideData, UserAsset} from '@deckdeckgo/editor';

import {fonts, GoogleFont} from './google-fonts.utils';

export const importData = (svgList: OutputFrameGroup[]): FileImportData => {
  const fontFamily: string | undefined = selectedFont();

  const deck: Partial<Deck> = createDeck(fontFamily);

  const slides: Partial<Slide>[] = svgList.map((data: OutputFrameGroup) => createSlide(data));

  return {
    deck,
    slides
  };
};

export const userAssets = (svgList: OutputFrameGroup[]): Promise<UserAsset>[] => {
  return svgList.map(({canvas}: OutputFrameGroup) => userAsset(canvas));
};

const userAsset = async ({filename, element}: OutputFrame): Promise<UserAsset> => {
  const dataUrl: string = (element as HTMLCanvasElement).toDataURL('image/webp');
  const blob: Blob = await (await fetch(dataUrl)).blob();

  return {
    key: `/assets/local/images/${filename}`,
    blob
  };
};

const selectedFont = (): string | undefined => {
  const fonts: FontsComponent | null = document.querySelector('deckgo-fonts');

  return fonts?.value && fonts?.value !== 'Default' ? fonts.value : undefined;
};

const createDeck = (fontFamily: string | undefined): Partial<Deck> => {
  let data: Partial<DeckData> = {
    name: `Presentation ${format(new Date(), 'MMM d yyyy HH-mm-ss')}`
  };

  const font: GoogleFont | undefined = fonts.find(
    (filteredFont: GoogleFont) => filteredFont.name === fontFamily && fontFamily !== undefined
  );
  if (font) {
    data = {
      ...data,
      attributes: {
        style: `font-family: ${font.family};`
      }
    };
  }

  return {
    id: undefined,
    data: data as DeckData
  };
};

const createSlide = ({canvas, aside}: OutputFrameGroup): Partial<Slide> => {
  const backgroundOuterHTML: string = `<div slot="background"><deckgo-lazy-img img-src="/assets/local/images/${canvas.filename}"></deckgo-lazy-img></div>`;

  const content: string | undefined = aside?.element?.innerHTML;

  const slideData: SlideData = {
    template: 'aspect-ratio',
    content: `${content ? content + backgroundOuterHTML : backgroundOuterHTML}`,
    attributes: {
      customBackground: 'true',
      grid: false
    }
  };

  return {
    id: undefined,
    data: slideData
  };
};
