import {renderFrames} from './utils/render.utils';
import {downloadFrames} from './utils/download.utils';
import {done, error, start, userExtractText, listenUserExtractText} from './utils/ui.utils';

window.onmessage = async ($event: MessageEvent) => {
  const {type}: {type: PluginMsgType} = $event.data.pluginMessage;

  if (type === 'frames') {
    await exportFrames($event.data.pluginMessage);
    return;
  }

  if (type === 'fonts') {
    initFontSelect($event.data.pluginMessage);
    return;
  }
};

const initFontSelect = ({fontFamilies}: PluginFontsMsg) => {
  const fonts: FontsComponent | null = document.querySelector('deckgo-fonts');

  if (fonts) {
    fonts.value = fontFamilies?.[0];
  }
};

const exportFrames = async ({frames}: PluginFramesMsg) => {
  if (!frames || frames.length <= 0) {
    error('No frames to export.');
    return;
  }

  try {
    await renderFrames({frames, extractText: userExtractText()});
  } catch (err) {
    console.error(err);
    error('Error while rendering frames.');
    return;
  }

  try {
    await downloadFrames();
  } catch (err) {
    console.error(err);
    error('Error while downloading frames.');
    return;
  }

  done();
};

document.addEventListener(
  'DOMContentLoaded',
  ($event: Event) => {
    const button: ButtonComponent | null = document.querySelector('deckgo-button');
    button?.addEventListener('click', start);

    const checkbox: CheckboxComponent | null = document.querySelector('deckgo-checkbox');
    checkbox?.addEventListener('click', listenUserExtractText, {passive: true});
  },
  {once: true}
);
