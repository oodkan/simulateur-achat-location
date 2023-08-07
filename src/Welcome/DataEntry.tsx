/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Text, NumberInput, Slider, useMantineTheme, Stack, Space, Title } from '@mantine/core';

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
      <Title order={4}>{name}</Title>
      <Text>{description}</Text>
      <NumberInput
        name={name}
        value={value}
        onChange={(v) => setValue(v)}
        min={min}
        max={max}
        step={step}
        variant="filled"
        style={{ width: '100%' }}
        inputStyle={{ textAlign: 'center' }}
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
          description="Loyer équivalent, par mois, hors charges, puisqu'on considère qu'elle sont payées par le propiétaire et le locataire"
          min={0}
          max={5000}
          step={1}
          unit="€"
        />
      </div>
      <div id="emprunt">
        <Space h="xl" />
        <NumberSliderInput
          value={stateCalc.Duree[0]}
          setValue={stateCalc.Duree[1]}
          name="Durée"
          description="Durée"
          min={0}
          max={50}
          step={1}
          unit="ans"
        />
        <NumberSliderInput
          value={stateCalc.Apport[0]}
          setValue={stateCalc.Apport[1]}
          name="Apport"
          description="Apport"
          min={0}
          max={1000000}
          step={100}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.Taux[0]}
          setValue={stateCalc.Taux[1]}
          name="Taux d'emprunt"
          description="Taux de l'emprunt"
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
          max={10}
          step={0.01}
          unit="%"
        />
      </div>
      <div id="hypoeco">
        <Space h="xl" />

        <NumberSliderInput
          value={stateCalc.RendementImmobilier[0]}
          setValue={stateCalc.RendementImmobilier[1]}
          name="Rendement Immobilier"
          description="Croissance du prix du bien immobilier"
          min={0}
          max={10}
          step={0.1}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.InflationLoyer[0]}
          setValue={stateCalc.InflationLoyer[1]}
          name="Inflation loyer"
          description="Augmentation du prix du loyer"
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
          description="Inflation des charges"
          min={0}
          max={10}
          step={0.1}
          unit="%"
        />
      </div>

      <div id="charge">
        <Space h="xl" />

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
          description="Charges de copropriété"
          min={0}
          max={10000}
          step={100}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.EntretienAnnuel[0]}
          setValue={stateCalc.EntretienAnnuel[1]}
          name="Entretien annuel"
          description="Entretien annuel"
          min={0}
          max={10000}
          step={100}
          unit="€"
        />
      </div>

      <div id="frais">
        <Space h="xl" />

        <NumberSliderInput
          value={stateCalc.FraisGarantie[0]}
          setValue={stateCalc.FraisGarantie[1]}
          name="Frais de garantie"
          description="Frais de garantie"
          min={0}
          max={20}
          step={0.1}
          unit="%"
        />
        <NumberSliderInput
          value={stateCalc.FraisNotaire[0]}
          setValue={stateCalc.FraisNotaire[1]}
          name="Frais de notaire"
          description="Frais de notaire"
          min={0}
          max={20}
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
          description="Frais de dossier"
          min={0}
          max={10000}
          step={100}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.FraisDossier[0]}
          setValue={stateCalc.FraisDossier[1]}
          name="Travaux"
          description="Gros travaux avant emménagement, augmentent la valeur du bien"
          min={0}
          max={10000}
          step={100}
          unit="€"
        />
        <NumberSliderInput
          value={stateCalc.FraisAgenceLocation[0]}
          setValue={stateCalc.FraisAgenceLocation[1]}
          name="Frais Agence Location"
          description="Frais d'agence pour la location (etat des lieux inclus)"
          min={0}
          max={10}
          step={0.1}
          unit="%"
        />
      </div>
    </Stack>
  );
}
