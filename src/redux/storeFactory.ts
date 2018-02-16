import { webpackConfig } from "../webpack";
import { CoreSettings } from "./coreSettings";
import { State } from "./state";
import { reducers } from './reducers';
import { middlewares } from './middlewares';
import { sagas } from "./sagas";
import { StoreFactory } from "./core/storeFactory";

export const storeFactory = new StoreFactory<State>({
    useDevTools: !webpackConfig.isProduction,
    reduxStateWindowVariable: CoreSettings.reduxStateVariableName,
    reducers,
    middlewares,
    sagas})
