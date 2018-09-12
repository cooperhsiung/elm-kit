module Main exposing (..)

import Browser

import Browser.Dom as Dom
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

main =
  -- Browser.sandbox { init = 0, update = update, view = view }
  text "Hello world 12345!"

type Msg = Increment | Decrement

update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
