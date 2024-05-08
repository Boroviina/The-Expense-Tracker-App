import {createContext, useReducer} from 'react';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'a pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'a pair of trousers',
        amount: 89.99,
        date: new Date('2022-12-19')
    }, {
        id: 'e3',
        description: 'bananas',
        amount: 39.99,
        date: new Date('2021-06-20')
    }, {
        id: 'e4',
        description: 'a book',
        amount: 19.99,
        date: new Date('2021-12-09')
    }, {
        id: 'e5',
        description: 'a cup',
        amount: 15.99,
        date: new Date('2023-01-09')
    }, {
        id: 'e6',
        description: 'a cup',
        amount: 15.99,
        date: new Date('2023-01-09')
    }, {
        id: 'e7',
        description: 'a cup',
        amount: 15.99,
        date: new Date('2023-01-09')
    }, {
        id: 'e8',
        description: 'a cup',
        amount: 15.99,
        date: new Date('2023-01-09')
    }, {
        id: 'e9',
        description: 'a cup',
        amount: 15.99,
        date: new Date('2023-01-09')
    }, {
        id: 'e10',
        description: 'a cup',
        amount: 15.99,
        date: new Date('2023-01-09')
    },
];
export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData});     //it is related to the action in expenseReducer
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {data: expenseData, id: id}})
    }
    const value={
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpenseContext.Provider value={value}>
        {children}
    </ExpenseContext.Provider>
}

export default ExpensesContextProvider;