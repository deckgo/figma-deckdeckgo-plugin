const exportFrame = async (frameNode: PageNode | SceneNode, index: number): Promise<Frame> => {
  const svg = await frameNode.exportAsync({format: 'SVG', svgOutlineText: false});
  return {svg, index};
};

const exportFrames = async (frameNodes: (PageNode | SceneNode)[]) => {
  const promises: Promise<Frame>[] = frameNodes.map((node, i) => exportFrame(node, i));
  const frames: Frame[] = await Promise.all(promises);

  figma.ui.postMessage({
    type: 'frames',
    frames
  });
};

export const closePlugin = (msg: string) => figma.closePlugin(msg);

const userSelectedFrames = () => figma.currentPage.selection?.filter((selected) => selected.type === 'FRAME');

const allFrames = (): (PageNode | SceneNode)[] =>
  figma.root.findAll((node: PageNode | SceneNode) => node.type === 'FRAME' && node.parent?.type === 'PAGE');

export const start = async () => {
  try {
    const selectedFrames: SceneNode[] | undefined = userSelectedFrames();

    if (selectedFrames?.length > 0) {
      await exportFrames(selectedFrames);
      return;
    }

    const nodes: (PageNode | SceneNode)[] | undefined = allFrames();

    if (nodes?.length > 0) {
      await exportFrames(nodes);
      return;
    }

    closePlugin('No selected frames to export.');
  } catch (err) {
    console.error(err);

    closePlugin('Something went wrong. Cannot export frames.');
  }
};

const findFrameFontFamily = (frameNode: FrameNode): string[] => {
  const textNodes: TextNode[] | undefined = frameNode.children?.filter((node: SceneNode) => node.type === 'TEXT') as TextNode[] | undefined;
  return [
    ...new Set(
      textNodes?.map((node: TextNode) => (node.fontName as FontName)?.family).filter((family: string | undefined) => family !== undefined)
    )
  ];
};

const findFramesFontFamilies = (frameNodes: FrameNode[]) => {
  const families: string[][] = frameNodes.map((frameNode: FrameNode) => findFrameFontFamily(frameNode));
  const fontFamilies: string[] = [...new Set(([] as string[]).concat(...families))];

  figma.ui.postMessage({
    type: 'fonts',
    fontFamilies
  });
};

export const exportFontFamilies = () => {
  const selectedFrames: SceneNode[] | undefined = userSelectedFrames();

  if (selectedFrames?.length > 0) {
    findFramesFontFamilies(selectedFrames as FrameNode[]);
    return;
  }

  const nodes: (PageNode | SceneNode)[] | undefined = allFrames();

  if (nodes?.length > 0) {
    findFramesFontFamilies(nodes as FrameNode[]);
    return;
  }
};
