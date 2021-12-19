import logo from './logo.svg';
import './App.css';
import PrimarySearchAppBar from './header/header';
import MediaCard from './components/card';

function App() {
  localStorage.setItem('clear',false)
  return (
    <div>
     <PrimarySearchAppBar/>
     <div style ={{padding:'2%' , marginLeft: '11%'}}>
        <MediaCard/>
     </div>
    </div>
  );
}

export default App;
