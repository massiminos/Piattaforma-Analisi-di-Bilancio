import emailjs from "@emailjs/browser";
import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {name} from "./Logout.tsx";

export function Goodbye () {
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  //invia mail
  const sendFeedback = async () => {
    if (!feedback.trim()) return; // evita invii vuoti
    setSending(true);
    setError("");
    setSent(false);
    try {
      await emailjs.send(
        "service_r7j4lxd",
        "template_0jxfkdk",
        { name: name, message: feedback.trim() },
        "T062C8zsrkb1UAt52",//public
      );
      setSent(true);
      setFeedback("");
    } catch (err) {
      const msg = (err as Error)?.message || "Si è verificato un errore durante l'invio, riprova.";
      setError(msg);
    } finally {
      setSending(false);
    }
  };


  return (
    <div style={{display:"grid", gridTemplateColumns:"auto auto auto",  placeItems:"center", height: "60vh"}}>
      <div style={{gridColumn:"2",display:"flex", flexDirection:"column", alignItems: "center" }}>
        <label style={{fontSize:"40px", fontWeight:"500"}}>
          Account eliminato con successo
          <p style={{marginTop:"2rem", fontSize:"20px"}}>
            Tutti i dati associati al tuo account sono stati rimossi in modo permanente.
          </p>
          <p style={{fontSize:"20px"}}>
            Per aiutarci a migliorare, ti andrebbe di lasciare un feedback?
          </p> 
        </label>

        <TextareaAutosize
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="👉 Lascia un feedback"
          style={{resize: "none", padding:"0.5rem", width:"80%", marginTop:"2rem", fontFamily:"Segoe UI"}}
        />

        <div className="flex items-center gap-3">
          <button
            onClick={sendFeedback}
            disabled={sending || !feedback.trim()}
            className="px-4 py-2 rounded-xl border font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow active:scale-[0.98] transition"
          >
            {sending ? "Invio…" : "Invia feedback"}
          </button>
          {sent && <span style={{marginTop: "1rem"}}>✅ Feedback inviato</span>}
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>

        <label className="text-sm text-gray-600">
          Grazie per aver utilizzato la nostra piattaforma
        </label>
      </div>
    </div>
  );
};

export default Goodbye;