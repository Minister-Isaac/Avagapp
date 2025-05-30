import React from "react";
import { useLocation, useParams } from "react-router-dom";
import QuizGameTwo from "../games/GameFour";
import FillGame from "../games/FillGame";
import DndElemet from "../games/DndElement";
import GameThree from "../games/GameThree";
import WordHuntGame from "../games/WordHunt";
import Game1 from "../create/Game1";
import Game2 from "../create/Game2";
import Game3 from "../create/Game3";
import Game4 from "../create/Game4";
import Game5 from "../create/Game5";
import { getUserProfile } from "../utils/auth";


function StudentGameDetails() {
  const { gameType } = useParams();
  const location = useLocation()
  const play = location.pathname.includes("student")

  const profile = getUserProfile()
  const student_id = profile?.id || null;

  // console.log(gameType);

  if (gameType === "fillInTheBlank") {
    return (
      <div>
        {play ? <FillGame student_id={student_id}/>
          : <Game2 />}   </div>
    )
  } else if (gameType === "WordHunt") {
    return (
      <div>
        {play ? <WordHuntGame /> : <Game5 />}
      </div>
    );
  } else if (gameType === "matchTheColoum") {
    return (
      <div>
        {play ? <GameThree />
          : <Game4 />}    </div>
    );
  } else if (gameType === "quiz") {
    return (
     <div>
       { play?<QuizGameTwo student_id={student_id}/> :  <Game1 />}
     </div>);
} else if (gameType === "dragAndDrop") {
  return (
    <div>
      {play ? <DndElemet />
        : <Game3 />}   </div>
  );
}
}

export default StudentGameDetails;
