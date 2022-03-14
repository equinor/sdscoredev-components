import { matchRoutes, useLocation } from "react-router-dom"

const useCurrentPath = (routes: any) => {
  const location = useLocation()
  const [{ route }]: any = matchRoutes(routes, location)

  return route.path
}