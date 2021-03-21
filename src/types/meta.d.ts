interface MetadataSlide {
  background: string;
  text?: string;
}

interface Metadata {
  slides: MetadataSlide[];
  fontFamily?: string;
}
