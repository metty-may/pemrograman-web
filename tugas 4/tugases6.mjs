const tranksasi = [
  {id: 1,barang: "Setting Spray", harga: 10000, jumlah: 2},
  {id: 2, barang: "Lose Powder", harga: 5000, jumlah: 3},
  {id: 3, barang: "Foundation", harga: 2000, jumlah: 5},
  {id: 4, barang: "Eye Shadow", harga: 3000, jumlah: 1},
  {id: 5, barang: "Lip Gloss", harga: 7000, jumlah: 4},
  {id: 6, barang: "Mascara", harga: 8000, jumlah: 2},
  {id: 7, barang: "Blush On", harga: 6000, jumlah: 3},
  {id: 8, barang: "Highlighter", harga: 9000, jumlah: 1},
  {id: 9, barang: "Concealer", harga: 4000, jumlah: 2},
  {id: 10, barang: "Eyeliner", harga: 3000, jumlah: 5},
  {id: 11, barang: "Lipstick", harga: 5000, jumlah: 3},

];
const hasilFilter = tranksasi.filter((item) => item.harga > 5000);
const hasilSkincare = tranksasi.filter((item) => item.barang === "Skincare");
const hasilMap = tranksasi.map((item) => ({
    id: item.id,
    barang: item.barang,
    harga: item.harga,
    jumlah: item.jumlah,
    total: item.harga * item.jumlah
}));
const total=hasilMap.reduce((total, tranksasi) => {
  return total + tranksasi.total;
}, 0);
console.log("===DATA TRANKSASI:: ====");
console.log(hasilMap);
console.log("===TOTAL HARGA:: ====");
console.log(total);
console.log("Rp"+total.toLocaleString("id-ID"));
