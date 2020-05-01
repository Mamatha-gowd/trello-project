import { combineReducers } from "redux";

import Boardreducer from "./Boardreducer";
import Listreducer from "./Listreducer";
import Cardreducer from "./Cardreducer";
import Modalreducer from "./Modalreducer";
import Checklistreducer from "./Checklistreducer";

export default combineReducers({
  Boardreducer,
  Listreducer,
  Cardreducer,
  Modalreducer,
  Checklistreducer,
});
