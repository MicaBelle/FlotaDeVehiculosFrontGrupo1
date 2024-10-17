import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';

export const MetricasGlobales = ({ dashboardId }) => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/metabase/token?dashboardId=${dashboardId}`);
        setToken(response.data);
      } catch (error) {
        console.error("Error fetching Metabase token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [dashboardId]);

  if (loading) {
    return <Loader/>;
  }

  if (!token) {
    return <div>Error al obtener el token para el dashboard.</div>;
  }

 
  const iframeUrl = `https://tu-metabase.com/embed/dashboard/${token}#bordered=true&titled=true`;

  return (
    <iframe
      src={iframeUrl}
      frameBorder="0"
      width="800"
      height="600"
      allowTransparency="true"
      title="Metabase Dashboard"
    ></iframe>
  );
};
