/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Card,
  Progress,
  Stack,
  Table,
  SimpleGrid,
  Space,
  Container,
  Center,
} from '@mantine/core';
import { ResponsiveLine } from '@nivo/line';

const dureeProjection = 50;

//Define the stateValue Type
type variablesImmo = {
  Prix: number;
  Loyer: number;
  Duree: number;
  Apport: number;
  Taux: number;
  Assurance: number;
  RendementImmobilier: number;
  InflationLoyer: number;
  RetourAutreInvestissement: number;
  InflationFrais: number;
  FraisNotaire: number;
  FraisAgence: number;
  FraisDossier: number;
  FraisGarantie: number;
  FraisTravaux: number;
  FraisAgenceLocation: number;
  TaxeFonciere: number;
  ChargesCopropriete: number;
  EntretienAnnuel: number;
  DepotGarantie: number;
  TauxEpargne: number;
};

export function calculer_mensualite_emprunt(
  montant_emprunte: number,
  duree: number,
  taux: number,
  assurance: number
) {
  let mensualite = 0;
  const taux_mensuel = (taux + assurance) / 12 / 100;
  const nb_mensualites = duree * 12;

  mensualite = (montant_emprunte * taux_mensuel) / (1 - (1 + taux_mensuel) ** -nb_mensualites);

  return mensualite;
}

function montant_a_financer(st: variablesImmo) {
  return (
    st.Prix -
    st.Apport +
    (st.FraisNotaire / 100) * st.Prix +
    (st.FraisAgence / 100) * st.Prix +
    st.FraisDossier +
    (st.FraisGarantie / 100) * st.Prix +
    st.FraisTravaux
  );
}

function capital_restant_du(
  montant_emprunt: number,
  duree: number,
  taux: number,
  assurance: number
) {
  const taux_mensuel = (taux + assurance) / 12 / 100;
  const nb_mensualites = duree * 12;
  //Return the capital remaining to be paid for each year of the loan
  const tableau_sortie = [];
  let capital_restant = montant_emprunt;
  let interet = 0;
  let amortissement = 0;
  const mensualite = calculer_mensualite_emprunt(montant_emprunt, duree, taux, assurance);

  for (let i = 1; i <= nb_mensualites; i++) {
    interet = capital_restant * taux_mensuel;
    amortissement = mensualite - interet;
    capital_restant -= amortissement;
    if (i % 12 === 0) {
      tableau_sortie.push({ year: i, capital_restant, interet, amortissement });
    }
  }
  for (let i = tableau_sortie.length; i <= dureeProjection; i++) {
    tableau_sortie.push({ year: i, capital_restant: 0, interet: 0, amortissement: 0 });
  }
  return tableau_sortie;
}

function calculer_solution_location(st: variablesImmo) {
  const tableau_sortie = [];
  const montant_emprunt = montant_a_financer(st);
  const mensualite = calculer_mensualite_emprunt(montant_emprunt, st.Duree, st.Taux, st.Assurance);
  const revenus_mensuels =
    mensualite + (st.TaxeFonciere + st.ChargesCopropriete * 12 + st.EntretienAnnuel) / 12;
  let loyer_actuel = st.Loyer;
  let tresorerie = st.Apport - st.DepotGarantie * st.Loyer;
  tresorerie *= 1 + st.RetourAutreInvestissement / 100;
  tresorerie -= st.FraisAgenceLocation; //Frais d'agence à intégrer
  tresorerie += (((revenus_mensuels - loyer_actuel) * st.TauxEpargne) / 100) * 12;
  loyer_actuel *= 1 + st.InflationLoyer / 100;
  let actif_net = tresorerie;
  tableau_sortie.push({ year: 1, tresorerie, valeur_immobilier: 0, actif_net });

  for (let i = 2; i <= dureeProjection; i++) {
    tresorerie += (((revenus_mensuels - loyer_actuel) * st.TauxEpargne) / 100) * 12;
    tresorerie *= 1 + st.RetourAutreInvestissement / 100;
    loyer_actuel *= 1 + st.InflationLoyer / 100;
    actif_net = tresorerie + st.DepotGarantie * st.Loyer;
    tableau_sortie.push({ year: i, tresorerie, valeur_immobilier: 0, actif_net });
  }
  return tableau_sortie;
}

