class TestTimer {
    constructor() {
        this.partTimes = {
            part1: 11 * 60, // 11 minutes
            part2: 9 * 60,  // 9 minutes
            part3: 13 * 60, // 13 minutes
            part4: 14 * 60  // 14 minutes
        };
        this.globalTime = 47 * 60; // 47 minutes total
        this.currentPart = 1;
        this.partTimers = {
            part1: this.partTimes.part1,
            part2: this.partTimes.part2,
            part3: this.partTimes.part3,
            part4: this.partTimes.part4
        };
        this.timerInterval = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.timerInterval = setInterval(() => {
            this.globalTime--;
            this.partTimers[`part${this.currentPart}`]--;
            
            if (this.globalTime <= 0) {
                this.stop();
                this.onTimeUp();
            }
            
            if (this.partTimers[`part${this.currentPart}`] <= 0) {
                this.onPartTimeUp();
            }
            
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.isRunning = false;
    }

    switchPart(partNumber) {
        this.currentPart = partNumber;
        this.updateDisplay();
    }

    updateDisplay() {
        // Update global timer
        const globalMinutes = Math.floor(this.globalTime / 60);
        const globalSeconds = this.globalTime % 60;
        const globalTimerElement = document.getElementById('global-timer');
        
        if (globalTimerElement) {
            globalTimerElement.textContent = `${globalMinutes.toString().padStart(2, '0')}:${globalSeconds.toString().padStart(2, '0')}`;
        }

        // Update current part timer
        const partTime = this.partTimers[`part${this.currentPart}`];
        const partMinutes = Math.floor(partTime / 60);
        const partSeconds = partTime % 60;
        const partTimerElement = document.getElementById('part-timer');
        
        if (partTimerElement) {
            partTimerElement.textContent = `${partMinutes.toString().padStart(2, '0')}:${partSeconds.toString().padStart(2, '0')}`;
        }

        // Update individual part timers
        for (let i = 1; i <= 4; i++) {
            const partTime = this.partTimers[`part${i}`];
            const partMinutes = Math.floor(partTime / 60);
            const partSeconds = partTime % 60;
            const partElement = document.getElementById(`part${i}-timer`);
            
            if (partElement) {
                partElement.textContent = `${partMinutes.toString().padStart(2, '0')}:${partSeconds.toString().padStart(2, '0')}`;
                
                // Change color when time is running out
                if (partTime < 60) {
                    partElement.style.color = '#e74c3c';
                } else if (partTime < 180) {
                    partElement.style.color = '#f39c12';
                }
            }
        }
    }

    onPartTimeUp() {
        alert(`Time for Part ${this.currentPart} is up! Moving to next part.`);
        if (this.currentPart < 4) {
            this.switchPart(this.currentPart + 1);
        }
    }

    onTimeUp() {
        alert('Total time is up! Your answers will be submitted automatically.');
        document.getElementById('check-answers').click();
    }

    getFormattedTime() {
        const minutes = Math.floor(this.globalTime / 60);
        const seconds = this.globalTime % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    getPartTime(partNumber) {
        const time = this.partTimers[`part${partNumber}`];
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize timer
const testTimer = new TestTimer();