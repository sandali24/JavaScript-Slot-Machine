// 1. Desposit some money
// 2. Determine number of lines to bet on 
// 3. Collect a bet amount
// 4. Spin the slot machine 
// 5. Check if the user won 
// 6. Give the user their winings
// 7. Play again

// function deposit(){
//     return 1;
// }

const prompt = require("prompt-sync")(); //Import the package (promt-sync) to get user input

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8,
}

const SYMBOLE_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2,
}


const deposit = () => {
    while (true) {
    const depositAmount = prompt("Enter a deposit amount: ")
    const numberDepositAmount = parseFloat(depositAmount); //Take prompt string and convert into its floating point value
    //Eg: "12.2" => 12.2
    //"Hello" => NaN

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, try again.")
    } else{
        return numberDepositAmount;
    }
}
    
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ")
        const numberOfLines = parseFloat(lines); 
    
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again.")
        } else{
            return numberOfLines;
        }
    }
};

const getBet = (balance, numberOfLines) => {
    while (true) {
        const bet = prompt("Enter the total bet: ")
        const numberBet = parseFloat(bet); 
    
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / numberOfLines)){
            console.log("Invalid bet, try again.")
        } else{
            return numberOfLines;
        }
    }
};

const spin = () => {
    const symbols = []; // ["A", "A", "B", "B", "B", "B"]... like this
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
            const reels = [];
            for (let i = 0; i < COLS; i++){
                reels.push([]);
                const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
            }
            }
            return reels;
            
        };

        const transpose = (reels) => {
            const rows = [];

            for (let i = 0; i < ROWS; i++) {
                rows.push([]);
                for (let j = 0; j < COLS; j++) {
                    rows[i].push(reels[j][i]);
                }

            }

            return rows;
        };

        const printRows = (rows) => {
            for (const row of rows) {
              let rowString = "";
              for (const [i, symbol] of row.entries()) {
                rowString += symbol;
                if (i != row.length - 1) {
                  rowString += " | ";
                }
              }
              console.log(rowString);
            }
          };

          const getWinnings = (rows, bet, lines) => {
            let winnings = 0;
          
            for (let row = 0; row < lines; row++) {
              const symbols = rows[row];
              let allSame = true;
          
              for (const symbol of symbols) {
                if (symbol != symbols[0]) {
                  allSame = false;
                  break;
                }
              }
          
              if (allSame) {
                winnings += bet * SYMBOL_VALUES[symbols[0]];
              }
            }
          
            return winnings;
          };

          const game = () => {
            let balance = deposit();
          
            while (true) {
              console.log("You have a balance of $" + balance);
              const numberOfLines = getNumberOfLines();
              const bet = getBet(balance, numberOfLines);
              balance -= bet * numberOfLines;
              const reels = spin();
              const rows = transpose(reels);
              printRows(rows);
              const winnings = getWinnings(rows, bet, numberOfLines);
              balance += winnings;
              console.log("You won, $" + winnings.toString());
          
              if (balance <= 0) {
                console.log("You ran out of money!");
                break;
              }
          
              const playAgain = prompt("Do you want to play again (y/n)? ");
          
              if (playAgain != "y") break;
            }
          };
          
          game();

        




// let balance = deposit(); // We have to keep it as let because we can change what it's storing 
// const numberOfLines = getNumberOfLines();
// const bet = getBet(balance, numberOfLines);
// const reels = spin();
// const rows = transpose(reels);
// console.log(reels);
// console.log(rows);


