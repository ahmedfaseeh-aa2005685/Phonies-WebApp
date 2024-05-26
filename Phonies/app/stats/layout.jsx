import "@/app/globals.css"
import "@/public/Styles/MyStyle.css"
export default async function RootLayout({ children }) {
  return (
    <body >
      <section id="'Navigation">
        <nav>
          <div className="nav1">
            <div className="navItem" id="logo">
              <div className="logo">
                <a href="../Websites/main.html">
                  <img
                    src="../Media/Icons/phoney.png"
                    alt="Logo"
                    width="80"
                    height="80"
                  />
                </a>
              </div>
            </div>
            <div className="navItem"></div>

            <div className="user" id="user"></div>
            <div className="navItem" id="loginButton">
              <a className="login" href="../Websites/login.html" id="login">
                Login
              </a>
            </div>
          </div>
        </nav>
      </section>
      {children}
    
        
    </body>
  );
}
