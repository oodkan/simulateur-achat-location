import { calculer_mensualite_emprunt } from './Output';

//Test the function calculer_mensualite_emprunt
it('calculer_mensualite_emprunt', () => {
  const output = calculer_mensualite_emprunt(322000, 25, 60000, 1.3, 0.15);
  expect(output).toBe(1192.416);
});