export function calculer_solution_achat(st: variablesImmo, stress: number = 0) {
  //Tableau de sortie
  const tableau_sortie = [];
  const situation_globale = {};
  let mensualite = 0;
  const montant_emprunt = montant_a_financer(st);
  mensualite = calculer_mensualite_emprunt(montant_emprunt, st.Duree, st.Taux, st.Assurance);
  const tab_amortissement = capital_restant_du(montant_emprunt, st.Duree, st.Taux, st.Assurance);
  console.log(tab_amortissement);
  let charges_actuelles = st.ChargesCopropriete * 12 + st.EntretienAnnuel;
  const revenus_mensuels = mensualite + (st.TaxeFonciere + charges_actuelles) / 12;
  let tresorerie = st.Apport;

  //Premiere année
  tresorerie = tresorerie - mensualite * 12 - st.TaxeFonciere - charges_actuelles;
  tresorerie -= st.Apport;
  tresorerie += revenus_mensuels * 12;

  let valeur_immobilier = st.Prix + st.FraisTravaux;
  valeur_immobilier *= 1 + st.RendementImmobilier / 100;
  valeur_immobilier *= 1 + stress;

  tableau_sortie.push({
    year: 1,
    tresorerie,
    valeur_immobilier,
    actif_net: tresorerie + valeur_immobilier - tab_amortissement[0].capital_restant,
  });

  //Annnées suivantes
  for (let i = 2; i <= dureeProjection; i++) {
    charges_actuelles *= 1 + st.InflationFrais / 100;
    tresorerie = tresorerie - st.TaxeFonciere - charges_actuelles;
    if (i <= st.Duree) {
      tresorerie -= mensualite * 12;
    }
    tresorerie += revenus_mensuels * 12;
    tresorerie *= 1 + st.RetourAutreInvestissement / 100;
    valeur_immobilier *= 1 + st.RendementImmobilier / 100;

    tableau_sortie.push({
      year: i,
      tresorerie,
      valeur_immobilier,
      actif_net: tresorerie + valeur_immobilier - tab_amortissement[i - 1].capital_restant,
    });
  }
  return tableau_sortie;
}

function NivoLineFromTabSortie({ data }: { data: any }) {
  return (
    <Container h={225}>
      <ResponsiveLine
        data={data}
        margin={{ top: 5, right: 11, bottom: 50, left: 6 }}
        xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        enablePoints={false}
        enableGridX={false}
        yFormat=" >-.3s"
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh
        enableSlices="x"
        animate={false}
      />
    </Container>
  );
}

function stateCalcToValue({ stateCalc }: { stateCalc: any }) {
  //Extracts the values from the stateCalc object and returns them in a new object using a loop
  const value: { [key: string]: number } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, val] of Object.entries(stateCalc)) {
    if (Array.isArray(val) && typeof val[0] === 'number') {
      value[key] = val[0];
    }
  }
  //Cast the value object to the type variablesImmo
  return value as variablesImmo;
}

function TableLocation({ st }: { st: variablesImmo }) {
  const loyer_annuel = st.Loyer * 12;
  const loyer_20 = st.Loyer * (1 + st.InflationLoyer / 100) ** 20;
  const rentabilite = loyer_annuel / (st.Prix + st.FraisTravaux);

  return (
    <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Loyer annuel
      </Text>
      <Text fz="xs" fw={700} c="dimmed">
        {loyer_annuel.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })}
      </Text>

      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Loyer mensuel dans 20 ans
      </Text>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {loyer_20.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })}
      </Text>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Rentabilité locative
      </Text>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {rentabilite.toLocaleString('fr-FR', { style: 'percent', minimumFractionDigits: 2 })}
      </Text>
    </SimpleGrid>
  );
}

function TableAchat({ st }: { st: variablesImmo }) {
  const montant_emprunt = montant_a_financer(st);
  const mensualite = calculer_mensualite_emprunt(montant_emprunt, st.Duree, st.Taux, st.Assurance);
  const taux_apport = st.Apport / (st.Prix + st.FraisTravaux);
  return (
    <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Mensualité
      </Text>
      <Text fz="xs" fw={700} c="dimmed">
        {mensualite.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })}
      </Text>

      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Montant à emprunter
      </Text>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {montant_emprunt.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        })}
      </Text>

      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Taux apport personnel
      </Text>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {taux_apport.toLocaleString('fr-FR', { style: 'percent', maximumFractionDigits: 0 })}
      </Text>
    </SimpleGrid>
  );
}

function calcul_annee_rentable(tab_achat: any, tab_location: any) {
  let annee_rentable = 0;
  for (let i = 0; i < tab_achat.length; i++) {
    if (tab_achat[i].actif_net > tab_location[i].actif_net) {
      annee_rentable = i + 1;
      break;
    }
  }

  return annee_rentable;
}

