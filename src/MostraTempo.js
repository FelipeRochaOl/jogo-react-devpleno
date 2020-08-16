import React from "react";

const MostraTempo = ({ tempo }) => {
  const minuto = Math.round(tempo / 60);
  const segundo = Math.round(tempo % 60);
  const minutoStr = minuto < 10 ? `0${minuto}` : minuto;
  const segundoStr = segundo < 10 ? `0${segundo}` : segundo;
  return (
    <>
      <p>
        <h4>{`${minutoStr}:${segundoStr}`}</h4>
        Tempo médio por volta
      </p>
    </>
  );
};

export default MostraTempo;
