import { useState, useEffect } from 'react';

const useNetworkStatus = () => {
  const [network, setNetwork] = useState('Checking...');

  useEffect(() => {
    if ('connection' in navigator) {
      const updateNetwork = () => {
        setNetwork(navigator.connection.effectiveType);
      };
      navigator.connection.addEventListener('change', updateNetwork);
      updateNetwork();
    } else {
      setNetwork('Not supported');
    }
  }, []);

  return network;
};

export default useNetworkStatus;
