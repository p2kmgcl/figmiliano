import React, { useEffect, useState } from 'react';
import { mountUI } from '../../common/mount-ui';
import { useMessage, sendMessageToCore } from '../../common/messages-ui';
import { Label, LabelContent } from '../../components/label';
import { Select } from '../../components/select';
import { Input } from '../../components/input';

const UI = () => {
  const [baseSize, setBaseSize] = useState(12);
  const [sample, setSample] = useState(
    'The quick brown fox jumps over the lazy dog',
  );
  const [fontName, setFontName] = useState(
    JSON.stringify({ family: 'Roboto', style: 'Regular' }),
  );
  const [ratio, setRatio] = useState(1.06666666667);
  const [spacing, setSpacing] = useState(8);
  const [steps, setSteps] = useState(5);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const fontList = useMessage('font-list', null, [])
    .map((font) => font.fontName)
    .map((fontName) => {
      const id = `${fontName.family} ${fontName.style}`;
      return (
        <option key={id} value={JSON.stringify(fontName)}>
          {id}
        </option>
      );
    });

  useEffect(() => {
    sendMessageToCore('render', {
      baseSize: parseInt(baseSize, 10) || 12,
      fontName: JSON.parse(fontName),
      ratio: parseFloat(ratio) || 1.06666666667,
      spacing: parseInt(spacing, 10) || 0,
      steps: parseInt(steps, 10) || 5,
      sample,
    });
  }, [baseSize, fontName, sample, ratio, spacing, steps]);

  return (
    <form>
      <Label>
        <LabelContent>Sample</LabelContent>

        <Input
          required
          type="text"
          value={sample}
          onChange={handleInputChange(setSample)}
          placeholder="The quick brown fox jumps over the lazy dog"
        />
      </Label>

      <Label>
        <LabelContent>Base size</LabelContent>

        <Input
          required
          min="1"
          step="1"
          type="number"
          value={baseSize}
          placeholder="12"
          onChange={handleInputChange(setBaseSize)}
        />
      </Label>

      <Label>
        <LabelContent>Font family</LabelContent>

        <Select
          required
          value={fontName}
          placeholder="Roboto Regular"
          onChange={handleInputChange(setFontName)}
        >
          {fontList}
        </Select>
      </Label>

      <Label>
        <LabelContent>Ratio</LabelContent>

        <Select
          required
          value={ratio}
          placeholder="Minor Second (16:15)"
          onChange={handleInputChange(setRatio)}
        >
          <option value="1.06666666667">Minor Second (16:15)</option>
          <option value="1.12500000000">Major Second (1.125)</option>
          <option value="1.20000000000">Minor Third (1.2)</option>
          <option value="1.25000000000">Major Third (1.25)</option>
          <option value="1.33333333333">Perfect Fourth (4:3)</option>
          <option value="1.41400000000">Aug Fourth (1.414)</option>
          <option value="1.50000000000">Perfect Fifth (1.5)</option>
          <option value="1.60000000000">Minor Sixth (1.6)</option>
          <option value="1.61803398875">Golden Section (1.618)</option>
          <option value="1.66666666667">Major Sixth (5:3)</option>
          <option value="1.77777777778">Minor Seventh (16:9)</option>
          <option value="1.87500000000">Major Seventh (1.875)</option>
          <option value="2.000000000000">Octave (2)</option>
          <option value="2.500000000000">Major Tenth (2.5)</option>
          <option value="2.666666666667">Major Eleventh (8:3)</option>
          <option value="3.000000000000">Major Twelfth (3)</option>
          <option value="4.000000000000">Double Octave (4)</option>
        </Select>
      </Label>

      <Label>
        <LabelContent>Steps</LabelContent>

        <Input
          min="1"
          required
          type="number"
          value={steps}
          placeholder="5"
          onChange={handleInputChange(setSteps)}
        />
      </Label>

      <Label>
        <LabelContent>Spacing</LabelContent>

        <Input
          min="0"
          required
          type="number"
          value={spacing}
          placeholder="8"
          onChange={handleInputChange(setSpacing)}
        />
      </Label>
    </form>
  );
};

mountUI(UI);
