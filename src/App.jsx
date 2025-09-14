import React from "react";
import Header from './components/header/Header.jsx';
import Smiley from './components/smiley/Smiley.jsx';
import Results from "./components/results/results.jsx";
import './app.style.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            smileys: ['😀', '😊', '😎', '🤩', '😍'],
            votes: {}, 
            winner: {},
            resultsShown: false,
        };
    }

    // ---------------------------------------------------------------------------------
    showResults = () => {
        const { votes } = this.state;
        const allVotes = Object.values(votes);

        if (!allVotes.some(count => count > 0)) {
            // no votes yet
            this.setState({ 
                winner: {},                
                resultsShown: true
             });
            return;
        }

        const maxVotes = Math.max(...allVotes);

        const winners = Object.entries(votes)
            .filter(([smiley, count]) => count === maxVotes);

        this.setState({
            winner: winners,
            resultsShown: true
        });
    };

    // ---------------------------------------------------------------------------------
    clearResults = () => {
        localStorage.removeItem('smileyVotes');
        const initialVotes = {};
        this.state.smileys.forEach(smiley => {
            initialVotes[smiley] = 0;
        });
        this.setState({
            votes: initialVotes,
            winner: {},
            resultsShown: false,
        });
    };

    // ---------------------------------------------------------------------------------
    componentDidMount() {
        const storedVotes = localStorage.getItem('smileyVotes');
        if (storedVotes) {
            this.setState({ votes: JSON.parse(storedVotes) });
        } else {
            // if localStorage is empty
            const initialVotes = {};
            this.state.smileys.forEach(smiley => {
                initialVotes[smiley] = 0;
            });
            this.setState({ votes: initialVotes });
        }
    }

    // ---------------------------------------------------------------------------------
    componentDidUpdate(prevProps, prevState) {
        if (this.state.votes !== prevState.votes) {
            localStorage.setItem('smileyVotes', JSON.stringify(this.state.votes));
        }
    }

    // ---------------------------------------------------------------------------------
    handleVote = (smiley) => {
        this.setState(prevState => ({
            votes: {
                ...prevState.votes,
                [smiley]: (prevState.votes[smiley] || 0) + 1,
            },
            winner: {},                
            resultsShown: false
        }));
    };
    
    // ---------------------------------------------------------------------------------
    render() {
        const {smileys, votes, resultsShown, winner} = this.state;
        return <div className="block">
            <Header title = 'Голосування за найкращий смайлик'/>
            <div className='smiley-block'>
                { smileys.map(currentEl => {
                    return <Smiley key={currentEl} 
                        value={currentEl}
                        votes={votes[currentEl] || 0}
                        onClick={() => this.handleVote(currentEl)}
                    />
                })}
            </div>
            <button  className="results-btn" onClick={this.showResults}>Show Results</button>
            {resultsShown ? (<Results winner={winner}/>) : <p></p>}
            <button  className="clr-results-btn" onClick={this.clearResults}>Очистити результати</button>
        </div>
    }
}
