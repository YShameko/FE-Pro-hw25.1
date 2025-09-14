import React from "react";
import Smiley from "../smiley/Smiley";
import './results.style.css';

export default class Results extends React.Component {
    render() {
        const {winner} = this.props;
        console.log(winner);
        return <div className="results-block">
            <h2>Результати голосування:</h2>
            {winner.length > 0 ? (
                winner.length > 1 ? (
                    <div>
                        <h3>Найбільш популярні:</h3>
                        <div className="smiley-block">
                            {winner.map(currentEl => {
                                return <Smiley key={currentEl} 
                                    value={currentEl[0]}
                                    votes={winner[currentEl]}
                            />
                            })}
                            <p>Кількість голосів: {winner[0][1]}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3>Переможець:</h3>
                        <div className="smiley-block">
                            {winner.map(currentEl => {
                                return <Smiley key={currentEl} 
                                    value={currentEl[0]}
                                    votes={winner[currentEl]}
                            />
                            })}
                            <p>Кількість голосів: {winner[0][1]}</p>
                        </div>
                    </div>
                )
            ) : (
                <h3>Поки ще немає голосів!</h3>
            )}
        </div>
    }
}