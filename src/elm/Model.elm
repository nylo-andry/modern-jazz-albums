module Model exposing (..)


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


initModel : Model
initModel =
    { authenticated = False
    , email = ""
    , password = ""
    , albums = []
    }
