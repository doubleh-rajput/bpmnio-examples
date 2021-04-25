import PaletteProvider from './PaletteProvider';

export default {
    __init__: [
        "paletteProvider",
        "autoScroll",
    ],
    paletteProvider: ['value', PaletteProvider],
    autoScroll: ['value', null],
};
