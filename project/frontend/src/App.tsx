import React from 'react';
import { Routes as R } from './constants';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, Main, Register } from './pages';
import { PrivateRoute } from './components/PrivateRoute';
import 'antd/dist/antd.css';
import { MyCourses } from './pages/MyCourses';
import { Profile } from './pages/Profile';
import { ActivatePage } from './pages/Activate';
import { Activation } from './pages/Activation';
import { CourseView } from "./pages/Course";
import { LessonView } from "./pages/ Lesson";

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact component={Login} path={R.LOGIN} />
        <Route exact component={Register} path={R.REGISTER}/>
        <Route exact component={Activation} path={R.ACTIVATION} />
        <Route component={ActivatePage} path={R.ACTIVATE} />
        <PrivateRoute exact component={Main} path={R.ROOT} />
        <PrivateRoute exact component={Main} path={R.TEACHER_RATING} />
        <PrivateRoute exact component={MyCourses} path={R.VOTE} />
        <PrivateRoute exact component={CourseView} path={R.COURSE} />
        <PrivateRoute exact component={LessonView} path={R.LESSON} />
        <PrivateRoute exact component={Profile} path={R.PROFILE} />
      </Switch>
    </Router>
  );
}

export default App;
