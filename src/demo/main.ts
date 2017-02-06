import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import './polyfills';
import { bootloader } from '@angularclass/hmr';

function main() {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch((err: any) => console.error(err));
}

// This function is used in conjunction with the 
// @angularclass/hmr-loader webpack plugin to 
// support hot module reloading
bootloader(main);
