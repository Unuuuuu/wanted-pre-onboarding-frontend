import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = (props) => {
  const { text } = props;

  return <h1 className="text-4xl text-center mb-8">{text}</h1>;
};

export default Title;
