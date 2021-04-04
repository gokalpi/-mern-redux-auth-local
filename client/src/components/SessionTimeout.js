import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { isAuthenticatedSelector, logoutUser } from '../features/auth/auth.slice';

const SessionTimeout = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [events, setEvents] = useState(['click', 'load', 'scroll']);
  const [second, setSecond] = useState(0);
  const [isOpen, setOpen] = useState(false);

  var timeStamp;
  var warningInactiveInterval = useRef();
  var startTimerInterval = useRef();

  // start inactive check
  const timeChecker = () => {
    startTimerInterval.current = setTimeout(() => {
      const storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
      warningInactive(storedTimeStamp);
    }, 60000);
  };

  // warning timer
  const warningInactive = (timeString) => {
    clearTimeout(startTimerInterval.current);

    warningInactiveInterval.current = setInterval(() => {
      const maxTime = 5;
      const popTime = 4;

      const diff = moment.duration(moment().diff(moment(timeString)));
      const minPast = diff.minutes();
      const leftSecond = 60 - diff.seconds();

      if (minPast === popTime) {
        setSecond(leftSecond);
        setOpen(true);
      }

      if (minPast === maxTime) {
        clearInterval(warningInactiveInterval.current);
        setOpen(false);
        sessionStorage.removeItem('lastTimeStamp');
        dispatch(logoutUser());
      }
    }, 1000);
  };

  // reset interval timer
  const resetTimer = useCallback(() => {
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);

    if (isAuthenticated) {
      timeStamp = moment();
      sessionStorage.setItem('lastTimeStamp', timeStamp);
    } else {
      clearInterval(warningInactiveInterval.current);
      sessionStorage.removeItem('lastTimeStamp');
    }
    timeChecker();
    setOpen(false);
  }, [isAuthenticated]);

  // handle close popup
  const handleClose = () => {
    setOpen(false);

    resetTimer();
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    timeChecker();

    return () => {
      clearTimeout(startTimerInterval.current);
      //   resetTimer();
    };
  }, [resetTimer, events, timeChecker]);

  if (!isOpen) {
    return null;
  }

  // change fragment to modal and handleclose func to close
  return <Fragment />;
};

export default SessionTimeout;
