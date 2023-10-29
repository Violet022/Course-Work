import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Route, Routes } from 'react-router-dom';
import { selectIsAuth } from '../../store/authentication/AuthSelectors';

import MainPageRedirect from '../../pages/Main/MainPageRedirect';
import LoginPage from '../../pages/Login/LoginPage';
import CompaniesPage from '../../pages/Companies/CompaniesPage';
import CompanyPage from '../../pages/Company/CompanyPage';
import LogoutPage from '../../pages/Logout/LogoutPage';
import PositionsPage from '../../pages/Positions/PositionsPage';
import ProfilePage from '../../pages/Profile/ProfilePage';
import PositionPage from '../../pages/Position/PositionPage';
import ApplicationsPage from '../../pages/Applications/ApplicationsPage';
import ApplicationPage from '../../pages/Application/ApplicationPage';
import StudentsPage from '../../pages/Students/StudentsPage';
import StudentPage from '../../pages/Student/StudentPage';
import AdministrationPage from '../../pages/Administration/AdministrationPage';

const RoutesList: React.FC = () => {
  const isAuth = useSelector(selectIsAuth)

  return (
      <Routes>
          <Route path="/" 
                 element={ isAuth ? <MainPageRedirect/> : <Navigate to={'/login'}/> }
          />
          <Route path="students" 
                 element={ isAuth ? <StudentsPage/> : <Navigate to={'/login'}/> }
          />
          <Route path="students/:id" 
                 element={ isAuth ? <StudentPage/> : <Navigate to={'/login'}/> }
          />
          <Route path="companies" 
                 element={ isAuth ? <CompaniesPage/> : <Navigate to={'/login'}/> }
          />
          <Route path="companies/:id" 
                 element={ isAuth ? <CompanyPage/> : <Navigate to={'/login'}/> }
          />
          <Route path="profile" 
                 element={ isAuth ? <ProfilePage/> : <Navigate to={'/login'}/> }
          />
          <Route path="applications" 
                 element={ isAuth ? <ApplicationsPage/> : <Navigate to={'/login'}/> }
          />
          <Route path="applications/:id" 
                 element={ isAuth ? <ApplicationPage/> : <Navigate to={'/login'}/> }
          /> 
          <Route path='positions' 
                 element={ isAuth ? <PositionsPage/> : <Navigate to={'/login'}/> }
          />
          <Route path='positions/:id' 
                 element={ isAuth ? <PositionPage/> : <Navigate to={'/login'}/> }
          /> 
          <Route path='administration'
                 element={isAuth ? <AdministrationPage/> : <Navigate to={'/login'}/>}
          />
          <Route path='login'
                 element={<LoginPage/>}
          />
          <Route path='logout'
                 element={<LogoutPage/>}
          />
      </Routes>
  );
};

export default RoutesList;