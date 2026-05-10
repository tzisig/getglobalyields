export const BROKER_LINKS = {
  ibkr: 'https://www.interactivebrokers.com/',
  schwab: 'https://www.schwab.com/',
  fidelity: 'https://www.fidelity.com/',
  tastytrade: 'https://www.tastytrade.com/',
  firstrade: 'https://www.firstrade.com/',
  etrade: 'https://www.etrade.com/',
  tdAmeritrade: 'https://www.tdameritrade.com/',
  webull: 'https://www.webull.com/',
  xtb: 'https://www.xtb.com/',
  etoro: 'https://www.etoro.com/',
  degiro: 'https://www.degiro.com/',
  saxo: 'https://www.saxobank.com/',
  swissquote: 'https://www.swissquote.com/',
} as const;

export type BrokerLinkKey = keyof typeof BROKER_LINKS;
