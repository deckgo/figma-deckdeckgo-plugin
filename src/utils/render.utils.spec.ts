import {readFileSync} from 'fs';
import {join} from 'path';

import {extractText} from './render.utils';

const slideCover = readFileSync(join(process.cwd(), 'src', 'mocks', 'slide.cover.svg'));
const slideAbout = readFileSync(join(process.cwd(), 'src', 'mocks', 'slide.about.svg'));

describe('test text svg manipulation', () => {
  describe('extract text with one tspan child', () => {
    beforeAll(() => {
      document.body.innerHTML = `<div frame="0">${slideCover}</div>`;
    });

    it('should mock svg', () => {
      expect(document.querySelector('svg')).not.toBe(null);
    });

    it('should extract text', async () => {
      const result = await extractText({index: 0} as Frame);
      expect(result).not.toBe(undefined);
      expect(result?.content.querySelectorAll('deckgo-drr').length).toEqual(2);
      expect(result?.content.outerHTML).toEqual(
        `<aside><deckgo-drr text="true" slot=""><section style="white-space: pre; font-family: Montserrat; font-weight: bold; font-size: 3.8125em; letter-spacing: 0px; color: rgb(21, 77, 84);">Presentation title</section></deckgo-drr><deckgo-drr text="true" slot=""><section style="white-space: pre; font-family: Raleway; font-weight: 600; font-size: 1.5em; letter-spacing: 0px; color: rgb(32, 35, 35);">Your Name, Your Title</section></deckgo-drr></aside>`
      );
    });
  });

  describe('extract text with multiple tspan children', () => {
    beforeAll(() => {
      document.body.innerHTML = `<div frame="0">${slideAbout}</div>`;
    });

    it('should mock svg', () => {
      expect(document.querySelector('svg')).not.toBe(null);
    });

    it('should extract text', async () => {
      const result = await extractText({index: 0} as Frame);
      expect(result).not.toBe(undefined);
      expect(result?.content.querySelectorAll('deckgo-drr').length).toEqual(6);
      expect(result?.content.outerHTML)
        .toEqual(`<aside><deckgo-drr text="true" slot=""><section style="white-space: pre; font-family: Montserrat; font-weight: bold; font-size: 2.25em; letter-spacing: 0px; color: rgb(21, 77, 84);">About this talk</section></deckgo-drr><deckgo-drr text="true" slot=""><section style="white-space: pre; font-family: Raleway; font-weight: 500; font-size: 1.5em; letter-spacing: 0px; color: rgb(32, 35, 35);">1. First point
</section></deckgo-drr><deckgo-drr text="true" slot=""><section style="white-space: pre; font-family: Raleway; font-weight: 500; font-size: 1.5em; letter-spacing: 0px; color: rgb(32, 35, 35);">2. Second point
</section></deckgo-drr><deckgo-drr text="true" slot=""><section style="white-space: pre; font-family: Raleway; font-weight: 500; font-size: 1.5em; letter-spacing: 0px; color: rgb(32, 35, 35);">3. Third point
</section></deckgo-drr><deckgo-drr text="true" slot=""><section style="white-space: pre; font-family: Raleway; font-weight: 500; font-size: 1.5em; letter-spacing: 0px; color: rgb(32, 35, 35);">4. Fourth point
</section></deckgo-drr><deckgo-drr text="true" slot=""><section style="white-space: pre; font-family: Raleway; font-weight: 500; font-size: 1.5em; letter-spacing: 0px; color: rgb(32, 35, 35);">5. Fifth point</section></deckgo-drr></aside>`);
    });
  });
});
