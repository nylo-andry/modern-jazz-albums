port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, classList, placeholder, src, type_, id, for)
import Html.Events exposing (onInput, onClick)


type alias LoginMessage =
    { authenticated : Bool
    }


type alias Credentials =
    { email : String
    , password : String
    }


type alias Album =
    { id : Int
    , title : String
    , listened : Bool
    }


type alias Model =
    { authenticated : Bool
    , email : String
    , password : String
    , albums : List Album
    }


type Msg
    = AuthenticatedChanged LoginMessage
    | OnEmailInput String
    | OnPasswordInput String
    | Login
    | NewAlbums (List Album)
    | AlbumListened Int Bool
    | Logout


initModel : Model
initModel =
    { authenticated = False
    , email = ""
    , password = ""
    , albums = []
    }


init : ( Model, Cmd Msg )
init =
    ( initModel, Cmd.none )


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


viewMenu : Model -> Html Msg
viewMenu model =
    div [ class "pure-menu pure-menu-horizontal header-menu" ]
        [ span [ class "pure-menu-heading" ]
            [ text "92 Modern Jazz Albums" ]
        , button
            [ class "pure-button logout"
            , classList [ ( "not-displayed", not model.authenticated ) ]
            , onClick Logout
            ]
            [ text "Logout" ]
        ]


viewButtonListened : Album -> Html Msg
viewButtonListened album =
    let
        buttonText =
            if album.listened then
                "Cancel"
            else
                "Done"
    in
        button
            [ class "pure-button pure-u-2-5"
            , classList
                [ ( "active", not album.listened )
                , ( "non-active", album.listened )
                ]
            , onClick (AlbumListened album.id (not album.listened))
            ]
            [ text buttonText ]


viewAlbum : Album -> Html Msg
viewAlbum album =
    let
        actionButton =
            viewButtonListened album
    in
        div [ class "pure-g album-item" ]
            [ span [ class "pure-u-3-5" ] [ text album.title ]
            , actionButton
            ]


viewAlbumList : List Album -> Html Msg
viewAlbumList albums =
    div [ class "album-list" ] (List.map viewAlbum albums)


viewLogin : Html Msg
viewLogin =
    div [ class "pure-form pure-form-aligned" ]
        [ div [ class "pure-control-group" ]
            [ label [ for "name" ]
                [ text "Email" ]
            , input
                [ id "name"
                , class "form-control"
                , placeholder "Email"
                , type_ "text"
                , onInput OnEmailInput
                ]
                []
            ]
        , div [ class "pure-control-group" ]
            [ label [ for "password" ]
                [ text "Password" ]
            , input
                [ id "password"
                , class "form-control"
                , placeholder "Password"
                , type_ "password"
                , onInput OnPasswordInput
                ]
                []
            ]
        , div [ class "pure-controls" ]
            [ button
                [ class "pure-button pure-button-primary form-control"
                , onClick Login
                ]
                [ text "Login" ]
            ]
        ]


view : Model -> Html Msg
view model =
    let
        viewContent =
            if model.authenticated then
                viewAlbumList model.albums
            else
                viewLogin
    in
        div []
            [ viewMenu model
            , div [ class "app-content" ] [ viewContent ]
            ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ loginStateChange AuthenticatedChanged
        , newAlbums NewAlbums
        ]


port loginStateChange : (LoginMessage -> msg) -> Sub msg


port login : Credentials -> Cmd msg


port newAlbums : (List Album -> msg) -> Sub msg


port albumListened : ( Int, Bool ) -> Cmd msg


port logout : Int -> Cmd msg


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
