import { microDA, microB, abbreviatoDA, abbreviatoB, ordinarioDA, ordinarioB } from "./OrAbbMicUtilities.tsx";
import provinceCitta from './province_citta.json';

type BilancioTipo = 'Micro' | 'Abbreviato' | 'Ordinario' | 'Sconosciuto';

function rilevaTipoBilancio(xmlContent: string): BilancioTipo {
  const schemaHrefMatch = xmlContent.match(/xlink:href=["']([^"']+)["']/);
  if (schemaHrefMatch && schemaHrefMatch[1]) {
    const href = schemaHrefMatch[1];
    if (href.includes('micr')) return 'Micro';
    if (href.includes('abb')) return 'Abbreviato';
    if (href.includes('ese')) return 'Ordinario';
  }

  if (xmlContent.includes('xmlns:itcc-ci-micr')) return 'Micro';
  if (xmlContent.includes('xmlns:itcc-ci-abb')) return 'Abbreviato';
  if (xmlContent.includes('xmlns:itcc-ci-ese')) return 'Ordinario';

  return 'Sconosciuto';
}

//estrae e elabora i dati
function estraiDati(
  xml: Document,
  dizionari: Record<string, string>[] // Array di dizionari
): Record<string, Record<string, string | number>> {
  const risultati: Record<string, Record<string, string | number>> = {};
  const elementi = xml.getElementsByTagName("*");

  dizionari.forEach((dizionario, index) => {
    const tipo = index === 0 ? 'DA' : 'B';
    const risultato: Record<string, string | number> = {};

    for (const chiaveContesto in dizionario) {
      const tagXbrl = dizionario[chiaveContesto];
      if (!tagXbrl) continue;

      let valore: string | number | null = null;

      // Cerca l'elemento nel DOM
      for (let i = 0; i < elementi.length; i++) {
        if (elementi[i].localName === tagXbrl) {
          valore = elementi[i].textContent?.trim() ?? null;
          break;
        }
      }

      if (valore === null) continue;

      // Caso speciale: Ultimo bilancio anno
      if (tipo === 'DA' && chiaveContesto === 'B17') {
        const anno = /^\d{4}/.exec(valore.toString());
        risultato[chiaveContesto] = anno ? parseInt(anno[0]) : valore;
        continue;
      }

      // Caso speciale: Appartenente a gruppo
      if (tipo === 'DA' && chiaveContesto === 'B25') {
        const SNstring = valore === "false" ? "No" : "Si";
        risultato[chiaveContesto] = SNstring;
        continue;
      }

      // Caso speciale: Città e Provincia
      if (tipo === 'DA' && chiaveContesto === 'B12') {
        const citta = valore.charAt(0).toUpperCase() + valore.slice(1).toLowerCase();
        risultato[chiaveContesto] = citta;

        // Cerca la provincia corrispondente
        for (const provincia of provinceCitta) {
          if (provincia.città.includes(citta)) {
            const codiceProvincia = provincia.provincia.split(' ')[0];
            risultato["B13"] = codiceProvincia;
            break;
          }
        }
        continue;
      }

      // Caso speciale: Amministratore
      if (tipo === 'DA' && chiaveContesto === 'B19' && typeof valore === 'string') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(valore, "text/html");

        const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
        const testi: string[] = [];

        while (walker.nextNode()) {
          const text = walker.currentNode.nodeValue?.trim();
          if (text) testi.push(text);
        }

        const ultimoValore = testi.length > 0 ? testi[testi.length - 1] : "";
        risultato[chiaveContesto] = ultimoValore;
        continue;
      }

      // Converto in numero se valido
      if (tipo === 'DA') {
        const num = Number(valore);
        risultato[chiaveContesto] = isNaN(num) ? valore : num;
      } else if (tipo === 'B') {
        const num = Number(valore);
        risultato[chiaveContesto] = isNaN(num) ? 0 : num;
      }

      // Se contiene HTML, estrai solo il testo
      if (typeof valore === 'string' && valore.includes('<') && valore.includes('>')) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(valore, "text/html");
        valore = doc.body.textContent?.trim() ?? "";
      }
    }

    // B18 data corrente
    if (tipo === 'DA' && !('B18' in risultato)) {
      const oggi = new Date();
      const giorno = String(oggi.getDate()).padStart(2, '0');
      const mese = String(oggi.getMonth() + 1).padStart(2, '0');
      const anno = oggi.getFullYear();
      const dataOggi = `${anno}-${mese}-${giorno}`;
      risultato['B18'] = dataOggi;
    }

    risultati[`dati${tipo}`] = risultato;
  });

  return risultati;
}



