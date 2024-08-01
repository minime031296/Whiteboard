"use client";
import React from 'react';
import Whiteboard from '../../auth/src/components/_Whiteboard';
import useAuth from '../../auth/src/hooks/useAuth';

const Page = () => {
  const isLoggedIn = useAuth();

  return (
    <div>
      {isLoggedIn ?  "Loading..." : <Whiteboard /> }
    </div>
  );
}

export default Page;
