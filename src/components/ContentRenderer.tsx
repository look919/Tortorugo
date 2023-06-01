import React from "react";

type Props = {
  children: string;
};

export const ContentRenderer = ({ children }: Props) => {
  return <div dangerouslySetInnerHTML={{ __html: children }} />;
};
