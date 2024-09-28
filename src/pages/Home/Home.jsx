import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Principal from '../../components/Principal';
import styled from 'styled-components';

export const Home = () => {
  const [activeMenu, setActiveMenu] = useState('Home');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <>
      <DashboardWrapper>
        <NavBar />
        <MainContent>
          <Sidebar>
            <MenuItem onClick={() => handleMenuClick('Colectivos')}>Colectivos</MenuItem>
            <MenuItem onClick={() => handleMenuClick('Profile')}>Profile</MenuItem>
            <MenuItem onClick={() => handleMenuClick('Settings')}>Settings</MenuItem>
          </Sidebar>
          <ContentArea>
            <Principal activeMenu={activeMenu} />
          </ContentArea>
        </MainContent>
      </DashboardWrapper>
    </>
  );
};


const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 1em;
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 1em;
  background-color: #fff;
`;
