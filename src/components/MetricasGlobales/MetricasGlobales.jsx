import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { getMetabaseToken } from '../../services/metabaseService';

export const MetricasGlobales = ({ dashboardId }) => {
  const [loading, setLoading] = useState(true);
  const [metabaseToken, setMetabaseToken] = useState("");
  const userToken = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const id = dashboardId || 34;
        const response = await getMetabaseToken(id, userToken);

        if (response && response.token) {
          setMetabaseToken(response.token);
        } else {
          console.error('La respuesta no contiene un token válido');
        }
      } catch (error) {
        console.error("Error fetching Metabase token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [dashboardId, userToken]);

  if (loading) {
    return <Loader/>;
  }

  if (!metabaseToken) {
    return <div>Error al obtener el token para el dashboard.</div>;
  }

 
  const iframeUrl = `${import.meta.env.VITE_METABASE_URL}/embed/dashboard/${metabaseToken}#theme=night&bordered=true&titled=true`;

  return (
    <iframe
      src={iframeUrl}
      frameBorder="0"
      width="100%"
      height="600"
      allowtransparency="true"
      title="Metabase Dashboard"
    ></iframe>
  );
};
