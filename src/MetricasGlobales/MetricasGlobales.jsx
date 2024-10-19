import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMetabaseToken } from '../services/metabaseService';
import Loader from '../components/Loader/Loader';
import './styles/MetricasGlobales.css'


export const MetricaGlobales = ({ dashboardId }) => {
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
    <div className="metabase-dashboard">
      <iframe
        src={iframeUrl}
        frameBorder="0"
        allowtransparency="true"
        title="Metabase Dashboard"
      ></iframe>
    </div>
  );
};
