module Subscriptions exposing (..)

import Model exposing (..)
import Update exposing (..)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ loginStateChange AuthenticatedChanged
        , newAlbums NewAlbums
        ]
