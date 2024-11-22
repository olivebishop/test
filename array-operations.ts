import * as readlineSync from 'readline-sync';

class ArrayOperations {
    // Using 16-bit signed integers (WORD)
    private array: Int16Array;
    
    constructor() {
        // Initialize array with 10 zeros
        this.array = new Int16Array(10);
    }

    private generateRandomNumber(low: number, high: number): number {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    private generateRandomArray(low: number, high: number): void {
        // Ensure values are within 16-bit signed range
        const validLow = Math.max(-32768, Math.min(32767, low));
        const validHigh = Math.max(-32768, Math.min(32767, high));
        
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = this.generateRandomNumber(validLow, validHigh);
        }
    }

    // Fixed multiply array operation
    private multiplyArray(multiplier: number): void {
        for (let i = 0; i < this.array.length; i++) {
            // Perform multiplication and handle overflow
            let result = this.array[i] * multiplier;
            
            // Convert to 16-bit signed integer
            if (result > 32767) {
                result = ((result & 0xFFFF) - 65536);
            } else if (result < -32768) {
                result = ((result & 0xFFFF) - 65536);
            }
            
            this.array[i] = result;
        }
    }

    // Fixed divide array operation
    private divideArray(divisor: number): void {
        if (divisor === 0) {
            console.log("Error: Division by zero!");
            return;
        }

        for (let i = 0; i < this.array.length; i++) {
            // Perform signed division
            const result = Math.trunc(this.array[i] / divisor);
            
            // Ensure result is within 16-bit signed range
            if (result > 32767) {
                this.array[i] = 32767;  // Max positive value
            } else if (result < -32768) {
                this.array[i] = -32768;  // Max negative value
            } else {
                this.array[i] = result;
            }
        }
    }

    // Fixed mod array operation
    private modArray(divisor: number): void {
        if (divisor === 0) {
            console.log("Error: Modulo by zero!");
            return;
        }

        for (let i = 0; i < this.array.length; i++) {
            // Handle negative numbers correctly for modulo
            let result = this.array[i] % divisor;
            
            // Ensure positive result for negative numbers
            if (result < 0) {
                result += Math.abs(divisor);
            }
            
            // Ensure result is within 16-bit signed range
            if (result > 32767) {
                result = 32767;
            } else if (result < -32768) {
                result = -32768;
            }
            
            this.array[i] = result;
        }
    }

    private displayArray(): void {
        process.stdout.write('[');
        for (let i = 0; i < this.array.length; i++) {
            process.stdout.write(this.array[i].toString());
            if (i < this.array.length - 1) {
                process.stdout.write(', ');
            }
        }
        process.stdout.write(']\n');
    }

    public run(): void {
        while (true) {
            console.log("\nMain Menu:");
            console.log("1 - Generate Random Array");
            console.log("2 - Multiply Array");
            console.log("3 - Divide Array");
            console.log("4 - Mod Array");
            console.log("5 - Display Array");
            console.log("0 - Exit");

            try {
                const choice = readlineSync.questionInt("Your choice: ");

                switch (choice) {
                    case 0:
                        console.log("Exiting program.");
                        return;
                    case 1:
                        const low = readlineSync.questionInt("Enter low value: ");
                        const high = readlineSync.questionInt("Enter high value: ");
                        if (low > high) {
                            console.log("Error: Low value must be less than or equal to high value.");
                            break;
                        }
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