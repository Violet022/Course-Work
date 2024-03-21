import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Route, Routes } from 'react-router-dom';
import { selectIsAuth } from '../../store/authentication/AuthSelectors';

import MainPageRedirect from '../Main/MainPageRedirect';
import LoginPage from '../Login/LoginPage';
import CompaniesPage from '../Companies/CompaniesPage';
import CompanyPage from '../Company/CompanyPage';
import LogoutPage from '../Logout/LogoutPage';
import PositionsPage from '../Positions/PositionsPage';
import ProfilePage from '../Profile/ProfilePage';
import PositionPage from '../Position/PositionPage';
import ApplicationsPage from '../Applications/ApplicationsPage';
import ApplicationPage from '../Application/ApplicationPage';
import StudentsPage from '../Students/StudentsPage';
import StudentPage from '../Student/StudentPage';
import AdministrationPage from '../Administration/AdministrationPage';

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