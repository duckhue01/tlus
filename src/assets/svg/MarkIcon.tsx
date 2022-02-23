import React from "react";
import A from "../marks/A";
import B from "../marks/B";
import C from "../marks/C";
import D from "../marks/D";
import F from "../marks/F";

const MarkIcon = ({ type }: any) => {
  switch (type) {
    case "a":
      return <A height={20} width={20}/>;

    case "b":
      return <B height={20} width={20}/>;
    case "c":
      return <C height={20} width={20}/>;
    case "d":
      return <D height={20} width={20}/>;
    case "f":
      return <F height={20} width={20}/>;

    default:
      return null;
  }
};

export default MarkIcon;
