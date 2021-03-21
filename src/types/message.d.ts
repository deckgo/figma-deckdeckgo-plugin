type UiMsgType = 'done' | 'start' | 'error';

type PluginMsgType = 'frames' | 'fonts';

interface UiMsg {
    type: UiMsgType;
    msg?: string;
}

interface PluginMsg {
    type: PluginMsgType;
}

interface PluginFramesMsg extends PluginMsg {
    frames: Frame[];
}

interface PluginFontsMsg extends PluginMsg {
    fontFamilies: string[];
}
