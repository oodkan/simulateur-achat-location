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
} from '@mantine/core';
import { ThemeProvider } from './ThemeProvider';
import { Welcome } from './Welcome/Welcome';
import { DataEntry } from './Welcome/DataEntry';
import { TableOfContentsFloating } from './Welcome/TableOfContents';
import { Output } from './Welcome/Output';

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  //State variables relating to the rent vs buy simulation
  const [Prix, setPrix] = useState(150000);
  const [Loyer, setLoyer] = useState(500);
  const [Duree, setDuree] = useState(20);

  const [Apport, setApport] = useState(33000);
  const [Taux, setTaux] = useState(3);
  const [Assurance, setAssurance] = useState(0.15);

  //State variables relating to the economic hypotheses
  const [RendementImmobilier, setRendementImmobilier] = useState(1);
  const [InflationLoyer, setInflationLoyer] = useState(1);
  const [RetourAutreInvestissement, setRetourAutreInvestissement] = useState(1);
  const [InflationFrais, setInflationFrais] = useState(1);

  //State variables relating to the fees
  const [FraisNotaire, setFraisNotaire] = useState(7.5);
  const [FraisAgence, setFraisAgence] = useState(4);
  const [FraisDossier, setFraisDossier] = useState(100);
  const [FraisGarantie, setFraisGarantie] = useState(1);
  const [FraisTravaux, setFraisTravaux] = useState(100);
  const [FraisAgenceLocation, setFraisAgenceLocation] = useState(7.5);

  //Charges : Taxe fonciere, charges de copropriété, entretien annuel
  const [TaxeFonciere, setTaxeFonciere] = useState(1000);
  const [ChargesCopropriete, setChargesCopropriete] = useState(100);
  const [EntretienAnnuel, setEntretienAnnuel] = useState(1600);

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
  };

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
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, lg: 250 }}>
          <TableOfContentsFloating links={links}> </TableOfContentsFloating>
        </Navbar>
      }
      aside={
        <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 300, lg: 500 }}>
          <Output stateCalc={stateCalc} />
        </Aside>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Simulateur Achat Location</Text>
          </div>
        </Header>
      }
    >
      <DataEntry stateCalc={stateCalc} />
    </AppShell>
  );
}
