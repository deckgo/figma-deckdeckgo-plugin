interface OutputFrame {
  element: HTMLElement;
  filename: string;
}

interface OutputFrameGroup {
  canvas: OutputFrame;
  aside: OutputFrame | undefined;
}
