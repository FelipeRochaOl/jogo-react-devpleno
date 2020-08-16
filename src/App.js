import React, { useState, useEffect } from "react";
import "./styles.css";
import "./materialize.css";

import MostraTempo from "./MostraTempo";
import MostraVoltas from "./MostraVoltas";
import Button from "./Button";

function App() {
  const [iniciado, setIniciado] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [numVoltas, setNumVoltas] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setRotate((old) => (old === 360 ? 0 : old + 1));
    }, 60);
  }, []);

  useEffect(() => {
    let temporizador = null;
    if (iniciado) {
      temporizador = setInterval(() => {
        setTempo((tempo) => tempo + 1);
      }, 1000);
    }
    return () => {
      if (temporizador) {
        clearInterval(temporizador);
      }
    };
  }, [iniciado]);

  const controlaInicio = () => {
    if (numVoltas === 0) setNumVoltas(1);
    setIniciado(!iniciado);
  };

  const incrementa = () => {
    setNumVoltas(numVoltas + 1);
  };

  const decrementa = () => {
    setNumVoltas(numVoltas > 0 ? numVoltas - 1 : 0);
  };

  const reiniciar = () => {
    setNumVoltas(0);
    setTempo(0);
  };

  return (
    <div className="App container">
      <img
        alt="ReactJS"
        className="React"
        title="React"
        style={{ transform: `rotate(${rotate}deg)` }}
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
      />
      <div className="container">
        <h3>Contador de Voltas</h3>
        <MostraVoltas voltas={numVoltas} />
        <p>
          <Button onClick={incrementa} text={"+"} />
          <Button onClick={decrementa} text={"-"} />
        </p>
        {numVoltas > 0 && (
          <MostraTempo tempo={tempo > 0 ? Math.round(tempo / numVoltas) : 0} />
        )}
        <Button
          onClick={controlaInicio}
          text={iniciado ? "Pausar" : "Iniciar"}
        />
        <Button onClick={reiniciar} text={"Reiniciar"} />
      </div>
    </div>
  );
}

export default App;
