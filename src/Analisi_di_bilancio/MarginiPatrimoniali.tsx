import {Variables_use} from "./variables.tsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRowStyle, resolveCell, formatCurrency} from "./format.ts";
import { useDati, useDatiB } from "./DatiContext.tsx";


export default function MarginiPatrimoniali() {

  const { dataDAzienda } = useDati();
  const { dataBilancio } = useDatiB();

  const vars = Variables_use(dataBilancio);

const rows = [["A", "B", "C", "D"],
  [`Margini Patrimoniali Anno ${dataDAzienda.B17}`,"", "", "", ],
  ["", "", "", ""],
  ["Indebitamento finanziario o Posizione finanziaria netta (CESR/05-178b | Consob | OIC6)", "", "Indebitamento netto (Posizione Netta)", ""],
  ["Cassa (a)", formatCurrency(dataBilancio.B127+dataBilancio.B126), "Cassa (a)", formatCurrency(dataBilancio.B127+dataBilancio.B126)],
  ["Banca (b)", formatCurrency(dataBilancio.B125), "Banca (b)", formatCurrency(dataBilancio.B125)],
  ["Titoli Negoziabili (c) ", formatCurrency(vars.Bilancio_B116), "Titoli Negoziabili (c) ", formatCurrency(vars.Bilancio_B116)],
  ["Liquidità immediata (d) (a+b+c)", formatCurrency(vars.SP_Riclasificato_B28), "Liquidità immediata (d) (a+b+c)", formatCurrency(vars.SP_Riclasificato_B28)],
  ["Crediti finanziari correnti (e)", formatCurrency(vars.Bilancio_B64), "Crediti Verso Clienti a Breve Termine (e)", formatCurrency(dataBilancio.B93)],
  ["Debiti finanziari correnti (f)", formatCurrency(dataBilancio.B170), "Crediti Diversi a Breve Termine (f)", formatCurrency(vars.SP_Riclasificato_B34)],
  ["Parte corrente indebitamento non corrente (g)", formatCurrency(vars.Margini_Patrimoniali_B11), "Liquidità differita (g) (e+f)",  formatCurrency(dataBilancio.B93+vars.SP_Riclasificato_B34)],
  ["Altri debiti finanziari correnti (h)", formatCurrency(vars.Bilancio_B166+vars.Bilancio_B175), "Debiti Verso Banche (h)", formatCurrency(dataBilancio.B170)],
  ["Indebitamento finanziario corrente (i) (f+g+h)", formatCurrency(vars.Margini_Patrimoniali_B13), "Debiti Verso Fornitori (i)", formatCurrency(dataBilancio.B179)],
  ["Indebitamento finanziario corrente netto (j) (i-e-d)", formatCurrency(vars.Margini_Patrimoniali_B14), "Debiti per Imposte (j)", formatCurrency(dataBilancio.B197+dataBilancio.B200)],
  ["Debiti bancari non correnti (k)", formatCurrency(dataBilancio.B171), "Altri Debiti a Breve (k)", formatCurrency(vars.SP_Riclasificato_D32)],
  ["Obbligazioni emesse (l)", formatCurrency(vars.Bilancio_B160+vars.Bilancio_B163), "Passivo corrente (l) (h+i+j+k)", formatCurrency(vars.Margini_Patrimoniali_D16)],
  ["Altri debiti non correnti (m)", formatCurrency(dataBilancio.B161+dataBilancio.B176), "Mutui Passivi (m)", formatCurrency(dataBilancio.B171)],
  ["Indebitamento finanziario non corrente (n) (k+l+m)", formatCurrency(vars.Margini_Patrimoniali_B18), "Obbligazioni (n)", formatCurrency(dataBilancio.B162+dataBilancio.B165)],
  ["", "", "Debiti per Imposte Differite (o)",formatCurrency(dataBilancio.B198+dataBilancio.B201)],
  ["", "", "Fondi (TFR + Rischi e Oneri) (p)", formatCurrency(vars.Bilancio_B153+dataBilancio.B158)],
  ["", "", "Ratei e Risconti Passivi (q)", formatCurrency(vars.Bilancio_B205)],
  ["", "", "Altri Debiti e Lungo Termine (r) ", formatCurrency(vars.SP_Riclasificato_D39)],
  ["", "", "Passivo consolidato (s) (m+n+o+p+q+r)", formatCurrency(vars.Margini_Patrimoniali_D23)],
  [`Indebitamento finanziario netto o 
 posizione finanziaria netta (j+n)`, formatCurrency(- (vars.Margini_Patrimoniali_B14+vars.Margini_Patrimoniali_B18)), "Indebitamento netto (Posizione Netta) (d+g-l-s)", formatCurrency(vars.Margini_Patrimoniali_D25)],
  ["", "", "", ""],
  ["Margine primario di tesoreria", "", "Margine secondario di tesoreria", ""],
  ["Cassa (a)", formatCurrency(dataBilancio.B127+dataBilancio.B126), "Cassa (a)", formatCurrency(dataBilancio.B127+dataBilancio.B126)],
  ["Banca (b)", formatCurrency(dataBilancio.B125), "Banca (b)", formatCurrency(dataBilancio.B125)],
  ["Titoli Negoziabili (c) ", formatCurrency(vars.Bilancio_B116), "Titoli Negoziabili (c) ", formatCurrency(vars.Bilancio_B116)],
  ["Liquidità immediata (d) (a+b+c)", formatCurrency(vars.Margini_Patrimoniali_B31), "Liquidità immediata (d) (a+b+c)", formatCurrency(vars.Margini_Patrimoniali_D31)],
  ["Debiti Verso Banche (h)", formatCurrency(dataBilancio.B170), "Crediti Verso Clienti a Breve Termine (e)", formatCurrency(dataBilancio.B93)],
  ["Debiti Verso Fornitori (i)", formatCurrency(dataBilancio.B179), "Crediti Diversi a Breve Termine (f)", formatCurrency(vars.SP_Riclasificato_B34)],
  ["Debiti per Imposte (j)", formatCurrency(dataBilancio.B197+dataBilancio.B200), "Liquidità differita (g) (e+f)", formatCurrency(vars.Margini_Patrimoniali_D34)],
  ["Altri Debiti a Breve (k)", formatCurrency(vars.SP_Riclasificato_D32), "Debiti Verso Banche (h)", formatCurrency(dataBilancio.B170)],
  ["Passivo corrente (l) (h+i+j+k)", formatCurrency(vars.Margini_Patrimoniali_B36), "Debiti Verso Fornitori (i)", formatCurrency(dataBilancio.B179)],
  ["", "", "Debiti per Imposte (j)", formatCurrency(dataBilancio.B197+dataBilancio.B200)],
  ["", "", "Altri Debiti a Breve (k)", formatCurrency(vars.SP_Riclasificato_D32)],
  ["", "", "Passivo corrente (l) (h+i+j+k)", formatCurrency(vars.Margini_Patrimoniali_D39)],
  ["Margine primario di tesoreria (d-l)", formatCurrency(vars.Margini_Patrimoniali_B31-vars.Margini_Patrimoniali_B36), "Margine secondario di tesoreria (d+g-l)", formatCurrency(vars.Margini_Patrimoniali_D31+vars.Margini_Patrimoniali_D34-vars.Margini_Patrimoniali_D39)]
];

// indici di riferimento all'array 
const darkBlueRows:any[] = [1,3,25];
const lightBlueRows:any[] = [];
const lightGrayRows:any[] = [];

const colWidths = ["35%", "15%", "35%", "15%"];
const indexRowBB = [2,22,23,24,37,38,39];
const indexBold1 = [7,12,13,17,23,29,34,38];
const indexBold2 = [7,10,15,22,23,29,32,37,38];


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
                        whiteSpace: "pre-line", // rispetta \n .
                        wordBreak: "break-word",
                        color: text, 
                        fontWeight: indexBold1.includes(originalIndex) && [0,1].includes(c) ? "bold": indexBold2.includes(originalIndex) && [2,3].includes(c) ? "bold": 400,
                        padding: 1, 
                        borderRight: c!=3 ? (c==1? "3px double #000" : "1px solid #000") : "none",
                        borderBottom: indexRowBB.includes(originalIndex) ? "1px solid #000" : borderBottom, 
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
