import React, { useState, useEffect } from "react";
import "./Model.css";

const imgArr = [];
var numImages = 0;

const images = importAll(
  require.context("./../../images/images1", false, /\.(png|jpe?g|svg)$/)
);

for (const property in images) {
  imgArr.push(`${property}`);
  numImages += 1;
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

shuffle(imgArr);

function Model1(props) {
  const [count, setCount] = useState(0);
  const [right, setRight] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    setRight(right);
    setCount(count);
    if (count == 0) {
      setAccuracy(0);
    } else {
      setAccuracy(Math.floor((right * 100) / count));
    }
  });

  function allInOne(event) {
    console.log(event.target.innerText.toLowerCase());

    if (
      imgArr[count].toLowerCase().includes(event.target.innerText.toLowerCase())
    ) {
      setRight(right + 1);
      setCount(count + 1);
    } else {
      setCount(count + 1);
    }
  }

  if (count >= numImages) {
    return (
      <div id="Model 1" className="center-screen">
        <div id="Photo" className="">
          <img
            alt={`Picture ${count}`}
            className="photo"
            src={images[imgArr[count - 1]].default}
          />
        </div>
        <div id="numbers" style={{ textAlign: "center" }}>
          <div
            id="correct"
            style={{ display: "inline-block", marginRight: 20 }}
          >
            <p style={{ fontSize: 20, marginBottom: 0 }}>CORRECT</p>
            <strong>
              <p style={{ fontSize: 30, marginTop: 0 }}>
                {right}/{count}
              </p>
            </strong>
          </div>
          <div id="accuracy" style={{ display: "inline-block" }}>
            <p style={{ fontSize: 20, marginBottom: 0 }}>ACCURACY</p>
            <strong>
              <p style={{ fontSize: 30, marginTop: 0 }}>{accuracy}%</p>
            </strong>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="Model 1" className="center-screen">
        <div id="separate" className="grid">
          <div id="Photo" className="">
            <img
              alt={`Picture ${count}`}
              className="photo"
              src={images[imgArr[count]].default}
            />
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

        <footer>
          <div id="numbers" style={{ float: "right" }}>
            <div
              id="correct"
              style={{ display: "inline-block", marginRight: 20 }}
            >
              <p style={{ fontSize: 20, marginBottom: 0 }}>CORRECT</p>
              <strong>
                <p style={{ fontSize: 30, marginTop: 0 }}>
                  {right}/{count}
                </p>
              </strong>
            </div>
            <div id="accuracy" style={{ display: "inline-block" }}>
              <p style={{ fontSize: 20, marginBottom: 0 }}>ACCURACY</p>
              <strong>
                <p style={{ fontSize: 30, marginTop: 0 }}>{accuracy}%</p>
              </strong>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Model1;
