class TestTimer {
    constructor(totalMinutes = 47) {
        this.totalMinutes = totalMinutes;
        this.remainingTime = totalMinutes * 60;
        this.timerInterval = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.timerInterval = setInterval(() => {
            this.remainingTime--;
            
            if (this.remainingTime <= 0) {
                this.stop();
                this.onTimeUp();
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

    reset() {
        this.stop();
        this.remainingTime = this.totalMinutes * 60;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        const timerElement = document.getElementById('timer');
        
        if (timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Change color when time is running out
            if (minutes < 5) {
                timerElement.style.color = '#e74c3c';
            } else if (minutes < 10) {
                timerElement.style.color = '#f39c12';
            } else {
                timerElement.style.color = '#2c3e50';
            }
        }
    }

    onTimeUp() {
        alert('Time is up! Your answers will be submitted automatically.');
        document.getElementById('check-answers').click();
    }

    getFormattedTime() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize timer
const testTimer = new TestTimer(47);
