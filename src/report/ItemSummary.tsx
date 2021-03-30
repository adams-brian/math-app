import React from 'react';
//import ItemDetails from './ItemDetails';

interface Props {
  question: string
  data: object[]
  color: string
}

const ItemSummary = (props: Props) => {
  return (
    <div className="item-summary" style={{backgroundColor: props.color}}>
      {props.question}
    </div>
  );
}

export default ItemSummary;
