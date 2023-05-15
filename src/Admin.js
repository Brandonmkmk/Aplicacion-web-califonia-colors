import { useRef, useState } from "react";
import "./admin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
export function Admin() {
  let [usuario, setUsuario] = useState("");
  let [password, setPassword] = useState("");
  let inputs = useRef();
  /*se crea una referencia del hook useNavigete */
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setUsuario(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <body>
      <div className="night">
        <div className="surface"></div>
        <div className="car"></div>
        <section>
          <div className="form-box">
            <div className="form-value">
              <form action="">
                <h2>Login</h2>
                <div className="inputbox">
                  <ion-icon name="mail-outline"></ion-icon>
                  <input
                    defaultValue={""}
                    ref={inputs}
                    onChange={handleEmail}
                    type="email"
                    required
                  />

                  <label for="">correo</label>
                </div>
                <div className="inputbox">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <input
                    defaultValue={""}
                    onChange={handlePassword}
                    type="password"
                    required
                  />
                  <label for="">contraseña</label>
                </div>

                <button
                  onClick={() => {
                    if (usuario && password) {
                      navigate("/agregar");
                      inputs.current.value = "";
                    }
                  }}
                >
                  Iniciar sesion
                </button>
                <div className="register">
                  <p></p>
                </div>
              </form>
              <button
                onClick={() => {
                  navigate("/inicio");
                }}
              >
                inicio
              </button>
            </div>
          </div>
        </section>
      </div>
    </body>
  );
}

export const Datos = [];
console.log(Datos);
