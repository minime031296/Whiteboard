import React from 'react';
import useAuth from './hooks/useAuth';
import Protected from './components/Protected';
import Public from './components/Public';

const App: React.FC = () => {
    const isLoggedIn = useAuth();
    return (
        isLoggedIn ? <Protected /> : <Public />
    );
};

export default App;
