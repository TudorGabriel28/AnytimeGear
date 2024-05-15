import { Outlet } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/NavigationBar/NavigationBar'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    )
}

export default App
