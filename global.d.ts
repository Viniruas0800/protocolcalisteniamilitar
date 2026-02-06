import 'react';

declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'vturb-smartplayer': any;
        }
    }
}
