// @flow
import * as React from "react";
import long from "../so_good.png";
import { getHelloMeal } from "../request/mealManager";

type Props = {};
export function Homepage(props: Props) {
  const [meal, setMeal] = React.useState("");

  React.useEffect(() => {
    const hello = getHelloMeal();
    hello.then((response) => {
      setMeal(response);
    });
  }, []);

  return (
    <div>
      <header className="App-header">
        <img src={long} className="App-logo" alt="logo" />
        <div style={{ height: 100 }} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
