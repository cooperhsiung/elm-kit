module Main exposing (Msg(..), main, update, view)

import Browser exposing (..)
import Html exposing (..)
import Html.Events exposing (..)


main =
    Browser.sandbox
        { init = init, update = update, view = view }


-- MODEL

type alias Model = Int

init : Model
init = 0


-- UPDATE

type Msg
    = Increment
    | Decrement

update: Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1


--VIEW
view : Model -> Html Msg

view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]
