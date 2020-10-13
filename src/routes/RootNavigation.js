import * as React from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

function pop() {
    navigationRef.current?.dispatch(CommonActions.goBack());
}

export default {
    navigate,
    pop
}