import { useState, useEffect, useRef } from 'react';

import Keycloak from 'keycloak-js';

const useAuth = (): boolean => {
  const isRun = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const client = new Keycloak({
      url: "http://localhost:8080/",
      realm: "myrealm",
      clientId: "myclient",
    });

    client.init({
      onLoad: 'login-required',
    }).then((res) => {
      setIsLoggedIn(res);
    });
  }, []);

  return isLoggedIn;
};

export default useAuth;
