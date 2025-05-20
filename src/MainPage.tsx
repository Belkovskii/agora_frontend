import React, { useRef, useState, useEffect } from 'react';
import './MainPageStyles/MainPageStyle.css';
import Balance_CC from './Content/Stock/Balance/Balance_CC';
import Sidebar from './Sidebar/Sidebar';
import Submenu from './Submenu/Submenu';
import { ReactComponent as Parthenon}  from './parthenon.svg';
import {ReactComponent as StockIcon} from "./Sidebar/icons/stock.svg";
import {ReactComponent as CalendarIcon} from "./Sidebar/icons/calendar.svg";
import {ReactComponent as SalesIcon} from "./Sidebar/icons/sales.svg";
import {ReactComponent as CustomersIcon} from "./Sidebar/icons/customer.svg";
import {ReactComponent as TaskListIcon} from "./Sidebar/icons/tasklist.svg";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { SideMenuItemButton } from './Sidebar/SidebarTypes';
import { MenuItem, setMenuItemClicked, setSubmenuItemClicked, setAllUnchecked } from './MainPageReducer';
import { stat } from 'fs';
import { SubmenuItemButton } from './Submenu/SubmenuButton/SubmenuTypes';
import { NavLink } from "react-router-dom";
import Content from './Content/Content';


const logoToNames : Map<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = new Map([
  ['StockIcon', StockIcon],
  ['CalendarIcon', CalendarIcon],
  ['SalesIcon', SalesIcon],
  ['CustomersIcon', CustomersIcon],
  ['TaskListIcon', TaskListIcon]
]);

const MainPage : React.FunctionComponent = () => {
  const [submenuState, setSubmenuState] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);  
  const subSidebarRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleTransitionEnd : React.TransitionEventHandler<HTMLDivElement> = (event : React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName === 'opacity' || event.propertyName === 'transform') {
      if (!submenuState) {
        closeSubMenu(); 
      }
    }
  };

  const mainMenuState = useSelector((state : RootState) => state.mainMenu);

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
      container.style.gridTemplateColumns = "1.2fr 1.3fr 12fr";
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

  const menuState = useSelector((state: RootState) => state);

  const items : SideMenuItemButton[] = menuState.mainMenu.menu.map(item => ({
    icon : logoToNames.get(item.icon)!,
    label : item.label,
    value : item.key,  
    url : item.url,
    isClicked : item.isClicked
  }));

  const clikedItem = menuState.mainMenu.menu.find(item => item.isClicked);  
  const submenuItems : SubmenuItemButton[] = clikedItem ? 
    clikedItem.submenuItems.map(submenuItem => ({
      label : submenuItem.label, 
      key : submenuItem.key,
      url : submenuItem.url,
      isClicked : submenuItem.isClicked
    })) : [];

  const onMenuItemClick = (itemKey : number) => {
    dispatch(setMenuItemClicked(itemKey));
    setSubmenuState(true);
  }

  const onSubmenuItemClick = (submenuItemKey : number) => {
    dispatch(setSubmenuItemClicked(submenuItemKey));
  }

  return (
    <div className="container" ref={containerRef}>
      <header className="header">   
        <div className="main-menu">

          <NavLink to="" className="logo-nav">
            <div className='logotype' onClick={()=> {
              setSubmenuState(false);
              dispatch(setAllUnchecked());
            }}>
            <div className='logo-container'>
              <Parthenon className='logo' />            
            </div>
            <h1>Agora CRM</h1>
          </div>
          </NavLink>
          
          
          
        </div>
        <div className="avatar-login">         
          <p>Avatar/Login</p>
        </div>        
      </header>   
      
      <div  className="sidebar">
        <Sidebar items={items} onMenuItemClick={onMenuItemClick}/>        
      </div>

      <div className={`sub-sidebar ${submenuState ? '' : 'fade-out'}`} 
           ref={subSidebarRef} 
           onTransitionEnd={handleTransitionEnd}>
            <Submenu items={submenuItems} onSubmenuItemClick={onSubmenuItemClick}/>
      </div>


      <div className="main" ref={mainRef}>
        <Content/>
        {/* <Content/> */}
        {/* <Balance_CC/> */}
      </div>
    </div>
  );
};

export default MainPage;