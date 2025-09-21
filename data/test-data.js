const testData = {
    part1: {
        correspondence: {
            title: "Customer Complaint",
            to: "Summit Ridge Auto",
            from: "Michael Thompson",
            content: `Dear Summit Ridge Auto,<br><br>
            I want to inform you about a malfunction that occurred with my recently purchased vehicle...`
        },
        questions: [
            {
                text: "Based on the letter, Michael's level of trust in the dealership can be inferred as ______.",
                options: [
                    "Completely broken",
                    "Slightly diminished", 
                    "Unchanged",
                    "Restored by the warranty"
                ],
                correctAnswer: 1,
                explanation: "Michael mentions past positive experiences but expresses concern about the current issue."
            },
            // Add more questions following the same structure
        ]
    },
    part2: {
        advertisement: {
            title: "Your Dream Garden, Delivered to Your Doorstep!",
            content: `Unleash the Beauty of Your Outdoor Space...`
        },
        email: {
            to: "Emily",
            from: "James", 
            content: `Hey Emily, I came across something that I thought might catch your eye...`
        },
        questions: [
            {
                text: "Blank 1",
                options: ["chaotic", "exceptional", "unnecessary", "underwhelming"],
                correctAnswer: 1,
                explanation: "The context suggests transformation to something better."
            },
            // Add more questions
        ]
    },
    part3: {
        content: [
            {
                letter: "A",
                text: "Vaccination campaigns have revolutionized public health..."
            },
            {
                letter: "B", 
                text: "Beyond health, vaccination campaigns have profound socioeconomic benefits..."
            },
            // Add more paragraphs
        ],
        questions: [
            {
                text: "When public confidence falters, the chain of protection weakens...",
                options: ["A", "B", "C", "D", "E"],
                correctAnswer: 2,
                explanation: "This relates to challenges mentioned in paragraph C."
            },
            // Add more questions
        ]
    },
    part4: {
        content: `The world is experiencing a demographic transformation unlike any other in history...`,
        questions: [
            {
                text: "The aging population trend is primarily influenced by ______.",
                options: [
                    "Rising healthcare costs",
                    "Extended lifespans", 
                    "Migration patterns",
                    "Advanced economies"
                ],
                correctAnswer: 1,
                explanation: "The text mentions 'increasing life expectancies and declining birth rates'."
            },
            // Add more questions
        ]
    }
};

// Add all your questions following the same pattern
