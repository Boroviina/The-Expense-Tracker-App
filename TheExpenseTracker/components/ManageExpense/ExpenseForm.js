import {View, StyleSheet, Text, Alert} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";
import {GlobalStyles} from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true //!!defaultValues,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true       //to prevent appearing of text label when we want to add new expense
        }
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,  //plus converts string to a number
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs) => {
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid}
                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    const formIsIvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input label={"Amount"}
                   style={styles.rowInput}
                   invalid={!inputs.amount.isValid}
                   textInputConfig={{
                       keyboardType: 'decimal-pad',
                       onChangeText: inputChangeHandler.bind(this, 'amount'),
                       value: inputs.amount.value
                   }}/>
            <Input label={"Date"}
                   style={styles.rowInput}
                   invalid={!inputs.date.isValid}
                   textInputConfig={{
                       placeholder: 'YYYY-MM-DD',
                       maxLength: 10,
                       onChangeText: inputChangeHandler.bind(this, 'date'),
                       value: inputs.date.value
                   }}/>
        </View>
        <Input label={"Description"}
               invalid={!inputs.description.isValid}
               textInputConfig={{
                   multiline: true,
                   // autoCorrect: false,
                   // autoCapitalize:'sentences'
                   onChangeText: inputChangeHandler.bind(this, 'description'),
                   value: inputs.description.value
               }}/>
        {formIsIvalid && <Text style={styles.errorText}>Ivalid input data - please check your entered data!</Text>}
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    },
    form: {
        marginTop: 40,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'white',
        marginVertical: 40,
        textAlign: "center"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
    }
})