import { Outlet } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/Shared/NavigationBar'
//import "bootstrap/dist/css/bootstrap.min.css"

function App() {
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    )
}

export default App
