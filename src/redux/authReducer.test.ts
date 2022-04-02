// imports
import {authReducer, setIsLoggedInAC} from "./authReducer";

type initType = {
    isLoggedIn: boolean
}
// startState
let startState: initType
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

// test
test('Change logged status should be correct', () => {
    const action = setIsLoggedInAC({value: true})
    const endState = authReducer(startState, action)
    expect(endState.isLoggedIn).toBe(true)

})
