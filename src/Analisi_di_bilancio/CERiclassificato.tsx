import {Variables_use} from "./variables.tsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRowStyle, resolveCell, formatCurrency, percentForm  } from "./format.ts";
import { useDati, useDatiB } from "./DatiContext.tsx";


export default function CERiclassificato() {

  const { dataDAzienda } = useDati();
  const { dataBilancio } = useDatiB();

  const vars = Variables_use(dataBilancio);

  const CE_Riclassificato_41 = dataBilancio.B233/dataDAzienda.B24
  const CE_Riclassificato_42 = dataBilancio.B221/dataDAzienda.B24

const rows = [
  ["A", "B", "C", "D"],
  [`Conto Economico Riclassificato Anno ${dataDAzienda.B17}` , "","",""],
  ["", "", "", ""],
  ["Conto Economico a Valore della Produzione", "", "", ""],
  ["RICAVI", formatCurrency(dataBilancio.B221+dataBilancio.B226), "REDDITO OPERATIVO (EBIT)", formatCurrency(vars.CE_Riclassificato_B18)],
  ["Variazione rimanenze prodotti in corso di lavor., semilavorati e finiti", formatCurrency(dataBilancio.B222), "Proventi Finanziari", formatCurrency(vars.CE_Riclassificato_D6)],
  ["Variazione dei lavori in corso su ordinazione", formatCurrency(dataBilancio.B223), "Oneri Finanziari", formatCurrency(dataBilancio.B270)],
  ["Incrementi di immobilizzazioni per lavori interni", formatCurrency(dataBilancio.B224), "Proventi Straordinari", formatCurrency(dataBilancio.B227)],
  ["VALORE DELLA PRODUZIONE",formatCurrency(dataBilancio.B221+dataBilancio.B226+dataBilancio.B222+dataBilancio.B223+dataBilancio.B224), "Oneri Straordinari", formatCurrency(vars.CE_Riclassificato_D9)],
  ["Acquisti", formatCurrency(dataBilancio.B229), "Rettifiche Attività Finanziarie", formatCurrency(dataBilancio.B279)],
  ["Variazioni rimanenze materie prime, sussid., di consumo e merci", formatCurrency(dataBilancio.B243), "RISULTATO ANTE IMPOSTE", formatCurrency(vars.Bilancio_B292)],
  ["Spese Generali per Prestazione di Servizi", formatCurrency(dataBilancio.B230+dataBilancio.B231+dataBilancio.B246), "Imposte", formatCurrency(vars.Bilancio_B293)],
  ["VALORE AGGIUNTO",formatCurrency((dataBilancio.B221+dataBilancio.B226+dataBilancio.B222+dataBilancio.B223+dataBilancio.B224)-(dataBilancio.B229)-(dataBilancio.B243)-(dataBilancio.B230+dataBilancio.B231+dataBilancio.B246)), "", ""],
  ["Costo del Lavoro", formatCurrency(dataBilancio.B233+dataBilancio.B234+dataBilancio.B235+dataBilancio.B236+dataBilancio.B237), "SALDO GESTIONE STRAORDINARIA", formatCurrency(dataBilancio.B227-vars.CE_Riclassificato_D9)],
  ["MARGINE OPERATIVO LORDO (EBITDA)", formatCurrency(vars.CE_Riclassificato_B13-vars.Bilancio_B232), "SALDO GESTIONE FINANZIARIA", formatCurrency(vars.CE_Riclassificato_D6-vars.Bilancio_B266)],
  ["Accantonamenti", formatCurrency(dataBilancio.B244+dataBilancio.B245), "", ""],
  ["Ammortamenti e Svalutazioni", formatCurrency(vars.Bilancio_B238), "", ""],
  ["REDDITO OPERATIVO (EBIT)", formatCurrency(vars.CE_Riclassificato_B18), "", ""],
  ["", "", "", ""],
  ["REDDITO OPERATIVO (EBIT)", formatCurrency(vars.CE_Riclassificato_B18), "RISULTATO NETTO (UTILE) D'ESERCIZIO", formatCurrency(vars.Bilancio_B297)],
  ["", "", "", ""],
  ["COSTI FISSI", "", "COSTI VARIABILI", ""],
  ["", "", "", ""],
  ["Indicatori Economici", "", "", ""],
  ["ROI", percentForm(vars.CE_Riclassificato_B18/vars.SP_Riclasificato_B21), "Marginalità Lorda (EBITDA/Valore Produzione)", percentForm(vars.CE_Riclassificato_B15/vars.CE_Riclassificato_B9)],
  ["ROA", percentForm(vars.CE_Riclassificato_B15/vars.SP_Riclasificato_B21), "Incidenza del Costo del Lavoro", percentForm(vars.Bilancio_B232/vars.Bilancio_B228)],
  ["ROE (Indice di Redditività dei Mezzi Propri)", percentForm(vars.CE_Riclassificato_B27), "Incidenza del Costo delle Materie Prime", percentForm(vars.CE_Riclassificato_D27)],
  ["ROS (Indice di Redditività delle Vendite)", percentForm(vars.CE_Riclassificato_B28), "Incidenza dei Servizi", percentForm(vars.CE_Riclassificato_D28)],
  ["ROP (Indice di Reddivitità della Produzione)", percentForm(vars.CE_Riclassificato_B29), "Incidenza dei Beni di Terzi", percentForm(vars.CE_Riclassificato_D29)],
  ["ROD (Indice di Onerosità dei Debiti)", percentForm(vars.CE_Riclassificato_B30), "Incidenza degli Ammortamenti", percentForm(vars.CE_Riclassificato_D30)],
  ["ROD2 (Indice di Onerosità dei Debiti Bancari) (i)", percentForm(vars.CE_Riclassificato_B31), "Incidenza degli Oneri Diversi", percentForm(vars.CE_Riclassificato_D31)],
  ["EBITDA (MOL)", formatCurrency(vars.CE_Riclassificato_B15), "Incidenza degli Oneri Finanziari", percentForm(vars.CE_Riclassificato_D32)],
  ["EBIT (RO)", formatCurrency(vars.CE_Riclassificato_B18), "Costo del Lavoro / Valore Produzione", percentForm(vars.CE_Riclassificato_D33)],
  ["EBIT/OF", (vars.CE_Riclassificato_B18/vars.Bilancio_B266).toFixed(4), "Costo Materie Prime / Valore Produzione", percentForm(dataBilancio.B229/vars.CE_Riclassificato_B9)],
  ["EBITDA/Ricavi", percentForm(vars.CE_Riclassificato_B35), "EBIT/Ricavi", percentForm(vars.CE_Riclassificato_D35)],
  ["", "", "", ""],
  ["Rappporti di conto economico", "", "", ""],
  ["Costo del venduto", formatCurrency(vars.CE_Riclassificato_B38), "Altri ricavi/Ricavi", percentForm(vars.Bilancio_B225/vars.Bilancio_B220)],
  ["Costo del venduto/Ricavi", percentForm((dataBilancio.B229+vars.Bilancio_C85-vars.Bilancio_B85)/vars.CE_Riclassificato_B5), "Proventi finanziari/Ricavi", percentForm(vars.CE_Riclassificato_D6/vars.CE_Riclassificato_B5)],
  ["Costo dei servizi/Ricavi", percentForm(dataBilancio.B230/dataBilancio.B221), "Proventi sraordinari/Ricavi",percentForm(vars.CE_Riclassificato_B40)],
  ["Costo del personale/Ricavi", percentForm(dataBilancio.B233/dataBilancio.B221), "Costo medio del personale", formatCurrency(CE_Riclassificato_41 == Infinity? 0 : CE_Riclassificato_41)],
  ["Ammortamenti/Ricavi", percentForm(dataBilancio.B239+dataBilancio.B240/dataBilancio.B221), "Ricavi per dipendente", formatCurrency(CE_Riclassificato_42 == Infinity? 0 : CE_Riclassificato_42)],
  ["Altri costi/Ricavi", percentForm(dataBilancio.B246/dataBilancio.B221), "Debito finanziario/Ricavi", percentForm((vars.Margini_Patrimoniali_B13+vars.Margini_Patrimoniali_B18)/vars.Bilancio_B220)],
  ["Oneri finanziari/Ricavi", percentForm(vars.Bilancio_B266/dataBilancio.B221), "EBITDA/Debito finanziario", percentForm(vars.CE_Riclassificato_B15/(vars.Margini_Patrimoniali_B13+vars.Margini_Patrimoniali_B18))],
  ["Oneri straordinari/Ricavi", percentForm(vars.CE_Riclassificato_B45), "EBIT/Debito finanziario", percentForm(vars.CE_Riclassificato_B18/(vars.Margini_Patrimoniali_B13+vars.Margini_Patrimoniali_B18))],
  ["Imposte/Ricavi", percentForm(vars.Bilancio_B293/dataBilancio.B221), "EBIT/Totale attivo", percentForm(vars.CE_Riclassificato_B18/vars.SP_Riclasificato_B21)],
  [`Cash Flow ${dataDAzienda.B17}`, formatCurrency(dataBilancio.B221+vars.Bilancio_B272+dataBilancio.B245+dataBilancio.B244+dataBilancio.B239+dataBilancio.B240+dataBilancio.B241+dataBilancio.B242+dataBilancio.B235), "EBITDA/OF", (vars.CE_Riclassificato_B15/vars.Bilancio_B266).toFixed(2)],
  [`Cash Flow ${dataDAzienda.B17}`, formatCurrency(dataBilancio.C221+vars.Bilancio_C272+dataBilancio.C245+dataBilancio.C244+dataBilancio.C239+dataBilancio.C240+dataBilancio.C241+dataBilancio.C242+dataBilancio.C235), "Utile/Totale Attivo", percentForm(vars.Bilancio_B297/vars.SP_Riclasificato_B21)],
];
  

// indici di riferimento all'array 
const darkBlueRows:any[] = [3,23,36,49];
const lightBlueRows:any[] = [];
const lightGrayRows:any[] = [];

const colWidths = ["35%", "15%", "35%", "15%"];

const indexRowBB1 = [4,7,11,13,16];  //colonne con borderBottom nero colonna 1 e 2
const indexRowBB2 = [9];  //colonne con borderBottom nero colonna 2 e 3
const indexRowBB3 = [17,19,21,34,47];  //colonne con borderBottom nero intere

const indexBold1 = [4,8,12,14,17,19,21];  //stringe in grassetto colonna 1 e 2
const indexBold2 = [4,10,13,14,19,21];  //stringe in grassetto colonna 3 e 4
const indexBold3 = [24,25,26,27,28,29,30,31,32,33,34,37,38,39,40,41,42,43,44,45,46,47];  //stringe in grassetto solo colonna 1 e 3 


  const header = rows[1];
  const dataRows = rows.slice(2);

  return (
    <TableContainer className="no-repeat-header" component={Paper}>
      <Table>
         <colgroup>
          {colWidths.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1a4d80", "&:hover": { backgroundColor: "rgba(9, 27, 65, 0.81)" }, }}>
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
            const originalIndex = r + 2; // indice reale
            const { bg, text, hover, borderBottom } = getRowStyle(
              darkBlueRows,
              lightBlueRows,
              lightGrayRows,
              originalIndex
            );
            const nonEmpty = row.filter((c) => c !== "");

            /* riga con un solo valore (cella unica centrata) */
            if (nonEmpty.length === 1) {
              const value = resolveCell(nonEmpty[0]);
              return (
                <TableRow
                  key={r}
                 sx={{ backgroundColor: bg, "&:hover": { backgroundColor: hover } }}
                >
                  <TableCell
                    colSpan={row.length}
                    align="center"
                    sx={{ color: text, borderBottom, padding: 1 }}
                  >
                    {value as React.ReactNode}
                  </TableCell>
                </TableRow>
              );
            }

            /* riga completamente vuota (spacer) */
            if (nonEmpty.length === 0) {
              return (
                <TableRow
                  key={r}
                  sx={{ 
                    backgroundColor: bg, 
                    "&:hover": { backgroundColor: hover }
                  }}
                >
                  <TableCell 
                    colSpan={row.length} 
                    sx={{ padding: 1 , borderBottom: [18,20].includes(originalIndex) ? "1px solid #000" : borderBottom}} />
                </TableRow>
              );
            }

            /* riga “normale” */
            return (
              <TableRow
                key={r}
                sx={{ 
                  backgroundColor: bg, 
                  "&:hover": { backgroundColor: hover }  
                }}
              >
                {row.map((cell, c) => {
                  let colSpan = 1
                  if (originalIndex === 21 && [0,2].includes(c)){
                    colSpan = 2
                  } 
                  if (originalIndex === 21 && [1,3].includes(c)){
                    return null
                  }
                  
                
                  return (
                    <TableCell
                      key={c}
                      colSpan={colSpan}
                      sx={{ 
                        whiteSpace: "pre-line", // rispetta \n .
                        wordBreak: "break-word",
                        color: text, 
                        fontWeight: indexBold1.includes(originalIndex) && [0,1].includes(c) ? "bold": indexBold2.includes(originalIndex) && [2,3].includes(c) ?  "bold": indexBold3.includes(originalIndex) && [0,2].includes(c) ? "bold": 400,
                        padding: 1, 
                        textAlign: originalIndex === 21? "center" : "left",
                        borderRight: c!=3 ? (c===1 || (originalIndex === 21 && c === 0)? "3px double #000" : "1px solid #000") : "none",
                        borderBottom: indexRowBB1.includes(originalIndex) && [0,1].includes(c) ? "1px solid #000" : (indexRowBB2.includes(originalIndex) && [2,3].includes(c) ? "1px solid #000" : (indexRowBB3.includes(originalIndex) ? "1px solid #000" : borderBottom)), 
                      }}
                    >
                      {typeof cell === "string" && cell.startsWith("vars.") ? (
                        // eslint-disable-next-line no-eval
                        eval(cell)
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
    </TableContainer>
  );
}
