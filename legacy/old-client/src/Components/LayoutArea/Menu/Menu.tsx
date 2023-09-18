import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';
import React from 'react';
import './Menu.css';

interface Props {}

function Menu(): React.FC<Props> {
  return (
    <div className="Menu">
      <AuthMenu />
    </div>
  );
}

export default Menu;
