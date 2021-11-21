import React from "react";

export interface IErrorTextProps {
  error: String;
}

const ErrorText: React.FunctionComponent<IErrorTextProps> = (props) => {
  const { error } = props;

  if (error === "") return null;

  return <small className="text-danger">{error}</small>;
};

export default ErrorText;
