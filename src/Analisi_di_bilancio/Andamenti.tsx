import {Variables_use} from "./variables.tsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRowStyle, resolveCell, formatCurrency, percentForm } from "./format.ts";
import { useDati, useDatiB } from "./DatiContext.tsx";


export default function Andamenti() {

  const { dataDAzienda } = useDati();
  const { dataBilancio } = useDatiB();
  
  const vars = Variables_use(dataBilancio);

  const Andamenti_D51= ((((dataBilancio.B221+dataBilancio.B226+dataBilancio.B222+dataBilancio.B223+dataBilancio.B224)-dataBilancio.B229-dataBilancio.B243-(dataBilancio.B230+dataBilancio.B231+dataBilancio.B246))-vars.Bilancio_B232)-(dataBilancio.B244+dataBilancio.B245)-vars.Bilancio_B238)/vars.Bilancio_B220
  const Andamenti_C51= ((((dataBilancio.C221+dataBilancio.C226+dataBilancio.C222+dataBilancio.C223+dataBilancio.C224)-dataBilancio.C229-dataBilancio.C243-(dataBilancio.C230+dataBilancio.C231+dataBilancio.C246))-vars.Bilancio_C232)-(dataBilancio.C244+dataBilancio.C245)-vars.Bilancio_C238)/vars.Bilancio_C220
  const Andamenti_B51= ((((dataBilancio.D221+dataBilancio.D226+dataBilancio.D222+dataBilancio.D223+dataBilancio.D224)-dataBilancio.D229-dataBilancio.D243-(dataBilancio.D230+dataBilancio.D231+dataBilancio.D246))-vars.Bilancio_D232)-(dataBilancio.D244+dataBilancio.D245)-vars.Bilancio_D238)/vars.Bilancio_D220

const rows = [
  ["A", "B", "C", "D"],
  ["Prospetto Andamenti Annuali","", "", ""],
  ["", "", "", ""],
  ["Dati di Bilancio","", "", ""],
  ["", dataDAzienda.B17-2 , dataDAzienda.B17-1,  dataDAzienda.B17],
  ["Immobilizzazioni Immateriali", formatCurrency(vars.Bilancio_D9),  formatCurrency(vars.Bilancio_C9),  formatCurrency(vars.Bilancio_B9)],
  ["Immobilizzazioni Materiali", formatCurrency(vars.Bilancio_D35),  formatCurrency(vars.Bilancio_C35),  formatCurrency(vars.Bilancio_B35)],
  ["Immobilizzazioni Finanziarie", formatCurrency(vars.Bilancio_D57),  formatCurrency(vars.Bilancio_C57),  formatCurrency(vars.Bilancio_B57)],
  ["Attivo Circolante", formatCurrency(vars.Bilancio_D84) , formatCurrency(vars.Bilancio_C84),  formatCurrency(vars.Bilancio_B84)],
  ["Crediti", formatCurrency(vars.Bilancio_D91)  ,formatCurrency(vars.Bilancio_C91)  ,formatCurrency(vars.Bilancio_B91)],
  ["Patrimonio Netto", formatCurrency(vars.Bilancio_D132),  formatCurrency(vars.Bilancio_C132),  formatCurrency(vars.Bilancio_B132)],
  ["Debiti", formatCurrency(vars.Bilancio_D159)  ,formatCurrency(vars.Bilancio_C159)  ,formatCurrency(vars.Bilancio_B159)],
  ["", "", "", ""],
  ["Valore della Produzione", formatCurrency(vars.Bilancio_D220),  formatCurrency(vars.Bilancio_C220),  formatCurrency(vars.Bilancio_B220)],
  ["Contributi conto esercizio", formatCurrency(dataBilancio.D227),  formatCurrency(dataBilancio.C227),  formatCurrency(dataBilancio.B227)],
  ["Acquisti Materie Prime", formatCurrency(dataBilancio.D229),  formatCurrency(dataBilancio.C229),  formatCurrency(dataBilancio.B229)],
  ["Spese per Servizi", formatCurrency(dataBilancio.D230),  formatCurrency(dataBilancio.C230),  formatCurrency(dataBilancio.B230)],
  ["Spese per Beni di Terzi", formatCurrency(dataBilancio.D231),  formatCurrency(dataBilancio.C231),  formatCurrency(dataBilancio.B231)],
  ["Personale", formatCurrency(vars.Bilancio_D232),  formatCurrency(vars.Bilancio_C232),  formatCurrency(vars.Bilancio_B232)],
  ["Ammortamenti", formatCurrency(vars.Bilancio_D238),  formatCurrency(vars.Bilancio_C238),  formatCurrency(vars.Bilancio_B238)],
  ["Oneri Diversi", formatCurrency(dataBilancio.D246),  formatCurrency(dataBilancio.C246),  formatCurrency(dataBilancio.B246)],
  ["Proventi e Oneri Finanziari", formatCurrency(vars.Bilancio_D248),  formatCurrency(vars.Bilancio_C248),  formatCurrency(vars.Bilancio_B248)],
  ["Utile Ante Imposte", formatCurrency(vars.Bilancio_D292),  formatCurrency(vars.Bilancio_C292),  formatCurrency(vars.Bilancio_B292)],
  ["Imposte", formatCurrency(vars.Bilancio_D293),  formatCurrency(vars.Bilancio_C293),  formatCurrency(vars.Bilancio_B293)],
  ["Utile d'Esercizio", formatCurrency(vars.Bilancio_D297),  formatCurrency(vars.Bilancio_C297),  formatCurrency(vars.Bilancio_B297)],
  ["", "", "", ""],
  ["Indicatori Patrimoniali","", "", ""],
  ["", dataDAzienda.B17-2 , dataDAzienda.B17-1,  dataDAzienda.B17],
  ["Liquidità Immediata", formatCurrency(vars.Andamenti_B30),  formatCurrency(vars.Andamenti_F30),  formatCurrency(vars.SP_Riclasificato_B28)],////////////////////
  ["Liquidità Differita", formatCurrency(vars.Andamenti_B31),  formatCurrency(vars.Andamenti_F31),  formatCurrency(vars.SP_Riclasificato_B32)],/////////////////
  ["Disponibilità", formatCurrency(vars.Andamenti_B32),  formatCurrency(vars.Andamenti_F32),  formatCurrency(vars.SP_Riclasificato_B36)],//////////////////
  ["Immobilizzazioni", formatCurrency(vars.Bilancio_D8),  formatCurrency(vars.Bilancio_C8) , formatCurrency(vars.Bilancio_B8)],////////////////////////
  ["Passivo Corrente", formatCurrency(vars.Andamenti_B34) , formatCurrency(vars.Andamenti_F34) , formatCurrency(vars.SP_Riclasificato_D28)],/////////////////
  ["Passivo Consolidato", formatCurrency(vars.Andamenti_B35),  formatCurrency(vars.Andamenti_F35) , formatCurrency(vars.SP_Riclasificato_D33)],////////////////////
  ["Patrimonio Netto", formatCurrency(vars.Bilancio_D132), formatCurrency(vars.Bilancio_C132),  formatCurrency(vars.Bilancio_B132)],///////////////////
  ["Margine Primario di Struttura",  formatCurrency(vars.Bilancio_D132-vars.Bilancio_D8), formatCurrency(vars.Bilancio_C132-vars.Bilancio_C8), formatCurrency(vars.Bilancio_B132-vars.Bilancio_B8)],//////////////////////////
  ["Margine Secondario di Struttura",  formatCurrency((vars.Bilancio_D132+vars.Andamenti_B35)-vars.Bilancio_D8), formatCurrency((vars.Bilancio_C132+vars.Andamenti_F35)-vars.Bilancio_C8), formatCurrency((vars.Bilancio_B132+vars.SP_Riclasificato_D33)-vars.Bilancio_B8)],////////////////////////////////
  ["Margine Primario di Tesoreria", formatCurrency(vars.Andamenti_MP31B-vars.Andamenti_MP36B), formatCurrency(vars.Andamenti_MP31F-vars.Andamenti_MP36F) , formatCurrency(vars.Margini_Patrimoniali_B31-vars.Margini_Patrimoniali_B36)],//////////////////////
  ["Margine Secondario di Tesoreria", formatCurrency(vars.Andamenti_B40), formatCurrency(vars.Andamenti_F40) , formatCurrency(vars.Margini_Patrimoniali_D42)],///////////////////////////
  ["Current Ratio",  vars.Andamenti_B41.toFixed(4), vars.Andamenti_F41.toFixed(4) , vars.SP_Riclasificato_D49.toFixed(4)],//////////////////////
  ["Acid Test", vars.Andamenti_B42.toFixed(4), vars.Andamenti_F42.toFixed(4),  vars.SP_Riclasificato_D50.toFixed(4)],/////////////////
  ["Equity Asset Ratio", vars.Andamenti_B43.toFixed(4), vars.Andamenti_F43.toFixed(4) , vars.SP_Riclasificato_D51.toFixed(4)],//////////////////
  ["Quick Ratio",  vars.Andamenti_B44.toFixed(4), vars.Andamenti_F44.toFixed(4) , vars.SP_Riclasificato_B49.toFixed(4)],////////////////////
  ["Leverage", vars.Andamenti_B45.toFixed(4), vars.Andamenti_F45.toFixed(4),  vars.SP_Riclasificato_B51.toFixed(4)],////////////////////
  ["Capitale Circolante Netto (C.C.N.)", formatCurrency(vars.Andamenti_B46) , formatCurrency(vars.Andamenti_F46) , formatCurrency(vars.SP_Riclasificato_B48)],/////////////////
  ["Indebitamento netto (Posizione Netta)", formatCurrency(vars.Andamenti_B47) , formatCurrency(vars.Andamenti_F47) , formatCurrency(vars.SP_Riclasificato_D52)],//////////////
  ["", "", "", ""],
  ["Giorni medi di incasso", vars.Andamenti_B49.toFixed(0), vars.Andamenti_F49.toFixed(0) , vars.Sintesi_e_Indici_B43.toFixed(0)],///////////////////////
  ["Giorni medi di pagamento", vars.Andamenti_B50.toFixed(0), vars.Andamenti_F50.toFixed(0), vars.Sintesi_e_Indici_B44.toFixed(0)],//////////////////////
  ["EBIT/Valore della produzione", percentForm(Andamenti_B51) , percentForm(Andamenti_C51), percentForm(Andamenti_D51)],////////////////////////////////
  ["Aliquota d'imposta media", percentForm(vars.Bilancio_D293/vars.Bilancio_D292), percentForm(vars.Bilancio_C293/vars.Bilancio_C292) , percentForm(vars.Bilancio_B293/vars.Bilancio_B292) ],//////////////////////
  ["", "", "", ""],
  ["Z - Score","", "", ""],
  ["", dataDAzienda.B17-2 , dataDAzienda.B17-1,  dataDAzienda.B17],
  ["Z-Score", vars.Andamenti_B56.toFixed(4), vars.Andamenti_F56.toFixed(4),  vars.SP_Riclasificato_C60.toFixed(4)],///////////////////
  ["", "", "", ""],
  ["Indicatori Economici","", "", ""],
  ["", dataDAzienda.B17-2 , dataDAzienda.B17-1,  dataDAzienda.B17],
  ["ROI", percentForm(vars.Andamenti_B60), percentForm(vars.Andamenti_F60), percentForm(vars.CE_Riclassificato_B25)],///////////////
  ["ROA", percentForm(vars.Andamenti_B68/vars.Andamenti_B61), percentForm(vars.Andamenti_F68/vars.Andamenti_F61), percentForm(vars.CE_Riclassificato_B15/vars.SP_Riclasificato_B21)],////////////////////////
  ["ROE", percentForm(vars.Andamenti_B62), percentForm(vars.Andamenti_F62), percentForm(vars.CE_Riclassificato_B27)],///////////////////
  ["ROS", percentForm(vars.Andamenti_B63), percentForm(vars.Andamenti_F63), percentForm(vars.CE_Riclassificato_B28)],//////////////////
  ["ROP", percentForm(vars.Andamenti_B64), percentForm(vars.Andamenti_F64), percentForm(vars.CE_Riclassificato_B29)],/////////////////
  ["ROD", percentForm(vars.Andamenti_B65), percentForm(vars.Andamenti_F65), percentForm(vars.CE_Riclassificato_B30)],////////////////
  ["ROD2", percentForm(vars.Andamenti_B66), percentForm(vars.Andamenti_F66), percentForm(vars.CE_Riclassificato_B31)],/////////////////
  ["EBITDA (MOL)", formatCurrency(vars.Andamenti_B68) , formatCurrency(vars.Andamenti_F68) , formatCurrency(vars.CE_Riclassificato_B15)],////////////////////////
  ["EBIT (RO)", formatCurrency(vars.Andamenti_B69) , formatCurrency(vars.Andamenti_F69),  formatCurrency(vars.CE_Riclassificato_B18)],//////////////////////////
  ["EBIT/OF", (vars.Andamenti_B69/vars.Bilancio_D266).toFixed(2), (vars.Andamenti_F69/vars.Bilancio_C266).toFixed(2), (vars.CE_Riclassificato_B18/vars.Bilancio_B266).toFixed(2)],//////////////////////////////////
  ["Marginalità Lorda", percentForm(vars.Andamenti_B68/vars.Andamenti_B79), percentForm(vars.Andamenti_F68/vars.Andamenti_F79), percentForm(vars.CE_Riclassificato_B15/vars.CE_Riclassificato_B9)],///////////////////////////
  ["Incidenza del Costo del Lavoro", percentForm(vars.Bilancio_D232/vars.Bilancio_D228), percentForm(vars.Bilancio_C232/vars.Bilancio_C228), percentForm(vars.Bilancio_B232/vars.Bilancio_B228)],////////////////////////
  ["Incidenza del Costo Mat. Prime", percentForm(vars.Andamenti_B72), percentForm(vars.Andamenti_F72), percentForm(vars.CE_Riclassificato_D27)],////////////////////////
  ["Incidenza dei Servizi", percentForm(vars.Andamenti_B73), percentForm(vars.Andamenti_F73), percentForm(vars.CE_Riclassificato_D28)],/////////////////////
  ["Incidenza dei Beni di Terzi", percentForm(vars.Andamenti_B74), percentForm(vars.Andamenti_F74), percentForm(vars.CE_Riclassificato_D29)],///////////////////
  ["Incidenza degli Ammortamenti", percentForm(vars.Andamenti_B75), percentForm(vars.Andamenti_F75), percentForm(vars.CE_Riclassificato_D30)],//////////////////
  ["Incidenza degli Oneri Diversi", percentForm(vars.Andamenti_B76), percentForm(vars.Andamenti_F76), percentForm(vars.CE_Riclassificato_D31)],/////////////////
  ["Incidenza degli Oneri Finanziari", percentForm(vars.Andamenti_B77), percentForm(vars.Andamenti_F77), percentForm(vars.CE_Riclassificato_D32)],////////////////
  ["Costo del Lav. / Val. Prod.", percentForm(vars.Andamenti_B78), percentForm(vars.Andamenti_F78), percentForm(vars.CE_Riclassificato_D33)],/////////////////////////
  ["Costo Mat. Prime / Val. Prod.", percentForm(dataBilancio.D229/vars.Andamenti_B79), percentForm(dataBilancio.C229/vars.Andamenti_F79), percentForm(dataBilancio.B229/vars.CE_Riclassificato_B9)],//////////////////////////
  ["", "", "", ""],
  ["Indicatori Economici e patrimoniali - Variazioni % - (Incrementi / decrementi sull'anno precedente)","", "", ""],
  ["", dataDAzienda.B17-2 , dataDAzienda.B17-1,  dataDAzienda.B17],
  ["Valore della Produzione", "//",  percentForm((vars.Bilancio_C220/vars.Bilancio_D220)-1),  percentForm((vars.Bilancio_B220/vars.Bilancio_C220)-1)],
  ["Acquisti materie prime", "//",  percentForm((dataBilancio.C229/dataBilancio.D229)-1),  percentForm((dataBilancio.B229/dataBilancio.C229)-1)],
  ["Spese per prestazioni di servizi", "//",  percentForm((dataBilancio.C230/dataBilancio.D230)-1) , percentForm((dataBilancio.B230/dataBilancio.C230)-1)],
  ["Spese per godimento di beni di terzi", "//",  percentForm((dataBilancio.C231/dataBilancio.D231)-1),  percentForm((dataBilancio.B231/dataBilancio.C231)-1)],
  ["Costi del personale", "//",  percentForm((vars.Bilancio_C232/vars.Bilancio_D232)-1),  percentForm((vars.Bilancio_B232/vars.Bilancio_C232)-1)],
  ["Ammortamenti e svalutazioni", "//",  percentForm((vars.Bilancio_C238/vars.Bilancio_D238)-1),  percentForm((vars.Bilancio_B238/vars.Bilancio_C238)-1)],
  ["Oneri diversi di gestione", "//",  percentForm((dataBilancio.C246/dataBilancio.D246)-1),  percentForm((dataBilancio.B246/dataBilancio.C246)-1)],
  ["Oneri finaziari", "//",  percentForm((vars.Bilancio_C248/vars.Bilancio_D248)-1),  percentForm((vars.Bilancio_B248/vars.Bilancio_C248)-1)],
  ["Imposte sul reddito", "//",  percentForm((vars.Bilancio_C293/vars.Bilancio_D293)-1),  percentForm((vars.Bilancio_B293/vars.Bilancio_C293)-1)],
  ["Utile d'esercizio", "//",  percentForm((vars.Bilancio_C297/vars.Bilancio_D297)-1),  percentForm((vars.Bilancio_B297/vars.Bilancio_C297)-1)],
  ["Debiti totali", "//",  percentForm((vars.Bilancio_C159/vars.Bilancio_D159)-1),  percentForm((vars.Bilancio_B159/vars.Bilancio_C159)-1)],
  ["Crediti", "//" , percentForm((vars.Bilancio_C91/vars.Bilancio_D91)-1) , percentForm((vars.Bilancio_B91/vars.Bilancio_C91)-1)],
  ["Patrimonio netto", "//",  percentForm((vars.Bilancio_C132/vars.Bilancio_D132)-1),  percentForm((vars.Bilancio_B132/vars.Bilancio_C132)-1)],
  ["Disponibilità", "//",  percentForm((vars.Andamenti_F32/vars.Andamenti_B32)-1),  percentForm((vars.SP_Riclasificato_B36/vars.Andamenti_F32)-1)],///////////
  ["EBITDA", "//",  percentForm((vars.Andamenti_F68/vars.Andamenti_B68)-1),  percentForm((vars.CE_Riclassificato_B15/vars.Andamenti_F68)-1)],//////
  ["EBIT", "//",  percentForm((vars.Andamenti_F69/vars.Andamenti_B69)-1) , percentForm((vars.CE_Riclassificato_B18/vars.Andamenti_F69)-1)],////////
  ["Posizione finanziaria netta", "//",  percentForm((vars.Andamenti_F47/vars.Andamenti_B47)-1),  percentForm((vars.SP_Riclasificato_D52/vars.Andamenti_F47)-1)],///////
];

// indici di riferimento all'array 
const darkBlueRows:any[] = [4,27, 53, 57, 80];
const lightBlueRows:any[] = [5,28,54, 58, 81];
const lightGrayRows:any[] = [];

const colWidths = ["40%", "20%", "20%", "20%"];
const indexRowBB:any[] = [12,13,25,46,47,51,55,78,98];
const indexRowDBB:any[] = [10,15,21,22,32,35];


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
            const originalIndex = r +3 ; // indice reale
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
                  <TableCell colSpan={row.length} sx={{ padding: 1 ,borderBottom: indexRowBB.includes(originalIndex) ? "1px solid #000" : borderBottom}} />
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
                  return (
                    <TableCell
                      key={c}
                      sx={{ 
                        wordBreak: "break-word",
                        color: text, 
                        fontWeight: [0].includes(c) ? "bold": 400,
                        padding: 1, 
                        borderRight: c!=3 ? "3px double #000" : "none" ,
                        borderBottom: indexRowBB.includes(originalIndex) ? "1px solid #000" : indexRowDBB.includes(originalIndex) ? "3px double #000" : borderBottom, 
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