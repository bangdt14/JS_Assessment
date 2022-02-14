const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

class Field {

    field = [];

    constructor() {

        this.locationX = 0;
        this.locationY = 0;

        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }

        this.generateField(row, col, 0.2);
    } //End of constructor

    generateField(height, width, percentage = 0.1) {

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                // Set fieldCharacter vs hole on the field
                if (prob > percentage) {
                    this.field[y][x] = fieldCharacter;
                }
                else {
                    this.field[y][x] = hole;
                }         
            }
        }

        //Set the "hat" location
        let hatLocationX;
        let hatLocationY;

        // Ensure hat location is not at the starting character
        do {
            hatLocationX = Math.floor(Math.random() * width);
            hatLocationY = Math.floor(Math.random() * height);
        } while (hatLocationX == 0 && hatLocationY == 0)

        this.field[hatLocationY][hatLocationX] = hat;

        //Set character position as [0][0]
        this.field[0][0] = pathCharacter;

    }

    runGame() {
        let isPlaying = true;
        while (isPlaying) {

            this.print();
            this.askQuestion();

            if (this.isOutBound()) {
                console.log("Out of bounds - Game End!");
                isPlaying = false;
                break;
            }
            else if (this.isHole()) {
                console.log("Sorry, you fell down a hole!");
                isPlaying = false;
                break;
            }
            else if (this.isHat()) {
                console.log("Congrats, you found your hat!");
                isPlaying = false;
                break;
            }
            
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
        
    } //End of runGame

    isOutBound = () => this.locationX < 0 || this.locationX >= row ||
                          this.locationY < 0 || this.locationY >= col;

    isHole = () => this.field[this.locationY][this.locationX] === hole;

    isHat = () => this.field[this.locationY][this.locationX] === hat;

    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    } //End of print Method 

    askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();

        switch(answer) {
            case 'U':
                this.locationY--;
                break;
            case 'D':
                this.locationY++;
                break;
            case 'L':
                this.locationX--;
                break;
            case 'R':
                this.locationX++;
                break;
            default:
                console.log('Invalid option. Please enter U, D, L or R.');
                this.askQuestion();
                break;
        }
    } //End of askQuestion

} //End of Field Class

const myfield = new Field();
myfield.runGame();
