import React, { useEffect } from 'react';

const Protected: React.FC = () => {
    useEffect(() => {
        window.location.href = 'http://localhost:3000';
    }, []);

    return (
        <h1>Redirecting to your whiteboard....</h1>
    );
};

export default Protected;
