// TODO: Extract to utilities because it is also use in studio

export interface GoogleFont {
  id: string;
  name: string;
  family: string;
}

// TODO fetch(`https://app.deckdeckgo.com/assests/assets.json`) at build time
export const fonts: GoogleFont[] = [
  {
    id: 'google-fonts-lora',
    name: 'Lora',
    family: "'Lora', serif"
  },
  {
    id: 'google-fonts-roboto',
    name: 'Roboto',
    family: "'Roboto', sans-serif"
  },
  {
    id: 'google-fonts-open-sans',
    name: 'Open Sans',
    family: "'Open Sans', sans-serif"
  },
  {
    id: 'google-fonts-montserrat',
    name: 'Montserrat',
    family: "'Montserrat', sans-serif"
  },
  {
    id: 'google-fonts-cabin',
    name: 'Cabin',
    family: "'Cabin', sans-serif"
  },
  {
    id: 'google-fonts-lato',
    name: 'Lato',
    family: "'Lato', sans-serif"
  },
  {
    id: 'google-fonts-muli',
    name: 'Muli',
    family: "'Muli', sans-serif"
  },
  {
    id: 'google-fonts-source-sans-pro',
    name: 'Source Sans Pro',
    family: "'Source Sans Pro', sans-serif"
  },
  {
    id: 'google-fonts-libre-baskerville',
    name: 'Libre Baskerville',
    family: "'Libre Baskerville', serif"
  },
  {
    id: 'google-fonts-oswald',
    name: 'Oswald',
    family: "'Oswald', sans-serif"
  },
  {
    id: 'google-fonts-jura',
    name: 'Jura',
    family: "'Jura', sans-serif"
  },
  {
    id: 'google-fonts-fjord-one',
    name: 'Fjord One',
    family: "'Fjord One', serif"
  },
  {
    id: 'google-fonts-josefin-slab',
    name: 'Josefin Slab',
    family: "'Josefin Slab', serif"
  }
];
