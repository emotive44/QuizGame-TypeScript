import React, { FC } from "react";
import "./PublicJoker.css";

interface PublicJokerProps {
  correctAnsIndx: number;
}

const PublicJoker: FC<PublicJokerProps> = ({ correctAnsIndx }) => {
  let firstAns = Math.floor(Math.random() * 30) + 47;
  let secondAns = Math.floor(Math.random() * 30) + 6;
  let thirdAns = Math.floor(Math.random() * 20);
  let fourthAns = 0;

  if (100 - (firstAns + secondAns) < 0) {
    do {
      secondAns = Math.floor(Math.random() * 30) + 6;
    } while (firstAns + secondAns > 100);
  }

  if (100 - (firstAns + secondAns + thirdAns) < 0) {
    do {
      thirdAns = Math.floor(Math.random() * 20) + 5;
    } while (firstAns + secondAns + thirdAns > 100);
  }

  if (100 - (firstAns + secondAns + thirdAns) > 0) {
    fourthAns = 100 - (firstAns + secondAns + thirdAns);
  } else {
    fourthAns = 0;
  }

  let value = 0;
  switch (correctAnsIndx) {
    case 2:
      value = secondAns;
      secondAns = firstAns;
      firstAns = value;
      break;
    case 3:
      value = thirdAns;
      thirdAns = firstAns;
      firstAns = value;
      break;
    case 4:
      value = fourthAns;
      fourthAns = firstAns;
      firstAns = value;
      break;
    default:
      break;
  }

  return (
    <div className="public-joker">
      <div>
        A){" "}
        <span>
          <small
            style={{
              width: `${firstAns}%`,
            }}
          >
            {firstAns}%
          </small>
        </span>
      </div>
      <div>
        B){" "}
        <span>
          <small style={{ width: `${secondAns}%` }}>{secondAns}%</small>
        </span>
      </div>
      <div>
        C){" "}
        <span>
          <small style={{ width: `${thirdAns}%` }}>{thirdAns}%</small>
        </span>
      </div>
      <div>
        D){" "}
        <span>
          <small style={{ width: `${fourthAns}%` }}>{fourthAns}%</small>
        </span>
      </div>
    </div>
  );
};

export default PublicJoker;
