import './App.css';
import Main from './components/main';
import "./recipis.scss"


function App() {
  return (
    <div className="App">
      <body>
        <h1 className='main-title'>Recipi</h1>
        <Main/>
        <footer>© 2023 Recipi All Rights Reserved</footer>
      </body>
    </div>
  );
}

export default App;
