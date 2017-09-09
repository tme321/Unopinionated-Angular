import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import './polyfills';

function main() {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch((err: any) => console.error(err));
}
