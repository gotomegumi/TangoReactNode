import './App.css';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Components/Theme/Themes';
import GlobalStyle, {Container} from './Components/Theme/globalStyles';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Quez from './Components/Quez/Quez';
import Menu from './Components/Menu/Menu';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  const [status, setStatus] = useState()
  const [theme, setTheme] = useState('light')
  const themeToggler =  () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Header themeToggler={themeToggler}/>
          <Routes>
            <Route path='/' element={<Home setStatus={setStatus} />} />
            <Route path='/menu/:sectionNum' element={<Menu status={status} setStatus={setStatus}/>} />
            <Route path='/quez/:sectionNum/:learning' element={<Quez status={status} setStatus={setStatus}/>} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
