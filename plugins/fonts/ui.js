import React from 'react';
import { mountUI } from '../../common/mount-ui';
import { useMessage } from '../../common/messages-ui';
import { Select } from '../../components/select';
import { SyncedInput } from '../../components/synced-input';

const RATIO_LIST = [
  { name: 'Minor Second (16:15)', value: 16.0 / 15 },
  { name: 'Major Second (1.125)', value: 1.125 },
  { name: 'Minor Third (1.2)', value: 1.2 },
  { name: 'Major Third (1.25)', value: 1.25 },
  { name: 'Perfect Fourth (4:3)', value: 4.0 / 3 },
  { name: 'Aug Fourth (1.414)', value: 1.414 },
  { name: 'Perfect Fifth (1.5)', value: 1.5 },
  { name: 'Minor Sixth (1.6)', value: 1.6 },
  { name: 'Golden Section (1.618)', value: 1.61803398875 },
  { name: 'Major Sixth (5:3)', value: 5.0 / 3 },
  { name: 'Minor Seventh (16:9)', value: 16.0 / 9 },
  { name: 'Major Seventh (1.875)', value: 1.875 },
  { name: 'Octave (2)', value: 2.0 },
  { name: 'Major Tenth (2.5)', value: 2.5 },
  { name: 'Major Eleventh (8:3)', value: 8.0 / 3 },
  { name: 'Major Twelfth (3)', value: 3.0 },
  { name: 'Double Octave (4)', value: 4.0 },
];

const UI = () => {
  const fontList = useMessage('fontList', null, [])
    .map((font) => font.fontName)
    .map((fontName) => {
      const id = `${fontName.family} ${fontName.style}`;

      return (
        <option key={id} value={JSON.stringify(fontName)}>
          {id}
        </option>
      );
    });

  const ratioList = RATIO_LIST.map((ratio) => (
    <option key={ratio.value} value={ratio.value}>
      {ratio.name}
    </option>
  ));

  return (
    <form>
      <SyncedInput
        name="sample"
        label="Sample"
        defaultValue="The quick brown fox jumps over the lazy dog"
      />

      <SyncedInput
        type="number"
        name="baseSize"
        label="Base Size"
        defaultValue="12"
        inputAttributes={{ min: 1 }}
        parseValue={(value) => parseInt(value, 10)}
      />

      <SyncedInput
        type="number"
        name="steps"
        label="Steps"
        defaultValue="5"
        inputAttributes={{ min: 1 }}
        parseValue={(value) => parseInt(value, 10)}
      />

      <SyncedInput
        type="number"
        name="spacing"
        label="Spacing"
        defaultValue="8"
        inputAttributes={{ min: 0 }}
        parseValue={(value) => parseInt(value, 10)}
      />

      <SyncedInput
        name="fontName"
        label="Font name"
        placeholder="Roboto Regular"
        defaultValue={JSON.stringify({ family: 'Roboto', style: 'Regular' })}
        parseValue={(value) => JSON.parse(value)}
        inputAttributes={{ children: fontList }}
        InputComponent={Select}
      />

      <SyncedInput
        name="ratio"
        label="Ratio"
        placeholder="Minor Second (16:15)"
        defaultValue={(16 / 15).toString()}
        parseValue={(value) => parseFloat(value)}
        inputAttributes={{ children: ratioList }}
        InputComponent={Select}
      />
    </form>
  );
};

mountUI(UI);
