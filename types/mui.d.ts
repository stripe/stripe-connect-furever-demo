import {Palette, PaletteColorOptions, PaletteOptions} from '@mui/material';

interface MyPaletteExtensions {
  border: PaletteColorOptions;
  neutral50: PaletteColorOptions;
  neutral100: PaletteColorOptions;
}

declare module '@mui/material/styles' {
  interface Palette extends MyPaletteExtensions {}
  interface PaletteOptions extends MyPaletteExtensions {}
}
