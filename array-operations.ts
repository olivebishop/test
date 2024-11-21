import * as readlineSync from 'readline-sync';

class ArrayOperations {
    private array: number[];

    constructor() {
        // Initialize array with 10 zeros
        this.array = new Array(10).fill(0);
    }

    // Random number generator (similar to lab 7 concept)
    private generateRandomNumber(low: number, high: number): number {
        return Math.floor(Math.random() * (high - low + 1)) + low;
    }

    // 1. Generate Random Array
    private generateRandomArray(low: number, high: number): void {
        this.array = this.array.map(() =>
            this.generateRandomNumber(low, high)
        );
    }

    // 2. Multiply Array
    private multiplyArray(multiplier: number): void {
        this.array = this.array.map(val => val * multiplier);
    }

    // 3. Divide Array
    private divideArray(divisor: number): void {
        this.array = this.array.map(val =>
            divisor !== 0 ? Math.trunc(val / divisor) : val
        );
    }

    // 4. Mod Array
    private modArray(divisor: number): void {
        this.array = this.array.map(val =>
            divisor !== 0 ? val % divisor : val
        );
    }

    // 5. Display Array
    private displayArray(): void {
        console.log('[' + this.array.join(', ') + ']');
    }

    // Main menu loop
    public run(): void {
        while (true) {
            console.log("\nMain Menu:");
            console.log("1 - Generate Random Array");
            console.log("2 - Multiply Array");
            console.log("3 - Divide Array");
            console.log("4 - Mod Array");
            console.log("5 - Display Array");
            console.log("0 - Exit");

            // Get user choice
            const choice = readlineSync.questionInt("Your choice: ");

            try {
                switch (choice) {
                    case 1:
                        const low = readlineSync.questionInt("Enter low value: ");
                        const high = readlineSync.questionInt("Enter high value: ");
                        this.generateRandomArray(low, high);
                        break;
                    case 2:
                        const multiplier = readlineSync.questionInt("Enter multiplier: ");
                        this.multiplyArray(multiplier);
                        break;
                    case 3:
                        const divider = readlineSync.questionInt("Enter divisor: ");
                        this.divideArray(divider);
                        break;
                    case 4:
                        const modDivisor = readlineSync.questionInt("Enter divisor: ");
                        this.modArray(modDivisor);
                        break;
                    case 5:
                        this.displayArray();
                        break;
                    case 0:
                        console.log("Exiting program.");
                        return;
                    default:
                        console.log("Invalid choice. Please try again.");
                }
            } catch (error) {
                console.log("An error occurred. Please try again.");
            }
        }
    }
}

// Run the program
const program = new ArrayOperations();
program.run();