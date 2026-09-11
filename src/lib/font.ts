import { Inter } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import { Noto_Sans_HK } from "next/font/google";

export const MainInter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const DisplayBebasNeue = Bebas_Neue({
    subsets: ["latin"],
    weight: ["400"],
});

export const Cantonese = Noto_Sans_HK({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const TimesNewRomanCondensed = {
    className: "font-times-condensed",
    style: {
        fontFamily:
            '"Times New Roman Condensed", "Times New Roman", Times, Georgia, serif',
        fontStretch: "condensed" as const,
    },
};
