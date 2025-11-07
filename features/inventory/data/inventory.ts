export const INGREDIENT_GROUPS: {
  label: string;
  items: { value: string; label?: string }[];
}[] = [
  {
    label: "KARBOHIDRAT",
    items: [
      { value: "Beras" },
      { value: "Nasi" },
      { value: "Kentang" },
      { value: "Kentang (Pengganti Nasi)" },
      { value: "Jagung" },
      { value: "Bihun" },
      { value: "Bihun (Pengganti Nasi)" },
      { value: "Spaghetti" },
    ],
  },
  {
    label: "PROTEIN HEWANI",
    items: [
      { value: "Ayam Fillet" },
      { value: "Dada Ayam Fillet" },
      { value: "Telur Ayam" },
      { value: "Telur Ayam (Pengganti Lele)" },
      { value: "Ikan Lele Fillet" },
      { value: "Daging Sapi Giling" },
      { value: "Daging Sapi Giling (Pengganti Ayam)" },
      { value: "Daging Sapi Giling (Alergi)" },
    ],
  },
  {
    label: "PROTEIN NABATI",
    items: [
      { value: "Tempe" },
      { value: "Tempe Kedelai" },
      { value: "Tahu" },
      { value: "Tahu Susu" },
      { value: "Kacang Edamame" },
    ],
  },
  {
    label: "SAYURAN",
    items: [
      { value: "Wortel" },
      { value: "Sawi Putih" },
      { value: "Kol" },
      { value: "Buncis" },
      { value: "Labu Siam" },
      { value: "Bawang Merah" },
      { value: "Bawang Putih" },
      { value: "Bawang Bombay" },
      { value: "Jeruk Nipis" },
      { value: "Daun Salam" },
      { value: "Ketumbar" }, // muncul di menu 2 Okt (0,00 tapi tetap dicantumkan)
    ],
  },
  {
    label: "BUAH",
    items: [
      { value: "Pisang" },
      { value: "Pisang (Pengganti Jeruk)" },
      { value: "Jeruk" },
      { value: "Jeruk (Pengganti Pisang)" },
      { value: "Kelengkeng" },
      { value: "Pier" }, // sesuai seed (notes: pir import)
      { value: "Anggur" },
      { value: "Semangka" },
      { value: "Salak" },
    ],
  },
  {
    label: "BAHAN BUMBU / PELENGKAP",
    items: [
      { value: "Kecap Manis" },
      { value: "Saus Tomat" },
      { value: "Saus Sambal" },
      { value: "Saus Tiram" },
      { value: "Saus Teriyaki" },
      { value: "Saus Bolognese" },
      { value: "Mayones" },
      { value: "Gula" },
      { value: "Gula Pasir" },
      { value: "Garam" },
      { value: "Merica" },
      { value: "Merica Bubuk" },
      { value: "Lada" },
      { value: "Cuka" },
      { value: "Penyedap Rasa" },
      { value: "Penyedap Rasa (Totole)" },
      { value: "Bawang Putih Bubuk" },
      { value: "Tepung Terigu" },
      { value: "Tepung Maizena" },
      { value: "Tepung Roti" },
      { value: "Tepung Tapioka" },
      { value: "Tepung Tapioka (Alergi)" },
      { value: "Bumbu Marinasi Desaku (Marinasi Ikan)" },
    ],
  },
  {
    label: "BAHAN LAIN",
    items: [{ value: "Minyak" }, { value: "Minyak Kelapa Sawit" }],
  },
  {
    label: "MINUMAN",
    items: [{ value: "Susu UHT Fullcream" }, { value: "Sari Kacang Hijau" }],
  },
];

export const CATEGORY_OPTIONS = [
  { value: "KARBOHIDRAT", label: "Karbohidrat" },
  { value: "PROTEIN_HEWANI", label: "Protein Hewani" },
  { value: "PROTEIN_NABATI", label: "Protein Nabati" },
  { value: "SAYURAN", label: "Sayuran" },
  { value: "BUAH", label: "Buah" },
  { value: "BAHAN_BUMBU", label: "Bahan Bumbu" },
  { value: "BAHAN_LAIN", label: "Bahan Lain" },
  { value: "MINUMAN", label: "Minuman" },
];

// helper cari kategori dari ingredient
export function findCategoryByIngredient(ingredient: string) {
  const group = INGREDIENT_GROUPS.find((g) =>
    g.items.some((it) => it.value === ingredient)
  );
  return group?.label; // label = nama kategori (sudah uppercase sesuai DB)
}
