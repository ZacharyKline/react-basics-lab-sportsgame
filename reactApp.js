
// Default App component that all other compents are rendered through

function Team(props) {
    let shotSpot = ''
    if (props.stats.shots) {
      const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
      shotSpot = (
				<div>
					Shooting % <span>{shotPercentage}</span>
				</div>
			);
    }
		return (
			<div className="Team">
				<div id="teamSpot">
					<img src={props.logo} height="300px" width="300px" />
					<h3>{props.name}</h3>
					<div className="scoreArea">
						<p>
							Attacks: <span>{props.stats.shots}</span>
						</p>
						<p>
							Kills: <span>{props.stats.score}</span>
            </p>
						<button onClick={props.handleShoot}>Take a shot</button>
					</div>
					{shotSpot}
				</div>
			</div>
		);
	}

function ScoreBoard(props) {
  return (
    <div className='ScoreBoard'>
      <div className='teamStats'>
        <h4>HOME TEAM</h4>
        <h4>{props.homeTeamStats.score}</h4>
      </div>
      <h2> SCOREBOARD</h2>
      <div className='teamStats'>
        <h4>VISITING TEAM</h4>
        <h4>{props.visitingTeamStats.score}</h4>
      </div>
    </div>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      }
    }
    this.shotSound = new Audio('./assets/audio/predshoot.wav')
    this.shotScore = new Audio('./assets/audio/alienscore.wav')
  }

  handleShoot = (team) => {
    const teamStatsKey = `${team}TeamStats`
    let random = Math.floor(Math.random() * 10)
    this.shotScore.play()
    let score = this.state[teamStatsKey].score
    if (random >= 5) {
      score += 1
      setTimeout(() =>{
        this.shotScore.play()
      }, 1000)
    }

    
    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score,
      }
      }))
    
    console.log(random)
  };

  resetGame = (event) => {
    this.setState((state, props) => ({
      resetCount: state.resetCount += 1,
      homeTeamStats: {
        shots: 0,
        score: 0,
        wins: 0,
        stocks: 20
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
        wins: 0,
        stocks: 20
        }
    }))
  }

  render() {
    return (
      <div className="Game">
        <ScoreBoard
          homeTeamStats={this.state.homeTeamStats}
          visitingTeamStats={this.state.visitingTeamStats}
        />
				<h2>Hosted at: {this.props.venue}</h2>
				<div id="Content">
					<Team
						name={this.props.homeTeam.name}
						logo={this.props.homeTeam.logo}
						stats={this.state.homeTeamStats}
						handleShoot={() => this.handleShoot("home")}
					/>
					<div className="Versus">
						<h1>VS</h1>
						<div>
							<strong>Resets</strong> {this.state.resetCount}
              <br />
              <br />
							<button onClick={this.resetGame}>Reset Game?</button>
						</div>
					</div>
					<Team
						name={this.props.visitingTeam.name}
						logo={this.props.visitingTeam.logo}
						stats={this.state.visitingTeamStats}
						handleShoot={() => this.handleShoot("visiting")}
					/>
				</div>
			</div>
		);
  }
} 

function App(props) {
  const preds = {
    name: 'Preds',
    logo: "./assets/images/pred.jpg"

  }
  const aliens = {
		name: "Xenomorphs",
		logo: "./assets/images/alien.jpg"
	};
	return (
		<div className="App">
			<h1>The Deadliest Sports Game in the Galaxy</h1>

      <Game
        venue="LV-426"
        homeTeam={aliens}
        visitingTeam={preds}
      />
		</div>
	);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);