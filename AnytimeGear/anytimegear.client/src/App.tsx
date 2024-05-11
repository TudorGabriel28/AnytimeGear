import { Outlet } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/Shared/NavigationBar'

function App() {
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    )
}

export default App
