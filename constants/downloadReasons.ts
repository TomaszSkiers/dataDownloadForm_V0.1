
// =====================================================
// reasons list object
// =====================================================


export interface IReasonDownload {
  id: string; 
  reason: string;
  legal_basis: string;
}


export const REASONS_DOWNLOAD: IReasonDownload[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    reason: "Upływ 90 dni od ostatniego pobrania danych",
    legal_basis: "Art. 1 pkt 3 lit. a Rozp. (UE) nr 581/2010; § 3 ust. 1 pkt 1 Rozp. Min. Transportu z 23.08.2007 r. (Dz.U. Nr 159, poz. 1128 ze zm.); Art. 48 ust. 1 Ustawy o tachografach (Dz.U. 2024 poz. 1037)"
  },
  {
    id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    reason: "Przekazanie pojazdu innemu podmiotowi – trwałe lub czasowe",
    legal_basis: "§ 3 ust. 1 pkt 2 lit. a Rozp. Min. Transportu z 23.08.2007 r. (Dz.U. Nr 159, poz. 1128 ze zm.)"
  },
  {
    id: "a3bbf8e4-8c4e-4a54-a9c5-9b8b7f8c9d1e",
    reason: "Wycofanie pojazdu z użytkowania",
    legal_basis: "§ 3 ust. 1 pkt 2 lit. c Rozp. Min. Transportu z 23.08.2007 r. (Dz.U. Nr 159, poz. 1128 ze zm.)"
  },
  {
    id: "b4c5d6e7-f890-4a1b-9c2d-3e4f5a6b7c8d",
    reason: "Uszkodzenie lub wadliwe funkcjonowanie tachografu – gdy odczyt danych jest jeszcze technicznie możliwy",
    legal_basis: "§ 3 ust. 1 pkt 2 lit. b Rozp. Min. Transportu z 23.08.2007 r. (Dz.U. Nr 159, poz. 1128 ze zm.)"
  },
  {
    id: "c5d6e7f8-9012-4b3c-8d4e-5f6a7b8c9d0e",
    reason: "Ryzyko utraty danych (np. przed pracami elektrycznymi, resetem układu, wymianą akumulatora)",
    legal_basis: "§ 3 ust. 2 Rozp. Min. Transportu z 23.08.2007 r. (Dz.U. Nr 159, poz. 1128 ze zm.)"
  },
  {
    id: "d6e7f8a9-b012-4c3d-9e5f-6a7b8c9d0e1f",
    reason: "Żądanie uprawnionych organów kontrolnych (ITD, PIP, Policja, Służba Celno-Skarbowa i inne)",
    legal_basis: "§ 3 ust. 1 pkt 3 Rozp. Min. Transportu z 23.08.2007 r. (Dz.U. Nr 159, poz. 1128 ze zm.); Art. 33 ust. 2 Rozp. (UE) nr 165/2014"
  },
  {
    id: "e7f8a9b0-c123-4d3e-0f6a-7b8c9d0e1f2a",
    reason: "Zagrożenie utratą danych – w szczególności w przypadku naprawy, wymiany lub wycofania tachografu z użytkowania (obowiązek warsztatu)",
    legal_basis: "Art. 18 ust. 3 pkt 3 Ustawy o tachografach (Dz.U. 2024 poz. 1037)"
  },
  {
    id: "f8a9b0c1-d234-4e3f-1a7b-8c9d0e1f2a3b",
    reason: "Rozliczanie czasu pracy i wynagrodzeń kierowców",
    legal_basis: "Art. 25 Ustawy z dnia 16 kwietnia 2004 r. o czasie pracy kierowców"
  },
  {
    id: "a9b0c1d2-e345-4f3a-2b8c-9d0e1f2a3b4c",
    reason: "Ochrona dowodowa w sporach pracowniczych oraz w postępowaniach wyjaśniających po wypadkach i kolizjach",
    legal_basis: "Art. 6 k.c. w zw. z Art. 300 k.p."
  }
];
