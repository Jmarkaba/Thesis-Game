import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./Model.css";
import axios from "axios";

var numImages = 0;

// const real = importAll(
//   require.context("./../../images/real", false, /\.(png|jpe?g|svg)$/)
// );

const model1 = objToArr(
  importAll(
    require.context("./../../images/model1", false, /\.(png|jpe?g|svg)$/)
  )
);

const model2 = objToArr(
  importAll(
    require.context("./../../images/model2", false, /\.(png|jpe?g|svg)$/)
  )
);

const model3 = objToArr(
  importAll(
    require.context("./../../images/model3", false, /\.(png|jpe?g|svg)$/)
  )
);

const model4 = objToArr(
  importAll(
    require.context("./../../images/model4", false, /\.(png|jpe?g|svg)$/)
  )
);

const model5 = objToArr(
  importAll(
    require.context("./../../images/model5", false, /\.(png|jpe?g|svg)$/)
  )
);

shuffle(real);
shuffle(model1);
shuffle(model2);
shuffle(model3);
shuffle(model4);
shuffle(model5);
const combined = [].concat.apply(
  [],
  [
    real.slice(0, 150),
    model1.slice(0, 30),
    model2.slice(0, 30),
    model3.slice(0, 30),
    model4.slice(0, 30),
    model5.slice(0, 30),
  ]
);
// const combined = [].concat.apply(
//   [],
//   [model1.slice(0, 30), model2.slice(0, 30), model3.slice(0, 30)]
// );
shuffle(combined);
numImages = combined.length;

function objToArr(obj) {
  let arr = [];
  for (const item in obj) {
    arr.push(obj[item].default);
  }
  return arr;
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function Model1(props, event) {
  const [count, setCount] = useState(0);
  const [right, setRight] = useState(0);
  const [result, setResult] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setRight(right);
    setCount(count);
    setDone(done);

    if (count >= numImages || (done && count > 0)) {
      axios
        .post(
          "https://sheet.best/api/sheets/e30f7cf2-4d32-4f88-adc5-87bfb5425203",
          result,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log(response);
        });
    }
  }, [right, count, done]);

  function allInOne(event) {
    if (
      combined[count]
        .toLowerCase()
        .includes(event.target.innerText.toLowerCase())
    ) {
      setRight(right + 1);
      setCount(count + 1);
      setResult((result) => [
        ...result,
        {
          file: combined[count].slice(0, -13).slice(14) + ".png",
          chosen: event.target.innerText.toLowerCase(),
          actual: event.target.innerText.toLowerCase(),
          result: "correct",
        },
      ]);
    } else {
      setCount(count + 1);
      setResult((result) => [
        ...result,
        {
          file: combined[count].slice(0, -13).slice(14) + ".png",
          chosen: event.target.innerText.toLowerCase(),
          actual: combined[count].toLowerCase().includes("real")
            ? "real"
            : "fake",
          result: "incorrect",
        },
      ]);
    }
  }

  if (count >= numImages || done) {
    return (
      <div id="Model 1" className="center-screen">
        <div id="numbers" style={{ textAlign: "center" }}>
          <div>
            <p style={{ fontSize: 30, marginTop: 0 }}>
              Thank you so much for participating!
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="Model 1" className="center-screen">
        <div id="separate" className="grid">
          <div id="Photo" className="">
            <img alt={`Pic ${count}`} className="photo" src={combined[count]} />
          </div>
          <div className="panel">
            <div className="or"></div>
            <div className="options results">
              <div
                id="blue"
                onClick={(e) => allInOne(e)}
                className="choice-block blue-choice"
              >
                <h1>REAL</h1>
              </div>
              <div
                id="red"
                onClick={(e) => {
                  allInOne(e);
                }}
                className="choice-block red-choice"
              >
                <h1>FAKE</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="numbers">
            <div
              id="done"
              style={{ display: "inline-block", float: "left", marginTop: 25 }}
            >
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setDone(true)}
              >
                Done
              </Button>
            </div>
            <div
              id="correct"
              style={{
                display: "inline-block",
                marginRight: 20,
                float: "right",
              }}
            >
              <p style={{ fontSize: 20, marginBottom: 0 }}>Image</p>
              <strong>
                <p style={{ fontSize: 30, marginTop: 0 }}>
                  {count}/{numImages}
                </p>
              </strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Model1;
