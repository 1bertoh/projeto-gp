import Revenue from "pages/VisoesBI/Revenue";
import Stock from "pages/VisoesBI/Stock";

const dashes = [
    {
        id: "REVENUE",
        name: "Faturamento",
        screen: <Revenue/>
    },
    {
        id: "STOCK",
        name: "Estoque",
        screen: <Stock/>
    }
]

export {dashes}