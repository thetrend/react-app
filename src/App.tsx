import './App.css';

const title = 'React';

function App() {
  return (
    <div>
      <h1>Hello {title}</h1>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />
    </div>
  );
}

export default App;