// Funzione principale
/*export default async function processaFileXBRL(file: File): Promise<{ datiDA: Record<string, string | number>; datiB: Record<string, string | number>; }> {
  const xmlString = await file.text();
  const tipo = rilevaTipoBilancio(xmlString);
  if (tipo === 'Sconosciuto') {
    throw new Error("Tipo di bilancio non riconosciuto.");
  }

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  let dizionarioDA: Record<string, string> = {};
  let dizionarioB: Record<string, string> = {};

  switch (tipo) {
    case 'Micro':
      dizionarioDA = microDA;
      dizionarioB = microB;
      break;
    case 'Abbreviato':
      dizionarioDA = abbreviatoDA;
      dizionarioB = abbreviatoB;
      break;
    case 'Ordinario':
      dizionarioDA = ordinarioDA;
      dizionarioB = ordinarioB;
      break;
  }

  const [datiDA, datiB] = Object.values( estraiDati(xmlDoc, [dizionarioDA, dizionarioB]));
  console.log(datiDA, datiB)
  return { datiDA, datiB };
}*/


export default async function processaFileXBRL(
  files: File[]
): Promise<{ datiDA: Record<string, string | number>; datiB: Record<string, string | number> }> {

  if (files.length === 0) {
    throw new Error("Nessun file fornito.");
  }
  if (files.length > 3) {
    throw new Error("Sono permessi massimo 3 file.");
  }

  // Step 1: Leggi tutti i file e ricava anno dal tag <startDate>
  const fileData = await Promise.all(
  files.map(async (file) => {
    const xmlString = await file.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Cerca startDate come fa estraiDati
    const elementi = xmlDoc.getElementsByTagName("*");
    let startDateNode: Element | null = null;
    for (let i = 0; i < elementi.length; i++) {
      if (elementi[i].localName === "startDate") {
        startDateNode = elementi[i];
        break;
      }
    }

    if (!startDateNode || !startDateNode.textContent) {
      throw new Error(`File ${file.name} senza startDate`);
    }

    const anno = parseInt(startDateNode.textContent.trim().slice(0, 4), 10);
    if (isNaN(anno)) {
      throw new Error(`La data riportata nel file ${file.name} non è valida`);
    }

    return { file, xmlString, xmlDoc, anno };
  })
);

  // Step 2: Controllo che gli anni siano tutti diversi
  const anniUnici = [...new Set(fileData.map((f) => f.anno))];
  if (anniUnici.length !== files.length) {
    throw new Error("I file devono avere anni diversi.");
  }

  // Step 3: Ordina dal più recente al più vecchio
  fileData.sort((a, b) => b.anno - a.anno);

  let datiDA_finale: Record<string, string | number> = {};
  const datiB_unito: Record<string, string | number> = {};

  // Step 4: Processa ogni file
  for (let idx = 0; idx < fileData.length; idx++) {
    const { xmlString, xmlDoc, anno } = fileData[idx];

    const tipo = rilevaTipoBilancio(xmlString);
    if (tipo === "Sconosciuto") {
      throw new Error(`Tipo di bilancio non riconosciuto per anno ${anno}`);
    }

    let dizionarioDA: Record<string, string> = {};
    let dizionarioB: Record<string, string> = {};

    switch (tipo) {
      case "Micro":
        dizionarioDA = microDA;
        dizionarioB = microB;
        break;
      case "Abbreviato":
        dizionarioDA = abbreviatoDA;
        dizionarioB = abbreviatoB;
        break;
      case "Ordinario":
        dizionarioDA = ordinarioDA;
        dizionarioB = ordinarioB;
        break;
    }

    // Step 5: prefisso per B, in base al numero di file e posizione
    let prefissoB = "B";
    if (files.length === 3) {
      if (idx === 1) prefissoB = "C"; // anno intermedio
      if (idx === 2) prefissoB = "D"; // anno più vecchio
    } else if (files.length === 2) {
      if (idx === 1) prefissoB = "C"; // secondo file
    }
    // se 1 file, prefissoB resta "B"

    const dizionarioB_modificato: Record<string, string> = {};
    for (const key in dizionarioB) {
      if (key.startsWith("B")) {
        dizionarioB_modificato[key.replace(/^B/, prefissoB)] = dizionarioB[key];
      } else {
        dizionarioB_modificato[key] = dizionarioB[key];
      }
    }

    // Step 6: estrai dati
    const [datiDA, datiB] = Object.values(
      estraiDati(xmlDoc, [dizionarioDA, dizionarioB_modificato])
    );

    // Solo il primo (anno maggiore) memorizza datiDA
    if (idx === 0) {
      datiDA_finale = datiDA;
    }

    // Unisci i datiB
    Object.assign(datiB_unito, datiB);
  }

  return {
    datiDA: datiDA_finale,
    datiB: datiB_unito
  };
}
