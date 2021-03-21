import JSZip from 'jszip';

interface OutputFrame {
  element: HTMLElement;
  filename: string;
}

interface OutputFrameGroup {
  canvas: OutputFrame;
  aside: OutputFrame | undefined;
}

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

  const blob: Blob = await zip(svgList);

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

const zip = async (svgList: OutputFrameGroup[]): Promise<Blob> => {
  const zip = new JSZip();

  const addImageZip = async ({dataUrl, filename}: {dataUrl: string; filename: string}) => {
    const blob: Blob = await (await fetch(dataUrl)).blob();

    zip.file(filename, blob, {
      base64: true
    });
  };

  const addHtmlZip = ({data, filename}: {data: string; filename: string}) => {
    const blob: Blob = new Blob([data], {type: 'text/html'});

    zip.file(filename, blob, {
      base64: true
    });
  };

  const addMetaZip = (meta: Metadata) => {
    const blob: Blob = new Blob([JSON.stringify(meta)], {type: 'application/json'});

    zip.file('meta.json', blob, {
      base64: true
    });
  };

  const promises: Promise<void>[] = svgList.map(async ({canvas, aside}: OutputFrameGroup) => {
    await addImageZip({
      dataUrl: (canvas.element as HTMLCanvasElement).toDataURL('image/webp'),
      filename: canvas.filename
    });

    if (aside) {
      addHtmlZip({
        data: aside.element.innerHTML,
        filename: aside.filename
      });
    }
  });

  await Promise.all(promises);

  addMetaZip(meta(svgList));

  return zip.generateAsync({type: 'blob'});
};

const meta = (svgList: OutputFrameGroup[]): Metadata => {
  const fonts: FontsComponent | null = document.querySelector('deckgo-fonts');

  const slides: MetadataSlide[] = svgList.map(({canvas, aside}: OutputFrameGroup) => {
    return {
      background: canvas.filename,
      ...(aside && {text: aside.filename})
    };
  });

  return {
    slides,
    ...((fonts?.value && fonts?.value !== 'Default') && {fontFamily: fonts.value})
  }
};

const download = (blob) => {
  const blobURL = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobURL;
  link.download = `deckdeckgo.zip`;
  link.click();

  window.URL.revokeObjectURL(blobURL);
};
