#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.green.bold.italic.underline("\n\t'WELCOME TO SK BANK'\t\n"));

// Create a class for customer
class Customer 
{
    name: string;
    age: number | null;
    gender: string;
    mobNumber: number;
    accNumber: number;
    balance: number;

    constructor
    (
        name: string,
        age: number | null,
        gender: string,
        mobNumber: number,
        accNumber: number,
        balance: number
    ) 
    {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.mobNumber = mobNumber;
        this.accNumber = accNumber;
        this.balance = balance;
    }
}

// Create a class for bank
class myBank 
{
    customers: Customer[] = [];

    // Create a function to create a new account
    async createAcc() 
    {
        const 
        {
            name,
            age,
            gender,
            mobNumber,
            accNumber,
            balance
        } = await inquirer.prompt
        (
            [
                {
                    name: "name",
                    type: "input",
                    message: "Enter your name:",
                },
                {
                    name: "age",
                    type: "input",
                    message: "Enter your age:",
                },
                {
                    name: "gender",
                    type: "list",
                    message: "Enter your gender:",
                    choices: ["Male", "Female"],
                },
                {
                    name: "mobNumber",
                    type: "input",
                    message: "Enter your mobile number:",
                },
                {
                    name: "accNumber",
                    type: "input",
                    message: "Enter your account number:",
                },
                {
                    name: "balance",
                    type: "input",
                    message: "Enter your initial balance:",
                }
            ]
        );

        const cust = new Customer
        (
            name,

            parseInt(age),

            gender,

            parseInt(mobNumber),

            parseInt(accNumber),

            parseFloat(balance)
        );
        this.customers.push(cust);

        console.log(chalk.blue(`Dear ${cust.name}, your account has been created successfully!`));
    }

    // Function to view account details
    async details() 
    {
        const { AccountNumber } = await inquirer.prompt
        (
            {
                name: "AccountNumber",
                type: "input",
                message: "Enter your account number:",
            }
        );

        const custm = this.customers.find((x) => x.accNumber === parseInt(AccountNumber));
        if (custm) 
        {
            console.log(chalk.cyan
            (
            `Account Details:
            Name: ${custm.name}
            Age: ${custm.age}
            Gender: ${custm.gender}
            Mobile Number: ${custm.mobNumber}
            Account Number: ${custm.accNumber}
            Balance: ${custm.balance}`
            )
        );
        } 
        else 
        {
            console.log(chalk.red("Account Not Found!"));
        }
    }

    // Function to check balance
    async checkBalance() 
    {
        const { accountNumber } = await inquirer.prompt
        (
            [
                {
                    name: "accountNumber",
                    type: "input",
                    message: "Enter your account number:",
                 }
            ]
        );

    const custm = this.customers.find((x) => x.accNumber === parseInt(accountNumber));
    if (custm) 
        {
       
            console.log(chalk.green(`Your current balance is: ${custm.balance}`));
        } 
        else 
        {
            console.log(chalk.red("Account Not Found!"));
        }
}


    // Function to debit amount
    async debit() 
    {
        const { accountNumber, amount } = await inquirer.prompt
        (
            [
                {
                    type: "input",
                    name: "accountNumber",
                    message: "Enter your account number:",
                },
                {
                    type: "input",
                    name: "amount",
                    message: "Enter amount to debit:",
                }
            ]
        );

        const custm = this.customers.find((z) => z.accNumber === parseInt(accountNumber));
        if (custm) 
        {
            if (custm.balance >= parseFloat(amount)) 
            {
                custm.balance -= parseFloat(amount);
                console.log(chalk.blue(`Debited ${amount} from account ${accountNumber}. New balance: ${custm.balance}`));
            } 
            else 
            {
                console.log(chalk.red("Insufficient balance"));
            }
        } 
        else 
        {
            console.log(chalk.red("Account not found"));
        }
    }

    // Function to credit amount
    async credit() 
    {
        const { accountNumber, amount } = await inquirer.prompt
        (
            [
                {
                    name: "accountNumber",
                    type: "input",
                    message: "Enter your account number:",
                },
                {
                    name: "amount",
                    type: "input",
                    message: "Enter amount to credit:",
                }
            ]
        );

        const custm = this.customers.find((z) => z.accNumber === parseInt(accountNumber));
        if (custm) 
        {
            custm.balance += parseFloat(amount);
            console.log(chalk.blue(`Credited ${amount} to account ${accountNumber}. New balance: ${custm.balance}`));
        } 
        else 
        {
            console.log(chalk.red("Account Not Found!"));
        }
    }

    // Function to start the banking process
    async start() 
    {
        while (true) 
        {
            const { Choices } = await inquirer.prompt
            (
                {
                    name: "Choices",
                    type: "list",
                    message: "Select an option:",
                    choices: ["Create Account", "Account Details", "Check Balance", "Debit", "Credit", "Exit"],
                }
            );

            if (Choices === "Create Account") 
                {
                  await this.createAcc();
                } 
            else if (Choices === "Account Details") 
                {
                    await this.details();
                } 
            else if (Choices === "Check Balance")
                {
                    await this.checkBalance();
                }
            else if (Choices === "Debit") 
                {
                    await this.debit();
                } 
            else if (Choices === "Credit") 
                {
                    await this.credit();
                } 
            else if (Choices === "Exit") 
                {
                    console.log(chalk.magenta("\n\t...EXIT...\t\n"));
                    process.exit();
                }
        }
    }
}


const bank = new myBank();
bank.start();



