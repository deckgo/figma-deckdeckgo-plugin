import JSZip from 'jszip';

import {FileImportData, UserAsset} from '@deckdeckgo/editor';

import {importData, userAssets} from './meta.utils';

export const downloadFrames = async () => {
  const container: HTMLDivElement | null = document.querySelector('div.container');

  if (!container) {
    return;
  }

  const frames: NodeListOf<HTMLDivElement> | null = container.querySelectorAll('div');

  if (!frames) {
    return;
  }

  const svgList: OutputFrameGroup[] = prepare(Array.from(frames));

  if (svgList.length <= 0) {
    return;
  }

  const data: FileImportData = importData(svgList);
  const assets: UserAsset[] = await Promise.all(userAssets(svgList));

  const blob: Blob = await zip({assets, data});

  download(blob);
};

const prepare = (frames: HTMLDivElement[]): OutputFrameGroup[] => {
  const svgList: OutputFrameGroup[] = [];

  frames.forEach((frame: HTMLDivElement, index: number) => {
    const canvas: HTMLCanvasElement | null = frame.querySelector('canvas');
    const aside: HTMLElement | null = frame.querySelector('aside');

    if (canvas) {
      svgList.push({
        canvas: {
          element: canvas,
          filename: `background-${index}.webp`
        },
        aside: aside
          ? {
              element: aside,
              filename: `text-${index}.html`
            }
          : undefined
      });
    }
  });

  return svgList;
};

const zip = async ({assets, data}: {assets: UserAsset[]; data: FileImportData}): Promise<Blob> => {
  const zip = new JSZip();

  const addImageZip = async ({key, blob}: UserAsset) => {
    zip.file(key, blob, {
      base64: true
    });
  };

  const addDeckMetaZip = (deck: FileImportData) => {
    const blob: Blob = new Blob([JSON.stringify(deck)], {type: 'application/json'});

    zip.file('deck.json', blob, {
      base64: true
    });
  };

  const addAssetMetaZip = (assets: UserAsset[]) => {
    const blob: Blob = new Blob([JSON.stringify(assets.map(({key}) => ({key})))], {type: 'application/json'});

    zip.file('assets.json', blob, {
      base64: true
    });
  };

  const imagePromises: Promise<void>[] = assets.map((userAsset: UserAsset) => addImageZip(userAsset));
  await Promise.all(imagePromises);

  addDeckMetaZip(data);

  addAssetMetaZip(assets);

  return zip.generateAsync({type: 'blob'});
};

const download = (blob) => {
  const blobURL = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobURL;
  link.download = `deckdeckgo.ddg`;
  link.click();

  window.URL.revokeObjectURL(blobURL);
};
