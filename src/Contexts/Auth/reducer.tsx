import { Dispatch } from "react"
import { AuthState, AuthStateAction } from "../types"

export const reducer = (state: AuthState, action: AuthStateAction) => {
    switch (action.type) {
        case "update":
            return {
                ...state,
                jwt: action.payload.jwt
                // revisit with actual code
            }

        default:
            return state
    }
}