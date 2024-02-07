import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Col } from "antd";

const CharacterCountInput = ({ label, name, placeholder, maxLength, form, rows }) => {
  const [length, setLength] = useState(form.getFieldValue(name)?.length || 0);

  const handleChange = (e) => {
    const value = e.target.value;
    setLength(value.length);
    form.setFieldsValue({ [name]: value });
  };

  return (
      <Form.Item
        name={name}
        label={label}
        rules={[{ required: true, message: `Escreva o ${label.toLowerCase()}` }]}
      >
        {rows ? (
          <Input.TextArea
            rows={rows}
            maxLength={maxLength}
            value={form.getFieldValue(name)}
            onChange={handleChange}
            placeholder={placeholder}
          />
        ) : (
          <Input
            maxLength={maxLength}
            value={form.getFieldValue(name)}
            onChange={handleChange}
            placeholder={placeholder}
          />
        )}
        <div style={{ marginTop: 8, color: "rgba(0, 0, 0, 0.45)" }}>{`${length}/${maxLength} caracteres`}</div>
      </Form.Item>
  );
};

CharacterCountInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  form: PropTypes.object.isRequired,
  rows: PropTypes.number,
};

export default CharacterCountInput;
