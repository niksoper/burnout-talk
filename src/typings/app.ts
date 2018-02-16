import { InjectedRouter } from "react-router";

export interface IRouteComponentProps {
  router?: InjectedRouter;
  location?: { query: string };
  params?: any;
}

export interface ILoginRequest {
  username: string;
  password: string;
}
