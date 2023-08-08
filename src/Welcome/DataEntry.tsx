/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  Text,
  NumberInput,
  Slider,
  useMantineTheme,
  Stack,
  Space,
  Title,
  Tooltip,
  Group,
} from '@mantine/core';
import { IconInfoSquare, IconInfoCircle } from '@tabler/icons-react';

function NumberSliderInput({
  value,
  setValue,
  name,
  description,
  min,
  max,
  step,
  unit,
}: {
  value: any;
  setValue: any;
  name: string;
  description: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}) {
  const theme = useMantineTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
        <Tooltip label={description}>
          <Group>
            <Text>{name}</Text>
            <IconInfoCircle size="1.1rem" stroke={1.5} />
          </Group>
        </Tooltip>
      </div>
      <NumberInput
        name={name}
        value={value}
        onChange={(v) => setValue(v)}
        min={min}
        max={max}
        step={step}
        variant="filled"
        style={{ width: '100%' }}
        precision={Math.max(-Math.log10(step), 0)}
        rightSection={<Text size="sm">{unit}</Text>}
      />
      <Slider
        style={{ width: '100%' }}
        value={value}
        onChange={(v) => setValue(v)}
        min={min}
        max={max}
        step={step}
        label={<Text size="sm">{unit}</Text>}
      />
    </div>
  );
}

export function DataEntry({ stateCalc }: { stateCalc: any }) {
  return (
    <Stack
      justify="flex-start"
      h={300}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      })}
    >
      <div id="prix">
        <NumberSliderInput
          value={stateCalc.Prix[0]}
          setValue={stateCalc.Prix[1]}
          name="Prix"
          description="Prix du bien"
          min={0}
          max={1000000}
          step={1000}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.Loyer[0]}
          setValue={stateCalc.Loyer[1]}
          name="Loyer (hors charges)"
          description="Loyer équivalent, par mois, hors charges locatives, puisqu'on considère qu'elle sont payées par le propiétaire et le locataire"
          min={0}
          max={5000}
          step={1}
          unit="€"
        />
      </div>
      <div id="emprunt">
        <Space h="xl" />
        <Title order={3}>Emprunt immobilier</Title>
        <NumberSliderInput
          value={stateCalc.Duree[0]}
          setValue={stateCalc.Duree[1]}
          name="Durée"
          description="Durée de l'emprunt"
          min={0}
          max={30}
          step={1}
          unit="ans"
        />
        <NumberSliderInput
          value={stateCalc.Apport[0]}
          setValue={stateCalc.Apport[1]}
          name="Apport"
          description="Apport personnel pour l'achat du bien"
          min={0}
          max={1000000}
          step={100}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.Taux[0]}
          setValue={stateCalc.Taux[1]}
          name="Taux d'emprunt"
          description="Taux de l'emprunt, hors assurance"
          min={0}
          max={10}
          step={0.01}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.Assurance[0]}
          setValue={stateCalc.Assurance[1]}
          name="Taux assurance"
          description="Taux d'assurance"
          min={0}
          max={2}
          step={0.01}
          unit="%"
        />
      </div>
      <div id="hypoeco">
        <Space h="xl" />
        <Title order={3}>Hypothèses économiques</Title>
        <NumberSliderInput
          value={stateCalc.RendementImmobilier[0]}
          setValue={stateCalc.RendementImmobilier[1]}
          name="Rendement Immobilier"
          description="Croissance du prix du bien immobilier"
          min={-5}
          max={10}
          step={0.1}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.InflationLoyer[0]}
          setValue={stateCalc.InflationLoyer[1]}
          name="Inflation loyer"
          description="Augmentation des loyers"
          min={0}
          max={10}
          step={0.1}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.RetourAutreInvestissement[0]}
          setValue={stateCalc.RetourAutreInvestissement[1]}
          name="Taux de placement"
          description="Taux de placement de l'épargne issue de la différence entre loyer et mensualité de l'emprunt"
          min={0}
          max={10}
          step={0.1}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.InflationFrais[0]}
          setValue={stateCalc.InflationFrais[1]}
          name="Inflation frais"
          description="Inflation des charges et de l'entretien annuel"
          min={0}
          max={10}
          step={0.1}
          unit="%"
        />
      </div>

      <div id="charge">
        <Space h="xl" />
        <Title order={3}>Charges supplémentaires pour le propriétaire</Title>
        <NumberSliderInput
          value={stateCalc.TaxeFonciere[0]}
          setValue={stateCalc.TaxeFonciere[1]}
          name="Taxe foncière"
          description="Taxe foncière"
          min={0}
          max={10000}
          step={100}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.ChargesCopropriete[0]}
          setValue={stateCalc.ChargesCopropriete[1]}
          name="Charges de copropriété"
          description="Charges de copropriété par mois, uniquement pour le propriétaire"
          min={0}
          max={1000}
          step={10}
          unit="€/mois"
        />
        <NumberSliderInput
          value={stateCalc.EntretienAnnuel[0]}
          setValue={stateCalc.EntretienAnnuel[1]}
          name="Entretien annuel"
          description="Entretien annuel, renovation, remplacement d'équipement, etc. géneralement supporté par le propriétaire"
          min={0}
          max={10000}
          step={100}
          unit="€/an"
        />
      </div>

      <div id="frais">
        <Space h="xl" />
        <Title order={3}>Complément lié à l'achat</Title>
        <NumberSliderInput
          value={stateCalc.FraisGarantie[0]}
          setValue={stateCalc.FraisGarantie[1]}
          name="Frais de garantie"
          description="Frais de garantie, caution ou hypothèque. Généralement entre 0.5 et 2% du montant emprunté"
          min={0}
          max={5}
          step={0.1}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.FraisNotaire[0]}
          setValue={stateCalc.FraisNotaire[1]}
          name="Frais de notaire"
          description="Frais de notaire"
          min={0}
          max={10}
          step={0.1}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.FraisAgence[0]}
          setValue={stateCalc.FraisAgence[1]}
          name="Frais d'agence"
          description="Frais d'agence"
          min={0}
          max={10}
          step={0.1}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.FraisDossier[0]}
          setValue={stateCalc.FraisDossier[1]}
          name="Frais de dossier"
          description="Frais pour la constitution du dossier auprès de la banque"
          min={0}
          max={10000}
          step={100}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.FraisTravaux[0]}
          setValue={stateCalc.FraisTravaux[1]}
          name="Travaux"
          description="Gros travaux avant emménagement, augmentent la valeur du bien"
          min={0}
          max={10000}
          step={100}
          unit="€"
        />
        <Space h="xl" />
        <Title order={3}>Complément lié à la location</Title>
        <NumberSliderInput
          value={stateCalc.FraisAgenceLocation[0]}
          setValue={stateCalc.FraisAgenceLocation[1]}
          name="Frais d'agence location"
          description="Frais d'agence pour la location (etat des lieux inclus)"
          min={0}
          max={10000}
          step={1}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.DepotGarantie[0]}
          setValue={stateCalc.DepotGarantie[1]}
          name="Caution"
          description="Caution en nombre de mois de loyer déposé pour la location"
          min={0}
          max={2}
          step={1}
          unit="mois"
        />
        <NumberSliderInput
          value={stateCalc.TauxEpargne[0]}
          setValue={stateCalc.TauxEpargne[1]}
          name="Taux d'épargne"
          description="Pourcentage de la différence entre loyer et mensualité de l'emprunt qui est épargnée (et pas dépensée). L'achat peut être considéré comme un moyen d'épargne forcée par certains."
          min={0}
          max={100}
          step={1}
          unit="%"
        />
      </div>
    </Stack>
  );
}
