port module Update exposing (..)

import Model exposing (..)


type Msg
    = AuthenticatedChanged LoginMessage
    | OnEmailInput String
    | OnPasswordInput String
    | Login
    | NewAlbums (List Album)
    | AlbumListened Int Bool
    | Logout


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AuthenticatedChanged loginState ->
            ( { model | authenticated = loginState.authenticated }, Cmd.none )

        OnEmailInput email ->
            ( { model | email = email }, Cmd.none )

        OnPasswordInput password ->
            ( { model | password = password }, Cmd.none )

        Login ->
            let
                credentials =
                    Credentials model.email model.password
            in
                ( model, login credentials )

        NewAlbums albums ->
            ( { model | albums = albums }, Cmd.none )

        AlbumListened id listened ->
            ( model, albumListened ( id, listened ) )

        Logout ->
            ( model, logout 0 )


port loginStateChange : (LoginMessage -> msg) -> Sub msg


port login : Credentials -> Cmd msg


port newAlbums : (List Album -> msg) -> Sub msg


port albumListened : ( Int, Bool ) -> Cmd msg


port logout : Int -> Cmd msg
