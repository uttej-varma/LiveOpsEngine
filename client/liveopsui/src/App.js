import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import CreateOffer from './components/createOffer/createOffer';
import Login from './components/login/login';
import MainPage from './components/mainpage/mainpage';
import Register from './components/Register/register';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="*" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="main" element={<MainPage/>}/>
      <Route path="create" element={<CreateOffer/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
