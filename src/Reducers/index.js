import { combineReducers } from "redux";

import Boardreducer from "./Boardreducer";
import Listreducer from "./Listreducer";
import Cardreducer from "./Cardreducer";

export default combineReducers({
  Boardreducer,
  Listreducer,
  Cardreducer,
});
