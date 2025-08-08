import * as variables from "./variables.tsx";
import {Variables_use} from "./variables.tsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import { getRowStyle, tCell, formatCurrency, percentForm } from "./format.ts";
import { PieChart, Pie, Cell,BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useDati, useDatiB } from "./DatiContext.tsx";


export default function SintesieIndici() {
 
const { dataDAzienda } = useDati();
const { dataBilancio } = useDatiB(); 

const vars = Variables_use(dataBilancio);

const Sintesi_e_Indici_B10 = (vars.SP_Riclasificato_B28+vars.SP_Riclasificato_B32)/vars.SP_Riclasificato_D28
const Sintesi_e_Indici_B47 = (vars.SP_Riclasificato_D28+vars.SP_Riclasificato_D33)/(dataBilancio.B221+dataBilancio.B223+vars.Bilancio_B225)
const Sintesi_e_Indici_B48 = ((Sintesi_e_Indici_B10<1) && (Sintesi_e_Indici_B47>3))==true ? "SI":"NO"
const Sintesi_e_Indici_B49 =  Sintesi_e_Indici_B48 === "NO" ? 0
                             : Sintesi_e_Indici_B47 > 10   ? 72
                             : Sintesi_e_Indici_B47 > 8    ? 60
                             : Sintesi_e_Indici_B47 > 6    ? 48
                             : Sintesi_e_Indici_B47 > 4    ? 36
                             : Sintesi_e_Indici_B47 > 3.5  ? 18
                             : Sintesi_e_Indici_B47 > 3    ? 12
                             : 0; 
const Sintesi_e_Indici_F54 = -(vars.SP_Riclasificato_B48-vars.Andamenti_F46)
const Sintesi_e_Indici_F55 = vars.Bilancio_B8-vars.Bilancio_C8
const Sintesi_e_Indici_F56 = vars.SP_Riclasificato_D33-vars.Andamenti_F35
const Sintesi_e_Indici_F57 = Sintesi_e_Indici_F54+Sintesi_e_Indici_F55+Sintesi_e_Indici_F56
const Sintesi_e_Indici_F58 = vars.Bilancio_B297+vars.Bilancio_B238+dataBilancio.B244+dataBilancio.B245+dataBilancio.B235
const Sintesi_e_Indici_F59 = Sintesi_e_Indici_F57-Sintesi_e_Indici_F58>0?(Sintesi_e_Indici_F57-Sintesi_e_Indici_F58):0

const rows = [
  ["A", "B", "C", "D", "E", "F", "G", "H"],
  [`Sintesi ed Indici Anno ${dataDAzienda.B17}`, "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["Indicatori Patrimoniali", "", "", "", "", "", "", ""],
  ["Valori Soglia", dataDAzienda.B17, "Min", "Max", "Valori Soglia", dataDAzienda.B17, "Min", "Max"],
  ["Capitale Sociale", formatCurrency(dataBilancio.B133), "//", "//", "Margine Primario di Struttura", formatCurrency(vars.Bilancio_B132-vars.Bilancio_B8), "//", "//"],
  ["Riserve", formatCurrency(dataBilancio.B134+dataBilancio.B135+dataBilancio.B136+dataBilancio.B137+dataBilancio.B138+vars.Bilancio_B139), "//", "//", "Margine Secondario di Struttura", formatCurrency((vars.Bilancio_B132+vars.SP_Riclasificato_D33)-vars.Bilancio_B8), "//", "//"],
  ["Capitale Circolante Lordo o Att. Corrente/Circolante", formatCurrency(vars.SP_Riclasificato_D6), "//", "//", "Margine Primario di Tesoreria", formatCurrency(vars.Margini_Patrimoniali_D31-vars.Margini_Patrimoniali_B36), "//", "//"],
  ["Capitale Circolante Netto (C.C.N.)", formatCurrency(vars.SP_Riclasificato_D6-vars.SP_Riclasificato_D28), "//", "//", "Margine Secondario di Tesoreria", formatCurrency(vars.Margini_Patrimoniali_D42), "//", "//"],
  ["Quick Ratio (Indice Secondario di Tesoreria)", (vars.SP_Riclasificato_B49).toFixed(4), (variables.Sintesi_e_Indici_C10).toFixed(4), (variables.Sintesi_e_Indici_D10).toFixed(4), "Current Ratio", (vars.SP_Riclasificato_D49).toFixed(4), (variables.Sintesi_e_Indici_G10).toFixed(4), (vars.SP_Riclasificato_D49>1.5?vars.SP_Riclasificato_D49:1.5).toFixed(4)],
  ["Asset Turnover", (vars.SP_Riclasificato_B50).toFixed(4), (variables.Sintesi_e_Indici_C11).toFixed(4), (variables.Sintesi_e_Indici_D11).toFixed(4), "Acid Test (Indice Primario di Tesoreria)", (vars.SP_Riclasificato_D50).toFixed(4), (variables.Sintesi_e_Indici_G11).toFixed(4), (variables.Sintesi_e_Indici_H11).toFixed(4)],
  ["Leverage", (vars.SP_Riclasificato_B51).toFixed(4), (vars.SP_Riclasificato_B51>6?vars.SP_Riclasificato_B51:6).toFixed(4), (variables.Sintesi_e_Indici_D12).toFixed(4), "Equity Asset Ratio (Indice primario di struttura)", (vars.SP_Riclasificato_D51).toFixed(4), (variables.Sintesi_e_Indici_G12).toFixed(4), (variables.Sintesi_e_Indici_H12).toFixed(4)],
  ["Elasticità dell'Attivo", (vars.SP_Riclasificato_B52).toFixed(4), (variables.Sintesi_e_Indici_C13).toFixed(4), (variables.Sintesi_e_Indici_D13).toFixed(4), "Indebitamento netto (Posizione Netta)", formatCurrency(vars.SP_Riclasificato_D52), "//", "//"],
  ["Autofinanziamento", percentForm(vars.SP_Riclasificato_B53), percentForm(variables.Sintesi_e_Indici_C14), percentForm(variables.Sintesi_e_Indici_D14), "Indice Primario di Capitalizzazione", percentForm(vars.SP_Riclasificato_B53), percentForm(variables.Sintesi_e_Indici_C14), percentForm(variables.Sintesi_e_Indici_D14)],
  ["Indice di Innovazione", (vars.SP_Riclasificato_B54).toFixed(4), (variables.Sintesi_e_Indici_C15).toFixed(4), (variables.Sintesi_e_Indici_D15).toFixed(4), "Indice Secondario di Capitalizzazione", percentForm(vars.SP_Riclasificato_D54), percentForm(variables.Sintesi_e_Indici_G15), percentForm(variables.Sintesi_e_Indici_H15)],
  ["", "", "", "", "", "", "", ""],
  ["Z Score", "", "", "", "", "", "Min", "Max"],
  [(vars.SP_Riclasificato_C60).toFixed(4), "", "", "", "", "", "1", "5"],
  ["", "", "", "", "", "", "", ""],
  ["Indicatori Economici", "", "", "", "", "", "", ""],
  ["Valori Soglia", dataDAzienda.B17, "Min", "Max", "Valori Soglia", dataDAzienda.B17, "Min", "Max"],
  ["ROI", percentForm(vars.CE_Riclassificato_B25), percentForm(variables.Sintesi_e_Indici_C25), percentForm(variables.Sintesi_e_Indici_D25), "Marginalità Lorda (EBITDA/Valore Produzione)", percentForm(vars.CE_Riclassificato_B15/vars.CE_Riclassificato_B9), percentForm(variables.Sintesi_e_Indici_G25), percentForm(variables.Sintesi_e_Indici_H25)],
  ["ROA", percentForm(vars.CE_Riclassificato_B15/vars.SP_Riclasificato_B21), percentForm(variables.Sintesi_e_Indici_C26), percentForm(variables.Sintesi_e_Indici_D26), "Incidenza del Costo del Lavoro", percentForm(vars.Bilancio_B232/vars.Bilancio_B228), percentForm(variables.Sintesi_e_Indici_G26), percentForm(variables.Sintesi_e_Indici_H26)],
  ["ROE (Indice di Redditività dei Mezzi Propri)", percentForm(vars.CE_Riclassificato_B27), percentForm(variables.Sintesi_e_Indici_C27), percentForm(variables.Sintesi_e_Indici_D27), "Incidenza del Costo delle Materie Prime", percentForm(vars.CE_Riclassificato_D27), percentForm(variables.Sintesi_e_Indici_G27), percentForm(variables.Sintesi_e_Indici_H27)],
  ["ROS (Indice di Redditività delle Vendite)", percentForm(vars.CE_Riclassificato_B28), percentForm(variables.Sintesi_e_Indici_C28), percentForm(variables.Sintesi_e_Indici_D28), "Incidenza dei Servizi", percentForm(vars.CE_Riclassificato_D28), percentForm(variables.Sintesi_e_Indici_G28), percentForm(variables.Sintesi_e_Indici_H28)],
  ["ROP (Indice di Reddivitità della Produzione)", percentForm(vars.CE_Riclassificato_B29), percentForm(variables.Sintesi_e_Indici_C29), percentForm(variables.Sintesi_e_Indici_D29), "Incidenza dei Beni di Terzi", percentForm(vars.CE_Riclassificato_D29), percentForm(variables.Sintesi_e_Indici_G29), percentForm(variables.Sintesi_e_Indici_H29)],
  ["ROD (Indice di Onerosità dei Debiti)", percentForm(vars.CE_Riclassificato_B30), percentForm(variables.Sintesi_e_Indici_C30), percentForm(variables.Sintesi_e_Indici_D30), "Incidenza degli Ammortamenti", percentForm(vars.CE_Riclassificato_D30), percentForm(variables.Sintesi_e_Indici_G30), percentForm(variables.Sintesi_e_Indici_H30)],
  ["ROD2 (Indice di Onerosità dei Debiti Bancari) (i)", percentForm(vars.CE_Riclassificato_B31), percentForm(variables.Sintesi_e_Indici_C31), percentForm(variables.Sintesi_e_Indici_D31), "Incidenza degli Oneri Diversi", percentForm(vars.CE_Riclassificato_D31), percentForm(variables.Sintesi_e_Indici_G31), percentForm(variables.Sintesi_e_Indici_H31)],
  ["EBITDA (MOL)",formatCurrency(vars.CE_Riclassificato_B15), "//", "//", "Incidenza degli Oneri Finanziari", percentForm(vars.CE_Riclassificato_D32), percentForm(variables.Sintesi_e_Indici_G32), percentForm(variables.Sintesi_e_Indici_H32)],
  ["EBIT (RO)", formatCurrency(vars.CE_Riclassificato_B18), "//", "//","Costo del Lavoro / Valore Produzione", percentForm(vars.CE_Riclassificato_D33), percentForm(variables.Sintesi_e_Indici_G33), percentForm(variables.Sintesi_e_Indici_H33)],
  ["EBITDA/Ricavi", percentForm(vars.CE_Riclassificato_B35), percentForm(variables.Sintesi_e_Indici_C34), percentForm(vars.CE_Riclassificato_B35<0.15?0.15:vars.CE_Riclassificato_B35), "EBIT/Ricavi", percentForm(vars.CE_Riclassificato_D35), percentForm(variables.Sintesi_e_Indici_G34), percentForm(variables.Sintesi_e_Indici_H34)],
  ["Margine Industriale (Costo venduto/Ricavi vendite)", percentForm(1-(vars.CE_Riclassificato_B38/dataBilancio.B221)), "10.00%", "60.00%", "Costo del Venduto", formatCurrency(vars.CE_Riclassificato_B38), "//", "//"],
  ["", "", "", "", "", "", "", ""],
  ["Altri Indicatori", "", "", "", "", "", "", ""],
  ["Valori Soglia", dataDAzienda.B17, "Min", "Max", "Valori Soglia", dataDAzienda.B17, "Min", "Max"],
  ["Differenza ROI - ROD", percentForm(vars.CE_Riclassificato_B25-vars.CE_Riclassificato_B30), "0.00%", percentForm(5*vars.CE_Riclassificato_B25), "Indice Primario di Struttura (Equity Asset Ratio)", (vars.Bilancio_B132/vars.Bilancio_B8).toFixed(4), (variables.Sintesi_e_Indici_G12).toFixed(4), (variables.Sintesi_e_Indici_H12).toFixed(4)],
  ["Differenza ROE - ROD", percentForm(vars.CE_Riclassificato_B27-vars.CE_Riclassificato_B30), "2.00%", percentForm(5*vars.CE_Riclassificato_B27), "Indice Secondario di Struttura", (vars.Sintesi_e_Indici_F42).toFixed(4), (variables.Sintesi_e_Indici_G42).toFixed(4), (variables.Sintesi_e_Indici_H42).toFixed(4)],
  ["Giorni medi di incasso", vars.Sintesi_e_Indici_B43.toFixed(0), "180", "30", "Indice Primario di Tesoereria (Acid Test)", (vars.SP_Riclasificato_B28/vars.SP_Riclasificato_D28).toFixed(4), (variables.Sintesi_e_Indici_G11).toFixed(4), (variables.Sintesi_e_Indici_H11).toFixed(4)],
  ["Giorni medi di pagamento", vars.Sintesi_e_Indici_B44.toFixed(0), "30", "180", "Indice Secondario di Tesoreria (Quick Ratio)", (vars.SP_Riclasificato_B49).toFixed(4), (variables.Sintesi_e_Indici_C10).toFixed(4), (variables.Sintesi_e_Indici_D10).toFixed(4)],
  ["TMGS (Materie Prime)", (dataBilancio.B86/(dataBilancio.B229/360)).toFixed(0), "90", "0", "Debito Finanziario/EBIT", percentForm(vars.CE_Riclassificato_B18/(vars.Margini_Patrimoniali_B13+vars.Margini_Patrimoniali_B18)), "2.00%", "10.00%"],
  ["TMGS (Prodotti Finiti)",(dataBilancio.B89/((dataBilancio.B229+dataBilancio.B230+dataBilancio.B231+dataBilancio.B246+vars.Bilancio_B232)/360)).toFixed(0), "90", "0", "Debito Finanziario/EBITDA", percentForm(vars.CE_Riclassificato_B15/(vars.Margini_Patrimoniali_B13+vars.Margini_Patrimoniali_B18)), "5.00%", "20.00%"],
  ["Indice alfa",(Sintesi_e_Indici_B47).toFixed(2), "0.00", "10.00", "Utile/Valore della produzione", percentForm(vars.Bilancio_B297/vars.CE_Riclassificato_B9), "//", "//"],
  ["Possibile accesso a rateazioni esattoria", Sintesi_e_Indici_B48, "NO", "SI", "Utile/Patrimonio netto", percentForm(vars.Bilancio_B297/vars.Bilancio_B132), "//", "//"],
  ["Numero massimo rate in caso di rateazione", (Sintesi_e_Indici_B49).toFixed(0), "0", "120", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["Fabbisogno Finanziario", "", "", "", "", "", "", ""],
  ["Modello di Calcolo del Fabbisogno Finanziario", "", "", "", "Calcolo del Fabbisogno Finanziario", "", "", ""],
  ["Variazione del Capitale Circolante Netto (C.C.N.)", "(+/-)", "", "", "Variazione del Capitale Circolante Netto (C.C.N.)", formatCurrency(Sintesi_e_Indici_F54), "", ""],
  ["Variazione dell'Attivo Immobilizzato", "(+)", "", "", "Variazione dell'Attivo Immobilizzato", formatCurrency(Sintesi_e_Indici_F55), "", ""],
  ["Variazione del Passivo Consolidato", "(+)", "", "", "Variazione del Passivo Consolidato", formatCurrency(Sintesi_e_Indici_F56), "", ""],
  ["Fabbisogno Finanziario Lordo", "(=)", "", "", "Fabbisogno Finanziario Lordo", formatCurrency(Sintesi_e_Indici_F57), "", ""],
  ["Autofinanziamento Aziendale", "(-)", "", "", "Autofinanziamento Aziendale", formatCurrency(Sintesi_e_Indici_F58), "", ""],
  ["Fabbisogno Finanziario Netto", "(=)", "", "", "Fabbisogno Finanziario Netto", formatCurrency(Sintesi_e_Indici_F59), "", ""],
  ["Incidenza degli Interessi sul Debito Calcolato sul Fabbisogno Finanziario", "", "", "", formatCurrency(Sintesi_e_Indici_F59*vars.CE_Riclassificato_B31), "", "", ""]
  //["Nei grafici a cruscotto valori negativi sono normalizzati a 0", "", "", "", "", "", "", ""]
];

// indici di riferimento all'array 
const darkBlueRows:any[] = [3,16,19,33,45,53];
const lightBlueRows:any[] = [4,20,34,46];
const lightGrayRows:any[] = [17];

const colWidths = ["26%","8%","8%","8%","26%","8%","8%","8%"];
const indexRowBB = [14,16,31,43,53];
const indexBold1 = [3,4,16,17,19,20,33,34,45,46,53]; // non bold

const COLORS = {
  var1: "#4a90e2", 
  var2: "#e94e4e", 
  var3: "#4caf50", 
};

interface ChartData {
  var1: tCell; 
  var2: tCell;
  var3: tCell;
}

function resolveCell(cell: tCell): any {
  if (typeof cell === "string") {
    try {
      if (cell.includes("vars.")) {
        // eslint-disable-next-line no-eval
        return eval(cell);
      }
      const parsed = parseFloat(cell);
      if (!isNaN(parsed)) return parsed;
      return cell;
    } catch (e) {
      console.warn("Errore nel parsing della cella:", cell, e);
      return null;
    }
  }
  if (typeof cell === "number") return cell;
  return null;
}


interface ReusableBarChartProps {
  data: ChartData[];
  title?: string | number ;
}

const formatLegendLabel = (key: string): string => {
  switch (key) {
    case "var1":
      return "Min";
    case "var2":
      return dataDAzienda.B17.toString();
    case "var3":
      return "Max";
    default:
      return key;
  }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "0.75rem",  borderRadius: "2px" }}>
        {payload.map((entry: any, i: number) => (
          <div key={i} style={{ color: entry.color, fontWeight: 400 }}>
            {formatLegendLabel(entry.name)}: <span style={{ color: "#000" }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Funzione grafico a barre
const ReusableBarChart: React.FC<ReusableBarChartProps> =  ({ data, title }) => {
  return (
      <Card elevation={1} style={{ height:"30rem", maxHeight: "30rem" }}>
        {title && <CardHeader title={title} />}
        <CardContent style={{ height:"25rem", maxHeight: "25rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="#ccc" strokeDasharray="0" vertical={false} />
              <XAxis tick={false} tickLine={false} axisLine={false} />
              <YAxis
                
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                layout="horizontal"
                align="center"
                formatter={formatLegendLabel}
              />
              <Bar isAnimationActive={false} dataKey="var1" fill={COLORS.var1} />
              <Bar isAnimationActive={false} dataKey="var2" fill={COLORS.var2} />
              <Bar isAnimationActive={false} dataKey="var3" fill={COLORS.var3} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
  );
};

// dati per Bar Chart
const createChartConfig = (r: number, c: number = 0) => ({
  title: resolveCell(rows[r]?.[c]),
  data: {
    var1: parseFloat(resolveCell(rows[r]?.[c + 2]) ?? "0") || 0,
    var2: parseFloat(resolveCell(rows[r]?.[c + 1]) ?? "0") || 0,
    var3: parseFloat(resolveCell(rows[r]?.[c + 3]) ?? "0") || 0,
  },
});

const chartsConfig = [
  createChartConfig(9, 0),
  createChartConfig(9, 4),
  createChartConfig(13, 0),
  createChartConfig(14, 0),
  createChartConfig(35, 4),
  createChartConfig(36, 4),
  createChartConfig(37, 4),
  createChartConfig(38, 4),
  createChartConfig(13, 4),
  createChartConfig(14, 4),
  createChartConfig(21, 0),
  createChartConfig(22, 0),
  createChartConfig(23, 0),
  createChartConfig(24, 0),
  createChartConfig(25, 0),
  createChartConfig(26, 0),
  createChartConfig(30, 0),
  createChartConfig(31, 0),
  createChartConfig(29, 4),
  createChartConfig(30, 4),
];

const MultipleCharts = () => {
  return (
    <Grid container spacing={2}>
      {chartsConfig.map(({ title, data }, index) => (
        <Grid size={6} key={index}>
          <ReusableBarChart title={title} data={[data]} />
        </Grid>
      ))}
    </Grid>
  );
};

//dati per Pie Chart
const PieColor = ["#4caf50","#4a90e2","#e94e4e","#9467bd","#c56193ff","#8c564b","#f5a623",];

const createPieCConfig = (r: number) => ({
  name: resolveCell(rows[r]?.[4]),
  value: resolveCell(rows[r]?.[5]),
});

const dataPC = [
  createPieCConfig(22),
  createPieCConfig(23),
  createPieCConfig(24),
  createPieCConfig(25),
  createPieCConfig(26),
  createPieCConfig(27),
  createPieCConfig(28),
]


  const header = rows[1];
  const dataRows = rows.slice(2);

  return (
    <TableContainer className="no-repeat-header" component={Paper}>
      <Table sx={{ tableLayout: "fixed" }}>
         <colgroup>
          {colWidths.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1a4d80", "&:hover": { backgroundColor: "rgba(9, 27, 65, 0.81)" }, }}>
            <TableCell  
              align="center" 
              colSpan = {header.length} 
              sx={{ color:"#ffffff", backgroundColor:"#003366", padding:1.5, fontSize:16}}
            >
              {resolveCell(header[0]) as React.ReactNode}
            </TableCell>
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
                    sx={{ padding: 1 ,borderBottom: indexRowBB.includes(originalIndex) ? "1px solid #000" : borderBottom}} />
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
                  const spanRow = [16, 17, 46, 47, 48, 49, 50, 51, 52, 53];

                  if (spanRow.includes(originalIndex)) {
                    const invalidCombinations = [
                      { index: 16, col: 1 },{ index: 16, col: 2 },{ index: 16, col: 3 },{ index: 16, col: 4 },{ index: 16, col: 5 },
                      { index: 17, col: 1 },{ index: 17, col: 2 },{ index: 17, col: 3 },{ index: 17, col: 4 },{ index: 17, col: 5 },
                      { index: 46, col: 2 },{ index: 46, col: 3 },{ index: 46, col: 6 },{ index: 46, col: 7 },
                      { index: 47, col: 2 },{ index: 47, col: 3 },{ index: 47, col: 6 },{ index: 47, col: 7 },
                      { index: 48, col: 2 },{ index: 48, col: 3 },{ index: 48, col: 6 },{ index: 48, col: 7 },
                      { index: 49, col: 2 },{ index: 49, col: 3 },{ index: 49, col: 6 },{ index: 49, col: 7 },
                      { index: 50, col: 2 },{ index: 50, col: 3 },{ index: 50, col: 6 },{ index: 50, col: 7 }, 
                      { index: 51, col: 2 },{ index: 51, col: 3 },{ index: 51, col: 6 },{ index: 51, col: 7 },
                      { index: 52, col: 2 },{ index: 52, col: 3 },{ index: 52, col: 6 },{ index: 52, col: 7 }, 
                      { index: 53, col: 1 },{ index: 53, col: 2 },{ index: 53, col: 3 },{ index: 53, col: 5 },{ index: 53, col: 6 },{ index: 53, col: 7 }
                    ];

                    if (
                      invalidCombinations.some(rule => rule.index === originalIndex && rule.col === c)
                    ) {
                      return null;
                    }
                  }

                  // Set colSpan
                  let colSpan = 1;
                  if (spanRow.includes(originalIndex)) {
                    if (c === 1 || c === 5) colSpan = 3;
                    if (originalIndex === 53 && (c === 0 || c === 4)) colSpan = 4;
                    if (originalIndex === 17 && c === 0) colSpan = 6;
                    if (originalIndex === 16 && c === 0) colSpan = 6;
                  }

                  return (
                    <TableCell
                      key={c}
                      colSpan={colSpan}
                      align={ spanRow.includes(originalIndex)? "center" : "left" }
                      sx={{ 
                        whiteSpace: "pre-line", // rispetta \n .
                        wordBreak: "break-word",
                        color: text, 
                        fontWeight: !indexBold1.includes(originalIndex) && [0,4].includes(c) ? "bold": 400,
                        padding: 1, 
                        borderRight: c!=7 ? ([0,1,4,5].includes(c) ? ((spanRow.includes(originalIndex) &&  c==5 ) || (originalIndex==53 && c == 4) ? "none" : "3px double #000") : "1px solid #000") : "none",
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
      <Grid className="chartC">
        <MultipleCharts />
      </Grid>
      <Grid className="chartC">
        <Card  sx={{marginTop: 3}}>
          <CardHeader 
            title= {`Composizione % dei Costi di Esercizio ${dataDAzienda.B17}`} 
            subheader="◉ Valori espressi come percentuale del totale" 
            sx={{
              '& .MuiCardHeader-subheader': {
                fontSize: '0.8rem',
                color: 'text.secondary',
              },
            }}
          />
          <CardContent style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  isAnimationActive={false}
                  data={dataPC}
                  dataKey="value"
                  nameKey="name"
                  cx="40%"
                  cy="50%"
                  outerRadius={160}
                  fill="#8884d8"
                  label={({ percent }: { percent?: number }) => {
                    if (percent === undefined) return null;
                    return `${(percent * 100).toFixed(2)}%`;
                  }} 
                >
                  {dataPC.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PieColor[index % PieColor.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: number) => { return [`${name}`]}}
                  /*formatter={(value: number, name: number) => {
                    const total = dataPC.reduce((acc, cur) => acc + cur.value, 0);
                    const percent = ((value / total) * 100).toFixed(2);
                    return [ `${name}`,`${(value* 100).toFixed(2)}% ⤏ (${percent}%)`,];
                  }}*/
                />
                <Legend verticalAlign="middle" layout="vertical" align="right" wrapperStyle={{ marginLeft:0, marginRight: 300, maxWidth: '350px', textAlign: 'left' }}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </TableContainer>
  );
}