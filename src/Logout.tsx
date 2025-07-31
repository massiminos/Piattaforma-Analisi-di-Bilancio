import { logoutUtente, auth, verifyPasswordBeforeDelete, deleteEmailPasswordAccount, deleteGoogleAccount } from "./Analisi_di_bilancio/DataLoaderFirestore.tsx";
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, EyeOff } from "lucide-react";

type ShowLogoutProps = {
  setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  classNameButton: string;
};

export const name = auth.currentUser?.email;

export const ShowLogout: React.FC<ShowLogoutProps> = ({ setShowLogoutModal, classNameButton }) => {
  const [showModaleCA, setShowModaleCA] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleDeleteWP = async (password: string) => {
    try {
      const isValid = await verifyPasswordBeforeDelete(password);
      if (!isValid) return;

      const deleted = await deleteEmailPasswordAccount(); 
      if (deleted) {
        window.location.assign('/bye');
      } else {
        alert("Errore durante l'eliminazione dell'account.");
      }
    } catch (error) {
      alert("Si è verificato un errore inatteso.");
      console.error(error);
    }
  };

  const handleDeleteG = async () => {
    try {
      const deleted = await deleteGoogleAccount(); 
      if (deleted) {
        window.location.assign('/bye');
      } else {
        alert("Errore durante l'eliminazione dell'account.");
      }
    } catch (error) {
      alert("Si è verificato un errore inatteso.");
      console.error(error);
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button onClick={() => (showModaleCA ? setShowModaleCA(false) : setShowLogoutModal(false))} className="Xclose2">✕</button>

        {showModaleCA ? (
          <>
            <label style={{ fontSize: "20px", fontFamily: "Segoe UI", fontWeight: "500" }}>
              <p style={{ marginBottom:"1rem" }}>
                🚨 In questa scheda puoi cancellare il tuo account.
              </p>
              <p style={{ backgroundColor: "#ca1818", color: "#fff", padding: "0.5rem 1rem", fontSize: "16px" }}>
                ⚠️ La cancellazione del tuo account è definitiva e irreversibile.
              </p>
              <p style={{ backgroundColor: "#ca1818", color: "#fff", padding: "0 1rem 0.5rem 1rem", fontSize: "16px" }}>
                Tutti i tuoi dati verranno eliminati in modo permanente.
              </p>
              <p style={{ padding: "1rem", fontSize: "16px", fontWeight: "400" }}>
                Se sei sicuro, inserisci la password e clicca su "Cancella il mio account".
              </p>
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "35% 30% 35%", justifyItems: "center" }}>
              <div className="pass-cell" style={{ marginTop: "2.5rem", gridColumn: 2 }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input Pass"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div onClick={() => setShowPassword(!showPassword)} className="eye-EyeOff">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              <button onClick={() => handleDeleteWP(password)} className={classNameButton} style={{ gridColumn: "2", marginTop: "1rem", width: "9rem"}}>
                Cancella il mio account
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
              <button onClick={handleDeleteG} style={{ background: "none", border: "none", fontSize: "14px", fontFamily: "Segoe UI" }}>
                Se ti sei registrato con Google <span className="fakeLink">clicca qui</span>.
              </button>
            </div>
          </>
        ) : (
          <div className="label-button">
            <label style={{fontSize:30}}>Stai per effettuare il Logout.<br />Sei sicuro di voler uscire?</label>
            <p style={{ height: "1.5rem" }}></p>
            <button onClick={() => logoutUtente()} className={classNameButton} style={{ fontSize: 16, maxWidth: "7rem", marginBottom: "0.5rem" }}>Esci</button>
            <br />
            <button onClick={() => setShowLogoutModal(false)} className={classNameButton} style={{ fontSize: 16, maxWidth: "7rem", marginBottom: "0.5rem" }}>Indietro</button>
            <br />
            <br />
            <button onClick={() => setShowModaleCA(true)} className="cancellAccount" style={{ fontSize: "12px", background: "white", border: "none", marginTop: "1rem" }}>
              Cancella Account 🛈
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

//  Qpo7dvtQ@