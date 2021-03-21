import {closePlugin, exportFontFamilies, start} from './utils/plugin.utils';

figma.ui.onmessage = async ({type, msg}: UiMsg) => {
  if (type === 'done') {
    closePlugin('Frames exported. Save and import these in DeckDeckGo to continue.');
    return;
  }

  if (type === 'error') {
    closePlugin(msg ? msg : 'Unexpected error.');
    return;
  }

  if (type == 'start') {
    await start();
    return;
  }
};

figma.showUI(__html__, {visible: true, height: 240});

exportFontFamilies();