//Calcul de la rentabilité en fonction du stress
function calcul_annee_rentable_stress(st: variablesImmo, tab_location: any, stress: number) {
  const tab_achat_stress = calculer_solution_achat(st, stress);
  let annee_rentable = 50;
  for (let i = 0; i < tab_achat_stress.length; i++) {
    if (tab_achat_stress[i].actif_net > tab_location[i].actif_net) {
      annee_rentable = i + 1;
      break;
    }
  }
  return annee_rentable;
}

//Retourne un tableau avec les valeurs de rentabilité en fonction du stress
function calcul_annee_rentable_stress_tab(st: variablesImmo, tab_location: any) {
  const tab_annee_rentable = [];
  for (let stress = -0.3; stress <= 0.3; stress += 0.01) {
    const annee_rentable = calcul_annee_rentable_stress(st, tab_location, stress);
    tab_annee_rentable.push({ x: stress, y: annee_rentable });
  }
  return tab_annee_rentable;
}

export function Output({ stateCalc }: { stateCalc: any }) {
  //Menualite emprunt
  const st = stateCalcToValue({ stateCalc });
  const montant_emprunt = montant_a_financer(st);
  const mensualite_emprunt = calculer_mensualite_emprunt(
    montant_emprunt,
    st.Duree,
    st.Taux,
    st.Assurance
  );
  const tab_achat = calculer_solution_achat(st);
  const tab_location = calculer_solution_location(st);

  const data = [
    {
      id: 'Achat',
      data: tab_achat.map((element: any) => ({ x: element.year, y: element.actif_net })),
    },
    {
      id: 'Location',
      data: tab_location.map((element: any) => ({ x: element.year, y: element.actif_net })),
    },
  ];

  //Année ou l'achat devient plus rentable que la location
  const annee_rentable = calcul_annee_rentable(tab_achat, tab_location);
  let annee_rentable_text = '';
  if (annee_rentable === 0) {
    annee_rentable_text = "L'achat devient rentable au dela de 50 ans";
  } else {
    annee_rentable_text = `L'achat devient rentable en ${annee_rentable} ans`;
  }

  //Calcul de rentabilité en fonction du stress
  //Calculer du nombre d'année supplémentaire à attendre pour que l'achat soit rentable
  const annee_rentable_stress_10 = calcul_annee_rentable_stress(st, tab_location, -0.1);
  const annee_rentable_stress_20 = calcul_annee_rentable_stress(st, tab_location, -0.2);
  const annee_rentable_stress_30 = calcul_annee_rentable_stress(st, tab_location, -0.3);

  const annee_rentable_stress_10_text = `Avec une baisse de 10%, il faut attendre ${
    annee_rentable_stress_10 - annee_rentable
  } ans de plus`;
  const annee_rentable_stress_20_text = `Avec une baisse de 20%, il faut attendre ${
    annee_rentable_stress_20 - annee_rentable
  } ans de plus`;
  const annee_rentable_stress_30_text = `Avec une baisse de 30%, il faut attendre ${
    annee_rentable_stress_30 - annee_rentable
  } ans de plus`;
  const tab_stress = calcul_annee_rentable_stress_tab(st, tab_location);
  const data_stress = [
    {
      id: 'Stress',
      data: tab_stress,
    },
  ];

  return (
    <Stack
      justify="flex-start"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white,
      })}
    >
      <Card
        withBorder
        radius="md"
        padding="md"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Text fz="md" tt="uppercase" fw={700}>
          Location
        </Text>
        <Space h="xs" />
        <TableLocation st={st} />
      </Card>

      <Card
        withBorder
        radius="md"
        padding="md"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Text fz="md" tt="uppercase" fw={700}>
          Achat
        </Text>
        <Space h="xs" />
        <TableAchat st={st} />
      </Card>

      <Card
        withBorder
        radius="md"
        padding="md"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Text fz="md" tt="uppercase" fw={700}>
          Patrimoine
        </Text>
        <Text fz="md" fw={700} c="dimmed">
          {annee_rentable_text}
        </Text>
        <NivoLineFromTabSortie data={data} />
        <Text fz="md" fw={600} c="dimmed">
          {annee_rentable_stress_10_text}
        </Text>
        <Text fz="md" fw={600} c="dimmed">
          {annee_rentable_stress_30_text}
        </Text>
      </Card>
    </Stack>
  );
}
