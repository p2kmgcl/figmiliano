import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LabelContent, Label } from './label';
import { Input } from './input';
import { sendMessageToCore } from '../common/messages-ui';

export const SyncedInput = (props) => {
  const [value, setValue] = useState(props.defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value || props.defaultValue);
  };

  useEffect(() => {
    sendMessageToCore(props.name, props.parseValue(value));
  }, [value]);

  return (
    <Label>
      <LabelContent>{props.label}</LabelContent>

      <props.InputComponent
        {...props.inputAttributes}
        required
        value={value}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder || props.defaultValue}
        onChange={handleChange}
      />
    </Label>
  );
};

SyncedInput.defaultProps = {
  type: 'text',
  placeholder: '',
  parseValue: (value) => value,

  InputComponent: Input,
  inputAttributes: {},
};

SyncedInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,

  type: PropTypes.string,
  parseValue: PropTypes.func,
  placeholder: PropTypes.string,

  InputComponent: PropTypes.elementType,
  inputAttributes: PropTypes.object,
};
