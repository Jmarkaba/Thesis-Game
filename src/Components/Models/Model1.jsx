import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "./Model.css";
import axios from "axios";

var numImages = 0;

const zeroPad = (num, places) => String(num).padStart(places, "0");
const real = [...Array(2663).keys()].map(
  (v, _) =>
    "https://thesis-gan-storage.s3-us-west-2.amazonaws.com/real/realimage" +
    zeroPad(v, 4) +
    ".png"
);
const model1 = [...Array(2672).keys()].map(
  (v, _) =>
    "https://thesis-gan-storage.s3-us-west-2.amazonaws.com/model1/fakeModel1images" +
    zeroPad(v, 4) +
    ".png"
);
const model2 = [...Array(2677).keys()].map(
  (v, _) =>
    "https://thesis-gan-storage.s3-us-west-2.amazonaws.com/model2/fakeModel2images" +
    zeroPad(v, 4) +
    ".png"
);
const model3 = [...Array(2681).keys()].map(
  (v, _) =>
    "https://thesis-gan-storage.s3-us-west-2.amazonaws.com/model3/fakeModel3images" +
    zeroPad(v, 4) +
    ".png"
);
const model4 = [...Array(2663).keys()].map(
  (v, _) =>
    "https://thesis-gan-storage.s3-us-west-2.amazonaws.com/model4/fakeModel4images" +
    zeroPad(v, 4) +
    ".png"
);
const model5 = [...Array(2672).keys()].map(
  (v, _) =>
    "https://thesis-gan-storage.s3-us-west-2.amazonaws.com/model5/fakeModel5images" +
    zeroPad(v, 4) +
    ".png"
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
shuffle(combined);
numImages = combined.length;

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
          file: combined[count].slice(combined[count].lastIndexOf("/") + 1),
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
          file: combined[count].slice(combined[count].lastIndexOf("/") + 1),
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
        <div id="para" style={{ paddingTop: 50, fontSize: 21 }}>
          <p>
            The purpose of this project is to generate realistic colored images
            from black and white ones. <br></br>
            <br></br>
            In order to gauge model accuracy, vote "Real" if the colored image
            looks realistic and "Fake" if the image was colored by the computer.{" "}
            <br></br>
            <br></br>
            Once you've finished or just don't have time for more, submit by
            pressing the Done button below.
          </p>
        </div>
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
