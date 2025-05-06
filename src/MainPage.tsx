import React, { useRef, useState, useEffect } from 'react';
//import Navigation from './SideBar/Navigation';

import './MainPageStyles/MainPageStyle.css';
//import Content from './Content/Content';
import Balance_CC from './Content/Stock/Balance/Balance_CC';
import Sidebar from './Sidebar/Sidebar';
import { ReactComponent as Parthenon}  from './parthenon.svg';

const MainPage : React.FunctionComponent = () => {
  const [submenuState, setSubmenuState] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);  
  const subSidebarRef = useRef<HTMLDivElement | null>(null);

  const handleTransitionEnd : React.TransitionEventHandler<HTMLDivElement> = (event : React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName === 'opacity' || event.propertyName === 'transform') {
      if (!submenuState) {
        closeSubMenu(); 
      }
    }
  };

  useEffect(() => {
    if (submenuState) {
      openSubMenu();
    } else {
      if (subSidebarRef.current && subSidebarRef.current.classList) {
        subSidebarRef.current.classList.add('fade-out');
      }      
    }
  }, [submenuState]);

  const openSubMenu = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.gridTemplateColumns = "1fr 1fr 8fr";
    }
    if (subSidebarRef.current) {
      subSidebarRef.current.classList.add('fade-in');      
    }
    if (mainRef.current) {
      const main = mainRef.current;
      main.style.gridColumn = '3 / 4';
    }
  };

  const closeSubMenu = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.gridTemplateColumns = "1fr 9fr";
    }
    if (mainRef.current) {
      const main = mainRef.current;
      main.style.gridColumn = '2 / 3';
    }
    if (subSidebarRef.current) {
      subSidebarRef.current.classList.remove('fade-in', 'fade-out');      
    }
  };

  return (
    <div className="container" ref={containerRef}>
      <header className="header">   
        <div className="main-menu">

          <div className='logotype'>
            <div className='logo-container'>
              <Parthenon className='logo' />            
            </div>
            <h1>Agora CRM</h1>
          </div>
          
          
        </div>
        <div className="avatar-login">         
          <p>Avatar/Login</p>
        </div>        
      </header>      
      <div  className="sidebar" onClick={()=> setSubmenuState(s => !s)}>
        <Sidebar/>
        {/* <Navigation/> */}
      </div>
      <div className={`sub-sidebar ${submenuState ? '' : 'fade-out'}`} 
           ref={subSidebarRef} 
           onTransitionEnd={handleTransitionEnd}
      >
        
      </div>
      <div className="main" ref={mainRef}>
        {/* <Content/> */}
        <Balance_CC/>
      </div>
    </div>
  );
};

export default MainPage;