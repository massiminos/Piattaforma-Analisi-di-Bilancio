import React , { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAuth } from "firebase/auth";
import DatiAzienda from "./DatiAzienda.tsx";
import Andamenti from "./Andamenti.tsx";
import Bilancio from "./Bilancio.tsx";
import CERiclassificato from "./CERiclassificato.tsx";
import Disclaimer from "./Disclaimer.tsx";
import GoingConcern from "./GoingConcern.tsx";
import Legenda from "./Legenda.tsx";
import MarginiPatrimoniali from "./MarginiPatrimoniali.tsx";
import SintesieIndici from "./SintesieIndici.tsx";
import SPRiclasificato from "./SPRiclasificato.tsx";
import Swal from 'sweetalert2';
import { BilancioOb, Dati_Azienda} from "./Bilancio&DatiAzienda.ts";
import { useDati, useDatiB, useLoading } from "./DatiContext.tsx";
import { saveUserDoc } from "./DataLoaderFirestore.tsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShowLogout } from "../Logout.tsx";
import "../stylelog.css"


export default function DashboardAB() {
  const location = useLocation();
  //const manualMode = location.state?.manualMode ?? false;
  const [manualMode, setManualMode] = useState(location.state?.manualMode ?? false);
  const navigate = useNavigate();

  const { dataDAzienda, setDataDAzienda } = useDati();
  const { dataBilancio, setDataBilancio } = useDatiB();

  const [formDataAzienda, setFormDataAzienda] = useState(dataDAzienda);
  const [formDataBilancio, setFormDataBilancio] = useState(dataBilancio);
  const [backupDataDAzienda, setBackupDataDAzienda] = useState(dataDAzienda);
  const [backupDataBilancio, setBackupDataBilancio] = useState(dataBilancio);

  const [editingSheet, setEditingSheet] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shouldPrint, setShouldPrint] = useState(false);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState<string | null>(null);

  //gif carricamento
  const { setShowLoaderModal } = useLoading();
  useEffect(() => {
    setShowLoaderModal(false);
  }, []);

  //logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Stati per menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  //foto profilo autenticato
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserPhotoURL(user.photoURL);
    }
  }, []);


  const warningAlert = (alert: string) => {
    return Swal.fire({
      icon: 'warning',
      title: 'Attenzione!',
      html: alert,
      confirmButtonText: 'OK',
      didOpen: () => {
        const btn = document.querySelector('.swal2-confirm') as HTMLElement;
        if (btn) {
          btn.style.backgroundColor = '#f89412ff';
          btn.style.color = 'white';
          btn.style.fontSize = '15px';
          btn.style.padding = '8px 16px';
          btn.style.borderRadius = '4px';
        }
        const icon = document.querySelector('.swal2-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = 'scale(0.7)';
          icon.style.width = '90px';
          icon.style.height = '90px';
          icon.style.marginBottom = "0";
        }
      }
    });
  };

  useEffect(() => {
    if (shouldPrint) {
      const companyName = dataDAzienda.B11.replace(/\s+/g, "_");
      const originalTitle = document.title;
      document.title = `Analisi_di_bilancio_${companyName}`;
      window.print();
      document.title = originalTitle;
      setShouldPrint(false);
    }
  }, [shouldPrint]);

  const closeEditing = () => setEditingSheet(null);

  const handleSave = (titles: string[]): boolean => {
    if (!formDataAzienda.B11 || !formDataAzienda.B17 || !formDataAzienda.B23) {
      warningAlert(
        "I campi:<br>'<span style='color:#f86e12ff'>Ragione Sociale</span>',<br>'<span style='color:#f86e12ff'>Ultimo bilancio anno</span>' e<br>'<span style='color:#f86e12ff'>Going Concern Trade Area</span>'<br><b>sono obbligatori!</b><br>Assicurati che siano correttamente compilati prima di proseguire."
      );
      return false;
    }
    titles.forEach((title) => {
      if (title === "Dati Azienda") {
        setDataDAzienda(formDataAzienda);
        setBackupDataDAzienda(formDataAzienda);
      } else if (title === "Bilancio") {
        setDataBilancio(formDataBilancio);
        setBackupDataBilancio(formDataBilancio);
      }
    });
    
    setManualMode(false)
    closeEditing();
    return true;
  };

  const restState = () => {
    setDataDAzienda(Dati_Azienda);
    setDataBilancio(BilancioOb);
    setFormDataAzienda(Dati_Azienda);
    setFormDataBilancio(BilancioOb);
  }

  const openPdfOptions = () => {
    if (dataDAzienda.B11) {
      closeEditing();
      setIsModalOpen(true);
    } else {
      warningAlert("Sembra che il campo '<span style='color:#f86e12ff'>Ragione Sociale</span>' sia vuoto.<br/>Assicurati di aver inserito tutti i campi richiesti prima di creare il PDF!");
    }
  };

  const scrollToSection = (idx: number) => {
    const el = sectionRefs.current[idx];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!mainRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {
        root: mainRef.current,
        threshold: 0,
        rootMargin: "-30% 0px -50% 0px",
      }
    );

    sectionRefs.current.forEach(el => el && observer.observe(el));
    return () => sectionRefs.current.forEach(el => el && observer.unobserve(el));
  }, [manualMode]);

  //toglie cursore caricamento. 
  useEffect(() => {
    document.body.classList.remove("cursor-loader");
  }, []);

  const sheets: { title: string; Component: React.ElementType }[] = [
    { title: "Dati Azienda", Component: DatiAzienda },
    { title: "Bilancio", Component: Bilancio },
    { title: "SP Riclasificato", Component: SPRiclasificato },
    { title: "Margini Patrimoniali", Component: MarginiPatrimoniali },
    { title: "Going Concern", Component: GoingConcern },
    { title: "CE Riclassificato", Component: CERiclassificato },
    { title: "Sintesi e Indici", Component: SintesieIndici },
    { title: "Andamenti", Component: Andamenti },
    { title: "Legenda", Component: Legenda },
    { title: "Disclaimer", Component: Disclaimer },
  ];

  const visibleSheets = manualMode ? sheets.slice(0, 2) : sheets;

  const isEditable = (title: string) => editingSheet === title || manualMode;

  const renderSheet = (title: string, Component: React.ElementType, idx: number) => (
    <section
      id={`sheet-${idx}`}
      key={title}
      ref={(el) => { sectionRefs.current[idx] = el; }}
      style={{ marginTop: "10px", marginBottom: "40px" }}
    >
      <Paper className="hide-paper" elevation={3} style={{ padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">{title}</Typography>
          {!manualMode && (title === "Dati Azienda" || title === "Bilancio") && (
            editingSheet === title ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="modifica-button"
                  onClick={() => handleSave([title])}
                  style={{ backgroundColor: "#4caf50", color: "#fff", border: 0, borderRadius: 12, padding: "8px 12px", fontWeight: 600 }}
                >
                  Salva
                </button>
                <button
                  type="button"
                  className="modifica-button"
                  onClick={() => {
                      setDataDAzienda(backupDataDAzienda); // Ripristina nel contesto
                      setDataBilancio(backupDataBilancio);
                      setFormDataAzienda(backupDataDAzienda); // Anche nei form locali
                      setFormDataBilancio(backupDataBilancio);
                      closeEditing()
                  }}
                  style={{ backgroundColor: "#e94e4e", color: "#fff", border: 0, borderRadius: 12, padding: "8px 12px", fontWeight: 600 }}
                >
                  Annulla
                </button>
              </div>
            ) : (
              <button
                className="modifica-button"
                onClick={() => {
                  setEditingSheet(title);
                  if (title === "Dati Azienda") setFormDataAzienda(dataDAzienda);
                  if (title === "Bilancio") setFormDataBilancio(dataBilancio);
                }}
                style={{ border: 0, borderRadius: 12, color: "#fff", backgroundColor: "#e94e4e", padding: "8px 12px", fontWeight: 600 }}
              >
                Modifica
              </button>
            )
          )}
        </div>

        <Divider style={{ margin: "12px 0" }} />

        {title === "Dati Azienda" ? (
          <Component
            formData={isEditable(title) ? formDataAzienda : dataDAzienda}
            setFormData={isEditable(title) ? setFormDataAzienda : () => {}}
            isManual={isEditable(title)}
            setDataDAzienda={setDataDAzienda}
          />
        ) : title === "Bilancio" ? (
          <Component
            formData={isEditable(title) ? formDataBilancio : dataBilancio}
            setFormData={isEditable(title) ? setFormDataBilancio : () => {}}
            isManual={isEditable(title)}
          />
        ) : (
          <Component />
        )}
      </Paper>
    </section>
  );
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", position: "relative", overflowY: "hidden" }}>
      {/* Top bar */}
      <div className="top-bar" style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "60px",
        backgroundColor: "#003366", color: "white", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
      }}>
        <h1>{dataDAzienda.B11}</h1>

        <div style={{position: "absolute", left: 90, display: "flex", alignItems: "center", gap: 90}}>
          {userPhotoURL ? (
            <Avatar
              src={userPhotoURL}
              alt="User profile"
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <Avatar
              sx={{ width: 40, height: 40, bgcolor: "#555" }}
            >
              <PersonIcon sx={{ color: "#fff" }} />
            </Avatar>
          )}

          <IconButton
            aria-label="menu"
            aria-controls={menuOpen ? 'profile-menu' : undefined}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
            size="large"
            sx={{ padding: 0 }}
          >
            <MoreVertIcon/>
          </IconButton>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
             slotProps={{
              paper: {
                sx: {
                  mt: 0.3, 
                  ml: 12, 
                },     
              },
            }}
          >
            {/* Inserisci qui le opzioni menu */}
            <MenuItem 
              style={{fontWeight:400, marginBottom:5, fontFamily:'Segoe UI'}} 
              onClick={() =>{ 
                restState();
                navigate("/App", { replace: true, state: undefined });
              }}
            >
              Torna al menu iniziale
            </MenuItem>
            <MenuItem 
              style={{fontWeight:700, color:"red", fontFamily:'Segoe UI', marginBottom:1}} 
              onClick={() =>{ 
                setShowLogoutModal(true);
              }}
            >
              <LogoutIcon fontSize="small" sx={{ marginRight: 1 }} />Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Indice laterale */}
      <aside style={{
        opacity: manualMode ? 0.5 : 1,
        pointerEvents: manualMode ? "none" : "auto",
        cursor: manualMode ? "not-allowed" : "pointer",
        position: "sticky", top: "60px", height: "calc(100vh - 60px)",
        width: "14%", minWidth: "190px", maxWidth: "224px", padding: "16px",
        overflowY: "hidden", borderRight: "1px solid rgba(0,0,0,0.12)",
        backgroundColor: "rgba(255,255,255,0.7)", flexShrink: 0
      }}>
        <h1 style={{ marginBottom: "16px", fontSize: "1.125rem", fontWeight: 600, userSelect: "none" }}>INDICE</h1>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.875rem" }}>
          {sheets.map((sheet, idx) => {
            const isActive = active === `sheet-${idx}`;
            const isDisabled = manualMode && idx > 1;
            return (
              <button
                key={sheet.title}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(idx);
                }}
                style={{
                  all: "unset",
                  color: isDisabled ? "#999" : "inherit",
                  pointerEvents: isDisabled ? "none" : "auto",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: "0.9rem",
                  backgroundColor: isActive ? "#eef4ff" : "transparent",
                  userSelect: "none"
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = isActive ? "#eef4ff" : "transparent"}
              >
                {isActive && <span style={{
                  display: "inline-block", paddingLeft: "3px", paddingRight: "5px",
                  width: "9px", height: "9px", borderRadius: "100%", backgroundColor: "#003366"
                }} />}
                {sheet.title}
              </button>
            );
          })}
        </nav>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20rem" }}>
          <button onClick={openPdfOptions} className="downloadB" style={{ color:"#fff", backgroundColor: manualMode ? "#fff" : "#003366", padding:8, border:0, borderRadius:8, fontFamily:"Segoe UI", fontWeight:600}}>
            Salva / Scarica
          </button>
        </div>
      </aside>

      {/* Contenuto principale */}
      <main ref={mainRef} style={{
        flexGrow: 1,
        position: "relative",
        overflowY: "auto",
        marginTop: "64px",
        maxWidth: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "column"
      }}>
        {visibleSheets.map(({ title, Component }, idx) => renderSheet(title, Component, idx))}
        {manualMode && (
          <>
            <Paper elevation={2} style={{ padding: "16px", marginBottom: 3, userSelect:"none" }}>
              <Typography variant="body1" color="red" fontWeight={550} textAlign={"center"}>
                Le prossime sezioni saranno generate automaticamente in base alle informazioni inserite in Dati Azienda e Bilancio.<br />
                Compila e salva per proseguire.
              </Typography>
            </Paper>

            <div style={{
              position: "relative", bottom: 0, left: 0, width: "100%",
              backgroundColor: "#fff", padding: "62px 34px",
              display: "flex", justifyContent: "center", zIndex: 1000
            }}>
              <button
                onClick={() => {
                  handleSave(["Dati Azienda", "Bilancio"]);
                }}
                style={{
                  backgroundColor: "#4caf50", color: "white", border: 0,
                  padding: "10px 20px", borderRadius: "6px", fontWeight: "bold",
                  cursor: "pointer", userSelect: "none", width:"6rem"
                }}
              >
                Salva
              </button>
              <div style ={{width:10}}></div>
              <button
                onClick={() => {
                  // reset
                  restState();
                  navigate("/App", { replace: true, state: undefined })}}
                style={{
                  backgroundColor: "#d32f2f", color: "white", border: 0,
                  padding: "10px 20px", borderRadius: "6px", fontWeight: "bold",
                  cursor: "pointer", userSelect: "none", width:"6rem"
                }}
              >
                Annulla
              </button>
            </div>
          </>
        )}
        {isModalOpen && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 2000
          }}>
            <div style={{
              backgroundColor: "white", borderRadius: 12, padding: 32,
              width: "360px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
            }}>
              <h2 style={{ marginBottom: 16 , userSelect: "none"}}>Vuoi salvare prima di continuare?</h2>
              <p style={{ fontSize: "0.9rem", marginBottom: 24,  userSelect: "none" }}>
                È consigliato salvare i dati prima di generare il PDF.
              </p>
              <button
                disabled={isSaving}
                onClick={async () => {
                  setIsSaving(true);
                  const success = await saveUserDoc(dataDAzienda, dataBilancio);
                  setIsSaving(false);
                  if (success) {
                    setIsModalOpen(false);
                    setShouldPrint(true); // Avvia stampa
                  }
                }}
                className="save-download"
              >
                Salva dati e scarica PDF
              </button>
              <button
                disabled={isSaving}
                onClick={async () => {
                  setIsSaving(true);
                  const success = await saveUserDoc(dataDAzienda, dataBilancio);
                  setIsSaving(false);
                  if (success) {
                    setIsModalOpen(false);
                  }
                }}
                className="save-button"
              >
                Salva i dati
              </button>
              <button
                disabled={isSaving}
                onClick={() => {
                  closeEditing();
                  setIsModalOpen(false);
                  setShouldPrint(true)
                }}
                className="save-button"
                style={{marginTop:"8px"}}
              >
                Scarica PDF
              </button>
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cancel-button"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {showLogoutModal && (
        <ShowLogout setShowLogoutModal={setShowLogoutModal} classNameButton="btn-stile" />
      )}
    </div>
  );
}
