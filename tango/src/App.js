import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Components/Theme/Themes';
import GlobalStyle from './Components/Theme/globalStyles';
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
  // statuses of sections
  const [statuses, setStatuses] = useState([
  ])
  const [theme, setTheme] = useState('light')
  const themeToggler =  () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  const [recent, setRecent] = useState({
    section:"0",
    answered:"0",
    answerrate:"0"
  })


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Header themeToggler={themeToggler}/>
          <Routes>
            <Route path='/' element={<Home 
              setStatus={setStatus} 
              statuses={statuses} 
              setStatuses={setStatuses} 
              recent={recent}
              setRecent={setRecent}
            />} />
            <Route path='/menu/:sectionNum' element={<Menu status={status} setStatus={setStatus}/>} />
            <Route path='/quez/:sectionNum/:learning' element={<Quez 
              status={status} 
              setStatus={setStatus}
              recent={recent}
              setRecent={setRecent}
            />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
