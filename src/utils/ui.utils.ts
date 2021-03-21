export const userExtractText = (): boolean => {
  const checkbox: CheckboxComponent | null = document.querySelector('deckgo-checkbox');
  return checkbox?.checked === true;
};

export const start = () => {
  const checkbox: CheckboxComponent | null = document.querySelector('deckgo-checkbox');
  checkbox?.setAttribute('disabled', 'disabled');

  const fonts: FontsComponent | null = document.querySelector('deckgo-fonts');
  fonts?.setAttribute('disabled', 'disabled');

  window.parent.postMessage({pluginMessage: {type: 'start'}}, '*');
};

export const listenUserExtractText = () => {
  const checkbox: CheckboxComponent | null = document.querySelector('deckgo-checkbox');
  const fonts: FontsComponent | null = document.querySelector('deckgo-fonts');

  if (checkbox?.checked === true) {
    fonts?.removeAttribute('disabled');
    return;
  }

  fonts?.setAttribute('disabled', 'disabled');
}

export const done = () => window.parent.postMessage({pluginMessage: {type: 'done'}}, '*');

export const error = (msg: string) => window.parent.postMessage({pluginMessage: {type: 'err', msg}}, '*');
