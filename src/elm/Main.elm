module Main exposing (..)

import Html
import Model exposing (..)
import Update exposing (..)
import View exposing (view)
import Subscriptions exposing (..)


init : ( Model, Cmd Msg )
init =
    ( initModel, Cmd.none )


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
