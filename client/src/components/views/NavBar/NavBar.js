import { useState } from 'react';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import RightMenu from './Sections/RightMenu';
import './Sections/NavBar.css';

function NavBar() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
        <div className="menu__logo">
            <a href="/">소복소복</a>
        </div>
        <div className="menu__container">
            <div className="menu_right">
                <RightMenu mode="horizontal" />
            </div>
            <Button
                className="menu__mobile-button"
                type="default"
                onClick={showDrawer}
                style={{ background:'none', border: 'none', color: '#4B92FD' }}
            >
                <MenuOutlined />
            </Button>
            <Drawer
                title="메뉴"
                placement="right"
                className="menu_drawer"
                closable={false}
                onClose={onClose}
                visible={visible}
                width='240px'
            >
                <RightMenu mode="inline" />
            </Drawer>
        </div>
    </nav>
  );
}

export default NavBar;