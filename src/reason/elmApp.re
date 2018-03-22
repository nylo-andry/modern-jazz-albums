type application;

type main = Js.t({
  .
  [@bs.meth] fullscreen: unit => application
});

[@bs.module "@elm/Main"] external main: main = "Main";