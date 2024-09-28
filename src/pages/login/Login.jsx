import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../components/store/userSlice';

//import axios from 'axios'; // Para hacer la llamada al backend

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*const handleLogin = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post('/api/login', {
        username,
        password
      });

      const { data } = response;
      if (data.success) {
        dispatch(setUser({
          username: data.username,
          role: data.role,
        }));

        navigate('/home');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error en el servidor. Inténtalo nuevamente.');
    }
  };*/

  const handleLogin = (e) => {
    e.preventDefault();

   
    const mockUserData = {
      username: username || 'mockUser', 
      role: 'admin', 
    };

    
    if (username && password) {
      
      dispatch(setUser(mockUserData));
      navigate('/home');
    } else {
      setError('Por favor, ingrese un usuario y contraseña válidos');
    }
  };


  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Ingresa tu usuario"
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Ingresa tu contraseña"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};
