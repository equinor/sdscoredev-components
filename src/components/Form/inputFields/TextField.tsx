import React from "react";
import { Icon, TextField as EdsTextField } from "@equinor/eds-core-react";
import { InputProps, withInput } from "./withInput";
import styled from "styled-components";

const StyledTextField = styled(EdsTextField)`
  input {
    padding-top: 7px;
    height: 37px;
  }
`;
export const TextField: React.FC<InputProps> = (props: any) => {
  const { value, error } = props;

  return (
    <StyledTextField
      {...props}
      label=""
      defaultValue={value || ""}
      variant={error ? "error" : "default"}
      helperText={error}
      helperIcon={error && <Icon name="error_filled" title="Error" />}
    />
  );
};

export default withInput()(TextField);
