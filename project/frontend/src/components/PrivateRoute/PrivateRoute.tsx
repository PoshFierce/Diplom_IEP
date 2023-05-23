import React from 'react';
import { getCurrentUser } from '../../utils';
import { isNil } from 'lodash';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Routes as R } from '../../constants';

export const PrivateRoute = ({ ...params }: RouteProps): JSX.Element => {
    const user = getCurrentUser();
    if (!isNil(user)) {
        return <Route {...params} />;
    }
    return <Redirect to={R.LOGIN} />;
};
