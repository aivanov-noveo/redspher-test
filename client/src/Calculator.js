import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [inputExpression, setInputExpression] = useState("");
  const [calculationResult, setCalculationResult] = useState("");
  const [errorResult, setErrorResult] = useState("");

  const onCalculate = async (event) => {
    event.preventDefault();

    try {
      const { error, result } = await axios.post("http://localhost:4000/calc", {
        expression: inputExpression,
      });

      if (error !== undefined) {
        setErrorResult(error);
        return;
      }

      setCalculationResult(result);
    } catch (err) {
      console.error(err);
      setErrorResult("Unknown error");
    }
  };

  const calculationBlock =
    errorResult !== "" ? (
      <div className="form-group" class="alert alert-danger">
        <label color="red">Calculation error</label>
        <input value={errorResult} className="form-control" readOnly={true} />
      </div>
    ) : calculationResult !== "" ? (
      <div className="form-group" class="alert alert-success">
        <label>Calculation result</label>
        <input
          value={calculationResult}
          className="form-control"
          readOnly={true}
        />
      </div>
    ) : (
      <div />
    );

  return (
    <div>
      <form onSubmit={onCalculate}>
        <div className="form-group">
          <label>Enter an expression (e.g. 1+2-3*4+15/3)</label>
          <input
            value={inputExpression}
            onChange={(e) => setInputExpression(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Calculate</button>
        <hr />
        {calculationBlock}
      </form>
    </div>
  );
};
