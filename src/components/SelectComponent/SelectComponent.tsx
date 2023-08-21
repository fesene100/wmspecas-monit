import React from "react";
import { UseApp } from "../../hooks/AppProvider";
import Select from "react-select";
import { colors } from "estilos-lojas-cem";

export interface IOptions {
  value?: string;
  label?: string;
}

export interface ISelect {
  options?: IOptions[];
  value?: IOptions | IOptions[];
  className?: string;
  placeholder?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  onChange?: (value?: any) => void;
}

export const SelectComponent = ({ options, value, className, placeholder, isClearable, isMulti, onChange }: ISelect) => {
  const { dark } = UseApp();

  const defaultColor = dark ? colors.neutral.light.s10 : colors.neutral.dark.s10;

  return (
    <>
      <Select
        isMulti={isMulti}
        key={`key_Select_${value}`}
        onChange={onChange}
        isClearable={isClearable}
        value={value}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            cursor: "pointer",
          }),
          control: (base) => ({
            ...base,
            background: dark ? colors.neutral.dark.s00 : colors.neutral.light.s00,
            minWidth: "150px",
            ":hover": { boxShadow: `0px 0px 2px 1px ${defaultColor}` },
            cursor: "pointer",
          }),

          placeholder: (base) => ({
            ...base,
            color: defaultColor,
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: defaultColor,
            cursor: "pointer",
            ":hover": { color: `#fff` },
          }),
          clearIndicator: (base) => ({
            ...base,
            color: defaultColor,
            cursor: "pointer",
            ":hover": { color: `${colors.error.s080}` },
          }),
          indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: defaultColor,
          }),
          multiValue: (base) => ({
            ...base,
            color: defaultColor,
            backgroundColor: dark ? "#ffffff20" : "#32323220",
            border: dark ? "1px solid #ffffff80" : "1px solid #32323240",
            borderRadius: "5px",
            cursor: "pointer",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: defaultColor,
          }),
          singleValue: (base) => ({
            ...base,
            color: defaultColor,
            cursor: "pointer",
          }),
          option: (base, state) => ({
            ...base,
            color: state.isSelected ? "#fff" : "#323232",
            backgroundColor: state.isSelected ? colors.primary.s080 : "#fff",
            ":hover": {
              backgroundColor: state.isSelected ? colors.primary.s080 : `${colors.primary.s100}40`,
            },
          }),
        }}
        options={options}
        className={className}
        placeholder={placeholder}
        isSearchable={false}
      />
    </>
  );
};
