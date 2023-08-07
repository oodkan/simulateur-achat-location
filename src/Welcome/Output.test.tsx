import { calculer_mensualite_emprunt } from './Output';

//Test the function calculer_mensualite_emprunt
it('calculer_mensualite_emprunt', () => {
  const montant = 322000 - 60000;
  const output = calculer_mensualite_emprunt(montant, 25, 1.3, 0.15);
  expect(output).toBe(1192.416);
});
