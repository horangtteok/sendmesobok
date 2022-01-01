import './footer.css'

function Footer() {
    return (
        <div className="foot" style={{
            height: '30px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
        }}>
            <p style={{ color: '#FFCF55'}}>
               mad by soyeong.
            </p>
        </div>
    );
}

export default Footer;