[%bs.raw {|require('@sass/main.scss')|}];

[@bs.module "@reason/firebase"] external firebase : ElmApp.application => unit = "default";

let app = ElmApp.main##fullscreen();

firebase(app);