import {Palette, PaletteColorOptions, PaletteOptions} from '@mui/material';

interface MyPaletteExtensions {
  neutral100: PaletteColorOptions;
}

declare module '@mui/material/styles' {
  interface Palette extends MyPaletteExtensions {}
  interface PaletteOptions extends MyPaletteExtensions {}
}
