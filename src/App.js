import React, { useState } from "react";
import "./styles.css";
import "./materialize.css";

export default function App() {
  const [titulo, setTitulo] = useState("Vamos brincar com o react?");
  const [frase, setFrase] = useState(
    "Informe um número de 0 a 300 e vou tentar descobrir qual é"
  );
  const [estado, setEstado] = useState("ENTRADA");
  const [num, setNum] = useState();
  const [palpite, setPalpite] = useState(150);
  const [numPalpite, setNumPalpite] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(301);
  const [color, setColor] = useState();
  const [msg, setMsg] = useState();

  const estadoInicial = () => {
    setTitulo("Vamos brincar com o react?");
    setFrase("Informe um número de 0 a 300 e vou tentar descobrir qual é");
    setEstado("ENTRADA");
    setNum("");
    setNumPalpite(1);
    setPalpite(150);
    setMin(0);
    setMax(301);
  };

  const acertou = (chute, valor) => {
    if (chute === valor) {
      setEstado("ACERTOU");
      if (numPalpite === 1) {
        toast(`Yes!!! Acertei com ${numPalpite} palpite :D`, "green");
        return;
      }
      toast(`Yes!!! Acertei com ${numPalpite} palpites :D`, "green");
      return;
    }
  };

  const toast = (msg, color) => {
    setMsg(msg);
    setColor(`card-panel ${color} darken-2`);
  };

  const menor = () => {
    setMsg("");
    const cont = parseInt((palpite - min) / 2) + min;
    acertou(cont, num);
    setPalpite(cont);
    setMax(palpite);
    setFrase(`O número é ${cont}?`);
    setNumPalpite(numPalpite + 1);
  };

  const maior = () => {
    setMsg("");
    const cont = parseInt((max - palpite) / 2) + palpite;
    acertou(cont, num);
    setPalpite(cont);
    setMin(palpite);
    setFrase(`O número é ${cont}?`);
    setNumPalpite(numPalpite + 1);
  };

  const guardaNum = (event) => {
    event.preventDefault();
    const numero = parseInt(num);
    if (!Number.isInteger(numero) || numero > 300) {
      toast("Informe um número válido", "red");
      estadoInicial();
      return;
    }
    if (typeof numero === "number") {
      setNum(numero);
      setTitulo("JOGO INICIADO");
      setFrase(`O número é ${palpite}?`);
      setEstado("JOGANDO");
      toast("Número guardado com sucesso!", "green");
      acertou(numero, palpite);
    }
  };
  const s = numPalpite > 1 ? "s" : "";
  return (
    <div className="App container">
      <img
        alt="ReactJS"
        className="React"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
      />
      <h3>{titulo}</h3>
      <h5>{frase}</h5>
      <div className="row">
        {estado === "ENTRADA" && (
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <textarea
                  id="icon_prefix2"
                  className="materialize-textarea white-text"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                />
                <label htmlFor="icon_prefix2">Digite aqui o número</label>
              </div>
              <button
                id="guardar"
                className="btn waves-effect pulse"
                name="action"
                onClick={guardaNum}
              >
                <span className="black-text">Guardar</span>
                <i className="material-icons right black-text">send</i>
              </button>
            </div>
          </form>
        )}
        {estado === "JOGANDO" && (
          <div className="row">
            <button
              id="menor"
              className="btn waves-effect"
              name="action"
              onClick={menor}
            >
              MENOR
            </button>
            <button
              id="maior"
              className="btn waves-effect"
              name="action"
              onClick={estadoInicial}
            >
              REINICIAR
            </button>
            <button
              id="maior"
              className="btn waves-effect"
              name="action"
              onClick={maior}
            >
              MAIOR
            </button>
          </div>
        )}
        {estado === "ACERTOU" && (
          <div>
            <p>ACERTOU</p>
            <button
              id="maior"
              className="btn waves-effect pulse"
              name="action"
              onClick={estadoInicial}
            >
              REINICIAR JOGOs
            </button>
          </div>
        )}
      </div>
      {msg && <div className={color}>{msg}</div>}
    </div>
  );
}
