import { useState, useEffect } from 'react';
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
  Code,
  ScrollArea,
  Button,
  Group,
} from '@mantine/core';
import { IconMath } from '@tabler/icons-react';
import { ThemeProvider } from './ThemeProvider';
import { DataEntry } from './Welcome/DataEntry';
import { Output } from './Welcome/Output';
import { BUTTON_VARIANTS } from '@mantine/core/lib/Button/Button.styles';

function get_or_default_from_localstorage(key: string, default_value: number) {
  if (localStorage.getItem(key) !== null) {
    return useState(JSON.parse(localStorage.getItem(key) as string));
  } else {
    return useState(default_value);
  }
}

export default function AppShellDemo() {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  //State variables relating to the rent vs buy simulation
  const [Prix, setPrix] = get_or_default_from_localstorage('Prix', 150000);
  const [Loyer, setLoyer] = get_or_default_from_localstorage('Loyer', 500);
  const [Duree, setDuree] = get_or_default_from_localstorage('Duree', 20);

  const [Apport, setApport] = get_or_default_from_localstorage('Apport', 0);
  const [Taux, setTaux] = get_or_default_from_localstorage('Taux', 3);
  const [Assurance, setAssurance] = get_or_default_from_localstorage('Assurance', 0.3);

  //State variables relating to the economic hypotheses
  const [RendementImmobilier, setRendementImmobilier] = get_or_default_from_localstorage(
    'RendementImmobilier',
    2
  );
  const [InflationLoyer, setInflationLoyer] = get_or_default_from_localstorage(
    'InflationLoyer',
    2.5
  );
  const [RetourAutreInvestissement, setRetourAutreInvestissement] =
    get_or_default_from_localstorage('RetourAutreInvestissement', 3);
  const [InflationFrais, setInflationFrais] = get_or_default_from_localstorage('InflationFrais', 2);

  //State variables relating to the fees
  const [FraisNotaire, setFraisNotaire] = get_or_default_from_localstorage('FraisNotaire', 7.5);
  const [FraisAgence, setFraisAgence] = get_or_default_from_localstorage('FraisAgence', 4);
  const [FraisDossier, setFraisDossier] = get_or_default_from_localstorage('FraisDossier', 100);
  const [FraisGarantie, setFraisGarantie] = get_or_default_from_localstorage('FraisGarantie', 0.4);
  const [FraisTravaux, setFraisTravaux] = get_or_default_from_localstorage('FraisTravaux', 1000);
  const [FraisAgenceLocation, setFraisAgenceLocation] = get_or_default_from_localstorage(
    'FraisAgenceLocation',
    400
  );

  //Charges : Taxe fonciere, charges de copropriété, entretien annuel
  const [TaxeFonciere, setTaxeFonciere] = get_or_default_from_localstorage('TaxeFonciere', 1000);
  const [ChargesCopropriete, setChargesCopropriete] = get_or_default_from_localstorage(
    'ChargesCopropriete',
    200
  );
  const [EntretienAnnuel, setEntretienAnnuel] = get_or_default_from_localstorage(
    'EntretienAnnuel',
    1600
  );

  //Complément location
  const [DepotGarantie, setDepotGarantie] = get_or_default_from_localstorage('DepotGarantie', 1);
  const [TauxEpargne, setTauxEpargne] = get_or_default_from_localstorage('TauxEpargne', 80);

  //Group all the state variables into a single object
  const stateCalc = {
    Prix: [Prix, setPrix],
    Loyer: [Loyer, setLoyer],
    Duree: [Duree, setDuree],
    Apport: [Apport, setApport],
    Taux: [Taux, setTaux],
    Assurance: [Assurance, setAssurance],
    RendementImmobilier: [RendementImmobilier, setRendementImmobilier],
    InflationLoyer: [InflationLoyer, setInflationLoyer],
    RetourAutreInvestissement: [RetourAutreInvestissement, setRetourAutreInvestissement],
    InflationFrais: [InflationFrais, setInflationFrais],
    FraisNotaire: [FraisNotaire, setFraisNotaire],
    FraisAgence: [FraisAgence, setFraisAgence],
    FraisAgenceLocation: [FraisAgenceLocation, setFraisAgenceLocation],
    FraisDossier: [FraisDossier, setFraisDossier],
    FraisGarantie: [FraisGarantie, setFraisGarantie],
    FraisTravaux: [FraisTravaux, setFraisTravaux],
    TaxeFonciere: [TaxeFonciere, setTaxeFonciere],
    ChargesCopropriete: [ChargesCopropriete, setChargesCopropriete],
    EntretienAnnuel: [EntretienAnnuel, setEntretienAnnuel],
    DepotGarantie: [DepotGarantie, setDepotGarantie],
    TauxEpargne: [TauxEpargne, setTauxEpargne],
  };

  useEffect(() => {
    localStorage.setItem('Prix', JSON.stringify(Prix));
    localStorage.setItem('Loyer', JSON.stringify(Loyer));
    localStorage.setItem('Duree', JSON.stringify(Duree));
    localStorage.setItem('Apport', JSON.stringify(Apport));
    localStorage.setItem('Taux', JSON.stringify(Taux));
    localStorage.setItem('Assurance', JSON.stringify(Assurance));
    localStorage.setItem('RendementImmobilier', JSON.stringify(RendementImmobilier));
    localStorage.setItem('InflationLoyer', JSON.stringify(InflationLoyer));
    localStorage.setItem('RetourAutreInvestissement', JSON.stringify(RetourAutreInvestissement));
    localStorage.setItem('InflationFrais', JSON.stringify(InflationFrais));
    localStorage.setItem('FraisNotaire', JSON.stringify(FraisNotaire));
    localStorage.setItem('FraisAgence', JSON.stringify(FraisAgence));
    localStorage.setItem('FraisAgenceLocation', JSON.stringify(FraisAgenceLocation));
    localStorage.setItem('FraisDossier', JSON.stringify(FraisDossier));
    localStorage.setItem('FraisGarantie', JSON.stringify(FraisGarantie));
    localStorage.setItem('FraisTravaux', JSON.stringify(FraisTravaux));
    localStorage.setItem('TaxeFonciere', JSON.stringify(TaxeFonciere));
    localStorage.setItem('ChargesCopropriete', JSON.stringify(ChargesCopropriete));
    localStorage.setItem('EntretienAnnuel', JSON.stringify(EntretienAnnuel));
    localStorage.setItem('DepotGarantie', JSON.stringify(DepotGarantie));
    localStorage.setItem('TauxEpargne', JSON.stringify(TauxEpargne));
  }, [
    Prix,
    Loyer,
    Duree,
    Apport,
    Taux,
    Assurance,
    RendementImmobilier,
    InflationLoyer,
    RetourAutreInvestissement,
    InflationFrais,
    FraisNotaire,
    FraisAgence,
    FraisAgenceLocation,
    FraisDossier,
    FraisGarantie,
    FraisTravaux,
    TaxeFonciere,
    ChargesCopropriete,
    EntretienAnnuel,
    DepotGarantie,
    TauxEpargne,
  ]);

  //links to be displayed in the table of contents, conresponding to the different sections of the data entry
  const links = [
    { label: 'Prix', link: '#prix', order: 1 },
    { label: 'Emprunt', link: '#emprunt', order: 1 },
    { label: 'Hypothèses économiques', link: '#hypoeco', order: 1 },
    { label: 'Frais', link: '#frais', order: 1 },
  ];

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      /* navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, lg: 250 }}>
          <TableOfContentsFloating links={links}> </TableOfContentsFloating>
        </Navbar>
      } */
      aside={
        <Aside p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 500, lg: 700 }}>
          <ScrollArea h={700}>
            <Output stateCalc={stateCalc} />
          </ScrollArea>
        </Aside>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Group>
            <Text>Simulateur Achat Location</Text>
            <Code sx={{ fontWeight: 700 }}>v1.1</Code>
            <MediaQuery largerThan="sm" styles={{ display: 'none', alignItems: 'right' }}>
              <Button
                onClick={() => setOpened((o) => !o)}
                size="xs"
                color={opened ? 'red' : 'blue'}
              >
                {' '}
                {opened ? 'Fermer' : 'Résultats'}{' '}
              </Button>
            </MediaQuery>
          </Group>
        </Header>
      }
    >
      <DataEntry stateCalc={stateCalc} />
    </AppShell>
  );
}
