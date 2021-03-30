import React from 'react';
import { Link } from "react-router-dom";

interface Props {
  question: string
  color: string
}

const ItemSummary = (props: Props) => {
  return (
    <Link className="link-button item-summary" style={{backgroundColor: props.color}} to={`details/${props.question}`}>{props.question}</Link>
  );
}

export default ItemSummary;
