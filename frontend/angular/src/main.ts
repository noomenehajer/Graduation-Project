import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { environment } from './environments/environment';

// import { AppModule } from './app/app.module';

// if (environment.production) {
//   enableProdMode();
// }

// // Update the connection URL to match your Socket.IO server
// const socketConfig = { url: 'http://localhost:3001', options: {} };

// platformBrowserDynamic([{ provide: 'socketConfig', useValue: socketConfig }])
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
