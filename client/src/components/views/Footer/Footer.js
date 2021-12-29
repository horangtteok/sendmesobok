// import {Icon} from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '30px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p style={{ color: '#096dd9'}}>Made by .<SmileOutlined /></p>
        </div>
    );
}

export default Footer;