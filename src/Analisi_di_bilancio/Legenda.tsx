import {Variables_use} from "./variables.tsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { resolveCell, formatCurrency, percentForm } from "./format.ts";
import { useDatiB } from "./DatiContext.tsx";

export default function Legenda() {
  
  const { dataBilancio } = useDatiB();
  const vars = Variables_use(dataBilancio);

const rows = [
  ["A", "B", "C", "D", "E", "F"],
  ["Legenda: come leggere gli indici di bilancio", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["SPA = Stato Patrimoniale Attivo", "", "SPP = Stato Patrimoniale Passivo", "", "CE = Conto Economico", ""],
  [ " = Bene, bravo, avanti così", "", " = Niente allarmismi ma un po' di attenzione", "", " = Veirficare le ragioni del valore", ""],
  ["", "", "", "", "", ""],
  ["INDICE", "AT.A.G.", "VALORE", "FORMULA", "IN BILANCIO", "COME LEGGERLO, COSA RAPPRESENTA"],
  ["Capitale Circolante Lordo o Attivo Corrente o Attivo Circolante", "//", formatCurrency(vars.SP_Riclasificato_D6), "Liquidità Immediata + Liquidità Differità + Disponibilità", "(SPA.C.III+SPA.C.IV)+(SPA.C.II.1a+SPA.C.II.2a+SPA.C.II.3a+SPA.C.II.4a+SPA.C.II.5a)+(SPA.C.I+SPA.C.II.1b+SPA.C.II.2b+SPA.C.II.3b+SPA.C.II.4b+SPA.C.II.5b+SPA.D)", "Rappresenta la somma degli impieghi con esclusione delle immobilizzazioni. E' dato quindi dalla somma di tutti i crediti a breve (ma anche a lungo, tra le disponibilià), la cassa e la banca, le rimanenze"],
  ["Capitale Circolante Netto (C.C.N.)", "//", formatCurrency(vars.SP_Riclasificato_B48), "Capitale circolare lordo - Passivo Corrente", "[(SPA.C.III+SPA.C.IV)+(SPA.C.II.1a+SPA.C.II.2a+SPA.C.II.3a+SPA.C.II.4a+SPA.C.II.5a)+(SPA.C.I+SPA.C.II.1b+SPA.C.II.2b+SPA.C.II.3b+SPA.C.II.4b+SPA.C.II.5b+SPA.D)]-[(SPP.D.1a+SPP.D.2a+SPP.D.3a+SPP.D.4a+SPP.D.5a+SPP.D.6a+SPP.D.7a+SPP.D.8a+SPP.D.9a+SPP.D.10a+SPP.D.11a+SPP.D.12a+SPP.D.13a+SPP.D.14a)]", "Rappresenta la capacità dell'azienda di far fronte al passivo corrente (quindi, sostanzialmente, ai debiti a breve) attraverso le proprie risorse interne (Cassa e Banca, Crediti, Magazzino) sulla base del presupposto che il passivo consolidato (debiti a MLT) sia coperto dalle immobilizzazioni. E' uguale al current ratio sebbene espresso in forma di sottrazione."],
  ["Quick Ratio (Indice Secondario di Tesoreria)", formatCurrency(vars.SP_Riclasificato_B49), vars.SP_Riclasificato_B49.toFixed(4), "(Liquidità Immediata + Liquidità Differità)/Passivo Corrente", "[(SPA.C.III+SPA.C.IV)+(SPA.C.II.1a+SPA.C.II.2a+SPA.C.II.3a+SPA.C.II.4a+SPA.C.II.5a)]/[(SPP.D.1a+SPP.D.2a+SPP.D.3a+SPP.D.4a+SPP.D.5a+SPP.D.6a+SPP.D.7a+SPP.D.8a+SPP.D.9a+SPP.D.10a+SPP.D.11a+SPP.D.12a+SPP.D.13a+SPP.D.14a)]", "E' Uguale al margine secondario di tesoreria benchè espresso in termini di rapporto. Rappresenta la capacità dell'azienda di far fronte al passivo corrente (debiti a breve) con la liquidità immediata e con i propri crediti. L'indice assumerà tipicamente un valore < = > di 1 (uno). Nel caso in cui l''indice dovesse essere > di 1 vorrà dire che la somma tra le prime du poste è superiore a tutti i debiti a breve, rappresentando un buon andamento finanziario. Il contrario qualora l'indice dovesse essere minore di uno. Valori critici si cominceranno ad avere qualora l'indice dovesse scendere al di sotto del valore di 0,75."],
  ["Asset Turnover", formatCurrency(vars.SP_Riclasificato_B50), vars.SP_Riclasificato_B50.toFixed(4), "Valore della produzione / (Liquidità Immediata + Liquidità Differità + Disponibilità + Immobilizzazioni)", "CE.A/[(SPA.C.III+SPA.C.IV)+(SPA.C.II.1a+SPA.C.II.2a+SPA.C.II.3a+SPA.C.II.4a+SPA.C.II.5a)+(SPA.C.I+SPA.C.II.1b+SPA.C.II.2b+SPA.C.II.3b+SPA.C.II.4b+SPA.C.II.5b+SPA.D)+(SPA.B)]", "E' da notare come Liquidità Immediata + Liquidità Differità + Disponibilità + Immobilizzazioni rappresentino l'attivo dello stato patrimoniale ovvero il capitale investito (o, ancora, gli impieghi nel prospetto fonti/impieghi). L'Asset Turnover rappresenta quindi quante vendite sono state generate per ogni € invcestito. Nel caso di valori superiori ad 1 (uno) vorrà dire che le vendite generate sono superiori agli investimenti. L'indice è particolarmente significativo nelle aziende con consistenti investimenti (immobilizzazioni) e crediti rilevanti."],
  ["Leverage", formatCurrency(vars.SP_Riclasificato_B51), vars.SP_Riclasificato_B51.toFixed(4), "(Passivo Corrente + Passivo Consolidato) / Patrimonio Netto", "[(SPP.D.1a+SPP.D.2a+SPP.D.3a+SPP.D.4a+SPP.D.5a+SPP.D.6a+SPP.D.7a+SPP.D.8a+SPP.D.9a+SPP.D.10a+SPP.D.11a+SPP.D.12a+SPP.D.13a+SPP.D.14a)]+[(SPP.B)+(SPP.C)+(SPP.D.1b+SPP.D.2b+SPP.D.3b+SPP.D.4b+SPP.D.5b+SPP.D.6b+SPP.D.7b+SPP.D.8b+SPP.D.9b+SPP.D.10b+SPP.D.11b+SPP.D.12b+SPP.D.13b+SPP.D.14b)]/SPP.A", "Passivo corrente e passivo consolidato rappresentano rispettivamente i debiti a breve e quelli a MLT. Il patrimonio netto è invece la somma del capitale sociale e delle riserve di capitale (il capitale investito dall'imprenditore, quindi). Il leverage indica, in sostanza, l’entità degli investimenti effettuati per ogni euro di capitale conferito non a titolo di prestito. Se il suo valore è pari a 1, tutto il capitale investito è finanziato esclusivamente dai mezzi propri; se superiore a 1, gli investimenti vengono finanziati anche con mezzi esterni (come avviene nella generalità dei casi). Pertanto, il suo valore aumenta proporzionalmente al crescere della dipendenza finanziaria da terzi."],
  ["Elasticità dell'Attivo", formatCurrency(vars.SP_Riclasificato_B52), vars.SP_Riclasificato_B52.toFixed(4), "Attivo Circolante / Totale Attivo", "[(SPA.C.III+SPA.C.IV)+(SPA.C.II.1a+SPA.C.II.2a+SPA.C.II.3a+SPA.C.II.4a+SPA.C.II.5a)+(SPA.C.I+SPA.C.II.1b+SPA.C.II.2b+SPA.C.II.3b+SPA.C.II.4b+SPA.C.II.5b+SPA.D)]/SPA", "L'indice può assumere un valore compreso tra 0 e 1 (o, se in %, tra 0 e 100%). L'indice indica quanta parte dell'attivo è stato utilizzata per finanziare attività a breve ed indica, in qualche modo, quanto l'azienda sia \"elastica\", ovvero capace di far fronte a repentini mutamenti nella propria struttura finanziaria e di mercato. In particolare, una struttura degli impieghi troppo rigida (indice di elasticità basso) non permette all'azienda di adeguarsi in maniera repentina ad eventuali contrazioni nella domanda dei beni prodotti, creando eccessivi oneri senza potere usufruire dei corrispondenti ricavi."],
  ["Autofinanziamento (o indice primario di capitalizzazione)", vars.SP_Riclasificato_B53.toFixed(4), percentForm(vars.SP_Riclasificato_B53), "Patrimonio Netto / Totale attivo", "SPP.A/SPA", "Indica quanta parte degli investimenti sono stati coperti con fonti proprie (capitale sociale e riserve). Maggiore è il valore (l'indice può assumere valore da 0 a 100%) maggiore sarà il capitale di rischio (c.d. Equity) investito dall'imprenditore all'interno dell'azienda. Valori superiori al 20% sono da considerarsi con favore"],
  ["Margine Primario di Struttura", formatCurrency(vars.Bilancio_B132-vars.Bilancio_B8), formatCurrency(vars.Bilancio_B132-vars.Bilancio_B8), "Patrimonio Netto - Immobilizzazioni", "SPP.A-SPA.B", "L'indice mostra quanto l'azienda sia in grado di coprire gli investimenti con il capitale proprio e quindi di essere autonoma dal punto di vista finanziario. Equivale all'Equity Asset Ratio sebbene espresso in forma di sottrazione"],
  ["Margine Secondario di Struttura", formatCurrency((vars.Bilancio_B132+vars.SP_Riclasificato_D33)-vars.Bilancio_B8), formatCurrency((vars.Bilancio_B132+vars.SP_Riclasificato_D33)-vars.Bilancio_B8), "(Patrimonio Netto + Passivo Consolidato) - Immobilizzazioni", "[SPP.A+[(SPP.B)+(SPP.C)+(SPP.D.1b+SPP.D.2b+SPP.D.3b+SPP.D.4b+SPP.D.5b+SPP.D.6b+SPP.D.7b+SPP.D.8b+SPP.D.9b+SPP.D.10b+SPP.D.11b+SPP.D.12b+SPP.D.13b+SPP.D.14b)]]-SPA.B", "Cos' come il margine primario di struttura l'indice evidenzia come l'azienda abbia coperto i propri investimenti. Valori positivi dell'indice mostrano un buon equilibrio patrimoniale"],
  ["Margine Primario di Tesoreria", formatCurrency(vars.Margini_Patrimoniali_B31-vars.Margini_Patrimoniali_B36), formatCurrency(vars.Margini_Patrimoniali_B31-vars.Margini_Patrimoniali_B36), "Liquidità Immediata - Passivo Corrente", "[(SPA.C.III+SPA.C.IV)]-[(SPP.D.1a+SPP.D.2a+SPP.D.3a+SPP.D.4a+SPP.D.5a+SPP.D.6a+SPP.D.7a+SPP.D.8a+SPP.D.9a+SPP.D.10a+SPP.D.11a+SPP.D.12a+SPP.D.13a+SPP.D.14a)]", "Rappresenta la capacità dell'azienda di far fronte al passivo corrente (debiti a breve) con la sola liquidità immediata. L'indice assumerà difficilmente valori > 0 (zero). Una buona chiave di lettura è il rapporto con il Capitale circolante Lordo. E' uguale all'Acid Test sebbene espresso in forma di sottrazione."],
  ["Margine Secondario di Tesoreria", formatCurrency(vars.Margini_Patrimoniali_D42), formatCurrency(vars.Margini_Patrimoniali_D42), "(Liquidità Immediata + Liquidità Differita) - Passivo Corrente", "[(SPA.C.III+SPA.C.IV)+(SPA.C.II.1a+SPA.C.II.2a+SPA.C.II.3a+SPA.C.II.4a+SPA.C.II.5a)]-[(SPP.D.1a+SPP.D.2a+SPP.D.3a+SPP.D.4a+SPP.D.5a+SPP.D.6a+SPP.D.7a+SPP.D.8a+SPP.D.9a+SPP.D.10a+SPP.D.11a+SPP.D.12a+SPP.D.13a+SPP.D.14a)]", "E' Uguale all'indice secondario di tesoreria (o Quick Ratio) benchè espresso in termini di sottrazione. Rappresenta la capacità dell'azienda di far fronte al passivo corrente (debiti a breve) con la liquidità immediata e con i propri crediti. L'indice assumerà tipicamente un valore < o > di 0 (zero). Nel caso in cui l''indice dovesse essere > di 0 vorrà dire che la somma tra le prime du poste è superiore a tutti i debiti a breve, rappresentando un buon andamento finanziario. Il contrario qualora l'indice dovesse essere minore di zero. Valori critici si avrebbero qualora l'indice scendesse in valore assoluto al di sotto del valore delle disponibilità."],
  ["Current Ratio", vars.SP_Riclasificato_D49.toFixed(4), vars.SP_Riclasificato_D49.toFixed(4), "Attivo Corrente / Passivo Corrente", "[(SPA.C.III+SPA.C.IV)+(SPA.C.II.1a+SPA.C.II.2a+SPA.C.II.3a+SPA.C.II.4a+SPA.C.II.5a)+(SPA.C.I+SPA.C.II.1b+SPA.C.II.2b+SPA.C.II.3b+SPA.C.II.4b+SPA.C.II.5b+SPA.D)]/[(SPP.D.1a+SPP.D.2a+SPP.D.3a+SPP.D.4a+SPP.D.5a+SPP.D.6a+SPP.D.7a+SPP.D.8a+SPP.D.9a+SPP.D.10a+SPP.D.11a+SPP.D.12a+SPP.D.13a+SPP.D.14a)]", "E' uguale al Capitale circolante Netto sebbene espresso in forma di rapporto. Rappresenta la capacità dell'azienda di far fronte al passivo corrente (quindi, sostanzialmente, ai debiti a breve) attraverso le proprie risorse interne (Cassa e Banca, Crediti, Magazzino) sulla base del presupposto che il passivo consolidato (debiti a MLT) sia coperto dalle immobilizzazioni. Buoni tutti i valori > di 1."],
  ["Acid Test (Indice Primario di Tesoreria)", vars.SP_Riclasificato_D50.toFixed(4), vars.SP_Riclasificato_D50.toFixed(4), "Liquidità Immediata / Passivo Corrente", "[(SPA.C.III+SPA.C.IV)]/[(SPP.D.1a+SPP.D.2a+SPP.D.3a+SPP.D.4a+SPP.D.5a+SPP.D.6a+SPP.D.7a+SPP.D.8a+SPP.D.9a+SPP.D.10a+SPP.D.11a+SPP.D.12a+SPP.D.13a+SPP.D.14a)]", "Rappresenta la capacità dell'azienda di far fronte al passivo corrente (debiti a breve) con la sola liquidità immediata. L'indice assumerà difficilmente valori > 1 (uno). E' uguale al margine primario di tesoreria sebbene espresso in forma di rapporto."],
  ["Equity Asset Ratio (Indice primario di struttura)", vars.SP_Riclasificato_D51.toFixed(4), vars.SP_Riclasificato_D51.toFixed(4), "Patrimonio Netto / Immobilizzazioni", "SPP.A/SPA.B", "L'indice mostra quanto l'azienda sia in grado di coprire gli investimenti con il capitale proprio e quindi di essere autonoma dal punto di vista finanziario. Equivale al margine primario di struttura sebbene espresso in forma di rapporto. Buoni i valori superiori ad 1"],
  ["Posizione Finanziaria Netta", formatCurrency(vars.SP_Riclasificato_D52), formatCurrency(vars.SP_Riclasificato_D52), "(Liquidità Immediata + Liquidità Differita) - (Passivo Corrente + Passivo Consolidato)", "[(SPA.C.III+SPA.C.IV)+(SPA.C.II.1a+SPA.C.II.2a+SPA.C.II.3a+SPA.C.II.4a+SPA.C.II.5a)]-[(SPP.D.1a+SPP.D.2a+SPP.D.3a+SPP.D.4a+SPP.D.5a+SPP.D.6a+SPP.D.7a+SPP.D.8a+SPP.D.9a+SPP.D.10a+SPP.D.11a+SPP.D.12a+SPP.D.13a+SPP.D.14a)+(SPP.B)+(SPP.C)+(SPP.D.1b+SPP.D.2b+SPP.D.3b+SPP.D.4b+SPP.D.5b+SPP.D.6b+SPP.D.7b+SPP.D.8b+SPP.D.9b+SPP.D.10b+SPP.D.11b+SPP.D.12b+SPP.D.13b+SPP.D.14b)]", "E' collegata al margine secondario di tesoreria pur contemplando il passivo consolidato. Rappresenta l'indebitamento netto dell'azienda. L'indice assumerà tipicamente un valore < o > di 0 (zero). Nel caso in cui l''indice dovesse essere > di 0 vorrà dire che la somma tra le prime du poste è superiore a tutti i debiti a breve e a lungo termine, rappresentando un ottimo andamento finanziario. Il contrario qualora l'indice dovesse essere minore di zero. Valori critici si avrebbero qualora l'indice scendesse in valore assoluto al di sotto del valore delle disponibilità."],
  ["Indice Secondario di Capitalizzazione", percentForm(vars.SP_Riclasificato_D54), percentForm(vars.SP_Riclasificato_D54), "Capitale Sociale / Totale Passivo", "SPP.A.I/SPP", "Definisce la struttura del capitale investito mostrando quanta parte del passivo patrimoniale (fonti) sia coperta dal solo capitale sociale. Ottimali i valori superiori al 10%"],
  ["Indice Secondario di Struttura", vars.Sintesi_e_Indici_F42.toFixed(4), vars.Sintesi_e_Indici_F42.toFixed(4), "(Patrimonio Netto + Passivo Consolidato) / Immobilizzazioni", "[SPP.A+[(SPP.B)+(SPP.C)+(SPP.D.1b+SPP.D.2b+SPP.D.3b+SPP.D.4b+SPP.D.5b+SPP.D.6b+SPP.D.7b+SPP.D.8b+SPP.D.9b+SPP.D.10b+SPP.D.11b+SPP.D.12b+SPP.D.13b+SPP.D.14b)]]/SPA.B", "Così come l'indice primario di struttura l'indice evidenzia come l'azienda abbia coperto i propri investimenti. Valori maggiori di 1 dell'indice mostrano un buon equilibrio patrimoniale"],
  ["ROI", percentForm(vars.CE_Riclassificato_B25), percentForm(vars.CE_Riclassificato_B25), "EBIT / Totale Passivo", "(CE.A-CE.B)/SPP", "Il ROI (Return on Investment) rappresenta la percentuale di margine generato da ogni € di investimento ovvero la redditività netta della gestione caratteristica. Il principale termine di paragone del ROI è il tasso di interesse: qualora il ROI sia inferiore al tasso di interesse medio di mercato potrebbe apparire conveniente prestare il denaro (e, ancora, se il ROI è inferiore al ROD farsi prestare denaro potrebbe apparire poco conveniente); questo tipo di valutazione non tiene però conto delle esternalità."],
  ["ROA", percentForm(vars.CE_Riclassificato_B15/vars.SP_Riclasificato_B21), percentForm(vars.CE_Riclassificato_B15/vars.SP_Riclasificato_B21), "EBITDA / Totale Passivo", "[CE.A-(CE.B+CE.B.10+CE.B.12+CE.B.13)]/SPP", "Il ROA (Return on Asset) rappresenta la percentuale di margine generato da ogni € di investimento non considerando, tra i costi, ammortamenti ed accantonamenti (a differenza del ROI dove al numeratore troviamo l'EBIT, nel ROA troveremo l'EBITDA). Il principale termine di paragone del ROA è il tasso di interesse: qualora il ROA sia inferiore al tasso di interesse medio di mercato potrebbe apparire conveniente prestare il denaro (e, ancora, se il ROI è inferiore al ROD farsi prestare denaro potrebbe apparire poco conveniente); questo tipo di valutazione non tiene però conto delle esternalità."],
  ["ROE", percentForm(vars.CE_Riclassificato_B27), percentForm(vars.CE_Riclassificato_B27), "Utile netto/ Patrimonio Netto", "(CE.A-CE.B)/SPP.A", "Il ROE (Return on Equity) rappresenta la percentuale di margine genrato da ogni € di capitale sociale e riserve investite nell'azienda. Non misura quindi lo sforzo complessivo, ma quello esclusivamente attribuibile al capitale dell'imprenditore (Equity, appunto)."],
  ["ROS", percentForm(vars.CE_Riclassificato_B28), percentForm(vars.CE_Riclassificato_B28), "EBIT / Valore produzione venduta", "(CE.A-CE.B)/CE.A.1", "Il ROS (Return on Sales) rappresenta la percentuale di margine generato da ogni € di prodotto venduto (non considerando, quindi, le scorte)."],
  ["ROP", percentForm(vars.CE_Riclassificato_B29), percentForm(vars.CE_Riclassificato_B29), "EBIT / Valore produzione", "(CE.A-CE.B)/CE.A", "Il ROP (Return on Producttion) rappresenta la percentuale di margine generato da ogni € di prodotto realizzato (considerando, quindi, anche le scorte)."],
  ["ROD", percentForm(vars.CE_Riclassificato_B30), percentForm(vars.CE_Riclassificato_B30), "Interessi passivi / Debiti", "CE.C.17/SPP.D", "Il ROD (Return on Debt) misura il rapporto tra interessi passivi complessivamente pagati nell'anno e totale del debito. Definisce in qualche modo il tasso di interesse medio pagato al sistema del credito (Banche e Fornitori)"],
  ["ROD2", percentForm(vars.CE_Riclassificato_B31), percentForm(vars.CE_Riclassificato_B31), "Interessi passivi / Debiti bancari", "CE.C.17/SPP.D.4", "Il ROD2 (Return on Debt) misura il rapporto tra interessi passivi complessivamente pagati nell'anno e debiti bancari. Definisce in qualche modo il tasso di interesse medio pagato al sistema bancario."],
  ["EBITDA (Margine operativo lordo)", "//", formatCurrency(vars.CE_Riclassificato_B15), "(Valore della produzione + Ammortamenti + Accantonamenti) - Costi della produzione", "CE.A-(CE.B+CE.B.10+CE.B.12+CE.B.13)", "L'EBITDA (Earnings Before Interest, Tax Depreciation and Amortization) è un indicatore di redditività che evidenzia il reddito di un'azienda basato solo sulla sua gestione caratteristica, al lordo, quindi, di interessi (gestione finanziaria), tasse (gestione fiscale), deprezzamento di beni e ammortamenti."],
  ["EBIT (Reddito operativo)", "//", formatCurrency(vars.CE_Riclassificato_B18), "Valore della produzione - Costi della produzione", "CE.A-CE.B", " L'EBIT (Earnings Before Interest) esprime il reddito che l'azienda è in grado di generare prima della remunerazione del capitale, comprendendo con questo termine sia il capitale di terzi (indebitamento) sia il capitale proprio (patrimonio netto). Nella formulazione degli indici di bilancio è utilizzato per ottenere il ROI (Return on investment, dato da EBIT / Totale passivo), espressione, appunto, della redditività dei capitali complessivamente investiti in azienda, a prescindere dalla loro provenienza."],
  ["EBIT/OF", vars.CE_Riclassificato_B35.toFixed(4), vars.CE_Riclassificato_B35.toFixed(4), "EBIT / Oneri finanziari", "(CE.A-CE.B)/CE.C.17", "l'EBIT/OF rappresenta il rapporto tra l'EBIT (che può essere rappresentato come una sorta di marginalità) e gli oneri finanziari. Il quoziente è particolarmente utile poiché indica il grado di copertura che il reddito operativo è in grado di fornire al costo delle risorse finanziarie. Quando l’indice assume una valore minore di 1, l’EBIT sarà minore degli oneri finanziari. Il reddito generato dalla gestione operativa non è, cioè, sufficiente a remunerare il capitale acquisito per produrlo. "],
  ["Marginalità Lorda", percentForm(vars.CE_Riclassificato_B15/vars.CE_Riclassificato_B9), percentForm(vars.CE_Riclassificato_B15/vars.CE_Riclassificato_B9), "EBITDA / Valore della produzione", "[CE.A-(CE.B+CE.B.10+CE.B.12+CE.B.13)]/CE.A", "Il rapporto tra EBITDA e valore della produzione rappresenta la percentuale di margine generato da ogni € di prodotto realizzato (considerando, quindi, anche le scorte)."],
];

// indici di riferimento all'array
const colWidths1 = ["16.7%", "16.7%", "16.7%", "16.7%", "16.7%", "16.7%"]; 
const colWidths = ["17%", "10%", "10%", "16%", "20%", "27%"];

  return (
    <TableContainer className="no-repeat-header" component={Paper}>
      {/* Prima tabella (righe 1–4) */}
      <Table sx={{ tableLayout: "fixed" }}>
        <colgroup>
          {colWidths1.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={6}
              align="center"
              sx={{ color: "#fff", backgroundColor: "#003366", padding: 1.5, fontSize: 16 }}
            >
              {resolveCell(rows[1][0]) as React.ReactNode}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[rows[2], rows[3], rows[4]].map((row, r) => {

            const nonEmpty = row.filter((c) => c !== "");
            if (nonEmpty.length === 0) {
              return (
                <TableRow key={`empty-${r}`}>
                  <TableCell colSpan={row.length} sx={{ padding: 1, borderBottom: "3px double #000" }} />
                </TableRow>
              );
            }

            return (
              <TableRow
                key={r}
                sx={{
                  backgroundColor: r == 1 ? "#e0e0e0" : "transparent",
                  "&:hover": {
                    backgroundColor: r == 1
                      ? "rgba(0, 0, 0, 0.25)"
                      : "rgba(60, 61, 88, 0.08)"
                  }
                }}
              >
                {row.map((cell, c) => {
                  const isColoredDotCell = r == 2  && [0, 2, 4].includes(c);
                  if ((r == 1 || r == 2) && [1, 3, 5].includes(c)) {
                    return null;
                  }

                  // Definisci colSpan dinamico per righe 1 e 2
                  let span = 1;
                  if ((r == 1 || r == 2) && [0, 2, 4].includes(c)) {
                    span = 2;
                  }

                  return (
                    <TableCell
                      key={c}
                      colSpan={span}
                      align="center"
                      sx={{
                        fontWeight: r == 1 ? "bold" : 400,
                        padding: 1,
                        borderRight: c !== 5 ? "1px solid #ccc" : "none",
                        borderBottom: r == 1 ? "none" : "3px double #000"
                      }}
                    >
                      {isColoredDotCell ? (
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                          <span
                            style={{
                              width: 15,
                              height: 15,
                              borderRadius: "50%",
                              backgroundColor: c === 0 ? "green" : c === 2 ? "orange" : "red",
                              display: "inline-block"
                            }}
                          />
                          <span>
                            {typeof cell === "string" && cell.startsWith("vars.") ? eval(cell) : cell}
                          </span>
                        </span>
                      ) : (
                        typeof cell === "string" && cell.startsWith("vars.") ? eval(cell) : cell
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Seconda tabella (righe da 5 in poi) */}
      <Table sx={{ tableLayout: "fixed", mt: 0.5 }}>
        <colgroup>
          {colWidths.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        <TableBody>
          {rows.slice(5).map((row, r) => {
            const nonEmpty = row.filter((c) => c !== "");

            if (nonEmpty.length === 0) {
              return (
                <TableRow key={`empty-${r}`}>
                  <TableCell colSpan={row.length} sx={{ padding: 1, borderBottom: "3px double #000" }} />
                </TableRow>
              );
            }

            return (
              <TableRow
                key={r}
                sx={{
                  backgroundColor: r === 1 ? "#e0e0e0" : "transparent",
                  "&:hover": {
                    backgroundColor: r === 1
                      ? "rgba(0, 0, 0, 0.25)"
                      : "rgba(60, 61, 88, 0.08)"
                  }
                }}
              >
                {row.map((cell, c) => (
                  <TableCell
                    key={c}
                    align="center"
                    sx={{
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                      fontWeight: c === 0 || r === 1 ? "bold" : 400,
                      padding: 1,
                      borderRight: c !== 5 ? "1px solid #ccc" : "none",
                      borderBottom: "3px double #000"
                    }}
                  >
                    {typeof cell === "string" && cell.startsWith("vars.") ? eval(cell) : cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
   {/* <TableContainer component={Paper}>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {(() => {
               const value = resolveCell(header[0]);
               return(
              <TableCell  
                align="center" 
                colSpan = {header.length} 
                sx={{ color:"#ffffff", backgroundColor:"#003366", padding:1.5, fontSize:16}}
              >
                {value as React.ReactNode}
              </TableCell>
              );
            })()}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((row, r) => {
            <colgroup>
              {([1,2].includes(r) ? colWidths1 : colWidths).map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>

            const nonEmpty = row.filter((c) => c !== "");

            //riga con un solo valore (cella unica centrata) 
            if (nonEmpty.length === 1) {
              const value = resolveCell(nonEmpty[0]);
              return (
                <TableRow
                  key={r}
                  sx={{ backgroundColor: "trasparent", "&:hover": { backgroundColor: "rgba(60, 61, 88, 0.08)" } }}
                >
                  <TableCell
                    colSpan={row.length}
                    align="center"
                    sx={{ borderBottom:"3px double #000" , padding: 1 }}
                  >
                    {value as React.ReactNode}
                  </TableCell>
                </TableRow>
              );
            }

            //riga completamente vuota (spacer) 
            if (nonEmpty.length === 0) {
              return (
                <TableRow
                  key={r}
                  sx={{ backgroundColor: "trasparent" }}
                >
                  <TableCell colSpan={row.length} sx={{ padding: 1 ,borderBottom: "3px double #000"}} />
                </TableRow>
              );
            }

            //riga “normale”
            return (
              <TableRow
                key={r}
                sx={{ backgroundColor: [1,4].includes(r)? "#e0e0e0" : "trasparent", "&:hover": { backgroundColor: [1,4].includes(r)? "rgba(0, 0, 0, 0.25)" : "rgba(60, 61, 88, 0.08)" } }}
              >
                {row.map((cell, c) => {
                  const isColoredDotCell = r === 2 && [0, 2, 4].includes(c);

                  return (
                    <TableCell
                      key={c}
                      align="center"
                      sx={{ 
                        whiteSpace: "pre-line", // rispetta \n .
                        wordBreak: "break-word", 
                        fontWeight: c==0 || [1,3,5].includes(r) ?"bold": 400,
                        padding: 1, 
                        borderRight: c!=5 ? "1px solid #ccc" : "none",
                        borderBottom: r==1 ? "none" : "3px double #000" , 
                      }}
                    >
                      {isColoredDotCell ? (
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                          <span
                            style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: c == 0? "green": c == 2? "orange" : c== 4? "red" : "none",
                            display: "inline-block",
                            }}
                          />
                          <span>
                            {typeof cell === "string" && cell.startsWith("vars.") ? eval(cell) : cell}
                          </span>
                        </span>
                      ) : (
                        typeof cell === "string" && cell.startsWith("vars.") ? eval(cell) : cell
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );*/}
 
