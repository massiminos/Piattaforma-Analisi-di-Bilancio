import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  ["A"],
  ["Il presente lavoro è stato redatto per esclusivi usi interni del richiedente e non potrà essere diffuso a terzi senza il preventivo consenso scritto di CentoCinquanta S.r.l. Il lavoro è stato realizzato sulla base di dati contabili e dati ufficiali delle Camere di Commercio, ovvero sulla base di dati forniti dal richiedente e reperibili direttamente sul registro delle imprese. Si precisa che, le informazioni sono state assunte da CentoCinquanta S.r.l. acriticamente, ovvero senza svolgere alcun controllo in merito alla correttezza, completezza e validazione dei dati e informazioni ricevute. CentoCinquanta S.r.l. non si assume alcuna responsabilità, né fornisce alcuna garanzia, espressa o implicita, sulla correttezza, completezza e validità delle informazioni contenute nel presente documento, essendo una rielaborazione di dati contabili ufficiali che sconosce il sistema bancario aziendale."],
  [""],
  ["CentoCinquanta S.r.l. è una società di consulenza strategica che opera all'interno del settore con mezzi propri e per il tramite di alcune società collegate: CentoCinquanta Learning Center, Bench S.r.l., CentoCinquanta Tax&Legal Studio Professionale. La Missione della società: creare valore per le imprese clienti, condividendo le sfide d'imprenditori e manager e costruendo rapporti di partnership di lunga durata.\nCentoCinquanta ha gestito con successo progetti di affiancamento del management privato e pubblico, attraverso un modello ormai consolidato. Non solo pianifica le azioni e le strategie per il cliente, ma lo affianca nell'implementazione delle stesse, spesso attraverso il metodo del outsourching; i consulenti di CentoCinquanta vivono la quotidianità del cliente al fine di comprenderne al meglio le problematiche e di porre in essere, assieme a loro, le soluzioni.\nI consulenti di CentoCinquanta - economisti, legali ed esperti in comunicazione e marketing -  grazie ad una consolidata esperienza sul campo e ad una rete di solide relazioni sia nazionali che internazionali, basano l’offerta dei propri servizi su una spiccata capacità di lettura della complessità delle aziende e sull’analisi puntuale delle esigenze e dei fabbisogni del tessuto produttivo ove esse insistono. \nGli ambiti di elezione della società vanno dall’organizzazione aziendale alla finanza di impresa e al controllo di gestione. \n\nLa sede legale ed operativa è a Catania (CT), in Via Filadelfo Fichera, n. 12."],
  [""],
  ["www.borsaitaliana.it/partners"],
  [""],
];

export default function Disclaimer() {
  return (
    <TableContainer className="no-repeat-header" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{wordBreak: "break-word"}}>{rows[1][0]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(2, 5).map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{wordBreak: "break-word"}}>{row[0]}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{padding:0, borderBottom:"1px solid #fff", paddingTop:"0.5rem"}}>
              <img src="/PartnerEquityMarkets.png" style={{ maxWidth: 50 , marginLeft:"1rem", marginRight:"1.5rem", marginBottom:"0.5rem"}} />
              <img src="/CertiQuality.png" style={{ maxWidth: 70 , marginBottom:0}} /> 
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{wordBreak: "break-word", paddingTop:0}}>{rows[5][0]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}