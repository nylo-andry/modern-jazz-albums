module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (class, classList, placeholder, src, type_, id, for)
import Html.Events exposing (onInput, onClick)
import Model exposing (..)
import Update exposing (..)


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
