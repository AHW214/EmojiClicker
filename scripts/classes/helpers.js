class Helpers
{
    static get screenDimensions()
    {
        let rawSize = new Vector2(window.innerWidth, window.innerHeight);
        return Vector2.scale(this.pxPerCss, rawSize);
    }

    static get pxPerCss() { return window.devicePixelRatio; }
    static get cssPerPx() { return 1.0 / this.pxPerCss; }
    
    static pxToCss(px) { return `${this.cssPerPx * px}px`; }
}