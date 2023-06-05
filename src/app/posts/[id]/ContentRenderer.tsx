import React from "react";

type Props = {
  children: string;
};

export const ContentRenderer = ({ children }: Props) => {
  return (
    <div className="px-2 pb-4" dangerouslySetInnerHTML={{ __html: children }} />
  );
};
