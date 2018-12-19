import React, { Component } from 'react';
import MatchCard from "./components/Matchcard";
import matches from "./matchcards.json";
import Wrapper from "./components/Wrapper";
import './App.css';

let correctGuesses = 0;
let bestScore = 0;

class App extends Component {

  state = {
    matches,
    correctGuesses,
    bestScore,

  };

  setClicked = id => {


    const matches = this.state.matches;


    const clickedMatch = matches.filter(match => match.id === id);


    if (clickedMatch[0].clicked) {

      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }
      this.setState({ correctGuesses });
      this.setState({ matches });


    } else if (correctGuesses < 11) {


      clickedMatch[0].clicked = true;
      correctGuesses++;

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }


      matches.sort(function (a, b) { return 0.5 - Math.random() });


      this.setState({ matches });
      this.setState({ correctGuesses });
    } else {


      clickedMatch[0].clicked = true;


      correctGuesses = 0;


      bestScore = 12;
      this.setState({ bestScore });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }


      matches.sort(function (a, b) { return 0.5 - Math.random() });


      this.setState({ matches });
      this.setState({ correctGuesses });


    }
  };

  render() {
    return (
      <div>
            <Wrapper>
        
                <h3 className="scoreSummary instructions">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary counter">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
            </Wrapper>
            </div>
    );
  }
}

export default App;
