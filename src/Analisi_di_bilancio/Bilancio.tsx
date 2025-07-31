import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import { Variables_use } from "./variables.tsx";
import { TextField } from "@mui/material";
import { getRowStyle, formatCurrency } from "./format.ts";
import { useDati } from "./DatiContext.tsx";
import { BilancioOb } from "./Bilancio&DatiAzienda.ts";

export default function Bilancio({
  formData,
  setFormData,
  isManual
}:{
  formData: typeof BilancioOb,
  setFormData: React.Dispatch<React.SetStateAction<typeof BilancioOb>>;
  isManual: boolean}) {

  const vars = Variables_use(formData);

  // indici di riferimento a rows
  const darkBlueRows = [3, 130, 218, 246, 296];
  const lightBlueRows = [1, 4, 7, 83, 127, 131, 152, 157, 158, 204, 207, 219, 227, 247, 271, 282, 291];
  const lightGrayRows = [
    8, 9, 13, 17, 21, 25, 29, 30, 34, 35, 39, 43, 47, 51, 52, 56, 57, 63, 64, 67, 70, 73, 76, 79,
    80, 84, 90, 91, 94, 97, 100, 103, 106, 109, 112, 115, 123, 138, 151, 159, 162, 165, 168, 171,
    174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 224, 231, 237, 248, 252, 253, 260, 265, 272,
    277, 283, 287, 292,
  ];

  const [showInputMessage, setShowInputMessage] = useState(true);

  const [popoverPosition, setPopoverPosition] = React.useState<{ top: number; left: number } | null>(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [popoverMessage, setPopoverMessage] = React.useState("");

  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  const handleRowClick = (event: React.MouseEvent<HTMLElement>, originalIndex: number) => {
    if (nonEditableRows.includes(originalIndex)) {
      setPopoverMessage("<strong>Modifica non consentita:</strong><br/>la riga contiene un valore calcolato automaticamente.");

      // Salva la posizione del cursore per posizionare il popover lì vicino
      setPopoverPosition({
        top: event.clientY,
        left: event.clientX,
      });

      setPopoverOpen(true);

      // Nasconde il popover automaticamente dopo 3.5 secondi
      setTimeout(() => {
        setPopoverOpen(false);
        setPopoverPosition(null);
      }, 3500);
    }
  };


  const { dataDAzienda } = useDati();

  const rows = [
    ["A", "B", "C", "D"],
    ["Bilancio d'esercizio", dataDAzienda.B17, dataDAzienda.B17-1, dataDAzienda.B17-2],
    ["", "", "", ""],
    ["STATO PATRIMONIALE ATTIVO", formatCurrency(vars.Bilancio_B4), formatCurrency(vars.Bilancio_C4), formatCurrency(vars.Bilancio_D4)],
    ["A) Crediti verso soci per versamenti ancora dovuti", formatCurrency(vars.Bilancio_B5), formatCurrency(vars.Bilancio_C5), formatCurrency(vars.Bilancio_D5)],
    ["Crediti verso soci già richiamati", "B6", "C6", "D6"],
    ["Crediti verso soci non ancora richiamati", "B7", "C7", "D7"],
    ["B) Immobilizzazioni, con separata indicazione di quelle concesse in locazione finanziaria", formatCurrency(vars.Bilancio_B8), formatCurrency(vars.Bilancio_C8), formatCurrency(vars.Bilancio_D8)],
    ["I. Immateriali", formatCurrency(vars.Bilancio_B9),formatCurrency(vars.Bilancio_C9), formatCurrency(vars.Bilancio_D9)],
    ["1) Costi di impianto e di ampliamento", formatCurrency(vars.Bilancio_B10), formatCurrency(vars.Bilancio_C10), formatCurrency(vars.Bilancio_D10)],
    ["Costo storico", "B11", "C11", "D11"],
    ["(Fondo ammortamenti)", "B12", "C12", "D12"],
    ["(Fondo svalutazioni)", "B13", "C13", "D13"],
    ["2) Costi di sviluppo", formatCurrency(vars.Bilancio_B14), formatCurrency(vars.Bilancio_C14), formatCurrency(vars.Bilancio_D14)],
    ["Costo storico", "B15", "C15", "D15"],
    ["(Fondo ammortamenti)", "B16", "C16", "D16"],
    ["(Fondo svalutazioni)", "B17", "C17", "D17"],
    ["3) Diritti di brevetto industriale e di utilizzo di opere dell'ingegno", formatCurrency(vars.Bilancio_B18), formatCurrency(vars.Bilancio_C18), formatCurrency(vars.Bilancio_D18)],
    ["Costo storico", "B19", "C19", "D19"],
    ["(Fondo ammortamenti)", "B20", "C20", "D20"],
    ["(Fondo svalutazioni)", "B21", "C21", "D21"],
    ["4) Concessioni, licenze, marchi e diritti simili", formatCurrency(vars.Bilancio_B22), formatCurrency(vars.Bilancio_C22), formatCurrency(vars.Bilancio_D22)],
    ["Costo storico", "B23", "C23", "D23"],
    ["(Fondo ammortamenti)", "B24", "C24", "D24"],
    ["(Fondo svalutazioni)", "B25", "C25", "D25"],
    ["5) Avviamento", formatCurrency(vars.Bilancio_B26), formatCurrency(vars.Bilancio_C26), formatCurrency(vars.Bilancio_D26)],
    ["Costo storico", "B27", "C27", "D27"],
    ["(Fondo ammortamenti)", "B28", "C28", "D28"],
    ["(Fondo svalutazioni)", "B29", "C29", "D29"],
    ["6) Immobilizzazioni immateriali in corso e acconti", "B30", "C30", "D30"],
    ["7) Altre", formatCurrency(vars.Bilancio_B31), formatCurrency(vars.Bilancio_C31), formatCurrency(vars.Bilancio_D31)],
    ["Costo storico", "B32", "C32", "D32"],
    ["(Fondo ammortamenti)", "B33", "C33", "D33"],
    ["(Fondo svalutazioni)", "B34", "C34", "D34"],
    ["II. Materiali", formatCurrency(vars.Bilancio_B35), formatCurrency(vars.Bilancio_C35), formatCurrency(vars.Bilancio_D35)],
    ["1) Terreni e fabbricati", formatCurrency(vars.Bilancio_B36), formatCurrency(vars.Bilancio_C36), formatCurrency(vars.Bilancio_D36)],
    ["Costo storico", "B37", "C37", "D37"],
    ["(Fondo ammortamenti)", "B38", "C38", "D38"],
    ["(Fondo svalutazioni)", "B39", "C39", "D39"],
    ["2) Impianti e macchinario", formatCurrency(vars.Bilancio_B40), formatCurrency(vars.Bilancio_C40), formatCurrency(vars.Bilancio_D40)],
    ["Costo storico", "B41", "C41", "D41"],
    ["(Fondo ammortamenti)", "B42", "C42", "D42"],
    ["(Fondo svalutazioni)", "B43", "C43", "D43"],
    ["3) Attrezzature industriali e commerciali", formatCurrency(vars.Bilancio_B44), formatCurrency(vars.Bilancio_C44), formatCurrency(vars.Bilancio_D44)],
    ["Costo storico", "B45", "C45", "D45"],
    ["(Fondo ammortamenti)", "B46", "C46", "D46"],
    ["(Fondo svalutazioni)", "B47", "C47", "D47"],
    ["4) Altri beni", formatCurrency(vars.Bilancio_B48), formatCurrency(vars.Bilancio_C48), formatCurrency(vars.Bilancio_D48)],
    ["Costo storico", "B49", "C49", "D49"],
    ["(Fondo ammortamenti)", "B50", "C50", "D50"],
    ["(Fondo svalutazioni)", "B51", "C51", "D51"],
    ["5) Immobilizzazioni in corso e acconti", "B52", "C52", "D52"],
    ["6) Concesse in Locazione Finanziaria", formatCurrency(vars.Bilancio_B53), formatCurrency(vars.Bilancio_C53), formatCurrency(vars.Bilancio_D53)],
    ["Costo storico", "B54", "C54", "D54"],
    ["(Fondo ammortamenti)", "B55", "C55", "D55"],
    ["(Fondo svalutazioni)", "B56", "C56", "D56"],
    ["III. Finanziarie", formatCurrency(vars.Bilancio_B57), formatCurrency(vars.Bilancio_C57), formatCurrency(vars.Bilancio_D57)],
    ["1) Partecipazioni in:", formatCurrency(vars.Bilancio_B58), formatCurrency(vars.Bilancio_C58), formatCurrency(vars.Bilancio_D58)],
    ["a) imprese controllate", "B59", "C59", "D59"],
    ["b) imprese collegate", "B60", "C60", "D60"],
    ["c) imprese controllanti", "B61", "C61", "D61"],
    ["d) imprese sottoposte al controllo delle controllanti", "B62", "C62", "D62"],
    ["d)-bis altre imprese", "B63", "C63", "D63"],
    ["2) Crediti", formatCurrency(vars.Bilancio_B64), formatCurrency(vars.Bilancio_C64), formatCurrency(vars.Bilancio_D64)],
    ["a) verso imprese controllate", formatCurrency(vars.Bilancio_B65), formatCurrency(vars.Bilancio_C65), formatCurrency(vars.Bilancio_D65)],
    ["- entro 12 mesi", "B66", "C66", "D66"],
    ["- oltre 12 mesi", formatCurrency(vars.Bilancio_B67), formatCurrency(vars.Bilancio_C67), formatCurrency(vars.Bilancio_D67)],
    ["b) verso imprese collegate", formatCurrency(vars.Bilancio_B68), formatCurrency(vars.Bilancio_C68), formatCurrency(vars.Bilancio_D68)],
    ["- entro 12 mesi", "B69", "C69", "D69"],
    ["- oltre 12 mesi", formatCurrency(vars.Bilancio_B70), formatCurrency(vars.Bilancio_C70), formatCurrency(vars.Bilancio_D70)],
    ["c) verso imprese controllanti", formatCurrency(vars.Bilancio_B71), formatCurrency(vars.Bilancio_C71), formatCurrency(vars.Bilancio_D71)],
    ["- entro 12 mesi", "B72", "C72", "D72"],
    ["- oltre 12 mesi", formatCurrency(vars.Bilancio_B73), formatCurrency(vars.Bilancio_C73), formatCurrency(vars.Bilancio_D73)],
    ["d) verso imprese sottoposte al controllo delle controllanti", formatCurrency(vars.Bilancio_B74), formatCurrency(vars.Bilancio_C74), formatCurrency(vars.Bilancio_D74)],
    ["- entro 12 mesi", "B75", "C75", "D75"],
    ["- oltre 12 mesi", "B76", "C76", "D76"],
    ["d-bis) verso altri", formatCurrency(vars.Bilancio_B77), formatCurrency(vars.Bilancio_C77), formatCurrency(vars.Bilancio_D77)],
    ["- entro 12 mesi", "B78", "C78", "D78"],
    ["- oltre 12 mesi", "B79", "C79", "D79"],
    ["3) Altri titoli", "B80", "C80", "D80"],
    ["4) Strumenti finanziari derivati attivi", formatCurrency(vars.Bilancio_B81), formatCurrency(vars.Bilancio_C81), formatCurrency(vars.Bilancio_D81)],
    ["- entro 12 mesi", "B82", "C82", "D82"],
    ["- oltre 12 mesi", "B83", "C83", "D83"],
    ["C) Attivo circolante", formatCurrency(vars.Bilancio_B84), formatCurrency(vars.Bilancio_C84), formatCurrency(vars.Bilancio_D84)],
    ["I. Rimanenze", formatCurrency(vars.Bilancio_B85), formatCurrency(vars.Bilancio_C85), formatCurrency(vars.Bilancio_D85)],
    ["1) Materie prime, sussidiarie e di consumo", "B86", "C86", "D86"],
    ["2) Prodotti in corso di lavorazione e semilavorati", "B87", "C87", "D87"],
    ["3) Lavori in corso su ordinazione", "B88", "C88", "D88"],
    ["4) Prodotti finiti e merci", "B89", "C89", "D89"],
    ["5) Acconti", "B90", "C90", "D90"],
    ["II. Crediti", formatCurrency(vars.Bilancio_B91), formatCurrency(vars.Bilancio_C91), formatCurrency(vars.Bilancio_D91)],
    ["1) verso clienti", formatCurrency(vars.Bilancio_B92), formatCurrency(vars.Bilancio_C92), formatCurrency(vars.Bilancio_D92)],
    ["- entro 12 mesi", "B93", "C93", "D93"],
    ["- oltre 12 mesi", "B94", "C94", "D94"],
    ["2) verso imprese controllate", formatCurrency(vars.Bilancio_B95), formatCurrency(vars.Bilancio_C95), formatCurrency(vars.Bilancio_D95)],
    ["- entro 12 mesi", "B96", "C96", "D96"],
    ["- oltre 12 mesi", "B97", "C97", "D97"],
    ["3) verso imprese collegate", formatCurrency(vars.Bilancio_B98), formatCurrency(vars.Bilancio_C98), formatCurrency(vars.Bilancio_D98)],
    ["- entro 12 mesi", "B99", "C99", "D99"],
    ["- oltre 12 mesi", "B100", "C100", "D100"],
    ["4) verso controllanti", formatCurrency(vars.Bilancio_B101), formatCurrency(vars.Bilancio_C101), formatCurrency(vars.Bilancio_D101)],
    ["- entro 12 mesi", "B102", "C102", "D102"],
    ["- oltre 12 mesi", "B103", "C103", "D103"],
    ["5) verso imprese sottoposte al controllo delle controllanti", formatCurrency(vars.Bilancio_B104), formatCurrency(vars.Bilancio_C104), formatCurrency(vars.Bilancio_D104)],
    ["- entro 12 mesi", "B105", "C105", "D105"],
    ["- oltre 12 mesi", "B106", "C106", "D106"],
    ["5-bis) crediti tributari", formatCurrency(vars.Bilancio_B107), formatCurrency(vars.Bilancio_C107), formatCurrency(vars.Bilancio_D107)],
    ["- entro 12 mesi", "B108", "C108", "D108"],
    ["- oltre 12 mesi", "B109", "C109", "D109"],
    ["5-ter) Imposte anticipate", formatCurrency(vars.Bilancio_B110), formatCurrency(vars.Bilancio_C110), formatCurrency(vars.Bilancio_D110)],
    ["- entro 12 mesi", "B111", "C111", "D111"],
    ["- oltre 12 mesi", "B112", "C112", "D112"],
    ["5-quater) verso altri", formatCurrency(vars.Bilancio_B113), formatCurrency(vars.Bilancio_C113), formatCurrency(vars.Bilancio_D113)],
    ["- entro 12 mesi", "B114", "C114", "D114"],
    ["- oltre 12 mesi", "B115", "C115", "D115"],
    ["III. Attività finanziarie che non costituiscono immobilizzazioni", formatCurrency(vars.Bilancio_B116), formatCurrency(vars.Bilancio_C116), formatCurrency(vars.Bilancio_D116)],
    ["1) Partecipazioni in imprese controllate", "B117", "C117", "D117"],
    ["2) Partecipazioni in imprese collegate", "B118", "C118", "D118"],
    ["3) Partecipazioni in imprese controllanti", "B119", "C119", "D119"],
    ["3-bis) Partecipazioni in imprese sottoposte al controllo delle controllanti", "B120", "C120", "D120"],
    ["4) Altre partecipazioni", "B121", "C121", "D121"],
    ["5) Strumenti derivati finanziari attivi", "B122", "C122", "D122"],
    ["6) Altri titoli", "B123", "C123", "D123"],
    ["IV. Disponibilità liquide", formatCurrency(vars.Bilancio_B124), formatCurrency(vars.Bilancio_C124), formatCurrency(vars.Bilancio_D124)],
    ["1) Depositi bancari e postali", "B125", "C125", "D125"],
    ["2) Assegni", "B126", "C126", "D126"],
    ["3) Denaro e valori in cassa", "B127", "C127", "D127"],
    ["D) Ratei e risconti attivi", formatCurrency(vars.Bilancio_B128), formatCurrency(vars.Bilancio_C128), formatCurrency(vars.Bilancio_D128)],
    ["Disaggi su prestiti", "B129", "C129", "D129"],
    ["Vari", "B130", "C130", "D130"],
    ["STATO PATRIMONIALE PASSIVO", formatCurrency(vars.Bilancio_B131), formatCurrency(vars.Bilancio_C131), formatCurrency(vars.Bilancio_D131)],
    ["A) Patrimonio netto", formatCurrency(vars.Bilancio_B132), formatCurrency(vars.Bilancio_C132), formatCurrency(vars.Bilancio_D132)],
    ["I. Capitale", "B133", "C133", "D133"],
    ["II. Riserva da sovrapprezzo delle azioni", "B134", "C134", "D134"],
    ["III. Riserva di rivalutazione", "B135", "C135", "D135"],
    ["IV. Riserva legale", "B136", "C136", "D136"],
    ["V. Riserve statutarie", "B137", "C137", "D137"],
    ["VI. Riserva per azioni proprie in portafoglio (positiva e negativa)", "B138", "C138", "D138"],
    ["VII. Altre riserve, distintamente indicate:", formatCurrency(vars.Bilancio_B139), formatCurrency(vars.Bilancio_C139), formatCurrency(vars.Bilancio_D139)],
    ["- Riserva straordinaria", "B140", "C140", "D140"],
    ["- Versamenti in conto capitale", "B141", "C141", "D141"],
    ["- Fondo contributi in conto capitale art. 55 T.U.", "B142", "C142", "D142"],
    ["- Riserva per ammortamenti anticipati art.67 T.U.", "B143", "C143", "D143"],
    ["- Fondi riserve in sospensione di imposta", "B144", "C144", "D144"],
    ["- Riserve da conferimenti agevolati (Legge 576/1975)", "B145", "C145", "D145"],
    ["- Riserva per operazioni di copertura dei flussi finanziari attesi", "B146", "C146", "D146"],
    ["- Fondi accantonamento plusvalenze (art.2 legge 168/1982)", "B147", "C147", "D147"],
    ["- Riserva per oneri pluriennali capitalizzati", "B148", "C148", "D148"],
    ["- Altre", "B149", "C149", "D149"],
    ["- Riserva da redazione Bilancio in Euro (2 decimali)", "B150", "C150", "D150"],
    ["VIII. Utili (perdite) portati a nuovo", "B151", "C151", "D151"],
    ["IX. Utile (perdita) dell'esercizio", formatCurrency(vars.Bilancio_B297), formatCurrency(vars.Bilancio_C297), formatCurrency(vars.Bilancio_D297)],
    ["B) Fondi per rischi e oneri", formatCurrency(vars.Bilancio_B153), formatCurrency(vars.Bilancio_C153), formatCurrency(vars.Bilancio_D153)],
    ["1) Fondo per trattamento di quiescenza e obblighi simili", "B154", "C154", "D154"],
    ["2) Fondo per imposte, anche differite", "B155", "C155", "D155"],
    ["3) Srumenti finanziari derivati passivi", "B156", "C156", "D156"],
    ["4) Altri fondi", "B157", "C157", "D157"],
    ["C) Trattamento fine rapporto di lavoro subordinato", "B158", "C158", "D158"],
    ["D) Debiti", formatCurrency(vars.Bilancio_B159), formatCurrency(vars.Bilancio_C159), formatCurrency(vars.Bilancio_D159)],
    ["1) Obbligazioni non convertibili", formatCurrency(vars.Bilancio_B160), formatCurrency(vars.Bilancio_C160), formatCurrency(vars.Bilancio_D160)],
    ["- entro 12 mesi", "B161", "C161", "D161"],
    ["- oltre 12 mesi", "B162", "C162", "D162"],
    ["2) Obbligazioni convertibili", formatCurrency(vars.Bilancio_B163), formatCurrency(vars.Bilancio_C163), formatCurrency(vars.Bilancio_D163)],
    ["- entro 12 mesi", "B164", "C164", "D164"],
    ["- oltre 12 mesi", "B165", "C165", "D165"],
    ["3) Debiti verso soci per finanziamenti", formatCurrency(vars.Bilancio_B166), formatCurrency(vars.Bilancio_C166), formatCurrency(vars.Bilancio_D166)],
    ["- entro 12 mesi", "B167", "C167", "D167"],
    ["- oltre 12 mesi", "B168", "C168", "D168"],
    ["4) Debiti verso banche", formatCurrency(vars.Bilancio_B169), formatCurrency(vars.Bilancio_C169), formatCurrency(vars.Bilancio_D169)],
    ["- entro 12 mesi", "B170", "C170", "D170"],
    ["- oltre 12 mesi", "B171", "C171", "D171"],
    ["5) Debiti verso altri finanziatori", formatCurrency(vars.Bilancio_B172), formatCurrency(vars.Bilancio_C172), formatCurrency(vars.Bilancio_D172)],
    ["- entro 12 mesi", "B173", "C173", "D173"],
    ["- oltre 12 mesi", "B174", "C174", "D174"],
    ["6) Acconti", formatCurrency(vars.Bilancio_B175), formatCurrency(vars.Bilancio_C175), formatCurrency(vars.Bilancio_D175)],
    ["- entro 12 mesi", "B176", "C176", "D176"],
    ["- oltre 12 mesi", "B177", "C177", "D177"],
    ["7) Debiti verso fornitori", formatCurrency(vars.Bilancio_B178), formatCurrency(vars.Bilancio_C178), formatCurrency(vars.Bilancio_D178)],
    ["- entro 12 mesi", "B179", "C179", "D179"],
    ["- oltre 12 mesi", "B180", "C180", "D180"],
    ["8) Debiti rappresentati da titoli di credito", formatCurrency(vars.Bilancio_B181), formatCurrency(vars.Bilancio_C181), formatCurrency(vars.Bilancio_D181)],
    ["- entro 12 mesi", "B182", "C182", "D182"],
    ["- oltre 12 mesi", "B183", "C183", "D183"],
    ["9) Debiti verso imprese controllate", formatCurrency(vars.Bilancio_B184), formatCurrency(vars.Bilancio_C184), formatCurrency(vars.Bilancio_D184)],
    ["- entro 12 mesi", "B185", "C185", "D185"],
    ["- oltre 12 mesi", "B186", "C186", "D186"],
    ["10) Debiti verso imprese collegate", formatCurrency(vars.Bilancio_B187), formatCurrency(vars.Bilancio_C187), formatCurrency(vars.Bilancio_D187)],
    ["- entro 12 mesi", "B188", "C188", "D188"],
    ["- oltre 12 mesi", "B189", "C189", "D189"],
    ["11) Debiti verso controllanti", formatCurrency(vars.Bilancio_B190), formatCurrency(vars.Bilancio_C190), formatCurrency(vars.Bilancio_D190)],
    ["- entro 12 mesi", "B191", "C191", "D191"],
    ["- oltre 12 mesi", "B192", "C192", "D192"],
    ["11-bis) Debiti verso imprese sottoposte al controllo delle controllanti", formatCurrency(vars.Bilancio_B193), formatCurrency(vars.Bilancio_C193), formatCurrency(vars.Bilancio_D193)],
    ["- entro 12 mesi", "B194", "C194", "D194"],
    ["- oltre 12 mesi", "B195", "C195", "D195"],
    ["12) Debiti tributari", formatCurrency(vars.Bilancio_B196), formatCurrency(vars.Bilancio_C196), formatCurrency(vars.Bilancio_D196)],
    ["- entro 12 mesi", formatCurrency(vars.Bilancio_B197), "C197", "D197"],
    ["- oltre 12 mesi", "B198", "C198", "D198"],
    ["13) Debiti verso istituti di previdenza e sicurezza sociale", formatCurrency(vars.Bilancio_B199), formatCurrency(vars.Bilancio_C199), formatCurrency(vars.Bilancio_D199)],
    ["- entro 12 mesi", "B200", "C200", "D200"],
    ["- oltre 12 mesi", "B201", "C201", "D201"],
    ["14) Altri debiti", formatCurrency(vars.Bilancio_B202), formatCurrency(vars.Bilancio_C202), formatCurrency(vars.Bilancio_D202)],
    ["- entro 12 mesi", "B203", "C203", "D203"],
    ["- oltre 12 mesi", "B204", "C204", "D204"],
    ["E) Ratei e risconti", formatCurrency(vars.Bilancio_B205), formatCurrency(vars.Bilancio_C205), formatCurrency(vars.Bilancio_D205)],
    ["- aggio su prestiti", "B206", "C206", "D206"],
    ["- vari", "B207", "C207", "D207"],
    ["CONTI D'ORDINE", formatCurrency(vars.Bilancio_B208), formatCurrency(vars.Bilancio_C208), formatCurrency(vars.Bilancio_D208)],
    ["A) Fideiussioni prestate", "B209", "C209", "D209"],
    ["B) Avalli prestati", formatCurrency(vars.Bilancio_B210), formatCurrency(vars.Bilancio_C210), formatCurrency(vars.Bilancio_D210)],
    ["C) Altre garanzie prestate", "B211", "C211", "D211"],
    ["D) Garanzie ricevute", "B212", "C212", "D212"],
    ["E) Nostri impegni", "B213", "C213", "D213"],
    ["F) Nostri rischi", "B214", "C214", "D214"],
    ["G) Beni di terzi presso di noi", formatCurrency(vars.Bilancio_B215), formatCurrency(vars.Bilancio_C215), formatCurrency(vars.Bilancio_D215)],
    ["H) Nostri beni presso terzi", "B216", "C216", "D216"],
    ["I) Beni in leasing riscattati", "B217", "C217", "D217"],
    ["L) Altri", "B218", "C218", "D218"],
    ["CONTO ECONOMICO", "B219", "C219", "D219"],
    ["A) Valore della produzione", formatCurrency(vars.Bilancio_B220), formatCurrency(vars.Bilancio_C220), formatCurrency(vars.Bilancio_D220)],
    ["1) Ricavi delle vendite e delle prestazioni", "B221", "C221", "D221"],
    ["2) Variazione rimanenze prodotti in corso di lavor., semilavorati e finiti", "B222", "C222", "D222"],
    ["3) Variazione dei lavori in corso su ordinazione", "B223", "C223", "D223"],
    ["4) Incrementi di immobilizzazioni per lavori interni", "B224", "C224", "D224"],
    ["5) Altri ricavi e proventi:", formatCurrency(vars.Bilancio_B225), formatCurrency(vars.Bilancio_C225), formatCurrency(vars.Bilancio_D225)],
    ["- Vari", "B226", "C226", "D226"],
    ["- Contributi in conto esercizio", "B227", "C227", "D227"],
    ["B) Costi della produzione", formatCurrency(vars.Bilancio_B228), formatCurrency(vars.Bilancio_C228), formatCurrency(vars.Bilancio_D228)],
    ["6) Acquisti materie prime, sussidiarie, di consumo e di merci", "B229", "C229", "D229"],
    ["7) Spese per prestazioni di servizi", "B230", "C230", "D230"],
    ["8) Spese per godimento di beni di terzi", "B231", "C231", "D231"],
    ["9) Costi del personale", formatCurrency(vars.Bilancio_B232), formatCurrency(vars.Bilancio_C232), formatCurrency(vars.Bilancio_D232)],
    ["a) Salari, stipendi", "B233", "C233", "D233"],
    ["b) Oneri sociali", "B234", "C234", "D234"],
    ["c) Trattamento Fine Rapporto", "B235", "C235", "D235"],
    ["d) Trattamento di quiescenza e simili", "B236", "C236", "D236"],
    ["e) Altri costi", "B237", "C237", "D237"],
    ["10) Ammortamenti e svalutazioni", formatCurrency(vars.Bilancio_B238), formatCurrency(vars.Bilancio_C238), formatCurrency(vars.Bilancio_D238)],
    ["a) Ammortamento delle immobilizzazioni immateriali", "B239", "C239", "D239"],
    ["b) Ammortamento delle immobilizzazioni materiali", "B240", "C240", "D240"],
    ["c) Altre svalutazioni delle immobilizzazioni", "B241", "C241", "D241"],
    ["d)  Svalutazione cred. del circol. e delle disponibilità liquide", "B242", "C242", "D242"],
    ["11) Variazioni rimanenze materie prime, sussid., di consumo e merci", "B243", "C243", "D243"],
    ["12) Accantonamenti per rischi", "B244", "C244", "D244"],
    ["13) Altri accantonamenti", "B245", "C245", "D245"],
    ["14) Oneri diversi di gestione", "B246", "C246", "D246"],
    ["Differenza tra Valore e Costo della Produzione", formatCurrency(vars.Bilancio_B247), formatCurrency(vars.Bilancio_C247), formatCurrency(vars.Bilancio_D247)],
    ["C) Proventi e oneri finanziari", formatCurrency(vars.Bilancio_B248), formatCurrency(vars.Bilancio_C248), formatCurrency(vars.Bilancio_D248)],
    ["15) Proventi da partecipazioni", formatCurrency(vars.Bilancio_B249), formatCurrency(vars.Bilancio_C249), formatCurrency(vars.Bilancio_D249)],
    ["- Imprese Controllate", "B250", "C250", "D250"],
    ["- Imprese Collegate", "B251", "C251", "D251"],
    ["- Altri", "B252", "C252", "D252"],
    ["16) Altri proventi finanziari", formatCurrency(vars.Bilancio_B253), formatCurrency(vars.Bilancio_C253), formatCurrency(vars.Bilancio_D253)],
    ["a) da crediti iscritti nelle immobilizzazioni", formatCurrency(vars.Bilancio_B254), formatCurrency(vars.Bilancio_C254), formatCurrency(vars.Bilancio_D254)],
    ["- da imprese controllate", "B255", "C255", "D255"],
    ["- da imprese collegate", "B256", "C256", "D256"],
    ["- da controllanti", "B257", "C257", "D257"],
    ["- altri", "B258", "C258", "D258"],
    ["b) da titoli iscritti nelle immobilizzazioni", "B259", "C259", "D259"],
    ["c) da titoli inscritti nell'attivo circolante", "B260", "C260", "D260"],
    ["d) proventi finanziari diversi dai precedenti:", formatCurrency(vars.Bilancio_B261), formatCurrency(vars.Bilancio_C261), formatCurrency(vars.Bilancio_D261)],
    ["- da imprese controllate", "B262", "C262", "D262"],
    ["- da imprese collegate", "B263", "C263", "D263"],
    ["- da imprese controllanti", "B264", "C264", "D264"],
    ["- altri proventi finanziari", "B265", "C265", "D265"],
    ["17) Interessi e altri oneri finanziari:", formatCurrency(vars.Bilancio_B266), formatCurrency(vars.Bilancio_C266), formatCurrency(vars.Bilancio_D266)],
    ["- da imprese controllate", "B267", "C267", "D267"],
    ["- da imprese collegate", "B268", "C268", "D268"],
    ["- da imprese controllanti", "B269", "C269", "D269"],
    ["- altri", "B270", "C270", "D270"],
    ["17-bis) Utili e perdite su cambi", "B271", "C271", "D271"],
    ["D) Rettifiche di valore di attività finanziarie", formatCurrency(vars.Bilancio_B272), formatCurrency(vars.Bilancio_C272), formatCurrency(vars.Bilancio_D272)],
    ["18) Rivalutazioni", formatCurrency(vars.Bilancio_B273), formatCurrency(vars.Bilancio_C273), formatCurrency(vars.Bilancio_D273)],
    ["a) di partecipazioni", "B274", "C274", "D274"],
    ["b) di immobilizzazioni finanziarie", "B275", "C275", "D275"],
    ["c) di titoli inscritti nell'attivo circolante", "B276", "C276", "D276"],
    ["d) di strumenti finanziari derivati", "B277", "C277", "D277"],
    ["19) Svalutazioni", formatCurrency(vars.Bilancio_B278), formatCurrency(vars.Bilancio_C278), formatCurrency(vars.Bilancio_D278)],
    ["a) di partecipazioni", "B279", "C279", "D279"],
    ["b) di immobilizzazioni finanziarie", "B280", "C280", "D280"],
    ["c) di titoli inscritti nell'attivo circolante", "B281", "C281", "D281"],
    ["d) di strumenti finanziari derivati", "B282", "C282", "D282"],
    ["E) Proventi e oneri straordinari", "B283", "C283", "D283"],
    ["20) Proventi straordinari", "B284", "C284", "D284"],
    ["- Plusvalenze non produzione", formatCurrency(vars.Bilancio_B285), formatCurrency(vars.Bilancio_C285), formatCurrency(vars.Bilancio_D285)],
    ["- Varie", "B286", "C286", "D286"],
    ["- Proventi (Oneri) straordinari per redazione Bilancio in Euro (2 decimali)", "B287", "C287", "D287"],
    ["21) Oneri straordinari", "B288", "C288", "D288"],
    ["- Minusvalenze non produzione", formatCurrency(vars.Bilancio_B289), formatCurrency(vars.Bilancio_C289), formatCurrency(vars.Bilancio_D289)],
    ["- Imposte su esercizi precedenti", formatCurrency(vars.Bilancio_B290), formatCurrency(vars.Bilancio_C290), formatCurrency(vars.Bilancio_D290)],
    ["- Varie", "B291", "C291", "D291"],
    ["Risultato prima delle imposte", formatCurrency(vars.Bilancio_B292), formatCurrency(vars.Bilancio_C292), formatCurrency(vars.Bilancio_D292)],
    ["20) Imposte sul reddito dell'esercizio", formatCurrency(vars.Bilancio_B293), formatCurrency(vars.Bilancio_C293), formatCurrency(vars.Bilancio_D293)],
    ["a) Imposte correnti", formatCurrency(vars.Bilancio_B294), formatCurrency(vars.Bilancio_C294), formatCurrency(vars.Bilancio_D294)],
    ["b) Imposte differite", "B295", "C295", "D295"],
    ["b) Imposte anticipate", "B296", "C296", "D296"],
    ["21) Utile (Perdita) dell'esercizio", formatCurrency(vars.Bilancio_B297), formatCurrency(vars.Bilancio_C297), formatCurrency(vars.Bilancio_D297)],
  ];

  const nonEditableRows = [
    2, 3, 4, 7, 8, 9, 13, 17, 21, 25, 30, 34, 35, 39, 43, 47, 52, 56, 57,
    63, 64, 66, 67, 69, 70, 72, 73, 76, 80, 83, 84, 90, 91, 94, 97,
    100, 103, 106, 109, 112, 115, 123, 127, 130, 131, 138, 151, 152, 158,
    159, 162, 165, 168, 171, 174, 177, 180, 183, 186, 189, 192, 195, 198,
    201, 204, 207, 209, 214, 219, 224, 227, 231, 237, 246, 247, 248, 252,
    253, 260, 265, 271, 272, 277, 284, 288, 289, 291, 292, 293, 296
  ];

  const header = rows[1];
  const dataRows = rows.slice(2);

  const handleBlur = (key: string) => {
    const raw = (editingValues[key] || "").trim();
    const hasComma = raw.includes(",");
    const hasDot = raw.includes(".");

    let cleaned = raw;
    if (hasComma && hasDot) {
      cleaned = raw.replace(/\./g, "").replace(",", ".");
    } else if (!hasComma && hasDot) {
      cleaned = raw;
    } else if (hasComma && !hasDot) {
      cleaned = raw.replace(",", ".");
    }

    const parsed = parseFloat(cleaned);
    setFormData((prev) => ({
      ...prev,
      [key]: isNaN(parsed) ? "" : parsed,
    }));

    setEditingValues((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  return (
    <TableContainer className="ScrollCont" component={Paper} sx={{ maxHeight: 600, overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          {isManual && showInputMessage && (
            <TableRow>
              <TableCell 
                colSpan={header.length} 
                sx={{
                  backgroundColor: "#e94e4e",
                  color: "#fff",
                  fontWeight: 400,
                  fontSize: "16px",
                  textAlign:"center",
                  position: "sticky",
                  top: 0,
                  padding: 1,
                  zIndex: 4,
                  border: 0,
                }}
              >
                <strong>Digita un numero</strong> (es. 10000.50): sarà automaticamente convertito nel formato <strong>€ 10.000,50</strong>.<br/> 
                <strong>Il valore predefinito</strong> delle celle è <strong>€ 0,00</strong>, può essere modificato oppure lasciato invariato.
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            {header.map((cell, i) => {
              const baseStyle: any = {
                bgcolor: "#003366",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "16px",
                position: "sticky",
                top: isManual && showInputMessage ? 64 : 0,
                zIndex: 3,
                borderRight: i < header.length - 1 ? `1px solid #000` : "none",
              };
              if (i === 0) {
                baseStyle.width = "45%";
                baseStyle.maxWidth = "45%";
                baseStyle.whiteSpace = "normal";
                baseStyle.wordBreak = "break-word";
              } else {
                baseStyle.width = "18.33%";
                baseStyle.maxWidth = "18.33%";
              }
              return (
                <TableCell key={i} sx={baseStyle}>
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((row, r) => {
            const originalIndex = r + 2;

            const { bg, text, borderBottom, hover } = getRowStyle(
              darkBlueRows,
              lightBlueRows,
              lightGrayRows,
              originalIndex
            );

            return (
              <TableRow
                key={originalIndex}
                sx={{ "&:hover": { backgroundColor: hover }, backgroundColor: bg, cursor: "pointer" }}
                onClick={(e) => handleRowClick(e, originalIndex)}
              >
                {row.map((cell, c) => {
                  const isEditable = isManual && c > 0 && !nonEditableRows.includes(originalIndex);
                  const isEditableKey = typeof cell === "string" && /^[BCD]\d+$/.test(cell);

                  const rawValue = formData[cell as keyof typeof formData];
                  const displayValue = editingValues[cell] ?? formatCurrency(Number(rawValue) || 0);

                  return (
                    <TableCell
                      key={c}
                      sx={{
                        wordBreak: "break-word",
                        color: text,
                        borderBottom: borderBottom,
                        padding: cell === "" ? "1px" : "9px",
                        borderRight: c < row.length - 1 ? "1px solid #000" : "none",
                      }}
                    >
                      {isEditable && isEditableKey ? (
                        <TextField
                          value={displayValue}
                          onFocus={() =>{
                            setShowInputMessage(false);
                            setEditingValues((prev) => ({
                              ...prev,
                              [cell]: rawValue ? String(rawValue) : "",
                            }))
                          }}
                          onChange={(e) =>
                            setEditingValues((prev) => ({
                              ...prev,
                              [cell]: e.target.value,
                            }))
                          }
                          onBlur={() => handleBlur(cell)}
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{
                            style: {
                              fontSize: "14px",
                              textAlign: "right",
                              fontWeight: 500,
                            },
                          }}
                        />
                      ) : isEditableKey && typeof rawValue === "number" ? (
                        formatCurrency(rawValue)
                      ) : (
                        cell
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Popover
        open={popoverOpen}
        anchorReference="anchorPosition"
        anchorPosition={popoverPosition ?? undefined}
        onClose={() => {
          setPopoverOpen(false);
          setPopoverPosition(null);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { maxWidth: 350, maxHeight: 100, padding: 1, overflow: "hidden" } }}
        disableRestoreFocus
      >
        <div
          style={{ fontSize: 14, padding: 0.5 }}
          dangerouslySetInnerHTML={{ __html: popoverMessage }}
        />
      </Popover>
    </TableContainer>
  );
}