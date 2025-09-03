import './App.css'
import { AuthPage } from './pages/AuthPage'
import {Routes, Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import CreateGroupPage from './pages/CreateGroupPage';
import MyGroups from './pages/MyGroups';
import AddExpensePage from './pages/AddExpensePage';
import GroupDetailsPage from './pages/GroupDetailsPage';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  return (
    <>
    <ToastContainer position='bottom-right' autoClose={2000} />
      <Routes>
        <Route path='/' element={<AuthPage/>} />
        <Route path='/create-group' element={
          <ProtectedRoute>
            <CreateGroupPage/>
          </ProtectedRoute>
          } />
        <Route path='/my-groups' element={
          <ProtectedRoute>
            <MyGroups />
          </ProtectedRoute>
          } />
        <Route path='/group/:groupId' element={
          <ProtectedRoute>
            <AddExpensePage />
          </ProtectedRoute>
          } />
        <Route path="/group/:groupId/details" element={
          <ProtectedRoute>
            <GroupDetailsPage />
          </ProtectedRoute>
          } />
      </Routes>
    </>
  )
}

export default App
