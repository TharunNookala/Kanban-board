'use client';

import React, { useEffect, useState } from 'react';

import store from "@/store/store";
import { Provider } from "react-redux";
import Board from '@/components/Board';
const Dashboard = () => {

  return (
    <Provider store={store}>
    <section className='w-full min-h-screen h-full  flex flex-col items-start justify-start gap-4'>
     <Board />
    </section>
    </Provider>
  )
}

export default Dashboard