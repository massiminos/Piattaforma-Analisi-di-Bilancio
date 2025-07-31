import { useState, useEffect, useRef } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useDati, useDatiB, useLoading } from "./DatiContext.tsx";
import { db, auth, getAnalisi } from "./DataLoaderFirestore.tsx";
import { useNavigate } from "react-router-dom";
import "./styleAdB.css"

export default function WelcomeScreen() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [listaAnalisi, setListaAnalisi] = useState<string[]>([]);
  const [showListaAnalisi, setShowListaAnalisi] = useState(false);
  const { setDataDAzienda } = useDati();
  const { setDataBilancio } = useDatiB();

  const {showLoaderModal, setShowLoaderModal } = useLoading();

  const navigate = useNavigate();

 //recupera i dati dell'analisi scelta.
  const handleRecuperaAnalisiClick = async () => {
    setActiveButton("recupera");
    const analisi = await getAnalisi();
    if (analisi) {
      setListaAnalisi(analisi);
      setShowListaAnalisi(true);
    }
  };

  const handleSelezionaAnalisi = async (nomeAnalisi: string) => {
    const user = auth.currentUser;
    if (!user) return alert("Utente non loggato.");

    const docRef = doc(db, "utenti", user.uid, "analisi", nomeAnalisi);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const dati = snapshot.data();
      setDataDAzienda(dati.Dati_Azienda);
      setDataBilancio(dati.BilancioOb);
      setIsTransitioning(true);
      setTimeout(() => {
        navigate("/dash", { state: { manualMode: false  } });
      }, 500);
    } else {
      alert("Documento non trovato.");
    }
  };

  //chiude menu al click
  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowSubMenu(false);
      setShowListaAnalisi(false);
      setActiveButton("");
    }
  };

  if (showSubMenu || showListaAnalisi) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showSubMenu, showListaAnalisi]);


  // schermata iniziale
  return (
    <div className={`welcome-container ${isTransitioning ? "fade-out" : ""}`}>
      <h1 className="welcome-title">
        Benvenuto su<br />
        Piattaforma Analisi di Bilancio
      </h1>

      <div className="button-group-DAB" ref={menuRef}>
        <div className="button-group-DAB">
          <button
            className={`big-button ${activeButton === "nuova" ? "active-button" : ""}`}
            onClick={() => {
              setShowSubMenu((prev) => !prev);
              setActiveButton("nuova");
            }}
          >
            Nuova Analisi
          </button>

          {showSubMenu && (
            <div className="submenu-modern">
              <button
                className="submenu-option"
                onClick={() => {
                  setShowLoaderModal(true);
                  setIsTransitioning(true);
                  setShowSubMenu(false);
                  setActiveButton("");
                  setTimeout(() => {
                    navigate("/dash", { state: { manualMode: true } });
                  }, 100);
                }}
              >
                Inserisci i dati manualmente
              </button>
              <button
                className="submenu-option"
                style={{cursor:"not-allowed"}}
                onClick={() => {
                  /*setIsTransitioning(true);
                  setShowSubMenu(false);
                  setActiveButton("");
                  setTimeout(() => {
                    navigate("/dash", { state: { manualMode: false } });
                  }, 100); */
                }}
              >
                Importa i dati da file
              </button>
            </div>
          )}
        </div>
        <button
          className={`big-button ${activeButton === "recupera" ? "active-button" : ""}`}
           onClick={handleRecuperaAnalisiClick}
        >
          Recupera Analisi
        </button>
        {showListaAnalisi && (
          <div className="submenu-modern">
            {listaAnalisi.length === 0 && <div>Nessuna analisi trovata.</div>}
            {listaAnalisi.map((nome) => (
              <button
                key={nome}
                className="submenu-option"
                onClick={() => handleSelezionaAnalisi(nome)}
              >
                {nome}
              </button>
            ))}
          </div>
        )}
      </div>
      {showLoaderModal && (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(255, 255, 255, 0.29)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, cursor:"wait"
          }}
        >
          {/*<div style={{textAlign: "center"}}>
            <img
              src="icons8-dots-loading.gif"
              alt="Caricamento in corso..."
              style={{ width: "128px", height: "128px"}}
            />
        </div>*/}
      </div>
    )}
    </div>
  );
}