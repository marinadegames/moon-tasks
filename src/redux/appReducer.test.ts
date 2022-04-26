// imports
import {appReducer, InitialStateType, setAppInitializedAC, setErrorAppAC, setStatusAppAC} from "./appReducer";

// startState
let startState: InitialStateType
beforeEach(() => {
    startState = {
        status: 'loading',
        error: null,
        notification: null,
        initialized: false
    }
})

// test
test('Change application status should be correct', () => {
    const action = setStatusAppAC({status: 'succeeded'})
    const endState = appReducer(startState, action)
    expect(endState.status).toBe('succeeded')
})
test('set error application should be correct', () => {
    const testError = 'TEST ERROR'
    const action = setErrorAppAC({error: testError})
    const endState = appReducer(startState, action)
    expect(endState.error).toBe(testError)
})
test('set initialized status application should be correct', () => {
    const action = setAppInitializedAC({value: true})
    const endState = appReducer(startState, action)
    expect(endState.initialized).toBe(true)
})
