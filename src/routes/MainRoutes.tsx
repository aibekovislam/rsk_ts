import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Homepage } from '../pages/Homepage';
import { QueueAdmin } from '../pages/QueueAdmin';

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <Homepage/> } ></Route>
        <Route path='/queue/admin' element={ <QueueAdmin/> } ></Route>
    </Routes>
  )
}
