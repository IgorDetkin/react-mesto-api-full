import React from 'react';

function Footer(props) 


{
    return(
        <footer className={props.loggedIn ? "footer" : "footer_hidden"}>
            <p className="footer__copyright">&#169; {new Date().getFullYear()} Igor Detkin</p>
        </footer>
        
    )
}

export default Footer;