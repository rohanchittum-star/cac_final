import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [mainPage, setMainPage] = useState("home");
  
  if (mainPage === "home") {
    return <MainMenu setMainPage={setMainPage} />;
  }
  
  if (mainPage === "mathMadness") {
    return <MathMadness setMainPage={setMainPage} />;
  }
  
  if (mainPage === "functionFlip") {
    return <FunctionFlip setMainPage={setMainPage} />;
  }
  
  return null;
}

function MainMenu({ setMainPage }) {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
    gap: "30px",
    textAlign: "center",
    backgroundColor: "#1a1a2e",
  };

  const buttonStyle = {
    padding: "20px 40px",
    fontSize: "1.5rem",
    backgroundColor: "#0f3460",
    color: "#fff",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    width: "300px",
    transition: "all 0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "4rem", color: "#e94560", marginBottom: "20px" }}>Math Quest</h1>
      <p style={{ fontSize: "1.2rem", color: "#fff", maxWidth: "600px", marginBottom: "20px" }}>
        Choose your math adventure!
      </p>
      <button 
        style={buttonStyle} 
        onClick={() => setMainPage("mathMadness")}
        onMouseOver={(e) => e.target.style.backgroundColor = "#16213e"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#0f3460"}
      >
        Math Madness
      </button>
      <button 
        style={buttonStyle} 
        onClick={() => setMainPage("functionFlip")}
        onMouseOver={(e) => e.target.style.backgroundColor = "#16213e"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#0f3460"}
      >
        Function Flip
      </button>
    </div>
  );
}

function MathMadness({ setMainPage }) {
  const [page, setPage] = useState('home');
  const [algebraStarted, setAlgebraStarted] = useState(false);
  const [probabilityStarted, setProbabilityStarted] = useState(false);
  const [radicalsStarted, setRadicalsStarted] = useState(false);
  const [quadraticStarted, setQuadraticStarted] = useState(false);
  const [npcHorses, setNpcHorses] = useState(Array(7).fill(0));
  const [playerHorse, setPlayerHorse] = useState(0);
  let playerPlace = 0
  const [levelResults, setLevelResults] = useState({
    algebra: {},
    probability: {},
    radicals: {},
    quadratics: {},
  });


  const finishRace = (track, level, playerPosition) => {
    let color;
    if (playerPosition === 1) color = 'gold';
    else if (playerPosition === 2) color = 'silver';
    else if (playerPosition === 3) color = '#cd7f32';
    else return;

    setLevelResults(prev => ({
      ...prev,
      [track]: {
        ...prev[track],
        [level]: color,
      },
    }));
  };
  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  };
  const CirclebuttonStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: '#fe4c40',
    color: 'white',
    border: '2px solid #000000',
    fontFamily: 'Helvetica',
    borderRadius: '100%',
    cursor: 'pointer',
  };
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  };
  const trackStyle = {
    width: window.innerWidth,
    height: '80%',
    border: '2px solid #000000',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#7BB369',
  };
  const laneStyle = {
    flex: 1,
    margin: '5px 0',
    backgroundColor: '#8F7348',
    borderRadius: '5px',
  };


  useEffect(() => {
    if (!algebraStarted) return;
    const interval = setInterval(() => {
      setNpcHorses(prev => prev.map(pos => pos + (window.innerWidth/((Math.random() * 10000)))));
    }, 100);
    return () => clearInterval(interval);
  }, [algebraStarted]);

  useEffect(() => {
    if (!probabilityStarted) return;
    const interval = setInterval(() => {
      setNpcHorses(prev => prev.map(pos => pos + (window.innerWidth/((Math.random() * 10000)))));
    }, 100);
    return () => clearInterval(interval);
  }, [probabilityStarted]);

  useEffect(() => {
    if (!radicalsStarted) return;
    const interval = setInterval(() => {
      setNpcHorses(prev => prev.map(pos => pos + (window.innerWidth/((Math.random() * 10000)))));
    }, 100);
    return () => clearInterval(interval);
  }, [radicalsStarted]);
  useEffect(() => {
    if (!quadraticStarted) return;
    const interval = setInterval(() => {
      setNpcHorses(prev => prev.map(pos => pos + (window.innerWidth/((Math.random() * 10000)))));
    }, 100);
    return () => clearInterval(interval);
  }, [quadraticStarted]);


  useEffect(() => {
    if (!algebraStarted && !probabilityStarted && !radicalsStarted && !quadraticStarted) return;
  

    const finishLine = window.innerWidth - 10; 
    const handleFinish = (track, startedSetter) => {
      const positions = [...npcHorses, playerHorse].sort((a, b) => b - a)
      playerPlace = positions.indexOf(playerHorse) + 1;
      var level = prompt('Enter level number that you played');
      finishRace(track, level , playerPlace);
      alert(
        `You finished ${
          playerPlace === 1
            ? '1st 🥇'
            : playerPlace === 2
            ? '2nd 🥈'
            : playerPlace === 3
            ? '3rd 🥉'
            : `${playerPlace}th`
        } place!`
      );
      startedSetter(false);
      setPlayerHorse(0);
      setNpcHorses(Array(7).fill(0));
    };
  
    if (algebraStarted && playerHorse >= finishLine) handleFinish('algebra', setAlgebraStarted);
    if (probabilityStarted && playerHorse >= finishLine) handleFinish('probability', setProbabilityStarted);
    if (radicalsStarted && playerHorse >= finishLine) handleFinish('radicals', setRadicalsStarted);
    if (quadraticStarted && playerHorse >= finishLine) handleFinish('quadratics', setQuadraticStarted);

  }, [playerHorse, npcHorses]);
  if (page === 'tutorial') {
    return (
      <div style={{ width: '100%', height: '100vh', backgroundColor: '#f7f7f7', padding: '50px', overflowY: 'auto' }}>
        <h1>Game Tutorial</h1>
        <p>Welcome to our math game! Here’s how to play:</p>

        <h2>1. Navigate Pages</h2>
        <p>Use the buttons to move between the home page, algebra levels, and other subjects.</p>

        <h2>2. Levels</h2>
        <p>Math Madness is a game in which you will be solving equations to win the horse race.
There are four different levels with the beginner level being Algebra and getting progressively harder. There will be 20 levels per section. Each level has 10 
Questions.
 When you press the boost button you will get a random question and if you answer correctly your horse will move forward. Once you finish the race the level will turn the color of the positions you got. All in all it is a fun way to exercise your math skills in a fun way.</p>

        <h2>3. Back Button</h2>
        <p>At any page, click the <strong>Back</strong> button to return to the previous menu or home page.</p>

        <h2>4. Tips</h2>
        <ul>
          <li>Try to complete levels in order.</li>
          <li>Check your progress often.</li>
          <li>Have fun and challenge yourself!</li>
        </ul>

        {/* Back Button */}
        <button
          onClick={() => setPage('home')}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px',backgroundColor: '#007bff',  margin: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'}}
        >
          Back
        </button>
      </div>
    );
  }
  if (page === 'algebra') {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          position: 'relative',
          backgroundColor: 'grey',
        }}
      >
        <div style={{ width: window.innerWidth, height: '100%', position: 'relative' }}>
          {/* Row 1 */}
          <button onClick={() => setPage('algebra1')}  style={{position: 'absolute', top: '50px',  left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['1']  || '#fe4c40'}}>Level 1</button>
          <button onClick={() => setPage('algebra1')}  style={{position: 'absolute', top: '50px',  left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['2']  || '#fe4c40'}}>Level 2</button>
          <button onClick={() => setPage('algebra1')}  style={{position: 'absolute', top: '50px',  left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['3']  || '#fe4c40'}}>Level 3</button>
          <button onClick={() => setPage('algebra1')}  style={{position: 'absolute', top: '50px',  left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['4']  || '#fe4c40'}}>Level 4</button>
          <button onClick={() => setPage('algebra1')}  style={{position: 'absolute', top: '50px',  left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['5']  || '#fe4c40'}}>Level 5</button>

          {/* Row 2 */}
          <button onClick={() => setPage('algebra2')}  style={{position: 'absolute', top: '150px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['6']  || '#fe4c40'}}>Level 6</button>
          <button onClick={() => setPage('algebra2')}  style={{position: 'absolute', top: '150px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['7']  || '#fe4c40'}}>Level 7</button>
          <button onClick={() => setPage('algebra2')}  style={{position: 'absolute', top: '150px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['8']  || '#fe4c40'}}>Level 8</button>
          <button onClick={() => setPage('algebra2')}  style={{position: 'absolute', top: '150px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['9']  || '#fe4c40'}}>Level 9</button>
          <button onClick={() => setPage('algebra2')} style={{position: 'absolute', top: '150px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['10'] || '#fe4c40'}}>Level 10</button>

          {/* Row 3 */}
          <button onClick={() => setPage('algebra3')} style={{position: 'absolute', top: '250px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['11'] || '#fe4c40'}}>Level 11</button>
          <button onClick={() => setPage('algebra3')} style={{position: 'absolute', top: '250px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['12'] || '#fe4c40'}}>Level 12</button>
          <button onClick={() => setPage('algebra3')} style={{position: 'absolute', top: '250px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['13'] || '#fe4c40'}}>Level 13</button>
          <button onClick={() => setPage('algebra3')} style={{position: 'absolute', top: '250px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['14'] || '#fe4c40'}}>Level 14</button>
          <button onClick={() => setPage('algebra3')} style={{position: 'absolute', top: '250px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['15'] || '#fe4c40'}}>Level 15</button>

          {/* Row 4 */}
          <button onClick={() => setPage('algebra4')} style={{position: 'absolute', top: '350px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['16'] || '#fe4c40'}}>Level 16</button>
          <button onClick={() => setPage('algebra4')} style={{position: 'absolute', top: '350px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['17'] || '#fe4c40'}}>Level 17</button>
          <button onClick={() => setPage('algebra4')} style={{position: 'absolute', top: '350px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['18'] || '#fe4c40'}}>Level 18</button>
          <button onClick={() => setPage('algebra4')} style={{position: 'absolute', top: '350px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['19'] || '#fe4c40'}}>Level 19</button>
          <button onClick={() => setPage('algebra4')} style={{position: 'absolute', top: '350px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.algebra['20'] || '#fe4c40'}}>Level 20</button>


          <button
            onClick={() => setPage('home')}
            style={{
              ...buttonStyle,
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (page === 'probability') {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          position: 'relative',
          backgroundColor: 'lightblue',
        }}
      >
        <div style={{ width: window.innerWidth, height: '100%', position: 'relative' }}>
        <button onClick={() => setPage('probability1')}  style={{position: 'absolute', top: '50px',  left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['1']  || '#fe4c40'}}>Level 1</button>
        <button onClick={() => setPage('probability1')}  style={{position: 'absolute', top: '50px',  left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['2']  || '#fe4c40'}}>Level 2</button>
        <button onClick={() => setPage('probability1')}  style={{position: 'absolute', top: '50px',  left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['3']  || '#fe4c40'}}>Level 3</button>
        <button onClick={() => setPage('probability1')}  style={{position: 'absolute', top: '50px',  left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['4']  || '#fe4c40'}}>Level 4</button>
        <button onClick={() => setPage('probability1')}  style={{position: 'absolute', top: '50px',  left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['5']  || '#fe4c40'}}>Level 5</button>


        <button onClick={() => setPage('probability2')}  style={{position: 'absolute', top: '150px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['6']  || '#fe4c40'}}>Level 6</button>
        <button onClick={() => setPage('probability2')}  style={{position: 'absolute', top: '150px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['7']  || '#fe4c40'}}>Level 7</button>
        <button onClick={() => setPage('probability2')}  style={{position: 'absolute', top: '150px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['8']  || '#fe4c40'}}>Level 8</button>
        <button onClick={() => setPage('probability2')}  style={{position: 'absolute', top: '150px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['9']  || '#fe4c40'}}>Level 9</button>
        <button onClick={() => setPage('probability2')} style={{position: 'absolute', top: '150px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['10'] || '#fe4c40'}}>Level 10</button>

        {/* Row 3 */}
        <button onClick={() => setPage('probability3')} style={{position: 'absolute', top: '250px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['11'] || '#fe4c40'}}>Level 11</button>
        <button onClick={() => setPage('probability3')} style={{position: 'absolute', top: '250px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['12'] || '#fe4c40'}}>Level 12</button>
        <button onClick={() => setPage('probability3')} style={{position: 'absolute', top: '250px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['13'] || '#fe4c40'}}>Level 13</button>
        <button onClick={() => setPage('probability3')} style={{position: 'absolute', top: '250px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['14'] || '#fe4c40'}}>Level 14</button>
        <button onClick={() => setPage('probability3')} style={{position: 'absolute', top: '250px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['15'] || '#fe4c40'}}>Level 15</button>

        {/* Row 4 */}
        <button onClick={() => setPage('probability4')} style={{position: 'absolute', top: '350px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['16'] || '#fe4c40'}}>Level 16</button>
        <button onClick={() => setPage('probability4')} style={{position: 'absolute', top: '350px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['17'] || '#fe4c40'}}>Level 17</button>
        <button onClick={() => setPage('probability4')} style={{position: 'absolute', top: '350px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['18'] || '#fe4c40'}}>Level 18</button>
        <button onClick={() => setPage('probability4')} style={{position: 'absolute', top: '350px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['19'] || '#fe4c40'}}>Level 19</button>
        <button onClick={() => setPage('probability4')} style={{position: 'absolute', top: '350px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.probability['20'] || '#fe4c40'}}>Level 20</button>


          <button
            onClick={() => setPage('home')}
            style={{
              ...buttonStyle,
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (page === 'radicals') {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          position: 'relative',
          backgroundColor: '#d8bfd8',
        }}
      >
        <div style={{ width: window.innerWidth, height: '100%', position: 'relative' }}>
        <button onClick={() => setPage('radicals1')}  style={{position: 'absolute', top: '50px',  left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['1']  || '#fe4c40'}}>Level 1</button>
        <button onClick={() => setPage('radicals1')}  style={{position: 'absolute', top: '50px',  left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['2']  || '#fe4c40'}}>Level 2</button>
        <button onClick={() => setPage('radicals1')}  style={{position: 'absolute', top: '50px',  left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['3']  || '#fe4c40'}}>Level 3</button>
        <button onClick={() => setPage('radicals1')}  style={{position: 'absolute', top: '50px',  left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['4']  || '#fe4c40'}}>Level 4</button>
        <button onClick={() => setPage('radicals1')}  style={{position: 'absolute', top: '50px',  left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['5']  || '#fe4c40'}}>Level 5</button>

        <button onClick={() => setPage('radicals2')}  style={{position: 'absolute', top: '150px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['6']  || '#fe4c40'}}>Level 6</button>
        <button onClick={() => setPage('radicals2')}  style={{position: 'absolute', top: '150px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['7']  || '#fe4c40'}}>Level 7</button>
        <button onClick={() => setPage('radicals2')}  style={{position: 'absolute', top: '150px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['8']  || '#fe4c40'}}>Level 8</button>
        <button onClick={() => setPage('radicals2')}  style={{position: 'absolute', top: '150px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['9']  || '#fe4c40'}}>Level 9</button>
        <button onClick={() => setPage('radicals2')} style={{position: 'absolute', top: '150px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['10'] || '#fe4c40'}}>Level 10</button>

        {/* Row 3 */}
        <button onClick={() => setPage('radicals3')} style={{position: 'absolute', top: '250px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['11'] || '#fe4c40'}}>Level 11</button>
        <button onClick={() => setPage('radicals3')} style={{position: 'absolute', top: '250px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['12'] || '#fe4c40'}}>Level 12</button>
        <button onClick={() => setPage('radicals3')} style={{position: 'absolute', top: '250px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['13'] || '#fe4c40'}}>Level 13</button>
        <button onClick={() => setPage('radicals3')} style={{position: 'absolute', top: '250px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['14'] || '#fe4c40'}}>Level 14</button>
        <button onClick={() => setPage('radicals3')} style={{position: 'absolute', top: '250px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['15'] || '#fe4c40'}}>Level 15</button>

        {/* Row 4 */}
        <button onClick={() => setPage('radicals4')} style={{position: 'absolute', top: '350px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['16'] || '#fe4c40'}}>Level 16</button>
        <button onClick={() => setPage('radicals4')} style={{position: 'absolute', top: '350px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['17'] || '#fe4c40'}}>Level 17</button>
        <button onClick={() => setPage('radicals4')} style={{position: 'absolute', top: '350px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['18'] || '#fe4c40'}}>Level 18</button>
        <button onClick={() => setPage('radicals4')} style={{position: 'absolute', top: '350px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['19'] || '#fe4c40'}}>Level 19</button>
        <button onClick={() => setPage('radicals4')} style={{position: 'absolute', top: '350px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.radicals['20'] || '#fe4c40'}}>Level 20</button>


          <button
            onClick={() => setPage('home')}
            style={{
              ...buttonStyle,
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
  if (page === 'quadratics') {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          position: 'relative',
          backgroundColor: '#d8bfd8',
        }}
      >
        <div style={{ width: '2000px', height: '100%', position: 'relative' }}>
        <button onClick={() => setPage('quadratics1')}  style={{position: 'absolute', top: '50px',  left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['1']  || '#fe4c40'}}>Level 1</button>
        <button onClick={() => setPage('quadratics1')}  style={{position: 'absolute', top: '50px',  left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['2']  || '#fe4c40'}}>Level 2</button>
        <button onClick={() => setPage('quadratics1')}  style={{position: 'absolute', top: '50px',  left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['3']  || '#fe4c40'}}>Level 3</button>
        <button onClick={() => setPage('quadratics1')}  style={{position: 'absolute', top: '50px',  left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['4']  || '#fe4c40'}}>Level 4</button>
        <button onClick={() => setPage('quadratics1')}  style={{position: 'absolute', top: '50px',  left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['5']  || '#fe4c40'}}>Level 5</button>

        <button onClick={() => setPage('quadratics2')}  style={{position: 'absolute', top: '150px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['6']  || '#fe4c40'}}>Level 6</button>
        <button onClick={() => setPage('quadratics2')}  style={{position: 'absolute', top: '150px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['7']  || '#fe4c40'}}>Level 7</button>
        <button onClick={() => setPage('quadratics2')}  style={{position: 'absolute', top: '150px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['8']  || '#fe4c40'}}>Level 8</button>
        <button onClick={() => setPage('quadratics2')}  style={{position: 'absolute', top: '150px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['9']  || '#fe4c40'}}>Level 9</button>
        <button onClick={() => setPage('quadratics2')} style={{position: 'absolute', top: '150px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['10'] || '#fe4c40'}}>Level 10</button>

        {/* Row 3 */}
        <button onClick={() => setPage('quadratics3')} style={{position: 'absolute', top: '250px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['11'] || '#fe4c40'}}>Level 11</button>
        <button onClick={() => setPage('quadratics3')} style={{position: 'absolute', top: '250px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['12'] || '#fe4c40'}}>Level 12</button>
        <button onClick={() => setPage('quadratics3')} style={{position: 'absolute', top: '250px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['13'] || '#fe4c40'}}>Level 13</button>
        <button onClick={() => setPage('quadratics3')} style={{position: 'absolute', top: '250px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['14'] || '#fe4c40'}}>Level 14</button>
        <button onClick={() => setPage('quadratics3')} style={{position: 'absolute', top: '250px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['15'] || '#fe4c40'}}>Level 15</button>

        {/* Row 4 */}
        <button onClick={() => setPage('quadratics4')} style={{position: 'absolute', top: '350px', left: '150px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['16'] || '#fe4c40'}}>Level 16</button>
        <button onClick={() => setPage('quadratics4')} style={{position: 'absolute', top: '350px', left: '350px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['17'] || '#fe4c40'}}>Level 17</button>
        <button onClick={() => setPage('quadratics4')} style={{position: 'absolute', top: '350px', left: '550px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['18'] || '#fe4c40'}}>Level 18</button>
        <button onClick={() => setPage('quadratics4')} style={{position: 'absolute', top: '350px', left: '750px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['19'] || '#fe4c40'}}>Level 19</button>
        <button onClick={() => setPage('quadratics4')} style={{position: 'absolute', top: '350px', left: '950px', ...CirclebuttonStyle, backgroundColor: levelResults.quadratics['20'] || '#fe4c40'}}>Level 20</button>


          <button
            onClick={() => setPage('home')}
            style={{
              ...buttonStyle,
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
  if (page === 'algebra1') {
    const problems = [
      { question: 'x+3=10', answer: 7 },
      { question: 'x−7=−2', answer: 5 },
      { question: '2x=14', answer: 7 },
      { question: 'x/5=9', answer: 45 },
      { question: '3x+2=17', answer: 5 },
      { question: 'x−11=4', answer: 15 },
      { question: '5x=35', answer: 7 },
      { question: 'x/8+2=5', answer: 24 },
      { question: '4x−3=9', answer: 3 },
      { question: 'x+6=16', answer: 10 },
      { question: '2x+7=13', answer: 3 },
      { question: 'x/2=6', answer: 12 },
      { question: '7x=49', answer: 7 },
      { question: 'x+18=25', answer: 7 },
      { question: 'x−13=1', answer: 14 },
      { question: '3x−4=5', answer: 3 },
      { question: 'x/4+3=7', answer: 16 },
      { question: '2x=20', answer: 10 },
      { question: 'x−6=2', answer: 8 },
      { question: 'x/3=15', answer: 45 },
      { question: '5x−10=10', answer: 4 },
      { question: 'x+1=9', answer: 8 },
      { question: 'x−2=14', answer: 16 },
      { question: '6x=36', answer: 6 },
      { question: '3x+5=14', answer: 3 },
      { question: 'x/2−1=4', answer: 10 },
      { question: '4x=32', answer: 8 },
      { question: 'x+4=12', answer: 8 },
      { question: 'x−8=0', answer: 8 },
      { question: '2x+8=16', answer: 4 },
      { question: '10x=50', answer: 5 },
      { question: 'x+7=21', answer: 14 },
      { question: '2x=18', answer: 9 },
      { question: '4x−2=10', answer: 3 },
      { question: 'x+13=20', answer: 7 },
      { question: 'x−9=1', answer: 10 },
      { question: 'x/3+4=10', answer: 18 },
      { question: '2x−7=9', answer: 8 },
      { question: 'x+11=17', answer: 6 },
      { question: '6x=48', answer: 8 },
      { question: 'x−12=0', answer: 12 },
      { question: '2x+2=8', answer: 3 },
      { question: 'x/6=5', answer: 30 },
      { question: 'x+5=19', answer: 14 },
      { question: 'x−14=−2', answer: 12 },
      { question: '3x+6=15', answer: 3 },
      { question: 'x/4=9', answer: 36 },
      { question: '5x=25', answer: 5 }
    ];
  
    const boostPlayer = () => {
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      const userAnswer = prompt(randomProblem.question);
      if (parseInt(userAnswer) === randomProblem.answer) {
        setPlayerHorse(prev => prev + window.innerWidth/10);
        alert('Correct! Boost applied.');
      } else {
        alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
      }
    };
  
    return renderRacePage('Algebra Track', algebraStarted, setAlgebraStarted, boostPlayer, 'algebra');
  }
  
  if (page === 'algebra2') {
    var levelnino = '2'
    const problems = [
      { question: 'x+9=22', answer: 13 },
      { question: 'x−1=3', answer: 4 },
      { question: '4x=28', answer: 7 },
      { question: 'x/7=6', answer: 42 },
      { question: '2x−3=11', answer: 7 },
      { question: 'x+12=23', answer: 11 },
      { question: 'x−7=7', answer: 14 },
      { question: 'x/2=18', answer: 36 },
      { question: '9x=81', answer: 9 },
      { question: 'x+2=11', answer: 9 },
      { question: 'x−10=6', answer: 16 },
      { question: '7x=56', answer: 8 },
      { question: 'x/9+3=7', answer: 36 },
      { question: '4x+6=14', answer: 2 },
      { question: 'x+15=30', answer: 15 },
      { question: 'x−4=10', answer: 14 },
      { question: '5x=45', answer: 9 },
      { question: 'x/10=5', answer: 50 },
      { question: 'x+8=26', answer: 18 },
      { question: 'x−2=16', answer: 18 },
      { question: '6x=42', answer: 7 },
      { question: 'x+1=12', answer: 11 },
      { question: 'x−11=7', answer: 18 },
      { question: '2x+5=15', answer: 5 },
      { question: 'x/2+3=9', answer: 12 },
      { question: 'x+6=18', answer: 12 },
      { question: '3x=24', answer: 8 },
      { question: 'x−5=−4', answer: 1 },
      { question: 'x/4=12', answer: 48 },
      { question: '10x=90', answer: 9 },
      { question: 'x+14=28', answer: 14 },
      { question: 'x−8=3', answer: 11 },
      { question: '4x−2=14', answer: 4 },
      { question: 'x/5=7', answer: 35 },
      { question: 'x+11=21', answer: 10 },
      { question: 'x−3=5', answer: 8 },
      { question: '7x=63', answer: 9 },
      { question: 'x/6+2=8', answer: 36 },
      { question: '2x=16', answer: 8 },
      { question: 'x+20=35', answer: 15 },
      { question: 'x−14=0', answer: 14 },
      { question: '3x+4=19', answer: 5 },
      { question: 'x/7=2', answer: 14 },
      { question: 'x+9=12', answer: 3 },
      { question: 'x−6=4', answer: 10 },
      { question: '6x=36', answer: 6 },
      { question: 'x/8=5', answer: 40 },
      { question: '4x=16', answer: 4 },
      { question: 'x+3=6', answer: 3 },
      { question: 'x−11=2', answer: 13 }
    ];
  
    const boostPlayer = () => {
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      const userAnswer = prompt(randomProblem.question);
      if (parseInt(userAnswer) === randomProblem.answer) {
        setPlayerHorse(prev => prev + window.innerWidth/10);
        alert('Correct! Boost applied.');
      } else {
        alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
      }
    };
  
    return renderRacePage('Algebra Track', algebraStarted, setAlgebraStarted, boostPlayer, 'algebra');
  }
  
  if (page === 'algebra3') {
    const problems = [
      { question: 'A basketball team played 32 games and won three times as many games as it lost. How many games did the team win?', answer: 24 },
      { question: 'The sum of three consecutive integers is 42. What is the smallest of the three numbers?', answer: 13 },
      { question: 'Ninety-six golf balls were placed into two buckets. One bucket has 28 more balls than the other. How many balls are in the bucket with more balls?', answer: 62 },
      { question: 'When the sum of a number and 3 is subtracted from 10, the result is 5. Find the number.', answer: 2 },
      { question: 'A freight train travels at 40 mph. Two hours later, a passenger train leaves the same station traveling at 60 mph. How many hours before the passenger train overtakes the freight train?', answer: 4 },
      { question: 'Jay’s father is twice as old as Jay. In 20 years, Jay will be two-thirds as old as his father. How old is Jay’s father now?', answer: 40 },
      { question: 'Chris and Sandra worked as electricians at $14 and $12 per hour respectively. Sandra worked 10 hours more than Chris. Their combined income was $3520. How many hours did Chris work?', answer: 80 },
      { question: 'Tickets for a baseball game are $2.50 for general admission and $0.50 for kids. Six times as many general admission tickets were sold as kids tickets, totaling $7750 in receipts. How many general admission tickets were sold?', answer: 1500 },
      { question: 'There are three consecutive even numbers such that twice the first is 20 more than the second. What is the smallest of the three numbers?', answer: 14 },
      { question: 'A rectangular garden is twice as long as it is wide and has a perimeter of 60 meters. What is the width of the garden?', answer: 10 },
      { question: 'If five times a number minus 7 equals 18, what is the number?', answer: 5 },
      { question: 'A store sold 150 items in one day. If the number of shirts sold was three times the number of pants sold, how many pants were sold?', answer: 37.5 },
      { question: 'The sum of two numbers is 68 and their difference is 22. What is the larger number?', answer: 45 },
      { question: 'One number is 5 more than another number. Their sum is 27. What is the smaller number?', answer: 11 },
      { question: 'A car travels for 3 hours at 60 mph. How far did it travel?', answer: 180 },
      { question: 'If the sum of a number and 15 is 30, what is the number?', answer: 15 },
      { question: 'A rectangle has a length of 12 cm and an area of 96 cm². What is the width?', answer: 8 },
      { question: 'A bank account has $2000. If $500 is withdrawn and the remaining amount is 3/4 of the original, is the statement true?', answer: 1 }, 
      { question: 'Mike’s age is three times that of his son. If Mike is 36, how old is his son?', answer: 12 },
      { question: 'A cube has a volume of 125 cm³. What is the length of an edge?', answer: 5 },
      { question: 'John bought 5 apples and 3 oranges for $14. If apples cost $2 each, what is the price of one orange?', answer: 1.33 },
      { question: 'Two angles form a linear pair. One angle is 70 degrees. What is the measure of the other angle?', answer: 110 },
      { question: 'A number decreased by 5 is equal to 12. What is the number?', answer: 17 },
      { question: 'The product of a number and 7 is 42. What is the number?', answer: 6 },
      { question: 'Susan has 3 times as many stickers as Alex. Together they have 48. How many stickers does Alex have?', answer: 12 },
      { question: 'If you add 8 to twice a number, the result is 20. What is the number?', answer: 6 },
      { question: 'Find a number such that one-third of it plus 9 equals 15.', answer: 18 },
      { question: 'The perimeter of a square is 36 cm. What is the length of one side?', answer: 9 },
      { question: 'A bicycle travels 15 miles in 1 hour and 30 minutes. What was the average speed in mph?', answer: 10 },
      { question: 'A number decreased by 3 is equal to 2 times the number minus 9. What is the number?', answer: 6 },
      { question: 'The sum of four consecutive odd numbers is 64. What is the smallest number?', answer: 13 },
      { question: 'Sam invests $1000 at 5% interest. How much interest does he earn in one year?', answer: 50 },
      { question: 'A rectangle’s length is 5 more than its width. If the width is 8, what is the length?', answer: 13 },
      { question: 'The ratio of boys to girls in a class is 3 to 4. If there are 21 boys, how many girls are there?', answer: 28 },
      { question: 'The sum of ages of a mother and daughter is 50. The mother is 30 years older than the daughter. How old is the daughter?', answer: 10 },
      { question: 'A shopkeeper sold an item for $150, making a profit of 20%. What was the cost price?', answer: 125 },
      { question: "If a car’s value decreases by 15% each year and it's currently worth $17000, what was its value last year?", answer: 20000 },
      { question: 'The sum of two numbers is 100, and one number is 4 times the other. What is the smaller number?', answer: 20 },
      { question: 'A farmer has chickens and cows. There are 50 heads and 140 legs. How many chickens are there?', answer: 30 },
      { question: 'If a train travels 180 miles in 3 hours, what is its average speed?', answer: 60 },
      { question: 'Five times a number equals 60. What is the number?', answer: 12 },
      { question: 'A room is 8 meters long and 6 meters wide. What is the area?', answer: 48 },
      { question: 'The difference between two numbers is 10. Their sum is 50. What is the greater number?', answer: 30 },
      { question: 'If the length of a rectangle is tripled and the width doubled, by what factor does the area increase?', answer: 6 },
      { question: 'A number increased by 20% is 24. What is the original number?', answer: 20 }
    ];
    const boostPlayer = () => {
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      const userAnswer = prompt(randomProblem.question);
      if (parseInt(userAnswer) === randomProblem.answer) {
        setPlayerHorse(prev => prev + window.innerWidth/10);
        alert('Correct! Boost applied.');
      } else {
        alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
      }
    };
  
    return renderRacePage('Algebra Track', algebraStarted, setAlgebraStarted, boostPlayer, 'algebra');
  }
    if (page === 'algebra4') {
      var levelnino = '4'
      const problems = [
        { question: 'x - 20 = 4 - 3x', answer: 6 },
        { question: '-4(-3n - 8) = 10n + 20', answer: -6 },
        { question: '2(4 - y) - 3(y + 3) = -11', answer: 5 },
        { question: '(6k + 4)/2 = 2k - 11', answer: -13 },
        { question: '-(-8 - 3x) = -2(1 - x) + 6x', answer: 2 },
        { question: '(3/4)m - 2(m - 1) = (1/4)m + 5', answer: 9 },
        { question: '3(3x - 8) - 5(3x - 8) = 4(x - 2) - 6(x - 2)', answer: 0 },
        { question: '4(x - 9) = 7x - 44', answer: 8 },
        { question: '5x + 2(3x - 4) = 44', answer: 6 },
        { question: '2(x + 3) - 3(2x - 1) = 7', answer: 2 },
        { question: '(x/3) + (x/4) = 7', answer: 12 },
        { question: '(2x - 1)/5 = (x + 4)/3', answer: 7 },
        { question: '3(x - 1) + 4 = 7(x - 2) - 1', answer: 4 },
        { question: '2(3x + 1) - 3(2x - 4) = 7', answer: 5 },
        { question: '(4x + 3)/2 = (3x - 1)/3 + 2', answer: 2 },
        { question: '5x/2 - (3x/4 + 1) = 7/4', answer: 3 },
        { question: '6 - 2(x + 4) = 3(x - 2) - 4', answer: 4 },
        { question: '4x - (3x + 5) = 2(x - 4)', answer: 7 },
        { question: '(2x + 5)/3 = (3x - 1)/4', answer: 7 },
        { question: '3(x - 2) = 2(2x + 1) - 5', answer: -4 },
        { question: '7x/4 - 2 = 3x/2 + 1', answer: 8 },
        { question: '3(x + 5) - 4(x - 2) = 2', answer: 6 },
        { question: '(5x - 3)/2 = (x + 7)/4', answer: 5 },
        { question: '2(x - 3) + 3(4 - x) = 1', answer: 5 },
        { question: '4(x + 2) - 3(2x - 1) = 7', answer: 3 },
        { question: '5x - 2(x - 3) = 3x + 6', answer: 6 },
        { question: '(3x - 7)/5 = (2x + 3)/3', answer: 12 },
        { question: '2(x - 1) + (3x + 4) = 15', answer: 4 },
        { question: '3(2x - 1) - 4(x + 2) = 5', answer: 7 },
        { question: '(4x + 1)/3 - (x - 2)/2 = 3', answer: 4 },
        { question: '6x - (2x + 5) = 3(2x - 1)', answer: 4 },
        { question: '7(x - 3) + 2x = 5x + 14', answer: 5 },
        { question: '(x + 4)/3 + (2x - 1)/2 = 5', answer: 3 },
        { question: '4(2x + 1) - 3(x - 2) = 3x + 9', answer: 2 },
        { question: '5x - 3(2x - 4) = 12', answer: 6 },
        { question: '3(x - 5) + 4(2x + 1) = 2x + 18', answer: 4 },
        { question: '(2x + 3)/4 - (x + 1)/3 = 1', answer: 3 },
        { question: '6(x - 2) - 5(x + 3) = 4', answer: 7 },
        { question: '7x + 2(3x - 5) = 4(x + 6)', answer: 8 },
        { question: '(x - 2)/3 + (x + 4)/2 = 5', answer: 4 },
        { question: '4x - 3(2x + 1) = 5(1 - x)', answer: 2 },
        { question: '3(3x - 2) - 2(x + 5) = 4x + 1', answer: 3 },
        { question: '(5x + 1)/2 - (3x - 4)/3 = 2', answer: 4 },
        { question: '6x + 4(2 - x) = 3(x + 1)', answer: 5 },
        { question: '7(x + 1) - 4(2x - 3) = 3x + 5', answer: 4 },
        { question: '(x + 3)/4 + (2x - 5)/3 = 4', answer: 3 },
        { question: '5(2x + 1) - 3(x - 4) = 4(3x - 2)', answer: 7 },
        { question: '3(x - 4) + 2(5 - x) = 7x - 20', answer: 4 }
      ];
    const boostPlayer = () => {
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      const userAnswer = prompt(randomProblem.question);
      if (parseInt(userAnswer) === randomProblem.answer) {
        setPlayerHorse(prev => prev + window.innerWidth/10);
        alert('Correct! Boost applied.');
      } else {
        alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
      }
    };
  
    return renderRacePage('Algebra Track', algebraStarted, setAlgebraStarted, boostPlayer, 'algebra');
  }
  if (page === 'probability1') {
    var levelnino = '1';
    const problems = [
      { question: 'A coin is flipped. Probability of heads?', answer: '1/2' },
      { question: 'A coin is flipped. Probability of tails?', answer: '1/2' },
      { question: 'A die is rolled. Probability of rolling a 3?', answer: '1/6' },
      { question: 'A die is rolled. Probability of rolling an even number?', answer: '1/2' },
      { question: 'A die is rolled. Probability of rolling greater than 4?', answer: '1/3' },
      { question: 'A die is rolled. Probability of rolling less than 3?', answer: '1/3' },
      { question: 'Two coins are flipped. Probability of both heads?', answer: '1/4' },
      { question: 'Two coins are flipped. Probability of one head and one tail?', answer: '1/2' },
      { question: 'A bag has 3 red and 2 blue balls. Probability of red?', answer: '3/5' },
      { question: 'A bag has 3 red and 2 blue balls. Probability of blue?', answer: '2/5' },
      { question: 'A bag has 4 green and 6 yellow balls. Probability of green?', answer: '2/5' },
      { question: 'A bag has 4 green and 6 yellow balls. Probability of yellow?', answer: '3/5' },
      { question: 'A card is drawn from a deck. Probability of a heart?', answer: '1/4' },
      { question: 'A card is drawn from a deck. Probability of a face card (J, Q, K)?', answer: '3/13' },
      { question: 'A card is drawn. Probability of a spade?', answer: '1/4' },
      { question: 'A card is drawn. Probability of red card?', answer: '1/2' },
      { question: 'A card is drawn. Probability of black card?', answer: '1/2' },
      { question: 'A number from 1–10 is chosen. Probability of even?', answer: '1/2' },
      { question: 'A number from 1–10 is chosen. Probability of odd?', answer: '1/2' },
      { question: 'A number from 1–5 is chosen. Probability it’s greater than 3?', answer: '2/5' },
      { question: 'A spinner with 4 equal sections (A, B, C, D). Probability of A?', answer: '1/4' },
      { question: 'A spinner with 6 equal parts. Probability of landing on red if 2 are red?', answer: '1/3' },
      { question: 'You pick a marble from 8 total (3 blue). Probability of blue?', answer: '3/8' },
      { question: 'You pick a marble from 8 total (5 green). Probability of green?', answer: '5/8' },
      { question: 'Two dice are rolled. Probability the sum is 7?', answer: '1/6' },
      { question: 'Two dice are rolled. Probability both dice show 6?', answer: '1/36' },
      { question: 'Two dice are rolled. Probability of getting doubles?', answer: '1/6' },
      { question: 'You draw 1 card. Probability of drawing an Ace?', answer: '1/13' },
      { question: 'You draw 1 card. Probability of drawing a number card (2–10)?', answer: '10/13' },
      { question: 'A bag has 2 red, 3 blue, 5 green. Probability of blue?', answer: '3/10' },
      { question: 'A bag has 2 red, 3 blue, 5 green. Probability of red?', answer: '1/5' },
      { question: 'A coin is flipped 3 times. Probability of 3 heads?', answer: '1/8' },
      { question: 'A coin is flipped 3 times. Probability of at least one head?', answer: '7/8' },
      { question: 'A jar has 10 marbles (4 red, 6 black). Probability of red?', answer: '2/5' },
      { question: 'A jar has 10 marbles (4 red, 6 black). Probability of black?', answer: '3/5' },
      { question: 'A die is rolled twice. Probability of getting at least one 6?', answer: '11/36' },
      { question: 'A card is drawn. Probability of drawing a diamond?', answer: '1/4' },
      { question: 'A card is drawn. Probability of drawing a queen?', answer: '1/13' },
      { question: 'A bag has 5 blue, 5 red marbles. Probability of blue?', answer: '1/2' },
      { question: 'A bag has 7 red and 3 blue marbles. Probability of blue?', answer: '3/10' },
      { question: 'A spinner has 8 equal sections. Probability of landing on 1 or 2?', answer: '1/4' },
      { question: 'Pick a random month. Probability it has 31 days?', answer: '7/12' },
      { question: 'Pick a random day of the week. Probability it’s a weekend?', answer: '2/7' },
      { question: 'A bag has 9 balls (4 red, 3 blue, 2 green). Probability of green?', answer: '2/9' },
      { question: 'A bag has 9 balls (4 red, 3 blue, 2 green). Probability of red?', answer: '4/9' },
      { question: 'A coin is flipped and a die is rolled. Probability of heads and 6?', answer: '1/12' },
      { question: 'Two dice are rolled. Probability of sum = 2?', answer: '1/36' },
      { question: 'Two dice are rolled. Probability of sum = 12?', answer: '1/36' },
      { question: 'Two dice are rolled. Probability of sum = 3?', answer: '2/36' },
      { question: 'A spinner with 5 sections. Probability of getting section B?', answer: '1/5' },
    ];
    

    const boostPlayer = () => {
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      const userAnswer = prompt(randomProblem.question);
      if (userAnswer.replace(/\s+/g, '') === randomProblem.answer) {
        setPlayerHorse(prev => prev + window.innerWidth / 10);
        alert('Correct! Boost applied.');
      } else {
        alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
      }
    };

    return renderRacePage('Probability Track', probabilityStarted, setProbabilityStarted, boostPlayer, 'probability');
}

  if (page === 'probability2') {
      var levelnino = '2';
      const problems = [
        { question: 'Two dice are rolled. Probability the sum is 8?', answer: '5/36' },
        { question: 'Two dice are rolled. Probability the sum is 9?', answer: '4/36' },
        { question: 'Two dice are rolled. Probability the sum is 10?', answer: '3/36' },
        { question: 'Two dice are rolled. Probability the sum is less than 5?', answer: '6/36' },
        { question: 'A spinner has 8 sections, 3 are red. Probability of red?', answer: '3/8' },
        { question: 'A spinner has 8 sections, 5 are blue. Probability of not blue?', answer: '3/8' },
        { question: 'A bag has 5 red, 3 blue, 2 green. Probability of not green?', answer: '8/10' },
        { question: 'A jar has 12 marbles (5 red, 4 blue, 3 yellow). Probability of yellow?', answer: '1/4' },
        { question: 'Flip two coins. Probability of 0 heads?', answer: '1/4' },
        { question: 'Flip two coins. Probability of at least one head?', answer: '3/4' },
        { question: 'Draw a card. Probability of a black face card?', answer: '3/26' },
        { question: 'Draw a card. Probability of not a heart?', answer: '3/4' },
        { question: 'Pick a random day. Probability it’s Monday or Tuesday?', answer: '2/7' },
        { question: 'Pick a random digit (0–9). Probability it’s prime?', answer: '4/10' },
        { question: 'Pick a random letter from A–Z. Probability it’s a vowel?', answer: '5/26' },
        { question: 'Roll one die. Probability of not rolling 6?', answer: '5/6' },
        { question: 'Roll one die. Probability of rolling 1 or 2?', answer: '1/3' },
        { question: 'Draw one card. Probability of drawing a number less than 6?', answer: '5/13' },
        { question: 'A bag: 3 red, 4 blue, 3 yellow. Probability of blue?', answer: '2/5' },
        { question: 'A bag: 3 red, 4 blue, 3 yellow. Probability of red or yellow?', answer: '3/5' },
        { question: 'Two dice rolled. Probability of sum even?', answer: '1/2' },
        { question: 'Two dice rolled. Probability both even?', answer: '9/36' },
        { question: 'Two dice rolled. Probability both odd?', answer: '9/36' },
        { question: 'Two dice rolled. Probability one even, one odd?', answer: '18/36' },
        { question: 'Coin flipped 4 times. Probability of all tails?', answer: '1/16' },
        { question: 'Coin flipped 4 times. Probability of exactly 2 heads?', answer: '6/16' },
        { question: 'A card drawn. Probability of a number between 2–9?', answer: '8/13' },
        { question: 'A bag: 2 green, 3 red, 5 blue. Probability of green or blue?', answer: '7/10' },
        { question: 'Pick a number 1–20. Probability it’s multiple of 5?', answer: '1/5' },
        { question: 'Pick a number 1–20. Probability it’s multiple of 2 or 3?', answer: '13/20' },
      ];
      

      const boostPlayer = () => {
        const randomProblem = problems[Math.floor(Math.random() * problems.length)];
        const userAnswer = prompt(randomProblem.question);
        if (userAnswer.replace(/\s+/g, '') === randomProblem.answer) {
          setPlayerHorse(prev => prev + window.innerWidth / 10);
          alert('Correct! Boost applied.');
        } else {
          alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
        }
      };

      return renderRacePage('Probability Track', probabilityStarted, setProbabilityStarted, boostPlayer, 'probability');
  }

  if (page === 'probability3') {
      var levelnino = '3';
      const problems = [
        { question: 'A bag has 5 red and 3 blue marbles. Two drawn *without replacement*. Probability both red?', answer: '5/14' },
        { question: 'A bag has 5 red and 3 blue marbles. Two drawn *with replacement*. Probability both red?', answer: '25/64' },
        { question: 'A bag: 4 red, 6 blue. Two drawn without replacement. Probability both blue?', answer: '1/3' },
        { question: 'A bag: 4 red, 6 blue. Two drawn without replacement. Probability one of each?', answer: '8/15' },
        { question: 'Deck of cards. Draw 2 cards. Probability both are hearts?', answer: '1/17' },
        { question: 'Deck of cards. Draw 2 cards. Probability both black?', answer: '25/102' },
        { question: 'Deck of cards. Draw 2 cards. Probability one red, one black?', answer: '1/2' },
        { question: 'Two dice rolled. Probability the product is even?', answer: '3/4' },
        { question: 'Two dice rolled. Probability the product is odd?', answer: '1/4' },
        { question: 'Three coins flipped. Probability all heads?', answer: '1/8' },
        { question: 'Three coins flipped. Probability at least one tail?', answer: '7/8' },
        { question: 'A bag: 3 red, 2 green. Draw 2 without replacement. Probability both green?', answer: '1/10' },
        { question: 'Pick a letter from “PROBABILITY”. Probability of picking B?', answer: '2/11' },
        { question: 'Pick a letter from “STATISTICS”. Probability of picking S?', answer: '3/10' },
        { question: 'A spinner with 5 equal sections labeled 1–5. Spin twice. Probability both even?', answer: '4/25' },
        { question: 'A spinner 1–5 spun twice. Probability sum > 7?', answer: '9/25' },
        { question: 'Two dice rolled. Probability sum = 11 or 12?', answer: '3/36' },
        { question: 'Two dice rolled. Probability sum ≤ 4?', answer: '6/36' },
        { question: 'Coin flipped twice. Probability of at least one head?', answer: '3/4' },
        { question: 'A bag: 2 red, 3 green, 4 blue. Probability of red or green?', answer: '5/9' },
        { question: 'Draw 2 cards without replacement. Probability of both face cards?', answer: '1/110' },
        { question: 'Draw 2 cards without replacement. Probability of both aces?', answer: '1/221' },
        { question: 'Pick number 1–12. Probability divisible by 4?', answer: '1/3' },
        { question: 'Pick number 1–12. Probability divisible by 3 but not by 6?', answer: '1/4' },
        { question: 'Roll a die twice. Probability both rolls are greater than 4?', answer: '1/9' },
        { question: 'Roll a die twice. Probability at least one 6?', answer: '11/36' },
        { question: 'Roll a die twice. Probability sum < 5?', answer: '6/36' },
        { question: 'Coin flipped twice. Probability exactly one head?', answer: '1/2' },
        { question: 'Pick a card. Probability it’s not a heart?', answer: '3/4' },
        { question: 'Pick a card. Probability it’s a red or face card?', answer: '7/13' },
      ];
      

      const boostPlayer = () => {
        const randomProblem = problems[Math.floor(Math.random() * problems.length)];
        const userAnswer = prompt(randomProblem.question);
        if (userAnswer.replace(/\s+/g, '') === randomProblem.answer) {
          setPlayerHorse(prev => prev + window.innerWidth / 10);
          alert('Correct! Boost applied.');
        } else {
          alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
        }
      };

      return renderRacePage('Probability Track', probabilityStarted, setProbabilityStarted, boostPlayer, 'probability');
  }

  if (page === 'probability4') {
      var levelnino = '4';
      const problems = [
        { question: 'Two cards drawn without replacement. Probability both kings?', answer: '1/221' },
        { question: 'Two cards drawn without replacement. Probability both red?', answer: '25/102' },
        { question: 'Two cards drawn without replacement. Probability both same suit?', answer: '1/17' },
        { question: 'Two dice rolled. Probability sum = 7 given first die = 3?', answer: '1/6' },
        { question: 'Two dice rolled. Probability sum = 9 given first die > 3?', answer: '1/9' },
        { question: 'A bag: 5 red, 3 blue. One red removed, then draw blue. Probability?', answer: '3/8' },
        { question: 'A bag: 6 red, 4 blue. Two drawn without replacement. P(second red | first red)?', answer: '1/2' },
        { question: 'A bag: 4 red, 6 blue. Two drawn without replacement. P(second blue | first red)?', answer: '3/5' },
        { question: 'Two dice rolled. Probability second die > first?', answer: '15/36' },
        { question: 'Two dice rolled. Probability first die > second?', answer: '15/36' },
        { question: 'Two dice rolled. Probability equal?', answer: '6/36' },
        { question: 'Pick a number 1–10. Probability it’s even given it’s >5?', answer: '2/5' },
        { question: 'Pick number 1–10. Probability divisible by 3 given it’s odd?', answer: '1/3' },
        { question: 'Flip 3 coins. Probability of 2 heads given at least one head?', answer: '3/7' },
        { question: 'A bag: 3 red, 2 blue, 5 green. Draw one. P(red | not green)?', answer: '3/5' },
        { question: 'Draw one card. P(face | red)?', answer: '3/26' },
        { question: 'Two dice rolled. P(sum even | first die even)?', answer: '1/2' },
        { question: 'Two dice rolled. P(sum odd | first die even)?', answer: '1/2' },
        { question: 'A spinner with 5 equal sections (2 red). Spin twice. P(at least one red)?', answer: '9/25' },
        { question: 'Two dice rolled. P(sum ≥ 10 | first die 5)?', answer: '1/3' },
        { question: 'Two dice rolled. P(sum ≤ 5 | one die is 1)?', answer: '1/2' },
        { question: 'A jar: 5 red, 3 blue. Draw 2 without replacement. P(second blue)?', answer: '3/8' },
        { question: 'Deck of 52. Draw 2 without replacement. P(second ace)?', answer: '1/13' },
        { question: 'Deck of 52. Draw 2 without replacement. P(second heart | first red)?', answer: '25/51' },
        { question: 'Two dice rolled. P(sum is prime)?', answer: '15/36' },
        { question: 'Two dice rolled. P(sum is multiple of 3)?', answer: '12/36' },
        { question: 'Coin flipped until head. P(head on 1st or 2nd flip)?', answer: '3/4' },
        { question: 'Coin flipped 3 times. P(exactly 2 heads)?', answer: '3/8' },
        { question: 'Pick number 1–30. P(multiple of 3 or 5)?', answer: '14/30' },
        { question: 'Pick number 1–30. P(multiple of 3 and 5)?', answer: '1/15' },
      ];
      

      const boostPlayer = () => {
        const randomProblem = problems[Math.floor(Math.random() * problems.length)];
        const userAnswer = prompt(randomProblem.question);
        if (userAnswer.replace(/\s+/g, '') === randomProblem.answer) {
          setPlayerHorse(prev => prev + window.innerWidth / 10);
          alert('Correct! Boost applied.');
        } else {
          alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
        }
      };

      return renderRacePage('Probability Track', probabilityStarted, setProbabilityStarted, boostPlayer, 'probability');
  }


  if (page === 'radicals1') {
    var levelnino = '1';
    const problems = [
      { question: 'Simplify √1 (Type sqrt() for √)', answer: 1 },
      { question: 'Simplify √4 (Type sqrt() for √)', answer: 2 },
      { question: 'Simplify √9 (Type sqrt() for √)', answer: 3 },
      { question: 'Simplify √16 (Type sqrt() for √)', answer: 4 },
      { question: 'Simplify √25 (Type sqrt() for √)', answer: 5 },
      { question: 'Simplify √36 (Type sqrt() for √)', answer: 6 },
      { question: 'Simplify √49 (Type sqrt() for √)', answer: 7 },
      { question: 'Simplify √64 (Type sqrt() for √)', answer: 8 },
      { question: 'Simplify √81 (Type sqrt() for √)', answer: 9 },
      { question: 'Simplify √100 (Type sqrt() for √)', answer: 10 },
      { question: 'Simplify √121 (Type sqrt() for √)', answer: 11 },
      { question: 'Simplify √144 (Type sqrt() for √)', answer: 12 },
      { question: 'Simplify √169 (Type sqrt() for √)', answer: 13 },
      { question: 'Simplify √196 (Type sqrt() for √)', answer: 14 },
      { question: 'Simplify √225 (Type sqrt() for √)', answer: 15 },
      { question: 'Simplify √256 (Type sqrt() for √)', answer: 16 },
      { question: 'Simplify √289 (Type sqrt() for √)', answer: 17 },
      { question: 'Simplify √324 (Type sqrt() for √)', answer: 18 },
      { question: 'Simplify √361 (Type sqrt() for √)', answer: 19 },
      { question: 'Simplify √400 (Type sqrt() for √)', answer: 20 },
      { question: 'Simplify √441 (Type sqrt() for √)', answer: 21 },
      { question: 'Simplify √484 (Type sqrt() for √)', answer: 22 },
      { question: 'Simplify √529 (Type sqrt() for √)', answer: 23 },
      { question: 'Simplify √576 (Type sqrt() for √)', answer: 24 },
      { question: 'Simplify √625 (Type sqrt() for √)', answer: 25 },
      { question: 'Simplify √676 (Type sqrt() for √)', answer: 26 },
      { question: 'Simplify √729 (Type sqrt() for √)', answer: 27 },
      { question: 'Simplify √784 (Type sqrt() for √)', answer: 28 },
      { question: 'Simplify √841 (Type sqrt() for √)', answer: 29 },
      { question: 'Simplify √900 (Type sqrt() for √)', answer: 30 },
      { question: 'Simplify √961 (Type sqrt() for √)', answer: 31 },
      { question: 'Simplify √1024 (Type sqrt() for √)', answer: 32 },
      { question: 'Simplify √1089 (Type sqrt() for √)', answer: 33 },
      { question: 'Simplify √1156 (Type sqrt() for √)', answer: 34 },
      { question: 'Simplify √1225 (Type sqrt() for √)', answer: 35 },
      { question: 'Simplify √1296 (Type sqrt() for √)', answer: 36 },
      { question: 'Simplify √1369 (Type sqrt() for √)', answer: 37 },
      { question: 'Simplify √1444 (Type sqrt() for √)', answer: 38 },
      { question: 'Simplify √1521 (Type sqrt() for √)', answer: 39 },
      { question: 'Simplify √1600 (Type sqrt() for √)', answer: 40 },
      { question: 'Simplify √1681 (Type sqrt() for √)', answer: 41 },
      { question: 'Simplify √1764 (Type sqrt() for √)', answer: 42 },
      { question: 'Simplify √1849 (Type sqrt() for √)', answer: 43 },
      { question: 'Simplify √1936 (Type sqrt() for √)', answer: 44 },
      { question: 'Simplify √2025 (Type sqrt() for √)', answer: 45 },
      { question: 'Simplify √2116 (Type sqrt() for √)', answer: 46 },
      { question: 'Simplify √2209 (Type sqrt() for √)', answer: 47 },
      { question: 'Simplify √2304 (Type sqrt() for √)', answer: 48 },
      { question: 'Simplify √2401 (Type sqrt() for √)', answer: 49 },
      { question: 'Simplify √2500 (Type sqrt() for √)', answer: 50 },
    ];
    
    

    const boostPlayer = () => {
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      const userAnswer = prompt(randomProblem.question);
      if (parseInt(userAnswer) === randomProblem.answer) {
        setPlayerHorse(prev => prev + window.innerWidth / 10);
        alert('Correct! Boost applied.');
      } else {
        alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
      }
    };

    return renderRacePage('Radicals and Exponents Track', radicalsStarted, setRadicalsStarted, boostPlayer, 'radicals');
}
  if (page === 'radicals2') {
    var levelnino = '2';
    const problems = [
      { question: 'Simplify √18 (Type root() for √)', answer: '3root(2)' },
      { question: 'Simplify √50 (Type root() for √)', answer: '5root(2)' },
      { question: 'Simplify √32 (Type root() for √)', answer: '4root(2)' },
      { question: 'Simplify √72 (Type root() for √)', answer: '6root(2)' },
      { question: 'Simplify √12 (Type root() for √)', answer: '2root(3)' },
      { question: 'Simplify √45 (Type root() for √)', answer: '3root(5)' },
      { question: 'Simplify √8 (Type root() for √)', answer: '2root(2)' },
      { question: 'Simplify √20 (Type root() for √)', answer: '2root(5)' },
      { question: 'Simplify √27 (Type root() for √)', answer: '3root(3)' },
      { question: 'Simplify √98 (Type root() for √)', answer: '7root(2)' },
      { question: 'Simplify √200 (Type root() for √)', answer: '10root(2)' },
      { question: 'Simplify √128 (Type root() for √)', answer: '8root(2)' },
      { question: 'Simplify √50 + √8 (Type root() for √)', answer: '9root(2)' },
      { question: 'Simplify √18 + √8 (Type root() for √)', answer: '5root(2)' },
      { question: 'Simplify √32 - √8 (Type root() for √)', answer: '2root(2)' },
      { question: 'Simplify √72 ÷ √2 (Type root() for √)', answer: 6 },
      { question: 'Simplify √45 ÷ √5 (Type root() for √)', answer: 3 },
      { question: 'Simplify (√3)^2 (Type root() for √)', answer: 3 },
      { question: 'Simplify (√5)^2 (Type root() for √)', answer: 5 },
      { question: 'Simplify 2root(2) × 3root(2) (Type root() for √)', answer: 12 },
      { question: 'Simplify √3 × √12 (Type root() for √)', answer: 6 },
      { question: 'Simplify √50 ÷ √2 (Type root() for √)', answer: 5 },
      { question: 'Simplify √128 ÷ √8 (Type root() for √)', answer: 4 },
      { question: 'Simplify √18 × √2 (Type root() for √)', answer: 6 },
      { question: 'Simplify √32 × √2 (Type root() for √)', answer: 8 },
      { question: 'Simplify √72 ÷ √8 (Type root() for √)', answer: 3 },
      { question: 'Simplify √200 ÷ √50 (Type root() for √)', answer: 2 },
      { question: 'Simplify √45 + √5 (Type root() for √)', answer: 8 },
      { question: 'Simplify √50 - √18 (Type root() for √)', answer: '2root(2)' },
      { question: 'Simplify √32 - √8 (Type root() for √)', answer: '2root(2)' },
      { question: 'Simplify √98 ÷ √2 (Type root() for √)', answer: 7 },
      { question: 'Simplify √128 ÷ √2 (Type root() for √)', answer: 8 },
      { question: 'Simplify √200 ÷ √8 (Type root() for √)', answer: '5root(2)' },
      { question: 'Simplify √18 + √32 (Type root() for √)', answer: '8root(2)' },
      { question: 'Simplify √72 - √8 (Type root() for √)', answer: '4root(2)' },
      { question: 'Simplify 3root(2) + 4root(2) (Type root() for √)', answer: '7root(2)' },
      { question: 'Simplify 5root(3) - 2root(3) (Type root() for √)', answer: '3root(3)' },
      { question: 'Simplify 2root(5) × root(5) (Type root() for √)', answer: 10 },
      { question: 'Simplify √50 × √2 (Type root() for √)', answer: 10 },
      { question: 'Simplify √8 × √2 (Type root() for √)', answer: 4 },
      { question: 'Simplify √72 ÷ √9 (Type root() for √)', answer: '2root(2)' },
      { question: 'Simplify (2root(2))^2 (Type root() for √)', answer: 8 },
      { question: 'Simplify (3root(3))^2 (Type root() for √)', answer: 27 },
      { question: 'Simplify (4root(2))^2 (Type root() for √)', answer: 32 },
      { question: 'Simplify (5root(5))^2 (Type root() for √)', answer: 125 },
      { question: 'Simplify √50 + √50 (Type root() for √)', answer: '10root(2)' },
      { question: 'Simplify √72 + √18 (Type root() for √)', answer: '6root(2)' },
      { question: 'Simplify √32 + √128 (Type root() for √)', answer: '12root(2)' },
      { question: 'Simplify √45 + √5 (Type root() for √)', answer: 8 },
      { question: 'Simplify √50 - √8 (Type root() for √)', answer: '3root(2)' },
      { question: 'Simplify √200 - √50 (Type root() for √)', answer: 10 },
    ];

  const boostPlayer = () => {
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    let userAnswer = prompt(randomProblem.question);
    if (!userAnswer) return; // cancel pressed
    userAnswer = userAnswer.replace(/\s+/g, ''); // remove spaces

    if (typeof randomProblem.answer === 'number') {
      // Compare numbers
      if (parseFloat(userAnswer) === randomProblem.answer) {
        setPlayerHorse(prev => prev + window.innerWidth / 10);
        alert('Correct! Boost applied.');
      } else {
        alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
      }
    } else {
      // Compare root() strings
      if (userAnswer === randomProblem.answer) {
        setPlayerHorse(prev => prev + window.innerWidth / 10);
        alert('Correct! Boost applied.');
      } else {
        alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
      }
    }
  };

  return renderRacePage(
    'Radicals and Exponents Track',
    radicalsStarted,
    setRadicalsStarted,
    boostPlayer,
    'radicals'
  );
  }
  if (page === 'radicals3') {
    var levelnino = '3';
    const problems = [
      { question: 'Simplify 2^3', answer: 8 },
      { question: 'Simplify 3^2', answer: 9 },
      { question: 'Simplify 5^0', answer: 1 },
      { question: 'Simplify 4^2', answer: 16 },
      { question: 'Simplify 6^1', answer: 6 },
      { question: 'Simplify 2^5', answer: 32 },
      { question: 'Simplify 3^3', answer: 27 },
      { question: 'Simplify 10^2', answer: 100 },
      { question: 'Simplify 2^4', answer: 16 },
      { question: 'Simplify 5^2', answer: 25 },
      { question: 'Simplify 7^2', answer: 49 },
      { question: 'Simplify 3^4', answer: 81 },
      { question: 'Simplify 2^6', answer: 64 },
      { question: 'Simplify 4^3', answer: 64 },
      { question: 'Simplify 5^3', answer: 125 },
      { question: 'Simplify 6^2', answer: 36 },
      { question: 'Simplify 2^7', answer: 128 },
      { question: 'Simplify 3^5', answer: 243 },
      { question: 'Simplify 10^3', answer: 1000 },
      { question: 'Simplify 2^8', answer: 256 },
      { question: 'Simplify 4^4', answer: 256 },
      { question: 'Simplify 5^4', answer: 625 },
      { question: 'Simplify 3^6', answer: 729 },
      { question: 'Simplify 2^9', answer: 512 },
      { question: 'Simplify 6^3', answer: 216 },
      { question: 'Simplify 7^3', answer: 343 },
      { question: 'Simplify 2^10', answer: 1024 },
      { question: 'Simplify 3^7', answer: 2187 },
      { question: 'Simplify 4^5', answer: 1024 },
      { question: 'Simplify 5^5', answer: 3125 },
      { question: 'Simplify 2^11', answer: 2048 },
      { question: 'Simplify 3^8', answer: 6561 },
      { question: 'Simplify 2^12', answer: 4096 },
      { question: 'Simplify 4^6', answer: 4096 },
      { question: 'Simplify 5^6', answer: 15625 },
      { question: 'Simplify 2^13', answer: 8192 },
      { question: 'Simplify 3^9', answer: 19683 },
      { question: 'Simplify 6^4', answer: 1296 },
      { question: 'Simplify 7^4', answer: 2401 },
      { question: 'Simplify 2^14', answer: 16384 },
      { question: 'Simplify 3^10', answer: 59049 },
      { question: 'Simplify 2^15', answer: 32768 },
      { question: 'Simplify 4^7', answer: 16384 },
      { question: 'Simplify 5^7', answer: 78125 },
      { question: 'Simplify 2^16', answer: 65536 },
      { question: 'Simplify 3^11', answer: 177147 },
      { question: 'Simplify 2^17', answer: 131072 },
      { question: 'Simplify 4^8', answer: 65536 },
      { question: 'Simplify 5^8', answer: 390625 },
      { question: 'Simplify 2^18', answer: 262144 },
      { question: 'Simplify 3^12', answer: 531441 }
    ];

    const boostPlayer = () => {
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      let userAnswer = prompt(randomProblem.question);
      if (!userAnswer) return; // cancel pressed
      userAnswer = userAnswer.replace(/\s+/g, ''); // remove spaces

      if (typeof randomProblem.answer === 'number') {
        if (parseFloat(userAnswer) === randomProblem.answer) {
          setPlayerHorse(prev => prev + window.innerWidth / 10);
          alert('Correct! Boost applied.');
        } else {
          alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
        }
      } else {
        if (userAnswer === randomProblem.answer) {
          setPlayerHorse(prev => prev + window.innerWidth / 10);
          alert('Correct! Boost applied.');
        } else {
          alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
        }
      }
    };

    return renderRacePage(
      'Radicals and Exponents Track',
      radicalsStarted,
      setRadicalsStarted,
      boostPlayer,
      'radicals'
    );
  }

  if (page === 'radicals4') {
    var levelnino = '4';
    const problems = [
      { question: 'Simplify √18', answer: '3root(2)' },
      { question: 'Simplify √50', answer: '5root(2)' },
      { question: 'Simplify 2^5', answer: 32 },
      { question: 'Simplify √32', answer: '4root(2)' },
      { question: 'Simplify 3^3', answer: 27 },
      { question: 'Simplify √72', answer: '6root(2)' },
      { question: 'Simplify 2^6', answer: 64 },
      { question: 'Simplify √12', answer: '2root(3)' },
      { question: 'Simplify 4^3', answer: 64 },
      { question: 'Simplify √45', answer: '3root(5)' },
      { question: 'Simplify 5^3', answer: 125 },
      { question: 'Simplify √8', answer: '2root(2)' },
      { question: 'Simplify 2^7', answer: 128 },
      { question: 'Simplify √20', answer: '2root(5)' },
      { question: 'Simplify 3^4', answer: 81 },
      { question: 'Simplify √27', answer: '3root(3)' },
      { question: 'Simplify 2^8', answer: 256 },
      { question: 'Simplify √98', answer: '7root(2)' },
      { question: 'Simplify 5^4', answer: 625 },
      { question: 'Simplify √200', answer: '10root(2)' },
      { question: 'Simplify 3^5', answer: 243 },
      { question: 'Simplify √128', answer: '8root(2)' },
      { question: 'Simplify 2^9', answer: 512 },
      { question: 'Simplify √50 + √8', answer: '9root(2)' },
      { question: 'Simplify 4^4', answer: 256 },
      { question: 'Simplify √18 + √8', answer: '5root(2)' },
      { question: 'Simplify 5^5', answer: 3125 },
      { question: 'Simplify √32 - √8', answer: '2root(2)' },
      { question: 'Simplify 2^10', answer: 1024 },
      { question: 'Simplify √72 ÷ √2', answer: 6 },
      { question: 'Simplify 3^6', answer: 729 },
      { question: 'Simplify (√3)^2', answer: 3 },
      { question: 'Simplify (√5)^2', answer: 5 },
      { question: 'Simplify 2root(2) × 3root(2)', answer: 12 },
      { question: 'Simplify √3 × √12', answer: 6 },
      { question: 'Simplify √50 ÷ √2', answer: 5 },
      { question: 'Simplify √128 ÷ √8', answer: 4 },
      { question: 'Simplify √18 × √2', answer: 6 },
      { question: 'Simplify √32 × √2', answer: 8 },
      { question: 'Simplify √72 ÷ √8', answer: 3 },
      { question: 'Simplify √200 ÷ √50', answer: 2 },
      { question: 'Simplify √45 + √5', answer: 8 },
      { question: 'Simplify √50 - √18', answer: '2root(2)' },
      { question: 'Simplify √32 - √8', answer: '2root(2)' },
      { question: 'Simplify √98 ÷ √2', answer: 7 },
      { question: 'Simplify √128 ÷ √2', answer: 8 },
      { question: 'Simplify √200 ÷ √8', answer: '5root(2)' },
      { question: 'Simplify √18 + √32', answer: '8root(2)' },
      { question: 'Simplify √72 - √8', answer: '4root(2)' },
      { question: 'Simplify 3root(2) + 4root(2)', answer: '7root(2)' },
      { question: 'Simplify 5root(3) - 2root(3)', answer: '3root(3)' },
      { question: 'Simplify 2root(5) × root(5)', answer: 10 },
      { question: 'Simplify √50 × √2', answer: 10 },
      { question: 'Simplify √8 × √2', answer: 4 }
    ];
  
    const boostPlayer = () => {
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      let userAnswer = prompt(randomProblem.question);
      if (!userAnswer) return;
      userAnswer = userAnswer.replace(/\s+/g,'');
  
      if (typeof randomProblem.answer === 'number') {
        if (parseFloat(userAnswer) === randomProblem.answer) {
          setPlayerHorse(prev => prev + window.innerWidth / 10);
          alert('Correct! Boost applied.');
        } else {
          alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
        }
      } else {
        if (userAnswer === randomProblem.answer) {
          setPlayerHorse(prev => prev + window.innerWidth / 10);
          alert('Correct! Boost applied.');
        } else {
          alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
        }
      }
    };
  
    return renderRacePage(
      'Radicals and Exponents Track',
      radicalsStarted,
      setRadicalsStarted,
      boostPlayer,
      'radicals'
    );
  }
  

  if (page === 'quadratics1') {
  var levelnino = '1';
  const problems = [
    { question: 'Solve x² - 1 = 0', answer: '1,-1' },
    { question: 'Solve x² - 4 = 0', answer: '2,-2' },
    { question: 'Solve x² - 9 = 0', answer: '3,-3' },
    { question: 'Solve x² - 16 = 0', answer: '4,-4' },
    { question: 'Solve x² - 25 = 0', answer: '5,-5' },
    { question: 'Solve x² - 36 = 0', answer: '6,-6' },
    { question: 'Solve x² - 49 = 0', answer: '7,-7' },
    { question: 'Solve x² - 64 = 0', answer: '8,-8' },
    { question: 'Solve x² - 81 = 0', answer: '9,-9' },
    { question: 'Solve x² - 100 = 0', answer: '10,-10' },
    { question: 'Solve x² + 5x + 6 = 0', answer: '-2,-3' },
    { question: 'Solve x² + 7x + 12 = 0', answer: '-3,-4' },
    { question: 'Solve x² + 8x + 15 = 0', answer: '-3,-5' },
    { question: 'Solve x² + 9x + 20 = 0', answer: '-4,-5' },
    { question: 'Solve x² + 10x + 21 = 0', answer: '-3,-7' },
    { question: 'Solve x² - x - 6 = 0', answer: '3,-2' },
    { question: 'Solve x² - 2x - 15 = 0', answer: '5,-3' },
    { question: 'Solve x² - 3x - 10 = 0', answer: '5,-2' },
    { question: 'Solve x² - 4x - 21 = 0', answer: '7,-3' },
    { question: 'Solve x² - 5x - 24 = 0', answer: '8,-3' },
    { question: 'Solve x² - 6x - 16 = 0', answer: '8,-2' },
    { question: 'Solve x² - 7x - 18 = 0', answer: '9,-2' },
    { question: 'Solve x² - 8x - 20 = 0', answer: '10,-2' },
    { question: 'Solve x² - 9x - 22 = 0', answer: '11,-2' },
    { question: 'Solve x² - 10x - 24 = 0', answer: '12,-2' },
    { question: 'Solve x² - 11x - 28 = 0', answer: '14,-2' },
    { question: 'Solve x² - 12x - 32 = 0', answer: '16,-2' },
    { question: 'Solve x² - 13x - 35 = 0', answer: '15,-2' },
    { question: 'Solve x² - 14x - 38 = 0', answer: '19,-2' },
    { question: 'Solve x² - 15x - 40 = 0', answer: '20,-2' },
    { question: 'Solve x² - 16x - 42 = 0', answer: '21,-2' },
    { question: 'Solve x² - 17x - 45 = 0', answer: '15,-3' },
    { question: 'Solve x² - 18x - 48 = 0', answer: '24,-2' },
    { question: 'Solve x² - 19x - 50 = 0', answer: '25,-2' },
    { question: 'Solve x² - 20x - 52 = 0', answer: '26,-2' },
    { question: 'Solve x² - 21x - 55 = 0', answer: '22,-2' },
    { question: 'Solve x² - 22x - 58 = 0', answer: '29,-2' },
    { question: 'Solve x² - 23x - 60 = 0', answer: '30,-2' },
    { question: 'Solve x² - 24x - 62 = 0', answer: '31,-2' },
    { question: 'Solve x² - 25x - 65 = 0', answer: '26,-2' },
    { question: 'Solve x² - 26x - 68 = 0', answer: '34,-2' },
    { question: 'Solve x² - 27x - 70 = 0', answer: '35,-2' },
    { question: 'Solve x² - 28x - 72 = 0', answer: '36,-2' },
    { question: 'Solve x² - 29x - 75 = 0', answer: '25,-3' },
    { question: 'Solve x² - 30x - 78 = 0', answer: '39,-2' },
    { question: 'Solve x² - 31x - 80 = 0', answer: '40,-2' },
    { question: 'Solve x² - 32x - 82 = 0', answer: '41,-2' },
    { question: 'Solve x² - 33x - 85 = 0', answer: '34,-1' },
    { question: 'Solve x² - 34x - 88 = 0', answer: '44,-2' },
    { question: 'Solve x² - 35x - 90 = 0', answer: '45,-2' },
    { question: 'Solve x² - 36x - 92 = 0', answer: '46,-2' },
    { question: 'Solve x² - 37x - 95 = 0', answer: '38,-1' },
    { question: 'Solve x² - 38x - 98 = 0', answer: '49,-2' },
    { question: 'Solve x² - 39x - 100 = 0', answer: '50,-2' }
  ];

  const boostPlayer = () => {
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    let userAnswer = prompt(
      randomProblem.question +
      '\nEnter solution(s). If two solutions, separate by a comma (e.g., 2,-2), also for two solutions please enter them in order from greatest to least:'
    );
    if (!userAnswer) return;
    userAnswer = userAnswer.replace(/\s+/g, '');

    if (userAnswer === randomProblem.answer) {
      setPlayerHorse(prev => prev + window.innerWidth / 10);
      alert('Correct! Boost applied.');
    } else {
      alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
    }
  };

  return renderRacePage('Quadratics Track', quadraticStarted, setQuadraticStarted, boostPlayer, 'quadratics');
}


if (page === 'quadratics2') {
  var levelnino = '2';
  const problems = [
    { question: 'Solve x² + 5x + 6 = 0', answer: '-2,-3' },
    { question: 'Solve x² + 7x + 12 = 0', answer: '-3,-4' },
    { question: 'Solve x² + 8x + 15 = 0', answer: '-3,-5' },
    { question: 'Solve x² + 9x + 20 = 0', answer: '-4,-5' },
    { question: 'Solve x² + 10x + 21 = 0', answer: '-3,-7' },
    { question: 'Solve x² + 6x + 8 = 0', answer: '-2,-4' },
    { question: 'Solve x² + 12x + 35 = 0', answer: '-5,-7' },
    { question: 'Solve x² + 15x + 54 = 0', answer: '-6,-9' },
    { question: 'Solve x² + 14x + 45 = 0', answer: '-5,-9' },
    { question: 'Solve x² + 20x + 96 = 0', answer: '-8,-12' },
    { question: 'Solve x² - x - 6 = 0', answer: '3,-2' },
    { question: 'Solve x² - 2x - 15 = 0', answer: '5,-3' },
    { question: 'Solve x² - 3x - 10 = 0', answer: '5,-2' },
    { question: 'Solve x² - 4x - 21 = 0', answer: '7,-3' },
    { question: 'Solve x² - 5x - 24 = 0', answer: '8,-3' },
    { question: 'Solve x² - 6x - 16 = 0', answer: '8,-2' },
    { question: 'Solve x² - 7x - 18 = 0', answer: '9,-2' },
    { question: 'Solve x² - 8x - 20 = 0', answer: '10,-2' },
    { question: 'Solve x² - 9x - 22 = 0', answer: '11,-2' },
    { question: 'Solve x² - 10x - 24 = 0', answer: '12,-2' },
    { question: 'Solve x² + 2x - 15 = 0', answer: '3,-5' },
    { question: 'Solve x² + 3x - 10 = 0', answer: '2,-5' },
    { question: 'Solve x² + 4x - 12 = 0', answer: '2,-6' },
    { question: 'Solve x² + 5x - 24 = 0', answer: '3,-8' },
    { question: 'Solve x² + 6x - 27 = 0', answer: '3,-9' },
    { question: 'Solve x² + 7x - 30 = 0', answer: '3,-10' },
    { question: 'Solve x² + 8x - 32 = 0', answer: '4,-8' },
    { question: 'Solve x² + 9x - 36 = 0', answer: '3,-12' },
    { question: 'Solve x² + 10x - 39 = 0', answer: '1,-9' },
    { question: 'Solve x² + 11x - 40 = 0', answer: '4,-10' },
    { question: 'Solve x² - 3x - 18 = 0', answer: '6,-3' },
    { question: 'Solve x² - 4x - 21 = 0', answer: '7,-3' },
    { question: 'Solve x² - 5x - 24 = 0', answer: '8,-3' },
    { question: 'Solve x² - 6x - 30 = 0', answer: '10,-3' },
    { question: 'Solve x² - 7x - 42 = 0', answer: '14,-3' },
    { question: 'Solve x² - 8x - 48 = 0', answer: '12,-4' },
    { question: 'Solve x² - 9x - 54 = 0', answer: '6,-9' },
    { question: 'Solve x² - 10x - 60 = 0', answer: '12,-5' },
    { question: 'Solve x² - 11x - 66 = 0', answer: '6,-11' },
    { question: 'Solve x² - 12x - 72 = 0', answer: '12,-6' },
    { question: 'Solve x² - 13x - 78 = 0', answer: '13,-6' },
    { question: 'Solve x² - 14x - 84 = 0', answer: '14,-6' },
    { question: 'Solve x² - 15x - 90 = 0', answer: '15,-6' },
    { question: 'Solve x² - 16x - 96 = 0', answer: '16,-6' },
    { question: 'Solve x² - 17x - 102 = 0', answer: '17,-6' },
    { question: 'Solve x² - 18x - 108 = 0', answer: '18,-6' },
    { question: 'Solve x² - 19x - 114 = 0', answer: '19,-6' },
    { question: 'Solve x² - 20x - 120 = 0', answer: '20,-6' },
    { question: 'Solve x² - 21x - 126 = 0', answer: '21,-6' },
    { question: 'Solve x² - 22x - 132 = 0', answer: '22,-6' },
    { question: 'Solve x² - 23x - 138 = 0', answer: '23,-6' },
    { question: 'Solve x² - 24x - 144 = 0', answer: '24,-6' },
    { question: 'Solve x² - 25x - 150 = 0', answer: '25,-6' },
    { question: 'Solve x² - 26x - 156 = 0', answer: '26,-6' }
  ];

  const boostPlayer = () => {
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    let userAnswer = prompt(
      randomProblem.question +
      '\nEnter solution(s). If two solutions, separate by a comma (e.g., 2,-2), also for two solutions please enter them in order from greatest to least:'
    );
    if (!userAnswer) return;
    userAnswer = userAnswer.replace(/\s+/g, '');

    if (userAnswer === randomProblem.answer) {
      setPlayerHorse(prev => prev + window.innerWidth / 10);
      alert('Correct! Boost applied.');
    } else {
      alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
    }
  };

  return renderRacePage('Quadratics Track', quadraticStarted, setQuadraticStarted, boostPlayer, 'quadratics');
}


if (page === 'quadratics3') {
  var levelnino = '3';
  const problems = [
    { question: 'Solve 2x² - 8x = 0', answer: '0,4' },
    { question: 'Solve 3x² - 12x = 0', answer: '0,4' },
    { question: 'Solve 4x² - 16x = 0', answer: '0,4' },
    { question: 'Solve 2x² - 6x = 0', answer: '0,3' },
    { question: 'Solve 5x² - 20x = 0', answer: '0,4' },
    { question: 'Solve 2x² + 3x - 5 = 0', answer: '1,-2.5' },
    { question: 'Solve 3x² + 2x - 8 = 0', answer: '1.333,-2' },
    { question: 'Solve 4x² - 5x - 6 = 0', answer: '3,-0.5' },
    { question: 'Solve 5x² + x - 6 = 0', answer: '1,-1.2' },
    { question: 'Solve 6x² - x - 5 = 0', answer: '1,-0.833' },
    { question: 'Solve 2x² - 3x - 2 = 0', answer: '2,-0.5' },
    { question: 'Solve 3x² - 7x + 2 = 0', answer: '2,0.333' },
    { question: 'Solve 4x² - 12x + 8 = 0', answer: '2,1' },
    { question: 'Solve 5x² - 15x + 10 = 0', answer: '2,1' },
    { question: 'Solve 6x² - 18x + 12 = 0', answer: '2,1' },
    { question: 'Solve 2x² + 7x + 3 = 0', answer: '-0.5,-3' },
    { question: 'Solve 3x² + 8x + 4 = 0', answer: '-0.5,-2.666' },
    { question: 'Solve 4x² + 10x + 4 = 0', answer: '-0.5,-2' },
    { question: 'Solve 5x² + 9x + 2 = 0', answer: '-0.25,-1.6' },
    { question: 'Solve 6x² + 11x + 3 = 0', answer: '-0.333,-1.5' },
    { question: 'Solve 2x² - x - 3 = 0', answer: '1.5,-1' },
    { question: 'Solve 3x² - 5x - 2 = 0', answer: '2,-0.333' },
    { question: 'Solve 4x² - 7x - 2 = 0', answer: '2,-0.25' },
    { question: 'Solve 5x² - 9x - 2 = 0', answer: '2,-0.2' },
    { question: 'Solve 6x² - 11x - 2 = 0', answer: '2,-0.166' },
    { question: 'Solve 2x² - 5x + 3 = 0', answer: '1.5,1' },
    { question: 'Solve 3x² - 8x + 4 = 0', answer: '2,0.666' },
    { question: 'Solve 4x² - 10x + 4 = 0', answer: '2,0.5' },
    { question: 'Solve 5x² - 9x + 2 = 0', answer: '2,0.2' },
    { question: 'Solve 6x² - 11x + 2 = 0', answer: '2,0.166' },
    { question: 'Solve 2x² + 5x + 3 = 0', answer: '-0.5,-3' },
    { question: 'Solve 3x² + 7x + 2 = 0', answer: '-0.333,-2' },
    { question: 'Solve 4x² + 9x + 2 = 0', answer: '-0.25,-2' },
    { question: 'Solve 5x² + 11x + 2 = 0', answer: '-0.2,-2' },
    { question: 'Solve 6x² + 13x + 2 = 0', answer: '-0.166,-2' },
    { question: 'Solve 2x² - 7x + 6 = 0', answer: '3,1' },
    { question: 'Solve 3x² - 8x + 4 = 0', answer: '2,0.666' },
    { question: 'Solve 4x² - 9x + 2 = 0', answer: '2,0.25' },
    { question: 'Solve 5x² - 11x + 6 = 0', answer: '3,0.4' },
    { question: 'Solve 6x² - 13x + 6 = 0', answer: '2,0.5' },
    { question: 'Solve 2x² + 3x - 2 = 0', answer: '0.5,-2' },
    { question: 'Solve 3x² + 5x - 2 = 0', answer: '0.333,-2' },
    { question: 'Solve 4x² + 7x - 2 = 0', answer: '0.25,-2' },
    { question: 'Solve 5x² + 9x - 2 = 0', answer: '0.2,-2' },
    { question: 'Solve 6x² + 11x - 2 = 0', answer: '0.166,-2' },
    { question: 'Solve 2x² - 4x + 2 = 0', answer: '1,1' },
    { question: 'Solve 3x² - 6x + 3 = 0', answer: '1,1' },
    { question: 'Solve 4x² - 8x + 4 = 0', answer: '1,1' },
    { question: 'Solve 5x² - 10x + 5 = 0', answer: '1,1' },
    { question: 'Solve 6x² - 12x + 6 = 0', answer: '1,1' },
    { question: 'Solve 2x² + 6x + 4 = 0', answer: '-1,-2' },
    { question: 'Solve 3x² + 9x + 6 = 0', answer: '-1,-2' },
    { question: 'Solve 4x² + 12x + 8 = 0', answer: '-1,-2' },
    { question: 'Solve 5x² + 15x + 10 = 0', answer: '-1,-2' },
    { question: 'Solve 6x² + 18x + 12 = 0', answer: '-1,-2' }
  ];

  const boostPlayer = () => {
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    let userAnswer = prompt(
      randomProblem.question +
      '\nEnter solution(s). If two solutions, separate by a comma (e.g., 2,-2), also for two solutions please enter them in order from greatest to least:'
    );
    if (!userAnswer) return;
    userAnswer = userAnswer.replace(/\s+/g, '');

    if (userAnswer === randomProblem.answer) {
      setPlayerHorse(prev => prev + window.innerWidth / 10);
      alert('Correct! Boost applied.');
    } else {
      alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
    }
  };

  return renderRacePage('Quadratics Track', quadraticStarted, setQuadraticStarted, boostPlayer, 'quadratics');
}


if (page === 'quadratics4') {
  var levelnino = '4';
  const problems = [
    { question: 'Solve x² + 2x - 8 = 0', answer: '2,-4' },
    { question: 'Solve x² + 5x + 6 = 0', answer: '-2,-3' },
    { question: 'Solve x² + 7x + 10 = 0', answer: '-2,-5' },
    { question: 'Solve 2x² + 5x + 2 = 0', answer: '-0.5,-2' },
    { question: 'Solve x² - x - 12 = 0', answer: '4,-3' },
    { question: 'Solve 3x² - 5x + 2 = 0', answer: '1,0.666' },
    { question: 'Solve 2x² - 7x + 3 = 0', answer: '3,0.5' },
    { question: 'Solve x² - 6x + 5 = 0', answer: '5,1' },
    { question: 'Solve 2x² - x - 1 = 0', answer: '1,-0.5' },
    { question: 'Solve x² + 4x + 3 = 0', answer: '-1,-3' },
    { question: 'Solve 3x² + 11x + 10 = 0', answer: '-1,-3.333' },
    { question: 'Solve 4x² + 4x - 8 = 0', answer: '1,-2' },
    { question: 'Solve 5x² - 5x - 10 = 0', answer: '2,-1' },
    { question: 'Solve 6x² + 5x - 6 = 0', answer: '0.666,-1.5' },
    { question: 'Solve x² - 8x + 12 = 0', answer: '6,2' },
    { question: 'Solve 2x² - 3x - 2 = 0', answer: '2,-0.5' },
    { question: 'Solve 3x² + 2x - 1 = 0', answer: '0.333,-1' },
    { question: 'Solve 4x² - 4x - 3 = 0', answer: '1.5,-0.5' },
    { question: 'Solve 5x² - 15x + 10 = 0', answer: '2,1' },
    { question: 'Solve 6x² + 7x - 3 = 0', answer: '0.333,-1.5' },
    { question: 'Solve x² + 9x + 20 = 0', answer: '-4,-5' },
    { question: 'Solve 2x² + 3x - 2 = 0', answer: '0.5,-2' },
    { question: 'Solve 3x² - 8x + 4 = 0', answer: '2,0.666' },
    { question: 'Solve 4x² - 9x + 2 = 0', answer: '2,0.25' },
    { question: 'Solve 5x² - 11x + 6 = 0', answer: '3,0.4' },
    { question: 'Solve 6x² - 13x + 6 = 0', answer: '2,0.5' },
    { question: 'Solve x² - 4x + 4 = 0', answer: '2,2' },
    { question: 'Solve 2x² - 8x + 8 = 0', answer: '2,2' },
    { question: 'Solve 3x² - 12x + 12 = 0', answer: '2,2' },
    { question: 'Solve 4x² - 16x + 16 = 0', answer: '2,2' },
    { question: 'Solve 5x² - 20x + 20 = 0', answer: '2,2' },
    { question: 'Solve x² + 6x + 9 = 0', answer: '-3,-3' },
    { question: 'Solve 2x² + 8x + 8 = 0', answer: '-2,-2' },
    { question: 'Solve 3x² + 12x + 12 = 0', answer: '-2,-2' },
    { question: 'Solve 4x² + 16x + 16 = 0', answer: '-2,-2' },
    { question: 'Solve 5x² + 20x + 20 = 0', answer: '-2,-2' },
    { question: 'Solve 6x² + 24x + 24 = 0', answer: '-2,-2' },
    { question: 'Solve x² - 5x + 6 = 0', answer: '3,2' },
    { question: 'Solve 2x² - 10x + 12 = 0', answer: '3,2' },
    { question: 'Solve 3x² - 15x + 18 = 0', answer: '3,2' },
    { question: 'Solve 4x² - 20x + 24 = 0', answer: '3,2' },
    { question: 'Solve 5x² - 25x + 30 = 0', answer: '3,2' },
    { question: 'Solve 6x² - 30x + 36 = 0', answer: '3,2' },
    { question: 'Solve x² + 8x + 15 = 0', answer: '-3,-5' },
    { question: 'Solve 2x² + 16x + 30 = 0', answer: '-1.875,-8' },
    { question: 'Solve 3x² + 24x + 45 = 0', answer: '-1.667,-9' },
    { question: 'Solve 4x² + 32x + 60 = 0', answer: '-1.875,-8' },
    { question: 'Solve 5x² + 40x + 75 = 0', answer: '-1.5,-10' },
    { question: 'Solve 6x² + 48x + 90 = 0', answer: '-1.25,-12' },
    { question: 'Solve x² - 7x + 12 = 0', answer: '3,4' },
    { question: 'Solve 2x² - 14x + 24 = 0', answer: '3,4' },
    { question: 'Solve 3x² - 21x + 36 = 0', answer: '3,4' },
    { question: 'Solve 4x² - 28x + 48 = 0', answer: '3,4' },
    { question: 'Solve 5x² - 35x + 60 = 0', answer: '3,4' }
  ];

  const boostPlayer = () => {
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    let userAnswer = prompt(
      randomProblem.question +
      '\nEnter solution(s). If two solutions, separate by a comma (e.g., 2,-2), also for two solutions please enter them in order from greatest to least:'
    );
    if (!userAnswer) return;
    userAnswer = userAnswer.replace(/\s+/g, '');

    if (userAnswer === randomProblem.answer) {
      setPlayerHorse(prev => prev + window.innerWidth / 10);
      alert('Correct! Boost applied.');
    } else {
      alert(`Incorrect! The correct answer was ${randomProblem.answer}.`);
    }
  };

  return renderRacePage('Quadratics Track', quadraticStarted, setQuadraticStarted, boostPlayer, 'quadratics');
}


  return (
    <div style={pageStyle}>
      <h1>Math Madness</h1>
      <button onClick={() => setPage('algebra')} style={buttonStyle}>
        Algebra
      </button>
      <button onClick={() => setPage('probability')} style={buttonStyle}>
        Probability
      </button>
      <button onClick={() => setPage('radicals')} style={buttonStyle}>
        Radicals and Exponents
      </button>
      <button onClick={() => setPage('quadratics')} style={buttonStyle}>
        Quadratics
      </button>
      <button onClick={() => setPage('tutorial')} style={buttonStyle}>
        Tutorial
      </button>
      <button onClick={() => setMainPage('home')} style={{...buttonStyle, backgroundColor: '#6b7280'}}>Back to Menu</button>

    </div>
  );
  function renderRacePage(title, started, setStarted, boostFn, trackName) {
    return (
      <div style={pageStyle}>
        <h2>{title}</h2>
        <div style={trackStyle}>
          {npcHorses.map((pos, index) => (
            <div key={index} style={{ ...laneStyle, position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: `${pos}px`,
                  top: '50%',
                  transform: 'translateY(-50%) scaleX(-1)',
                  fontSize: '2rem',
                }}
              >
                🐎
              </div>
            </div>
          ))}
          {started && (
            <div style={{ ...laneStyle, position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: `${playerHorse}px`,
                  top: '50%',
                  transform: 'translateY(-50%) scaleX(-1)',
                  fontSize: '2rem',
                }}
              >
                🐴
              </div>
            </div>
          )}
        </div>

        {!started && (
          <>
            <button onClick={() => setStarted(true)} style={buttonStyle}>
              Start
            </button>
            <button onClick={() => setPage(trackName)} style={buttonStyle}>
              Back
            </button>
          </>
        )}

        {started && (
          <button
            onClick={boostFn}
            style={{ ...buttonStyle, backgroundColor: '#FFD700', color: '#000', marginTop: '10px' }}
          >
            Boost
          </button>
        )}
      </div>
    );
  }

}

function FunctionFlip({ setMainPage }) {
  const [page, setPage] = useState("home");
  const [mode, setMode] = useState("Linear");
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [placedLines, setPlacedLines] = useState([]);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [completedDrawings, setCompletedDrawings] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
    gap: "16px",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    width: "160px",
  };

  const backButtonStyle = { ...buttonStyle, backgroundColor: "#6b7280" };

  if (page === "home") {
    return (
      <div style={containerStyle}>
        <h1>Function Flip</h1>
        <button style={buttonStyle} onClick={() => setPage("play")}>Play</button>
        <button style={backButtonStyle} onClick={() => setMainPage("home")}>Back to Menu</button>
      </div>
    );
  }

  if (page === "play") {
    return (
      <div style={containerStyle}>
        <h1>Choose a Level</h1>
        {[1, 2, 3].map(level => (
          <button key={level} style={buttonStyle} onClick={() => { setCurrentLevel(level); setPage("selectDrawing"); }}>Level {level}</button>
        ))}
        <button style={backButtonStyle} onClick={() => setPage("home")}>Back</button>
      </div>
    );
  }

  if (page === "selectDrawing") {
    const levelDrawings = {
      1: ["House", "Cybertruck"],
      2: ["Simple Line"],
      3: ["Kite"],
    };

    const drawings = levelDrawings[currentLevel] || [];

    return (
      <div style={containerStyle}>
        <h1>Select Drawing</h1>
        {drawings.map((d, i) => (
          <div key={i} style={{ position: "relative", marginBottom: "10px" }}>
            <button style={buttonStyle} onClick={() => { setSelectedDrawing(d); setCurrentProblemIndex(0); setPlacedLines([]); setPage("levelGraph"); }}>{d}</button>
            {completedDrawings.includes(d) && (
              <div style={{ position: "absolute", top: 0, right: "-60px", backgroundColor: "gold", color: "black", padding: "5px 10px", fontWeight: "bold", borderRadius: "5px" }}>Completed</div>
            )}
          </div>
        ))}
        <button style={backButtonStyle} onClick={() => setPage("play")}>Back</button>
      </div>
    );
  }

  if (page === "levelGraph") {
    return (
      <div style={containerStyle}>
        <h1>{selectedDrawing || "Graphing"}</h1>
        <CanvasGrid
          mode={mode}
          currentProblemIndex={currentProblemIndex}
          setCurrentProblemIndex={setCurrentProblemIndex}
          placedLines={placedLines}
          setPlacedLines={setPlacedLines}
          selectedDrawing={selectedDrawing}
          setPage={setPage}
          completedDrawings={completedDrawings}
          setCompletedDrawings={setCompletedDrawings}
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
          {["Linear", "Quadratic", "Exponential", "Absolute Value"].map(m => (
            <button key={m} style={buttonStyle} onClick={() => setMode(m)}>{m}</button>
          ))}
        </div>
        <button style={backButtonStyle} onClick={() => setPage("selectDrawing")}>Back</button>
      </div>
    );
  }
}

const drawingsSegments = {
  House: [
    { endpoints: [{ x: -5, y: 0 }, { x: 5, y: 0 }], equation: "y = 0" },
    { endpoints: [{ x: -5, y: 7 }, { x: 5, y: 7 }], equation: "y = 7" },
    { endpoints: [{ x: -5, y: 0 }, { x: -5, y: 7 }], equation: "x = -5" },
    { endpoints: [{ x: 5, y: 0 }, { x: 5, y: 7 }], equation: "x = 5" },
    { endpoints: [{ x: -5, y: 7 }, { x: 0, y: 12 }], equation: "y = 1x + 12" },
    { endpoints: [{ x: 0, y: 12 }, { x: 5, y: 7 }], equation: "y = -1x + 12" },
  ],
  Cybertruck: [
    { endpoints: [{ x: -5, y: 0 }, { x: -5, y: 2.5 }], equation: "x = -5" },
    { endpoints: [{ x: -5, y: 3.5 }, { x: 5, y: 4.5 }], equation: "y = 0.2x + 3.5" },
  ],
  "Simple Line": [{ endpoints: [{ x: -3, y: 0 }, { x: 3, y: 0 }], equation: "y = 0" }],
  Kite: [
    { endpoints: [{ x: -4, y: 0 }, { x: 4, y: 0 }], equation: "y = -|x| + 4" },
    { endpoints: [{ x: 0, y: -5 }, { x: 0, y: 4 }], equation: "x = 0" },
  ],
};

function CanvasGrid({ mode, currentProblemIndex, setCurrentProblemIndex, placedLines, setPlacedLines, selectedDrawing, setPage, completedDrawings, setCompletedDrawings }) {
  const canvasRef = useRef(null);
  const size = 40;
  const scale = 19;
  const canvasSize = size * scale;
  const [points, setPoints] = useState([{ x: -5, y: 0 }, { x: 5, y: 0 }]);
  const [dragging, setDragging] = useState(null);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [showColoring, setShowColoring] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [customHex, setCustomHex] = useState("#ff0000");
  const [lineColors, setLineColors] = useState({});
  const [showFinalView, setShowFinalView] = useState(false);
  
  const drawingProblems = drawingsSegments[selectedDrawing] || [];
  
  const [problems] = useState(() => {
    const expanded = [...drawingProblems];
    for (let i = expanded.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [expanded[i], expanded[j]] = [expanded[j], expanded[i]];
    }
    return expanded;
  });
  
  const [placedIndices, setPlacedIndices] = useState([]);
  
  const toPixel = (x, y) => [canvasSize / 2 + x * scale, canvasSize / 2 - y * scale];
  const toCoord = (px, py) => {
    const rawX = (px - canvasSize / 2) / scale;
    const rawY = (canvasSize / 2 - py) / scale;
    return { x: Math.round(rawX * 4) / 4, y: Math.round(rawY * 4) / 4 };
  };
  
  const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    if (!showFinalView) {
      ctx.strokeStyle = "#eee"; ctx.lineWidth = 1;
      for (let i = 0; i <= size; i++) {
        const pos = i * scale;
        ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, canvasSize); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(canvasSize, pos); ctx.stroke();
      }
      const mid = canvasSize / 2;
      ctx.strokeStyle = "black"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(mid, 0); ctx.lineTo(mid, canvasSize); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(canvasSize, mid); ctx.stroke();
    }
  };
  
  const drawPoints = (ctx) => {
    ctx.fillStyle = "red";
    points.forEach(p => {
      const [px, py] = toPixel(p.x, p.y);
      ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
    });
  };
  
  const drawFunctionLine = (ctx, p1, p2, mode, color = "green") => {
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = -size / 2; x <= size / 2; x += 0.1) {
      let y = 0;
      if (mode === "Linear") {
        if (p1.x === p2.x) {
          const [px, py1] = toPixel(p1.x, Math.min(p1.y, p2.y));
          const [, py2] = toPixel(p1.x, Math.max(p1.y, p2.y));
          ctx.beginPath(); ctx.moveTo(px, py1); ctx.lineTo(px, py2); ctx.stroke();
          return;
        } else {
          const m = (p2.y - p1.y) / (p2.x - p1.x || 1);
          const b = p1.y - m * p1.x;
          y = m * x + b;
        }
      }
      const [px, py] = toPixel(x, y);
      if (x === -size / 2) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  };
  
  const drawPlacedSegments = (ctx) => {
    placedLines.forEach((seg, index) => {
      const [p1, p2] = seg.endpoints;
      const [px1, py1] = toPixel(p1.x, p1.y);
      const [px2, py2] = toPixel(p2.x, p2.y);
      ctx.strokeStyle = lineColors[index] || "black";
      ctx.lineWidth = showColoring || showFinalView ? 4 : 2;
      ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
    });
  };
  
  const findClickedLine = (mx, my) => {
    for (let i = 0; i < placedLines.length; i++) {
      const seg = placedLines[i];
      const [p1, p2] = seg.endpoints;
      const [px1, py1] = toPixel(p1.x, p1.y);
      const [px2, py2] = toPixel(p2.x, p2.y);
      const A = mx - px1, B = my - py1, C = px2 - px1, D = py2 - py1;
      const dot = A * C + B * D, lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) param = dot / lenSq;
      let xx, yy;
      if (param < 0) { xx = px1; yy = py1; }
      else if (param > 1) { xx = px2; yy = py2; }
      else { xx = px1 + param * C; yy = py1 + param * D; }
      const dx = mx - xx, dy = my - yy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 10) return i;
    }
    return -1;
  };
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawGrid(ctx); drawPlacedSegments(ctx);
    if (!showColoring && !showFinalView) { 
      drawFunctionLine(ctx, points[0], points[1], mode, "green"); 
      drawPoints(ctx); 
    }
  }, [points, mode, placedLines, showColoring, lineColors, showFinalView]);
  
  const handleMouseDown = (e) => {
    if (showColoring) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mx = Math.floor(e.clientX - rect.left), my = Math.floor(e.clientY - rect.top);
      const lineIndex = findClickedLine(mx, my);
      if (lineIndex !== -1) setLineColors(prev => ({ ...prev, [lineIndex]: selectedColor }));
      return;
    }
    if (levelCompleted) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    points.forEach((p, i) => {
      const [px, py] = toPixel(p.x, p.y);
      if (Math.hypot(mx - px, my - py) < 10) setDragging(i);
    });
  };
  
  const handleMouseMove = (e) => {
    if (dragging === null || levelCompleted) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const newCoord = toCoord(mx, my);
    setPoints(prev => { const newPts = [...prev]; newPts[dragging] = newCoord; return newPts; });
  };
  
  const handleMouseUp = () => setDragging(null);
  
  const handlePlaceCheck = () => {
    const [ux1, uy1] = [points[0].x, points[0].y], [ux2, uy2] = [points[1].x, points[1].y];
    
    let matchedIndex = -1;
    for (let i = 0; i < problems.length; i++) {
      if (placedIndices.includes(i)) continue;
      const seg = problems[i];
      const [hx1, hy1] = [seg.endpoints[0].x, seg.endpoints[0].y], [hx2, hy2] = [seg.endpoints[1].x, seg.endpoints[1].y];
      
      if (hx1 === hx2) {
        if (Math.abs(ux1 - hx1) < 0.25 && Math.abs(ux2 - hx1) < 0.25) {
          matchedIndex = i;
          break;
        }
      } else {
        const m = (hy2 - hy1) / (hx2 - hx1), b = hy1 - m * hx1;
        const userM = (uy2 - uy1) / (ux2 - ux1 || 1), userB = uy1 - userM * ux1;
        if (Math.abs(userM - m) < 0.2 && Math.abs(userB - b) < 0.6) {
          matchedIndex = i;
          break;
        }
      }
    }
    
    if (matchedIndex !== -1) {
      setPlacedIndices(prev => [...prev, matchedIndex]);
      setPlacedLines(prev => [...prev, problems[matchedIndex]]);
      setPoints([{ x: -5, y: 0 }, { x: 5, y: 0 }]);
      const nextIndex = currentProblemIndex + 1;
      if (nextIndex < problems.length) {
        setCurrentProblemIndex(nextIndex);
      } else {
        setCompletedDrawings(prev => [...prev, selectedDrawing]);
        setLevelCompleted(true);
      }
    } else {
      setPoints([{ x: -5, y: 0 }, { x: 5, y: 0 }]);
    }
  };
  
  const presetColors = [
    { name: "Red", value: "#ff0000" },
    { name: "Blue", value: "#0000ff" },
    { name: "Green", value: "#00ff00" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Orange", value: "#ff8800" },
    { name: "Purple", value: "#8800ff" },
    { name: "Pink", value: "#ff00ff" },
    { name: "Grey", value: "#808080" },
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
  ];
  
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "20px" }}>
      {!showFinalView && (
        <>
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            style={{ border: "1px solid black", background: "white", zIndex: 0, cursor: showColoring ? "crosshair" : "default" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
          <div style={{ width: "150px", fontWeight: "bold", fontSize: "1.1rem" }}>
            {problems.length > 0 && !levelCompleted && !showColoring && (
              <>
                <div style={{ textAlign: "right" }}>Problem:</div>
                <div style={{ marginTop: "10px" }}>{problems[currentProblemIndex]?.equation}</div>
                <button style={{ marginTop: "20px", padding: "8px 12px", backgroundColor: "green", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }} onClick={handlePlaceCheck}>Place/Check</button>
              </>
            )}
          </div>
        </>
      )}
      
      {levelCompleted && !showColoring && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10, flexDirection: "column", color: "white" }}>
          <h1>Level Completed!</h1>
          <button style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1rem", borderRadius: "10px", cursor: "pointer", backgroundColor: "#8b5cf6", color: "white" }} onClick={() => setShowColoring(true)}>Color Your Drawing</button>
          <button style={{ marginTop: "10px", padding: "10px 20px", fontSize: "1rem", borderRadius: "10px", cursor: "pointer", backgroundColor: "gold", color: "black" }} onClick={() => { setLevelCompleted(false); setPage("home"); }}>Back to Home</button>
        </div>
      )}
      
      {showColoring && (
        <div style={{ position: "absolute", top: 0, right: "-300px", backgroundColor: "rgba(0,0,0,0.9)", padding: "20px", borderRadius: "10px", color: "white", width: "280px" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "1.3rem" }}>Color Your Drawing!</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "20px" }}>
            {presetColors.map(color => (
              <button key={color.name} onClick={() => setSelectedColor(color.value)} style={{ height: "50px", backgroundColor: color.value, border: selectedColor === color.value ? "3px solid white" : "1px solid #ccc", borderRadius: "5px", cursor: "pointer", fontSize: "11px", color: color.value === "#ffffff" || color.value === "#ffff00" ? "black" : "white", fontWeight: "bold" }}>
                {color.name}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "14px", display: "block", marginBottom: "8px" }}>Custom Color:</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="text" value={customHex} onChange={(e) => setCustomHex(e.target.value)} placeholder="#RRGGBB" style={{ padding: "5px", flex: 1, fontSize: "14px" }} />
              <button onClick={() => { if (/^#[0-9A-F]{6}$/i.test(customHex)) { setSelectedColor(customHex); } }} style={{ padding: "5px 10px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Use</button>
            </div>
          </div>
          <div style={{ marginBottom: "20px", fontSize: "14px" }}>
            <div>Selected Color:</div>
            <div style={{ display: "inline-block", width: "60px", height: "30px", backgroundColor: selectedColor, border: "1px solid white", marginTop: "8px", borderRadius: "5px" }}></div>
          </div>
          <p style={{ fontSize: "12px", marginBottom: "20px", lineHeight: "1.4" }}>Click on any line of your drawing to color it with the selected color!</p>
          <button onClick={() => { setShowColoring(false); setShowFinalView(true); }} style={{ padding: "10px 20px", fontSize: "1rem", borderRadius: "10px", cursor: "pointer", backgroundColor: "gold", color: "black", width: "100%" }}>Submit & Finish</button>
        </div>
      )}
      
      {showFinalView && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.95)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 15, flexDirection: "column", color: "white", padding: "20px" }}>
          <h1 style={{ marginBottom: "30px", fontSize: "2.5rem" }}>You Completed It!</h1>
          <canvas width={canvasSize} height={canvasSize} ref={(finalCanvas) => {
            if (finalCanvas) {
              const ctx = finalCanvas.getContext("2d");
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, canvasSize, canvasSize);
              placedLines.forEach((seg, index) => {
                const [p1, p2] = seg.endpoints;
                const [px1, py1] = toPixel(p1.x, p1.y);
                const [px2, py2] = toPixel(p2.x, p2.y);
                ctx.strokeStyle = lineColors[index] || "black";
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(px1, py1);
                ctx.lineTo(px2, py2);
                ctx.stroke();
              });
            }
          }} style={{ border: "3px solid white", background: "white", marginBottom: "30px" }} />
          <button onClick={() => { setShowFinalView(false); setLevelCompleted(false); setPage("home"); }} style={{ padding: "15px 30px", fontSize: "1.2rem", borderRadius: "10px", cursor: "pointer", backgroundColor: "#2563eb", color: "white" }}>Back to Home</button>
        </div>
      )}
    </div>
  );
}
