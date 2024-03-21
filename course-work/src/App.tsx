import React, { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { AppStateType } from './store/store';
import { useAppDispatch } from './hooks/hooks';
import { initializeApp } from './store/app/AppReducer';
import MainLayout from './pages/MainLayout/MainLayout';

const App: React.FC = () => {
    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(initializeApp())
    }, [])

    return (
      <>
        { initialized && <MainLayout/>}
      </>
    );
}

export default App;
