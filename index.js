let videoSimulator = {
    interval: null,
    currentTime: 0,
    duration: 60, // default duration
    isPaused: false,
    moduleId: null,
    lessonIndex: null,
};


feather.replace();

        const state = {

            currentUser: null, // Untuk menyimpan data user yang login
    user: [
        // Akun Manajer
        {
            id: 'mgr01',
            type: 'manager',
            name: 'Jane Doe',
            avatar: 'JD',
            division: 'Sales Lead',
            team: ['emp01', 'emp02'] // ID karyawan yang dia manage
        },
        // Akun Karyawan
        {
            id: 'emp01',
            type: 'employee',
            name: 'Alex Ryder',
            avatar: 'AR',
            division: 'Sales',
            reportsTo: 'mgr01',
            xp: 150,
            levelXP: 1000,
            streak: 5,
            completionData: [
    { moduleId: "m1-1", completedAt: "2025-08-24T18:30:00Z" }, 
    { moduleId: "m1-2", completedAt: "2025-08-23T10:00:00Z" }, 
    { moduleId: "m1-3", completedAt: "2025-08-24T19:00:00Z" }  
],
            rolePlayProgress: {},
            notes: []
        },
        // Kita tambahkan satu karyawan lagi untuk data di dashboard manajer
        {
            id: 'emp02',
            type: 'employee',
            name: 'Sarah J.',
            avatar: 'SJ',
            division: 'Sales',
            reportsTo: 'mgr01',
            xp: 250,
            levelXP: 1000,
            streak: 8,
            completionData: [
    { moduleId: "m1-1", completedAt: "2025-08-24T18:30:00Z" }, // Selesai hari ini
    { moduleId: "m1-2", completedAt: "2025-08-23T10:00:00Z" }, // Selesai kemarin
    
],
            rolePlayProgress: {},
            notes: []
        }
    ],
            leaderboard: [ 
                { name: "Sarah J.", xp: 2500, avatar: 'SJ', branch: 'Jakarta', division: 'Sales' }, 
                { name: "Mike L.", xp: 2210, avatar: 'ML', branch: 'Jakarta', division: 'Marketing' }, 
                { name: "Alex Ryder", xp: 150, avatar: 'AR', isUser: true, branch: 'Bandung', division: 'Sales' }, 
                { name: "Chloe B.", xp: 1980, avatar: 'CB', branch: 'Surabaya', division: 'Engineering' }, 
                { name: "David P.", xp: 1750, avatar: 'DP', branch: 'Bandung', division: 'Engineering' },
                { name: "Eva G.", xp: 2450, avatar: 'EG', branch: 'Jakarta', division: 'Sales' },
                { name: "Frank H.", xp: 2100, avatar: 'FH', branch: 'Surabaya', division: 'Marketing' }
            ],
            learningPath: [
    { 
        id: "s1", 
        title: "Stage 1: Fundamentals", 
        modules: [ 
            { id: "m1-1", title: "The Growth Mindset", xp: 50, type: "module", durationInMinutes: 36, tags: ["Sales", "Mindset", "Beginner"], badge: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1zdGFyLWljb24gbHVjaWRlLWNpcmNsZS1zdGFyIj48cGF0aCBkPSJNMTEuMDUxIDcuNjE2YTEgMSAwIDAgMSAxLjkwOS4wMjRsLjczNyAxLjQ1MmExIDEgMCAwIDAgLjczNy41MzVsMS42MzQuMjU2YTEgMSAwIDAgMSAuNTg4IDEuODA2bC0xLjE3MiAxLjE2OGExIDEgMCAwIDAtLjI4Mi44NjZsLjI1OSAxLjYxM2ExIDEgMCAwIDEtMS41NDEgMS4xMzRsLTEuNDY1LS43NWExIDEgMCAwIDAtLjkxMiAwbC0xLjQ2NS43NWExIDEgMCAwIDEtMS41MzktMS4xMzNsLjI1OC0xLjYxM2ExIDEgMCAwIDAtLjI4Mi0uODY3bC0xLjE1Ni0xLjE1MmExIDEgMCAwIDEgLjU3Mi0xLjgyMmwxLjYzMy0uMjU2YTEgMSAwIDAgMCAuNzM3LS41MzV6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=" }, 
            { id: "m1-2", title: "Mastering Product Knowledge", xp: 50, type: "module", durationInMinutes: 45, tags: ["Product", "Technical", "Beginner"], badge: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1zdGFyLWljb24gbHVjaWRlLWNpcmNsZS1zdGFyIj48cGF0aCBkPSJNMTEuMDUxIDcuNjE2YTEgMSAwIDAgMSAxLjkwOS4wMjRsLjczNyAxLjQ1MmExIDEgMCAwIDAgLjczNy41MzVsMS42MzQuMjU2YTEgMSAwIDAgMSAuNTg4IDEuODA2bC0xLjE3MiAxLjE2OGExIDEgMCAwIDAtLjI4Mi44NjZsLjI1OSAxLjYxM2ExIDEgMCAwIDEtMS41NDEgMS4xMzRsLTEuNDY1LS43NWExIDEgMCAwIDAtLjkxMiAwbC0xLjQ2NS43NWExIDEgMCAwIDEtMS41MzktMS4xMzNsLjI1OC0xLjYxM2ExIDEgMCAwIDAtLjI4Mi0uODY3bC0xLjE1Ni0xLjE1MmExIDEgMCAwIDEgLjU3Mi0xLjgyMmwxLjYzMy0uMjU2YTEgMSAwIDAgMCAuNzM3LS41MzV6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=" }, 
            { id: "m1-3", title: "Handling Objections", xp: 50, type: "module", durationInMinutes: 60, tags: ["Sales", "Skill", "intermediate"], badge: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1zdGFyLWljb24gbHVjaWRlLWNpcmNsZS1zdGFyIj48cGF0aCBkPSJNMTEuMDUxIDcuNjE2YTEgMSAwIDAgMSAxLjkwOS4wMjRsLjczNyAxLjQ1MmExIDEgMCAwIDAgLjczNy41MzVsMS42MzQuMjU2YTEgMSAwIDAgMSAuNTg4IDEuODA2bC0xLjE3MiAxLjE2OGExIDEgMCAwIDAtLjI4Mi44NjZsLjI1OSAxLjYxM2ExIDEgMCAwIDEtMS41NDEgMS4xMzRsLTEuNDY1LS43NWExIDEgMCAwIDAtLjkxMiAwbC0xLjQ2NS43NWExIDEgMCAwIDEtMS41MzktMS4xMzNsLjI1OC0xLjYxM2ExIDEgMCAwIDAtLjI4Mi0uODY3bC0xLjE1Ni0xLjE1MmExIDEgMCAwIDEgLjU3Mi0xLjgyMmwxLjYzMy0uMjU2YTEgMSAwIDAgMCAuNzM3LS41MzV6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=" }, 
            { id: "c1", title: "Final Test: Role-Play", xp: 100, type: "challenge", isRolePlayGate: true, duration: "3 Session", tags: ["Practice", "Exam", "intermediate"], badge: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1zdGFyLWljb24gbHVjaWRlLWNpcmNsZS1zdGFyIj48cGF0aCBkPSJNMTEuMDUxIDcuNjE2YTEgMSAwIDAgMSAxLjkwOS4wMjRsLjczNyAxLjQ1MmExIDEgMCAwIDAgLjczNy41MzVsMS42MzQuMjU2YTEgMSAwIDAgMSAuNTg4IDEuODA2bC0xLjE3MiAxLjE2OGExIDEgMCAwIDAtLjI4Mi44NjZsLjI1OSAxLjYxM2ExIDEgMCAwIDEtMS41NDEgMS4xMzRsLTEuNDY1LS43NWExIDEgMCAwIDAtLjkxMiAwbC0xLjQ2NS43NWExIDEgMCAwIDEtMS41MzktMS4xMzNsLjI1OC0xLjYxM2ExIDEgMCAwIDAtLjI4Mi0uODY3bC0xLjE1Ni0xLjE1MmExIDEgMCAwIDEgLjU3Mi0xLjgyMmwxLjYzMy0uMjU2YTEgMSAwIDAgMCAuNzM3LS41MzV6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=" } 
        ] 
    },
    { 
        id: "s2", 
        title: "Stage 2: Advanced Techniques", 
        xpThreshold: 250, 
        modules: [ 
            { id: "m2-1", title: "Consultative Approach", xp: 75, type: "module", durationInMinutes: 40, tags: ["Sales", "intermediate"], badge: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1zdGFyLWljb24gbHVjaWRlLWNpcmNsZS1zdGFyIj48cGF0aCBkPSJNMTEuMDUxIDcuNjE2YTEgMSAwIDAgMSAxLjkwOS4wMjRsLjczNyAxLjQ1MmExIDEgMCAwIDAgLjczNy41MzVsMS42MzQuMjU2YTEgMSAwIDAgMSAuNTg4IDEuODA2bC0xLjE3MiAxLjE2OGExIDEgMCAwIDAtLjI4Mi44NjZsLjI1OSAxLjYxM2ExIDEgMCAwIDEtMS41NDEgMS4xMzRsLTEuNDY1LS43NWExIDEgMCAwIDAtLjkxMiAwbC0xLjQ2NS43NWExIDEgMCAwIDEtMS41MzktMS4xMzNsLjI1OC0xLjYxM2ExIDEgMCAwIDAtLjI4Mi0uODY3bC0xLjE1Ni0xLjE1MmExIDEgMCAwIDEgLjU3Mi0xLjgyMmwxLjYzMy0uMjU2YTEgMSAwIDAgMCAuNzM3LS41MzV6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=" }, 
            { id: "m2-2", title: "Pipeline Management", xp: 75, type: "module", durationInMinutes: 55, tags: ["Management", "Strategy", "Advance"], badge: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1zdGFyLWljb24gbHVjaWRlLWNpcmNsZS1zdGFyIj48cGF0aCBkPSJNMTEuMDUxIDcuNjE2YTEgMSAwIDAgMSAxLjkwOS4wMjRsLjczNyAxLjQ1MmExIDEgMCAwIDAgLjczNy41MzVsMS42MzQuMjU2YTEgMSAwIDAgMSAuNTg4IDEuODA2bC0xLjE3MiAxLjE2OGExIDEgMCAwIDAtLjI4Mi44NjZsLjI1OSAxLjYxM2ExIDEgMCAwIDEtMS41NDEgMS4xMzRsLTEuNDY1LS43NWExIDEgMCAwIDAtLjkxMiAwbC0xLjQ2NS43NWExIDEgMCAwIDEtMS41MzktMS4xMzNsLjI1OC0xLjYxM2ExIDEgMCAwIDAtLjI4Mi0uODY3bC0xLjE1Ni0xLjE1MmExIDEgMCAwIDEgLjU3Mi0xLjgyMmwxLjYzMy0uMjU2YTEgMSAwIDAgMCAuNzM3LS41MzV6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=" },
            { id: "c2", title: "Final Test: Negotiation", xp: 150, type: "challenge", isRolePlayGate: true, duration: "3 Session", tags: ["Practice", "Exam", "Advance"], badge: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1zdGFyLWljb24gbHVjaWRlLWNpcmNsZS1zdGFyIj48cGF0aCBkPSJNMTEuMDUxIDcuNjE2YTEgMSAwIDAgMSAxLjkwOS4wMjRsLjczNyAxLjQ1MmExIDEgMCAwIDAgLjczNy41MzVsMS42MzQuMjU2YTEgMSAwIDAgMSAuNTg4IDEuODA2bC0xLjE3MiAxLjE2OGExIDEgMCAwIDAtLjI4Mi44NjZsLjI1OSAxLjYxM2ExIDEgMCAwIDEtMS41NDEgMS4xMzRsLTEuNDY1LS43NWExIDEgMCAwIDAtLjkxMiAwbC0xLjQ2NS43NWExIDEgMCAwIDEtMS41MzktMS4xMzNsLjI1OC0xLjYxM2ExIDEgMCAwIDAtLjI4Mi0uODY3bC0xLjE1Ni0xLjE1MmExIDEgMCAwIDEgLjU3Mi0xLjgyMmwxLjYzMy0uMjU2YTEgMSAwIDAgMCAuNzM3LS41MzV6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=" }
        ] 
    },
    // Stage 3 dan seterusnya bisa ditambahkan dengan format yang sama
],
            // --- GANTI DENGAN STRUKTUR BARU INI ---
moduleContent: {
    // === STAGE 1: FUNDAMENTALS ===

    "m1-1": {
        lessons: [
            { 
                type: 'video', 
                title: 'Introduction to Growth Mindset', 
                duration: 129,
                videoSrc: 'ASSET/Growth_Mindset.mp4',
                popupQuiz: {
                    question: 'What is the core belief of a growth mindset?',
                    options: ['Talent is everything', 'Abilities can be developed', 'Avoid failure at all costs'],
                    correctAnswer: 1,
                    triggerAt : 70
                }
            },
            { 
                type: 'video', 
                title: 'Effort vs. Talent', 
                duration: 30,
                popupQuiz: {
                    question: 'How is "effort" viewed in a growth mindset?',
                    options: ['A sign of low talent', 'A necessary path to mastery', 'Something to hide'],
                    correctAnswer: 1,
                    triggerAt: 20
                }
            },
            { 
                type: 'article', 
                title: 'Case Study: Applying Growth Mindset in Sales', 
                duration: '9 min',
                content: `
        <div class="prose max-w-none p-8 bg-white rounded-lg">
    
<h1 style="font-size: 2.5em; color: #1a1a1a; margin-bottom: 0; line-height: 1.2;">From "It's Too Expensive" to "Tell Me More"</h1>
    
    <h4 style="font-size: 1.2em; color: #666666; margin-top: 5px; font-weight: normal; border-bottom: 1px solid #eeeeee; padding-bottom: 20px; margin-bottom: 30px;">A Sales Rep's Journey to a Growth Mindset</h4>
    
    <p style="font-size: 1.1em;">This case study explores the journey of Sarah, a sales representative, as she transitions from a "fixed mindset" to a "growth mindset," fundamentally changing her approach to sales and achieving remarkable professional results.</p>
    
    <h3 style="font-size: 1.8em; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 40px;">Hitting the Wall: The "Fixed Mindset" Barrier</h3>
    
    <p>In her early stages, Sarah's performance plateaued. She believed her abilities were fixed and that failure was a final verdict on her skills. This led to three primary obstacles:</p>
    
    <ul style="padding-left: 20px;">
        <li style="margin-bottom: 15px;"><strong>Price Objections:</strong> She accepted a client's "it's too expensive" at face value, assuming the product was simply overpriced for the market.</li>
        <li style="margin-bottom: 15px;"><strong>Perceived Feature Gaps:</strong> She saw the product's lack of certain competitor features as a product development failure, not a sales challenge to overcome.</li>
        <li style="margin-bottom: 15px;"><strong>The Talent Ceiling:</strong> She felt she had reached her maximum potential, believing that great salespeople are born, not made.</li>
    </ul>

    <h3 style="font-size: 1.8em; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 40px;">The Turning Point: Discovering a New Perspective</h3>
    
    <p>A professional development workshop introduced Sarah to the idea that skills can be developed through dedication and effort. She began to see challenges not as roadblocks, but as opportunities for growth, and viewed rejection as valuable feedback.</p>

    <h3 style="font-size: 1.8em; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 40px;">From Selling to Solving: The New Strategy in Action</h3>
    
    <p>Armed with this new perspective, Sarah shifted her focus from "closing a deal" to genuinely solving her clients' problems. Her new methods included:</p>
    
    <ul style="padding-left: 20px;">
        <li style="margin-bottom: 15px;">
            <strong>Digging Deeper than Price:</strong>
            <p style="margin-top: 5px; margin-bottom: 0;">Instead of ending the conversation on price, she asked probing questions to understand the client's value perception. This often revealed the core issue wasn't the price, but that the product's Return on Investment (ROI) hadn't been clearly communicated.</p>
        </li>
        <li style="margin-bottom: 15px;">
            <strong>Selling Value, Not Features:</strong>
            <p style="margin-top: 5px; margin-bottom: 0;">Rather than defending missing features, she focused on the client's underlying needs. By asking <i>"What problem are you trying to solve with that feature?"</i>, she could demonstrate how her product offered a better solution to the core problem.</p>
        </li>
        <li style="margin-bottom: 15px;">
            <strong>Continuous Learning and Iteration:</strong>
            <p style="margin-top: 5px; margin-bottom: 0;">Every interaction became a lesson. She actively A/B tested emails, refined presentations based on client reactions, and sought feedback. She now saw her abilities as a constantly evolving skillset.</p>
        </li>
    </ul>

    <h3 style="font-size: 1.8em; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 40px;">The Payoff: Success Beyond the Sales Numbers</h3>
    
    <p>By shifting her mindset, Sarah began to not only meet but exceed her sales targets. More importantly, she built stronger, trust-based relationships, becoming a valued consultant to her clients. Her newfound belief in her ability to grow reignited her passion for her career and unlocked potential she never knew she had.</p>

</div>
    `
            }
        ],
        knowledgeCheck: [
            { type: "multiple-choice", question: "Which statement best describes a growth mindset?", options: ["My intelligence is static.", "I can learn and grow my abilities.", "I avoid challenges to prevent failure.", "Feedback is criticism."], correctAnswer: 1 },
            { type: "multiple-choice", question: "What is a key benefit of embracing challenges?", options: ["It guarantees success.", "It's a chance to look smart.", "It leads to learning and resilience.", "It's unnecessary for growth."], correctAnswer: 2 },
            { type: "multiple-choice", question: "How should someone with a growth mindset view feedback?", options: ["As an insult", "As a distraction", "As an opportunity to improve", "As something to ignore"], correctAnswer: 2 }
        ]
    },

    "m1-2": {
        lessons: [
            { 
                type: 'video', 
                title: 'Core Features & Architecture', 
                duration: 90
            },
            { 
                type: 'video', 
                title: 'Feature vs. Benefit: Selling Value, Not Specs', 
                duration: 90,
                popupQuiz: {
                    question: 'What is a "benefit"?',
                    options: ['A technical specification of the product', 'What the product does for the customer', 'The price of the product'],
                    correctAnswer: 1,
                    triggerAt: 30
                }
            },
            { 
                type: 'article', 
                title: 'Understanding the Competitive Landscape', 
                duration: '10 min'
            }
        ],
        knowledgeCheck: [
            { type: "multiple-choice", question: "What is the primary goal of explaining benefits over features?", options: ["To show technical expertise", "To connect the product to the customer's needs", "To make the product seem more complex", "To fill time during a demo"], correctAnswer: 1 },
            { type: "multiple-choice", question: "Why is knowing your competition important?", options: ["To criticize them to the customer", "To understand your unique selling points", "To copy their features exactly", "It is not important"], correctAnswer: 1 }
        ]
    },

    "m1-3": {
        lessons: [
            { 
                type: 'video', 
                title: 'The AIO Method: Acknowledge, Isolate, Overcome', 
                duration: 60,
                popupQuiz: {
                    question: 'What does the "I" in AIO stand for?',
                    options: ['Investigate', 'Impress', 'Isolate'],
                    correctAnswer: 2,
                    triggerAt:20
                }
            },
            { 
                type: 'video', 
                title: 'Deconstructing the Price Objection', 
                duration: '20 min'
            },
            { 
                type: 'article', 
                title: 'Handling "We\'re happy with our current solution"', 
                duration: '12 min'
            }
        ],
        knowledgeCheck: [
            { type: "multiple-choice", question: "What is the first step when a customer gives an objection?", options: ["Offer a discount immediately", "Politely disagree", "Listen and acknowledge their concern", "Change the subject"], correctAnswer: 2 },
            { type: "multiple-choice", question: "When a customer says the price is too high, they are often questioning its...", options: ["Color", "Value", "Name", "Origin"], correctAnswer: 1 }
        ]
    },

    // === STAGE 2: ADVANCED TECHNIQUES ===

    "m2-1": {
        lessons: [
            { 
                type: 'video', 
                title: 'Active Listening & Powerful Questions', 
                duration: 40,
                popupQuiz: {
                    question: 'Which is an example of an open-ended question?',
                    options: ['"Do you like this feature?"', '"Can you tell me more about that problem?"', '"Is the budget approved?"'],
                    correctAnswer: 1,
                    triggerAt:20
                }
            },
            { 
                type: 'video', 
                title: 'Diagnosing Customer Pain Points', 
                duration: '18 min'
            },
            { 
                type: 'article', 
                title: 'Presenting Solutions, Not Products', 
                duration: '11 min' 
            }
        ],
        knowledgeCheck: [
            { type: "multiple-choice", question: "What is the goal of a consultative approach?", options: ["To sell as fast as possible", "To become a trusted advisor", "To talk about yourself", "To only talk about product features"], correctAnswer: 1 },
            { type: "multiple-choice", question: "A 'pain point' refers to a customer's...", options: ["Favorite hobby", "Specific problem or challenge", "Budget for the year", "Office location"], correctAnswer: 1 }
        ]
    },

    "m2-2": {
        lessons: [
            { 
                type: 'video', 
                title: 'Understanding Sales Stages: From Lead to Close', 
                duration: 100,
                popupQuiz: {
                    question: 'What is the typical first stage of a sales pipeline?',
                    options: ['Negotiation', 'Closed-Won', 'Prospecting/Lead'],
                    correctAnswer: 2,
                    triggerAt: 30
                }
            },
            { 
                type: 'article', 
                title: 'Forecasting & Probability', 
                duration: '15 min'
            },
            { 
                type: 'video', 
                title: 'Tools for Effective Pipeline Management (CRM)', 
                duration: '12 min' 
            }
        ],
        knowledgeCheck: [
            { type: "multiple-choice", question: "What does a healthy sales pipeline look like?", options: ["Full of old, stagnant deals", "Empty", "Balanced with deals across all stages", "Only contains deals about to close"], correctAnswer: 2 },
            { type: "multiple-choice", question: "What is the main purpose of a CRM?", options: ["To send spam emails", "To organize and track customer interactions", "To design marketing brochures", "To chat with colleagues"], correctAnswer: 1 }
        ]
    }
},
            caseLibrary: [
                { id: 'case001', title: 'Startup SaaS Subscription', description: 'A tech startup is hesitant about your monthly subscription cost, preferring a competitor\'s one-time fee model.', tags: ['Tech', '$10k - $25k', 'Price Objection'],fullCase: `
        <h3 class="text-xl font-bold text-slate-800 mb-4">Client Background</h3>
        <p class="mb-6 text-slate-700">The potential client is "InnovateForward", a fast-growing tech startup with 50 employees. They have just secured Series A funding and are looking to optimize their workflow with a new project management tool. Their CTO, Sarah, is the main decision-maker. She is technically proficient but also very budget-conscious after being instructed by her CEO to manage burn rate carefully.</p>
        
        <h3 class="text-xl font-bold text-slate-800 mb-4">The Challenge</h3>
        <p class="mb-6 text-slate-700">You have completed an initial product demo. Sarah likes the features of your SaaS product, especially the collaboration and reporting tools. However, she has expressed strong reservations about your subscription model ($20/user/month). A key competitor offers a similar, albeit less powerful, tool for a one-time perpetual license fee of $15,000. Sarah mentioned, "A one-time fee feels safer and more predictable for our budget."</p>
        
        <h3 class="text-xl font-bold text-slate-800 mb-4">Your Task</h3>
        <p class="text-slate-700">Your objective in this simulation is to persuade Sarah that the subscription model provides better long-term value and is a smarter financial decision for her growing company than the competitor's one-time fee. You need to address her budget concerns while highlighting the hidden costs and limitations of a perpetual license model (e.g., paid upgrades, support contracts, lack of innovation).</p>
    `, aiScript: { start: "Thanks for the demo, but I'm not sure about the monthly fee. Your competitor offers a one-time purchase which seems safer for our budget.", responses: { "value": "A one-time fee is attractive, but our subscription ensures you always have the latest features and support. How much do you currently spend on software maintenance?", "roi": "That's a fair point. Let's break down the ROI. With our included support and updates, most clients save over 20% in the first year compared to one-time purchase models with paid upgrades." } }, feedback: [ { positive: true, text: "Good job trying to reframe the conversation around value instead of just price." }, { positive: false, text: "You could be more direct in asking about their current pain points to better tailor your value proposition." } ] },
                { id: 'case002', title: 'Enterprise Software Deal', description: 'A large corporation is interested but requires significant custom features and a longer trial period than standard.', tags: ['Enterprise', '>$100k', 'Feature Request'],fullCase: `
        <h3 class="text-xl font-bold text-slate-800 mb-4">Client Background</h3>
        <p class="mb-6 text-slate-700">The client is "GlobalCorp Logistics", a Fortune 500 company specializing in international supply chain management. They currently operate using a decade-old, on-premise legacy system for their core logistics tracking. The system is stable but rigid, inefficient, and costly to maintain. Your main contact is David Chen, the Director of Operations. David is experienced and highly respected, but also very risk-averse. A major software migration failure happened under his predecessor, and he is determined not to repeat that mistake.</p>
        
        <h3 class="text-xl font-bold text-slate-800 mb-4">The Challenge</h3>
        <p class="mb-6 text-slate-700">David is impressed with your platform's modern interface and analytics capabilities. However, he has two major roadblocks. First, for your platform to be viable, it needs a deep, two-way integration with their proprietary inventory management system, which their internal team built. This is a significant custom feature request. Second, due to their extensive internal security review and procurement process, their standard policy requires a 90-day trial period, far longer than your standard 30-day trial.</p>
        
        <h3 class="text-xl font-bold text-slate-800 mb-4">Your Task</h3>
        <p class="text-slate-700">Your objective is not to close the entire deal in one call, but to secure commitment for the next logical step: a **paid Proof-of-Concept (PoC)**. You must address both of David's concerns. For the custom integration, you should avoid promising to build it for free and instead steer the conversation towards scoping it as part of the PoC. For the 90-day trial, you need to reframe the request from a simple 'free trial extension' into a structured, paid pilot program with defined success criteria and dedicated support, justifying why this is better for a company of their scale.</p>
    `, aiScript: { start: "Your platform looks promising, but we need integrations with our legacy systems, and a 30-day trial isn't enough for our team to validate it.", responses: {} }, feedback: [ { positive: true, text: "You correctly identified the need to involve a solutions architect for the custom features." }, { positive: false, text: "Try to quantify the value of a paid pilot program instead of immediately agreeing to a longer free trial." } ] }
            ],
            peerSessions: [ 
                { id: 'ps001', topic: "Role-playing difficult client objections", description: "Let's practice handling tough questions about pricing and features. I can be the client first.", link: "https://meet.google.com/xyz-abc-def", author: "Sarah J.", participant: "Mike L." },
                { id: 'ps002', topic: "Enterprise Deal Strategy Session", description: "I'm working on a large enterprise account and would love to brainstorm some strategies for navigating their procurement process.", link: "https://meet.google.com/xyz-abc-def", author: "Mike L.", participant: null }
            ],

            // Hapus 'rolePlayScripts' yang lama dan ganti dengan ini:
        rolePlayCases: {
    "c1": { // ID dari module challenge
        title: "Handling a Price-Conscious Client",
        // Briefing untuk peran Sales

        starterPrompt: "Thanks for the presentation, it looks good. But to be frank, our main concern right now is the price. How flexible can you be on that?",
    // -----------------------------------------
        salesBriefing: {
            objective: "Your goal is to convince the client to schedule a full product demo next week.",
            problem: "The client is very interested in the product but has repeatedly mentioned their limited budget. You must demonstrate value that outweighs the cost."
        },
        // Briefing untuk peran Customer
        customerBriefing: {
            objective: "Your goal is to get a significant discount (at least 20%) or walk away.",
            problem: "You genuinely need a new CRM and this product seems perfect, but your boss has given you a very strict budget. You cannot approve the purchase at the current list price."
        },
        // Rubrik Penilaian (digunakan oleh Customer untuk menilai Sales)
        reviewRubric: [
            { id: 'empathy', criterion: "Empathy & Understanding", description: "Did the sales rep listen and acknowledge your budget concerns?" },
            { id: 'value_prop', criterion: "Value Proposition", description: "Did they effectively communicate the product's value beyond just its features?" },
            { id: 'solutioning', criterion: "Problem Solving", description: "Did they offer creative solutions or compromises instead of just saying no?" },
            { id: 'next_steps', criterion: "Clarity on Next Steps", description: "Was the call concluded with a clear, actionable next step?" }
        ]
    },
    // Anda bisa menambahkan kasus-kasus lain dengan ID "c2", "c3", dst.
},

// Kita juga butuh tempat untuk menyimpan sesi-sesi yang sedang berjalan
peerRolePlaySessions: [],
        };

        let currentModule = null, currentGateId = null, selectedCaseId = null;
        let lessonState = {
            moduleId: null,
            steps: [],
            currentStepIndex: 0,
            selectedOptionIndex: null,
            isAnswerChecked: false
        };
        
        let ui = {};

        function showPage(pageToShow) {
            [ui.landingPage, ui.loginPage, ui.lmsApp].forEach(page => page.classList.add('hidden', 'opacity-0'));
            pageToShow.classList.remove('hidden');
            setTimeout(() => pageToShow.classList.remove('opacity-0'), 50);
        }
        
       // GANTI FUNGSI showLmsView LAMA ANDA DENGAN INI
    function showLmsView(viewToShow) {
    // Sembunyikan SEMUA view yang mungkin ada
    [
        ui.dashboardView, ui.learningPathView, ui.notesView,
        ui.peerLearningView, ui.moduleDetailView, ui.learningModuleView,
        ui.managerDashboardView, ui.employeeDetailView // <-- Pastikan ini ada
    ].forEach(view => {
        if (view) view.classList.add('hidden');
    });

    // Nonaktifkan semua link sidebar
    [ui.navDashboard, ui.navPath, ui.navNotes, ui.navPeer, ui.aiPracticeBtn].forEach(link => {
        if (link) link.classList.remove('active');
    });
    
    // Logika untuk menyembunyikan/menampilkan elemen utama
    const isFocusView = viewToShow === ui.moduleDetailView || viewToShow === ui.learningModuleView || viewToShow === ui.employeeDetailView;
    if (ui.mainSidebar) ui.mainSidebar.classList.toggle('hidden', isFocusView);
    if (ui.mainHeader) ui.mainHeader.classList.toggle('hidden', isFocusView || viewToShow === ui.managerDashboardView || viewToShow === ui.employeeDetailView);

    // Tampilkan view yang dituju
    if (viewToShow) viewToShow.classList.remove('hidden');
    
    // Atur judul header dan link aktif di sidebar
    if (viewToShow === ui.dashboardView) { ui.mainHeaderTitle.textContent = "Dashboard"; if(ui.navDashboard) ui.navDashboard.classList.add('active'); } 
    else if (viewToShow === ui.learningPathView) { ui.mainHeaderTitle.textContent = "Learning Path"; if(ui.navPath) ui.navPath.classList.add('active'); }
    else if (viewToShow === ui.notesView) { ui.mainHeaderTitle.textContent = "My Notes"; if(ui.navNotes) ui.navNotes.classList.add('active'); renderNotes(); }
    else if (viewToShow === ui.peerLearningView) { ui.mainHeaderTitle.textContent = "Peer Learning"; if(ui.navPeer) ui.navPeer.classList.add('active'); renderPeerSessions(); }
    else if (viewToShow === ui.managerDashboardView) { ui.mainHeaderTitle.textContent = "Team Dashboard"; }
}

    // GANTI FUNGSI isModuleUnlocked LAMA ANDA DENGAN VERSI BARU INI
        function isModuleUnlocked(moduleId) {
    const allModulesInOrder = state.learningPath.flatMap(stage => stage.modules);
    const moduleIndex = allModulesInOrder.findIndex(m => m.id === moduleId);

    // Modul pertama selalu tidak terkunci
    if (moduleIndex === 0) {
        console.log(`Pengecekan untuk modul '${moduleId}': Unlocked (modul pertama)`);
        return true;
    }

    // Jika modul tidak ditemukan, anggap terkunci
    if (moduleIndex < 0) {
        console.log(`Pengecekan untuk modul '${moduleId}': Locked (modul tidak ditemukan)`);
        return false;
    }

    const previousModuleId = allModulesInOrder[moduleIndex - 1].id;
    
    // Cek apakah modul sebelumnya sudah ada di data penyelesaian
    const isUnlocked = state.currentUser.completionData.some(data => data.moduleId === previousModuleId);

    console.log(`Pengecekan untuk modul '${moduleId}': Perlu '${previousModuleId}' selesai. Hasil: ${isUnlocked ? 'UNLOCKED' : 'LOCKED'}`);
    
    return isUnlocked;
}

        // GANTI FUNGSI getNextModule LAMA ANDA DENGAN INI
        function getNextModule() {
    // Logika baru: Ambil daftar ID modul yang sudah selesai dari completionData
    const completedModuleIds = state.currentUser.completionData.map(data => data.moduleId);

    for (const stage of state.learningPath) {
        for (const module of stage.modules) {
            // Cek ke daftar ID yang baru
            if (!completedModuleIds.includes(module.id) && isModuleUnlocked(module.id)) {
                return module;
            }
        }
    }
    return null;
}

        // GANTI FUNGSI LAMA DENGAN INI
        function updateUI() {
    const user = state.currentUser;
    if (!user || user.type !== 'employee') return; // Hanya update jika yg login employee

    // Update Dashboard stats
    document.getElementById('xp-text-dashboard').textContent = `${user.xp} XP`;
    document.querySelector('#dashboard-view #streak-count').textContent = user.streak;
    document.querySelector('#dashboard-view #modules-completed').textContent = user.completionData.length;

    // Update Sidebar profile
    document.querySelector('aside .font-bold.text-lg').textContent = user.name;
    document.querySelector('aside .text-sm.text-slate-500').textContent = user.division;
    document.querySelector('aside p#xp-text').textContent = `${user.xp} / ${user.levelXP} XP`;
    document.querySelector('#xp-bar').style.width = `${(user.xp / user.levelXP) * 100}%`;
    document.querySelector('#sidebar-user-avatar').src = `https://placehold.co/100x100/E0F2FE/00539F?text=${user.avatar}`;


    // Update Header profile
    document.getElementById('header-user-name').textContent = user.name;
    document.getElementById('header-user-division').textContent = user.division;
    document.getElementById('header-user-avatar').src = `https://placehold.co/40x40/E0F2FE/00539F?text=${user.avatar}`;

    

    // Update "Continue Learning"
    const nextModule = getNextModule();
    if (nextModule) {
        ui.nextModuleTitle.textContent = nextModule.title;
        ui.continueLearningBtn.disabled = false;
    } else {
        ui.nextModuleTitle.textContent = "All modules completed!";
        ui.continueLearningBtn.disabled = true;
    }

    renderLearningPath();
    populateLeaderboardFilters();
    filterAndRenderLeaderboard();
}

        function populateLeaderboardFilters() {
            const branches = [...new Set(state.leaderboard.map(u => u.branch))];
            const divisions = [...new Set(state.leaderboard.map(u => u.division))];

            ui.branchFilter.innerHTML = '<option value="all">All Branches</option>' + branches.map(b => `<option value="${b}">${b}</option>`).join('');
            ui.divisionFilter.innerHTML = '<option value="all">All Divisions</option>' + divisions.map(d => `<option value="${d}">${d}</option>`).join('');
        }

        function filterAndRenderLeaderboard() {
            const selectedBranch = ui.branchFilter.value;
            const selectedDivision = ui.divisionFilter.value;

            let filteredLeaderboard = state.leaderboard.filter(user => {
                const branchMatch = selectedBranch === 'all' || user.branch === selectedBranch;
                const divisionMatch = selectedDivision === 'all' || user.division === selectedDivision;
                return branchMatch && divisionMatch;
            });
            
            filteredLeaderboard.sort((a, b) => b.xp - a.xp);
            
            const fullLeaderboardSorted = [...state.leaderboard].sort((a,b) => b.xp - a.xp);
            const userRank = fullLeaderboardSorted.findIndex(u => u.isUser) + 1;
            ui.userRank.textContent = `#${userRank}`;

            renderLeaderboard(filteredLeaderboard);
        }

        function renderLeaderboard(boardData) {
            ui.leaderboard.innerHTML = boardData.slice(0, 10).map((u, i) => {
                const rank = i + 1;
                let rankColor = 'text-slate-400';
                if (rank === 1) rankColor = 'text-amber-400';
                if (rank === 2) rankColor = 'text-slate-400';
                if (rank === 3) rankColor = 'text-amber-600';

                return `<li class="flex items-center gap-3 p-2 rounded-lg ${u.isUser ? 'bg-sky-50' : ''}">
                    <span class="font-bold text-lg w-6 text-center ${rankColor}">${rank}</span>
                    <img src="https://placehold.co/32x32/${u.isUser ? 'E0F2FE/00539F' : 'F1F5F9/475569'}?text=${u.avatar}" alt="${u.name}" class="rounded-full">
                    <div class="flex-grow">
                        <p class="text-sm font-bold ${u.isUser ? 'text-sky-600' : 'text-slate-800'}">${u.name}</p>
                        <p class="text-xs text-slate-500">${u.branch} - ${u.division}</p>
                    </div>
                    <span class="text-sm font-bold text-slate-600">${u.xp} XP</span>
                </li>`;
            }).join('');
        }

        
    function renderLearningPath() {
    // Ambil dulu daftar ID modul yang sudah selesai agar lebih efisien
    const completedModuleIds = state.currentUser.completionData.map(data => data.moduleId);

    ui.learningPath.innerHTML = state.learningPath.map(stage => {
        // ... (di dalam ui.learningPath.innerHTML = state.learningPath.map(stage => { ... }))
    const modulesHTML = stage.modules.map(mod => {
        // --- PERUBAHAN DIMULAI DI SINI ---

        // 1. Definisikan ID modul yang aktif untuk demo
        const isCompleted = completedModuleIds.includes(mod.id);
const isUnlocked = isModuleUnlocked(mod.id);

let statusClass = 'locked';
if (isCompleted) statusClass = 'completed';
else if (isUnlocked) statusClass = 'unlocked';

// Handler sekarang hanya memanggil fungsi pusat. Jauh lebih bersih dan aman!
const handler = isUnlocked ? `handleModuleClick('${mod.id}')` : '';
        
        // Jika modul masih locked, 'handler' akan tetap kosong, sehingga tidak bisa diklik.

        // --- PERUBAHAN SELESAI ---

        const actionText = isCompleted ? 'Review' : (mod.type === 'challenge' ? 'Start Challenge' : 'Start Module');
        const icon = isUnlocked ? 'play-circle' : 'lock';

        return `
            <div id="${mod.id}" class="module-card ${statusClass}" ${handler ? `onclick="${handler}"` : 'style="cursor: not-allowed;"'}>
                <div class="module-card-content">
                    <div>
                        <p class="module-card-header">${mod.type === 'challenge' ? 'Challenge' : 'Module'}</p>
                        <h3 class="module-card-title">${mod.title}</h3>
                    </div>
                    <div class="module-card-meta">
                        <span><i data-feather="clock" class="w-4 h-4"></i>${mod.durationInMinutes ? mod.durationInMinutes + ' Minute' : mod.duration}</span>
                    </div>
                    <div class="module-card-footer">
                        <div class="module-card-action">
                            <i data-feather="${icon}" class="w-5 h-5"></i>
                            <span>${isUnlocked ? actionText : 'Locked'}</span>
                        </div>
                    </div>
                </div>
                <div class="module-card-aside">
                    <img src="${mod.badge}" alt="Badge">
                    <span>${mod.xp} XP</span>
                </div>
            </div>
        `;
    }).join('');
// ...

        return `
            <div class="stage-container mb-12">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-slate-800">${stage.title}</h2>
                    <p class="text-sm font-medium text-slate-600">
                        ${stage.xpThreshold ? `Requires ${stage.xpThreshold} XP to unlock` : 'Your starting stage'}
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${modulesHTML}
                </div>
            </div>
        `;
    }).join('');
    
    feather.replace();
}
        
        function findModule(moduleId) {
            for (const stage of state.learningPath) {
                const module = stage.modules.find(m => m.id === moduleId);
                if (module) return { stage, module };
            }
            return null;
        }

        function openModal(modal) { modal.classList.remove('hidden'); setTimeout(() => { modal.classList.remove('opacity-0'); (modal.querySelector('.modal-content') || modal).classList.remove('scale-95'); }, 10); }
        function closeModal(modal) { modal.classList.add('opacity-0'); (modal.querySelector('.modal-content') || modal).classList.add('scale-95'); setTimeout(() => { modal.classList.add('hidden'); }, 300); }
  
        
    // GANTI TOTAL FUNGSI renderNoteMarkers DENGAN INI
    function renderNoteMarkers(moduleId, lessonIndex) {
    // Target kita sekarang adalah progress bar kustom
    const markersContainer = document.getElementById('custom-progress-bar-container');
    const videoElement = document.getElementById('current-video-player');

    if (!markersContainer || !videoElement) return;

    // Bersihkan marker lama sebelum menggambar yang baru
    markersContainer.querySelectorAll('.note-marker').forEach(marker => marker.remove());

    const lessonNotes = state.currentUser.notes.filter(note => note.moduleId === moduleId && note.lessonIndex === lessonIndex);
    const videoDuration = videoElement.duration;

    if (isNaN(videoDuration) || videoDuration <= 0) return;

    lessonNotes.forEach(note => {
        const marker = document.createElement('div');
        marker.className = 'note-marker';

        // Perhitungan posisi tetap sama, tapi sekarang DIJAMIN relatif terhadap progress bar
        const positionPercentage = (note.timestamp / videoDuration) * 100;
        marker.style.left = `${positionPercentage}%`;

        marker.onclick = () => {
            alert(`Note at ${formatTime(note.timestamp)}:\n\n${note.text}`);
            videoElement.currentTime = note.timestamp; // Bonus: Klik marker akan lompat ke waktu video
        };
        
        markersContainer.appendChild(marker);
    });
}

// Pastikan fungsi ini ada
    function formatTime(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (Math.floor(seconds % 60)).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// GANTI LAGI FUNGSI displayModuleContent DENGAN VERSI FINAL INI
    function displayModuleContent(moduleId, itemIndex) {
    const content = state.moduleContent[moduleId];
    const item = content.lessons[itemIndex];
    if (!item) return;

    videoSimulator.moduleId = moduleId;
    videoSimulator.lessonIndex = itemIndex;
    document.querySelectorAll('.toc-item').forEach(el => el.classList.toggle('active', parseInt(el.dataset.index) === itemIndex));
    ui.contentTitle.textContent = item.title;
    ui.contentDescription.textContent = `In this ${item.type}, you'll learn about the key concepts of ${item.title}.`;

    if (item.type === 'video') {
        ui.contentArea.innerHTML = `
            <div class="relative group bg-slate-800 rounded-lg overflow-hidden">
                <video class="w-full aspect-video" id="current-video-player" src="${item.videoSrc}"></video>
                
                <div class="custom-video-controls absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="custom-video-progress-bar" id="custom-progress-bar-container">
                        <div id="video-progress-fill"></div>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center gap-4">
                            <button id="custom-play-btn" class="text-white hover:text-sky-300 transition-colors"><i data-feather="play" class="w-6 h-6"></i></button>
                            <button id="custom-volume-btn" class="text-white hover:text-sky-300 transition-colors"><i data-feather="volume-2" class="w-6 h-6"></i></button>
                            <span id="custom-time-display" class="text-white text-sm font-mono">00:00 / 00:00</span>
                        </div>
                        <button id="custom-fullscreen-btn" class="text-white hover:text-sky-300 transition-colors"><i data-feather="maximize" class="w-6 h-6"></i></button>
                    </div>
                </div>
            </div>
        `;

        const videoContainer = ui.contentArea.querySelector('.relative.group');
        const videoElement = document.getElementById('current-video-player');
        const playBtn = document.getElementById('custom-play-btn');
        const volumeBtn = document.getElementById('custom-volume-btn');
        const fullscreenBtn = document.getElementById('custom-fullscreen-btn');
        const timeDisplay = document.getElementById('custom-time-display');
        const progressFill = document.getElementById('video-progress-fill');
        const progressBarContainer = document.getElementById('custom-progress-bar-container');

        videoElement.addEventListener('loadedmetadata', () => {
            renderNoteMarkers(moduleId, itemIndex);
            timeDisplay.textContent = `${formatTime(0)} / ${formatTime(videoElement.duration)}`;
            renderLessonNotes(moduleId, itemIndex); // <-- TAMBAHKAN BARIS INI
        });
        
        let quizHasBeenTriggered = false;
        videoElement.addEventListener('timeupdate', () => {
            const progressPercent = (videoElement.currentTime / videoElement.duration) * 100;
            progressFill.style.width = `${progressPercent}%`;
            timeDisplay.textContent = `${formatTime(videoElement.currentTime)} / ${formatTime(videoElement.duration)}`;

            const currentTime = Math.floor(videoElement.currentTime);
            const lesson = state.moduleContent[moduleId].lessons[itemIndex];
            if (lesson.popupQuiz && currentTime === lesson.popupQuiz.triggerAt && !quizHasBeenTriggered) {
                quizHasBeenTriggered = true;
                videoElement.pause();
                showPopupQuiz(moduleId, itemIndex);
            }
        });

        playBtn.addEventListener('click', () => {
            if (videoElement.paused) videoElement.play();
            else videoElement.pause();
        });

        volumeBtn.addEventListener('click', () => {
            videoElement.muted = !videoElement.muted;
        });

        fullscreenBtn.addEventListener('click', () => {
            if (document.fullscreenElement) document.exitFullscreen();
            else videoContainer.requestFullscreen();
        });

        // --- PERBAIKAN DI SINI ---
        videoElement.addEventListener('play', () => {
            playBtn.innerHTML = `<i data-feather="pause" class="w-6 h-6"></i>`;
            feather.replace(); // Tambahkan ini
        });
        videoElement.addEventListener('pause', () => {
            playBtn.innerHTML = `<i data-feather="play" class="w-6 h-6"></i>`;
            feather.replace(); // Tambahkan ini
        });
        
        // --- DAN JUGA DI SINI ---
        videoElement.addEventListener('volumechange', () => {
            volumeBtn.innerHTML = videoElement.muted || videoElement.volume === 0 
                ? `<i data-feather="volume-x" class="w-6 h-6"></i>` 
                : `<i data-feather="volume-2" class="w-6 h-6"></i>`;
            feather.replace(); // Tambahkan ini
        });

        progressBarContainer.addEventListener('click', (e) => {
            const rect = progressBarContainer.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const barWidth = progressBarContainer.offsetWidth;
            const seekTime = (clickPosition / barWidth) * videoElement.duration;
            videoElement.currentTime = seekTime;
        });

    } else {
        ui.contentArea.innerHTML = item.content || '<p>Artikel belum tersedia.</p>';
    }
    
    feather.replace();
    setupNoteTakingSection(item);
}

function setupNoteTakingSection(item) {
    const oldNoteSection = document.getElementById('note-taking-section');
    if (oldNoteSection) oldNoteSection.remove();
    const noteSection = document.createElement('div');
    noteSection.id = 'note-taking-section';
    noteSection.className = 'mt-8 p-6 bg-white rounded-lg shadow';
    noteSection.innerHTML = `
        <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full flex justify-between items-center font-bold text-slate-700">
            <span><i data-feather="edit-3" class="inline-block -mt-1 mr-2 w-5 h-5"></i>Add a note</span>
            <i data-feather="chevron-down"></i>
        </button>
        <div class="hidden mt-4">
            <textarea id="inline-note-input" class="w-full h-24 p-3 border rounded-md" placeholder="Write your thoughts..."></textarea>
            <button onclick="handleSaveLessonNote()" class="mt-2 bg-sky-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-sky-700">Save Note</button>
        </div>
    `;
    ui.contentArea.insertAdjacentElement('afterend', noteSection);
    feather.replace();
}
function handleModuleClick(moduleId) {
    // Definisikan modul yang aktif di sini
    const activeModuleIds = ['m1-1', 'c1'];
    
    // Cari data modul dari state
    const { module } = findModule(moduleId);
    if (!module) return; // Jika modul tidak ditemukan, hentikan

    // Cek apakah modul yang diklik termasuk modul yang fungsional
    if (activeModuleIds.includes(moduleId)) {
        // --- JIKA FUNGSIONAL ---
        // Jalankan fungsi asli sesuai tipenya
        if (module.isRolePlayGate) {
            openRolePlayGate(moduleId);
        } else {
            openModule(moduleId);
        }
    } else {
        // --- JIKA HANYA DEMO ---
        // Tampilkan notifikasi modal yang sudah kita buat
        showNotification('Module in Development', 
            '<p class="mb-4">This module is not yet available.</p>' + 
            '<p class="font-semibold" style="color: var(--incorrect-red);">Please try The Growth Mindset module or the Stage 1 Final Test module for demo testing.</p>'
        );
    }
}
// GANTI TOTAL FUNGSI handleSaveLessonNote DENGAN VERSI FINAL INI
    // GANTI FUNGSI handleSaveLessonNote LAMA DENGAN INI
    function handleSaveLessonNote() {
    const noteInput = document.getElementById('inline-note-input');
    const noteText = noteInput.value.trim();
    const videoElement = document.getElementById('current-video-player');

    if (noteText && videoElement) {
        const currentTime = videoElement.currentTime;
        const newNote = {
            source: state.moduleContent[videoSimulator.moduleId].lessons[videoSimulator.lessonIndex].title,
            text: noteText,
            moduleId: videoSimulator.moduleId,
            lessonIndex: videoSimulator.lessonIndex,
            timestamp: currentTime
        };

        state.currentUser.notes.unshift(newNote);
        noteInput.value = '';
        alert('Note saved!');
        noteInput.parentElement.classList.add('hidden');
        
        renderNoteMarkers(videoSimulator.moduleId, videoSimulator.lessonIndex);
        renderLessonNotes(videoSimulator.moduleId, videoSimulator.lessonIndex); // <-- TAMBAHKAN BARIS INI
    }
}

// GANTI FUNGSI renderModuleDetail YANG LAMA DENGAN INI
function renderModuleDetail(moduleId) {
    const { module } = findModule(moduleId);
    const content = state.moduleContent[moduleId];
    let completedCount = 0; // Nanti bisa dikembangkan untuk tracking progress

    // Update judul di sidebar
    ui.moduleSidebarTitle.textContent = module.title;
    
    // Gabungkan lessons dan knowledgeCheck untuk daftar isi (Table of Contents)
    const tocItems = [...content.lessons];
    if (content.knowledgeCheck && content.knowledgeCheck.length > 0) {
        tocItems.push({ type: 'knowledge-check', title: 'Knowledge Check', duration: '5 min' });
    }

    // Render daftar isi (Table of Contents)
    ui.moduleToc.innerHTML = tocItems.map((item, index) => {
        const isKnowledgeCheck = item.type === 'knowledge-check';
        const icon = isKnowledgeCheck ? 'check-circle' : (item.type === 'video' ? 'video' : 'file-text');
        
        // Atur action onclick: display content atau langsung start lesson (untuk kuis)
        const action = isKnowledgeCheck 
            ? `startLesson('${moduleId}')` 
            : `displayModuleContent('${moduleId}', ${index})`;

        return `
            <a href="#" onclick="${action}" class="toc-item flex items-center gap-4 p-3 rounded-lg text-slate-600 hover:bg-slate-100" data-index="${index}">
                <i data-feather="${icon}" class="w-5 h-5 text-slate-400 flex-shrink-0"></i>
                <div class="flex-grow">
                    <p class="text-sm">${item.title}</p>
                </div>
                <i data-feather="check-circle" class="w-5 h-5 text-green-500 opacity-0"></i>
            </a>
        `;
    }).join('');

    feather.replace();

    // Tampilkan konten pertama secara default saat modul dibuka
    if (tocItems.length > 0) {
        displayModuleContent(moduleId, 0);
    }
}


        // GANTI FUNGSI LAMA DENGAN INI
function openModule(moduleId) {
    currentModule = findModule(moduleId).module;
    renderModuleDetail(moduleId);
    showLmsView(ui.moduleDetailView);
}

        function startLesson(moduleId) {
    closeModal(ui.videoModal); // Baris ini mungkin sudah tidak relevan tapi tidak apa-apa dibiarkan
    
    // UBAH BAGIAN INI
    const content = state.moduleContent[moduleId];
    if (!content || !content.knowledgeCheck || content.knowledgeCheck.length === 0) {
        console.error("No knowledge check questions for this module");
        alert("Knowledge check for this module is not available yet.");
        return;
    }
    
    state.user.lives = 5; 
    
    ui.lessonHearts.innerHTML = '';
    for(let i = 0; i < 5; i++) {
        const heartIcon = document.createElement('i');
        heartIcon.setAttribute('data-feather', 'heart');
        heartIcon.className = 'heart-icon w-6 h-6';
        ui.lessonHearts.appendChild(heartIcon);
    }
    feather.replace();
    updateHeartsUI();

    lessonState = {
        moduleId: moduleId,
        // UBAH BARIS INI JUGA
        steps: content.knowledgeCheck,
        currentStepIndex: 0,
        selectedOptionIndex: null,
        isAnswerChecked: false
    };
    
    showLmsView(ui.learningModuleView);
    renderCurrentLessonStep();
}

        function renderCurrentLessonStep() {
            ui.lessonCompletionScreen.classList.add('hidden');
            ui.lessonFailedScreen.classList.add('hidden');
            ui.lessonQuestion.parentElement.parentElement.classList.remove('hidden');

            const step = lessonState.steps[lessonState.currentStepIndex];
            ui.lessonQuestion.textContent = step.question;
            ui.lessonOptions.innerHTML = step.options.map((opt, index) => 
                `<button class="lesson-option border-slate-200 bg-white text-slate-700 p-4 rounded-xl text-left font-bold shadow-sm" onclick="handleOptionSelect(${index})">${opt}</button>`
            ).join('');

            const progress = (lessonState.currentStepIndex / lessonState.steps.length) * 100;
            ui.lessonProgressBar.style.width = `${progress}%`;

            resetButtons();
            setCharacterState('idle');
        }

        function handleOptionSelect(optionIndex) {
            if (lessonState.isAnswerChecked) return;
            lessonState.selectedOptionIndex = optionIndex;
            document.querySelectorAll('#lesson-options button').forEach((btn, index) => {
                btn.classList.toggle('selected', index === optionIndex);
            });
            ui.lessonCheckBtn.disabled = false;
            ui.lessonCheckBtn.classList.remove('bg-slate-200', 'text-slate-500', 'cursor-not-allowed', 'shadow-inner');
            ui.lessonCheckBtn.classList.add('bg-green-500', 'text-white', 'shadow-lg');
        }

        function checkAnswer() {
            console.log('checkAnswer dipanggil');
            if (lessonState.selectedOptionIndex === null || lessonState.isAnswerChecked) return;
            lessonState.isAnswerChecked = true;
            const step = lessonState.steps[lessonState.currentStepIndex];
            const isCorrect = lessonState.selectedOptionIndex === step.correctAnswer;
            
            const options = document.querySelectorAll('#lesson-options button');
            const selectedButton = options[lessonState.selectedOptionIndex];
            
            ui.lessonFooter.classList.remove('bg-green-100', 'bg-red-100');
            ui.feedbackTitle.classList.remove('text-green-600', 'text-red-600');
            ui.feedbackCorrectAnswer.textContent = '';
            
            ui.lessonCheckBtn.classList.add('hidden');
            ui.lessonContinueBtn.classList.remove('hidden');

            if (isCorrect) {
                selectedButton.classList.add('correct');
                ui.lessonFooter.classList.add('bg-green-100');
                ui.feedbackTitle.textContent = "Excellent!";
                ui.feedbackTitle.classList.add('text-green-600');
                ui.lessonContinueBtn.classList.add('bg-green-500');
                setCharacterState('correct');
            } else {
                state.user.lives--;
                updateHeartsUI();
                selectedButton.classList.add('incorrect');
                options[step.correctAnswer].classList.add('correct');
                ui.lessonFooter.classList.add('bg-red-100');
                ui.feedbackTitle.textContent = "Incorrect";
                ui.feedbackTitle.classList.add('text-red-600');
                ui.feedbackCorrectAnswer.textContent = `Correct answer: "${step.options[step.correctAnswer]}"`;
                ui.lessonContinueBtn.classList.add('bg-red-500');
                setCharacterState('incorrect');
            }
            
            ui.lessonFooter.classList.add('visible');
            
            if (state.user.lives > 0) {
                 ui.lessonContinueBtn.onclick = continueLesson;
            } else {
                ui.lessonContinueBtn.onclick = handleLessonFailure;
            }
        }
        
        function setCharacterState(state) {
            ui.lessonCharacter.className.baseVal = state;
        }

        function updateHeartsUI() {
            const heartIcons = ui.lessonHearts.querySelectorAll('.heart-icon');
            heartIcons.forEach((icon, index) => {
                if (index < state.user.lives) {
                    icon.classList.remove('lost', 'text-slate-300');
                    icon.classList.add('text-red-500', 'fill-current');
                } else {
                    icon.classList.add('lost', 'text-slate-300');
                    icon.classList.remove('text-red-500', 'fill-current');
                }
            });
        }
        
        function handleLessonFailure() {
            ui.lessonFooter.classList.remove('visible');
            showLessonFailedScreen();
        }

        function showLessonFailedScreen() {
            ui.lessonQuestion.parentElement.parentElement.classList.add('hidden');
            ui.lessonFooter.classList.add('hidden');
            ui.lessonFailedScreen.classList.remove('hidden');
        }

        function continueLesson() {
            ui.lessonFooter.classList.remove('visible');
            lessonState.currentStepIndex++;
            if (lessonState.currentStepIndex < lessonState.steps.length) {
                lessonState.selectedOptionIndex = null;
                lessonState.isAnswerChecked = false;
                renderCurrentLessonStep();
            } else {
                endLesson();
            }
        }

        function endLesson() {
            ui.lessonQuestion.parentElement.parentElement.classList.add('hidden');
            ui.lessonFooter.classList.add('hidden');
            ui.lessonCompletionScreen.classList.remove('hidden');
            ui.lessonProgressBar.style.width = '100%';

            const wasCompletedBefore = state.user.completedModules.includes(lessonState.moduleId);
            if (!wasCompletedBefore) {
                 state.user.xp += currentModule.xp;
                 state.user.completedModules.push(lessonState.moduleId);
                 ui.lessonXpAward.textContent = `You've earned ${currentModule.xp} XP!`;
            } else {
                 ui.lessonXpAward.textContent = `Great job reviewing this lesson!`;
            }
        }

        function closeLesson() {
            ui.lessonFooter.classList.add('hidden');
            updateUI();
            showLmsView(ui.learningPathView);
        }

        function resetButtons() {
            ui.lessonFooter.classList.remove('visible');
            ui.feedbackTitle.textContent = '';
            ui.feedbackCorrectAnswer.textContent = '';
            
            ui.lessonCheckBtn.disabled = true;
            ui.lessonCheckBtn.classList.remove('hidden');
            ui.lessonCheckBtn.classList.add('bg-slate-200', 'text-slate-500', 'cursor-not-allowed', 'shadow-inner');
            ui.lessonCheckBtn.classList.remove('bg-green-500', 'text-white', 'shadow-lg');
            
            ui.lessonContinueBtn.classList.add('hidden');
            ui.lessonContinueBtn.classList.remove('bg-green-500', 'bg-red-500');
            ui.lessonCheckBtn.onclick = checkAnswer;
        }
        
        function openRolePlayGate(gateId) {
            currentGateId = gateId;
            console.log("--- DATA SAAT AKAN DIBACA ---", JSON.parse(JSON.stringify(state.currentUser.rolePlayProgress)));
            if (!state.currentUser.rolePlayProgress[gateId]) {
              state.currentUser.rolePlayProgress[gateId] = [];
}
            const { stage, module } = findModule(gateId);
            const modal = document.getElementById('role-play-gate-modal');
            modal.querySelector('#rpg-modal-title').textContent = module.title.split(':')[0].trim();
            modal.querySelector('#rpg-modal-stage').textContent = module.title.split(':')[1].trim();
            renderRolePlayGate();
            openModal(modal);
        }

        
        function renderRolePlayGate() {
   
    const progress = state.currentUser.rolePlayProgress[currentGateId];
const completedCount = progress ? progress.length : 0;
    const modal = document.getElementById('role-play-gate-modal');
    // ... sisa fungsi Anda tetap sama ...
    const container = modal.querySelector('#rpg-sessions-container');
    
    let sessionHTML = '';
    for (let i = 1; i <= 3; i++) {
        const isCompleted = i <= completedCount;
        
        const statusClass = isCompleted ? 'bg-green-100' : 'bg-slate-100';
        const textClass = isCompleted ? 'text-green-700' : 'text-slate-500';
        const icon = isCompleted ? 'check-circle' : 'circle';

        sessionHTML += `
            <div class="flex-1 text-center">
                <div class="w-12 h-12 mx-auto rounded-full flex items-center justify-center ${statusClass}">
                    <i data-feather="${icon}" class="${textClass}"></i>
                </div>
                <p class="text-xs mt-2 font-semibold ${textClass}">Session ${i}</p>
            </div>
        `;
    }
    
    container.innerHTML = sessionHTML;

    const startButton = modal.querySelector('#start-rpg-session-btn');
    if (completedCount >= 3) {
        startButton.disabled = true;
        startButton.querySelector('span').textContent = 'Test Cleared!';
        startButton.classList.add('bg-green-500');
    } else {
        startButton.disabled = false;
        startButton.querySelector('span').textContent = 'Start Next Session';
        startButton.classList.remove('bg-green-500');
    }

    feather.replace();
}

        // function startRpgSession() {
        //     const progress = state.currentUser.rolePlayProgress[currentGateId];
        //     if (progress.length >= 3) return;
        //     const rolesPlayed = progress.map(s => s.role);
        //     const roles = ["Sales", "Customer"];
        //     let assignedRole;
        //     const hasPlayedSales = rolesPlayed.includes("Sales");
        //     const hasPlayedCustomer = rolesPlayed.includes("Customer");
        //     if (!hasPlayedSales) assignedRole = "Sales";
        //     else if (!hasPlayedCustomer) assignedRole = "Customer";
        //     else assignedRole = roles[Math.floor(Math.random() * roles.length)];
        //     progress.push({ role: assignedRole, completedAt: new Date() });
        //     if (progress.length >= 3) {
        //         const { module } = findModule(currentGateId);
        //         state.user.xp += module.xp;
        //         state.currentUser.completionData.push({ moduleId: currentGateId, completedAt: new Date().toISOString() });
        //         setTimeout(() => {
        //             closeModal(ui.rolePlayGateModal);
        //             updateUI();
        //         }, 1500);
        //     }
        //     renderRolePlayGate();
        // }

         // GANTI FUNGSI LAMA DENGAN VERSI BARU INI
    function startRpgSession() {
    const progress = state.currentUser.rolePlayProgress[currentGateId];
    if (progress.length >= 3) return;

    // Tutup modal gerbang sesi saat ini...
    closeModal(ui.rolePlayGateModal);
    
    // ...lalu mulai animasi pairing setelah jeda singkat
    setTimeout(startPairingAnimation, 300); 
}

// TAMBAHKAN DUA FUNGSI BARU INI DI MANA SAJA DI index.js

/**
 * Menjalankan urutan animasi pairing selama ~7.5 detik.
 */
    function startPairingAnimation() {
    const pairingModal = ui.rolePlayPairingModal;
    const statusText = pairingModal.querySelector('#pairing-status-text');
    const caseCard = pairingModal.querySelector('#case-card-reveal');
    const peerPlaceholder = pairingModal.querySelector('#peer-avatar-placeholder');
    const peerResult = pairingModal.querySelector('#peer-avatar-result');

    // 1. Reset tampilan modal ke kondisi awal
    statusText.innerHTML = '';
    caseCard.classList.add('opacity-0', 'scale-95');
    peerPlaceholder.classList.remove('hidden');
    peerResult.classList.add('hidden');
    
    // 2. Buka modal pairing
    openModal(pairingModal);

    // 3. Rangkaian animasi menggunakan setTimeout
    setTimeout(() => {
        statusText.innerHTML = `<span class="fade-in-out">Finding a peer for your session...</span>`;
    }, 500);

    setTimeout(() => {
        peerPlaceholder.classList.add('hidden');
        // Untuk demo, kita gunakan avatar statis
        peerResult.src = `https://placehold.co/100x100/c4b5fd/4338ca?text=SJ`; 
        peerResult.classList.remove('hidden');
        statusText.innerHTML = `<span class="fade-in-out">Peer Found! Preparing scenario...</span>`;
    }, 3000);

    setTimeout(() => {
        statusText.innerHTML = `<span class="text-green-400 font-bold">Match Ready!</span>`;
        const caseData = state.rolePlayCases[currentGateId];
        const userRole = 'Sales'; // Masih hardcoded untuk demo

        caseCard.querySelector('#case-title-reveal').textContent = caseData.title;
        caseCard.querySelector('#case-role-reveal').textContent = userRole;
        caseCard.classList.remove('opacity-0', 'scale-95');
    }, 5500);

    setTimeout(() => {
        closeModal(pairingModal);
        // Setelah animasi selesai dan modal tertutup, panggil modal briefing
        setTimeout(showBriefing, 300);
    }, 7500);
}

/**
 * Menampilkan modal briefing peran.
 */
function showBriefing() {
    const caseData = state.rolePlayCases[currentGateId];
    if (!caseData) {
        alert('Case data for this challenge is not found!');
        return;
    }
    const userRole = 'Sales'; // Masih hardcoded untuk demo
    const briefing = caseData.salesBriefing;

    document.getElementById('briefing-role').textContent = userRole;
    document.getElementById('briefing-objective').textContent = briefing.objective;
    document.getElementById('briefing-problem').textContent = briefing.problem;
    openModal(ui.rolePlayBriefingModal);
}

// TAMBAHKAN FUNGSI BARU INI
   // GANTI FUNGSI launchPairingAnimation ANDA DENGAN INI
        function launchPairingAnimation() {
    // Siapkan & buka modal animasi
    const statusText = document.getElementById('pairing-status-text');
    const caseCard = document.getElementById('case-card-reveal');
    
    // Reset tampilan
    statusText.innerHTML = '';
    caseCard.classList.add('opacity-0', 'scale-95');
    document.getElementById('peer-avatar-placeholder').classList.remove('hidden');
    document.getElementById('peer-avatar-result').classList.add('hidden');

    openModal(ui.rolePlayPairingModal);

    // Jalankan urutan animasi
    setTimeout(() => {
        statusText.innerHTML = `<span class="fade-in-out">Finding a peer for you...</span>`;
    }, 500);

    setTimeout(() => {
        document.getElementById('peer-avatar-placeholder').classList.add('hidden');
        const peerAvatar = document.getElementById('peer-avatar-result');
        peerAvatar.src = `https://placehold.co/100x100/c4b5fd/4338ca?text=SJ`;
        peerAvatar.classList.remove('hidden');
        statusText.innerHTML = `<span class="fade-in-out">Peer found! Analyzing case files...</span>`;
    }, 3000);

    setTimeout(() => {
        statusText.innerHTML = `<span style="color: var(--healthy-green);">Match Found!</span>`;
        
        // FIX: Menggunakan state.rolePlayScripts yang benar
        const scriptData = state.rolePlayScripts[currentGateId];
        document.getElementById('case-title-reveal').textContent = scriptData.title;
        document.getElementById('case-role-reveal').textContent = scriptData.userRole;
        
        caseCard.classList.remove('opacity-0', 'scale-95');

    }, 5500);

    setTimeout(() => {
        closeModal(ui.rolePlayPairingModal);
        setTimeout(() => {
            // FIX: Panggil fungsi launchRolePlaySession yang benar
            launchRolePlaySession(currentGateId);
        }, 300);
    }, 7500);
}

        // TAMBAHKAN FUNGSI BARU INI
    function launchRolePlaySession(moduleId) {
    const scriptData = state.rolePlayScripts[moduleId];
    if (!scriptData) {
        alert("Skenario role-play tidak ditemukan!");
        return;
    }

    // Siapkan state untuk sesi role-play
    currentRolePlay = {
        moduleId: moduleId,
        script: scriptData.script,
        currentTurn: "start"
    };

    // Isi detail di modal sesi role-play
    document.getElementById('rpg-session-title').textContent = scriptData.title;
    document.getElementById('rpg-session-role').textContent = `Anda berperan sebagai: ${scriptData.userRole}`;
    document.getElementById('rpg-interaction-window').innerHTML = '';

    // Buka modal & render giliran pertama
    openModal(ui.rolePlaySessionModal);
    renderRolePlayTurn(scriptData.script.start);
}

       

// Fungsi untuk menampilkan pesan di jendela chat
        function addChatMessage(message, role) {
    const bubble = document.createElement('div');
    const alignClass = role === 'user' ? 'self-end' : 'self-start';
    const colorClass = role === 'user' ? 'chat-bubble-user' : 'chat-bubble-peer';

    bubble.className = `chat-bubble ${alignClass} ${colorClass}`;
    bubble.textContent = message;

    // Tambahkan ke jendela chat dan auto-scroll
    ui.chatWindow.appendChild(bubble);
    ui.chatWindow.scrollTop = ui.chatWindow.scrollHeight;
}

// Fungsi untuk mensimulasikan balasan dari rekan
        function simulatePeerResponse() {
    const replies = [
        "Okay, I see your point.",
        "Can you explain that in more detail?",
        "That's interesting, but what about the budget?",
        "I'm not sure I agree with that.",
        "Alright, what's the next step then?"
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    addChatMessage(randomReply, 'peer');
}

// Fungsi yang dijalankan saat tombol "Send" diklik
        function handleSendMessage() {
    const message = ui.chatInput.value.trim();
    if (!message) return; // Jangan kirim pesan kosong

    // Tampilkan pesan pengguna
    addChatMessage(message, 'user');

    // Kosongkan input
    ui.chatInput.value = '';
    ui.chatInput.focus();

    // Tunggu sesaat lalu tampilkan balasan dari rekan (simulasi)
    setTimeout(simulatePeerResponse, 1500);
}

// Anda mungkin juga belum punya fungsi ini, tambahkan juga
    let currentRolePlay = {}; 

     function renderRolePlayTurn(turn) {
    if (!turn) return;

    const customerBubble = document.createElement('div');
    customerBubble.className = 'rpg-bubble rpg-bubble-customer';
    customerBubble.innerHTML = `<p>${turn.prompt}</p>`;
    ui.rpgInteractionWindow.appendChild(customerBubble);

    ui.rpgOptionsContainer.innerHTML = turn.options.map(opt => 
        `<button class="rpg-option-btn" onclick='handleRolePlayChoice(${JSON.stringify(opt)})'>${opt.text}</button>`
    ).join('');
    
    ui.rpgInteractionWindow.scrollTop = ui.rpgInteractionWindow.scrollHeight;
}
    // TAMBAHKAN FUNGSI INI
    function handleRolePlayChoice(option) {
    // Tampilkan jawaban yang dipilih user
    const userBubble = document.createElement('div');
    userBubble.className = 'rpg-bubble rpg-bubble-user-preview';
    userBubble.innerHTML = `<p>${option.text}</p>`;
    document.getElementById('rpg-interaction-window').appendChild(userBubble);
    
    // Matikan semua tombol opsi
    document.getElementById('rpg-options-container').querySelectorAll('button').forEach(btn => btn.disabled = true);
    
    // Auto-scroll ke bawah
    document.getElementById('rpg-interaction-window').scrollTop = document.getElementById('rpg-interaction-window').scrollHeight;

    if (option.next === "end") {
        setTimeout(completeRolePlaySession, 1500);
    } else {
        const nextTurn = currentRolePlay.script[option.next];
        currentRolePlay.currentTurn = option.next;
        // Jeda sesaat sebelum customer merespon
        setTimeout(() => renderRolePlayTurn(nextTurn), 1500);
    }
}
        function openCaseLibrary() {
            selectedCaseId = null;
            renderCaseLibrary();
            openModal(ui.caseLibraryModal);
        }

        function renderCaseLibrary() {
            const modal = document.getElementById('case-library-modal');
            const container = modal.querySelector('#case-library-container');
            container.innerHTML = state.caseLibrary.map(c => `<div id="case-${c.id}" class="case-card border-2 rounded-lg p-4 cursor-pointer bg-white transition" onclick="selectCase('${c.id}')"><h4 class="font-bold text-slate-800">${c.title}</h4><p class="text-sm text-slate-600 mt-1">${c.description}</p><div class="mt-3 flex flex-wrap gap-2">${c.tags.map(t => `<span class="text-xs font-semibold bg-slate-200 text-slate-700 px-2 py-1 rounded-full">${t}</span>`).join('')}</div></div>`).join('');
            modal.querySelector('#start-simulation-btn').disabled = true;
        }

        function selectCase(caseId) {
            selectedCaseId = caseId;
            document.querySelectorAll('.case-card').forEach(c => c.classList.remove('border-sky-500', 'ring-2', 'ring-sky-300'));
            document.getElementById(`case-${caseId}`).classList.add('border-sky-500', 'ring-2', 'ring-sky-300');
            document.getElementById('start-simulation-btn').disabled = false;
        }

        // REPLACE your old startSimulation function with this one.
    function startSimulation() {
    if (!selectedCaseId) return;
    const selectedCase = state.caseLibrary.find(c => c.id === selectedCaseId);
    if (!selectedCase) return;

    // 1. Populate the new briefing modal with the detailed case data
    ui.briefingModalTitle.textContent = selectedCase.title;
    ui.briefingModalContent.innerHTML = selectedCase.fullCase;

    // 2. Close the library modal
    closeModal(ui.caseLibraryModal);
    
    // 3. Open the new case briefing modal
    // We use a small delay to make the transition feel smoother
    setTimeout(() => {
        openModal(ui.caseBriefingModal);
    }, 300); // 300ms delay
}
// ADD THIS NEW FUNCTION anywhere in index.js
    function launchPlaceholderChat() {
    const modal = ui.aiSimulatorModal;
    
    // 1. Get the chat window and clear it
    const chatWindow = modal.querySelector('#chat-window');
    chatWindow.innerHTML = '';
    
    // 2. Create the placeholder message
    const placeholder = document.createElement('div');
    placeholder.className = 'text-center text-slate-500 p-8 bg-slate-100 rounded-lg';
    placeholder.innerHTML = `
        <i data-feather="message-circle" class="w-12 h-12 mx-auto mb-4 text-slate-400"></i>
        <h4 class="font-bold text-lg text-slate-700">AI Chat Simulation</h4>
        <p class="mt-2">The interactive chat is not enabled for this demo.</p>
        <p>In the final version, this is where you will practice the case scenario with our AI.</p>
    `;
    chatWindow.appendChild(placeholder);
    feather.replace();

    // 3. Hide the input field and send buttons
    modal.querySelector('#chat-input').classList.add('hidden');
    modal.querySelector('#send-btn').classList.add('hidden');
    modal.querySelector('#end-session-btn').classList.add('hidden');
    
    // 4. Show the "Back to Library" button instead
    const closeBtn = modal.querySelector('#close-feedback-btn');
    closeBtn.classList.remove('hidden');
    closeBtn.textContent = 'Close Simulation'; // Change button text

    // 5. Open the chat modal
    openModal(modal);
}

        function addChatMessage(message, isUser) {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble p-3 rounded-lg ${isUser ? 'chat-bubble-user self-end' : 'chat-bubble-ai self-start'}`;
            bubble.textContent = message;
            document.getElementById('chat-window').appendChild(bubble);
            document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
        }

        function handleUserMessage() {
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            if (!message) return;
            addChatMessage(message, true);
            input.value = '';
            setTimeout(() => {
                const selectedCase = state.caseLibrary.find(c => c.id === selectedCaseId);
                const aiResponses = selectedCase.aiScript.responses;
                const responseKey = Object.keys(aiResponses).find(key => message.toLowerCase().includes(key)) || 'default';
                const aiResponse = aiResponses[responseKey] || "That's interesting, tell me more.";
                addChatMessage(aiResponse, false);
            }, 1200);
        }

        // TAMBAHKAN FUNGSI BARU INI
    // GANTI KESELURUHAN FUNGSI renderLessonNotes DENGAN INI
function renderLessonNotes(moduleId, lessonIndex) {
    let notesListContainer = document.getElementById('lesson-notes-list-container');
    if (!notesListContainer) {
        notesListContainer = document.createElement('div');
        notesListContainer.id = 'lesson-notes-list-container';
        notesListContainer.className = 'mt-6 space-y-4';
        
        const noteTakingSection = document.getElementById('note-taking-section');
        if (noteTakingSection) {
            noteTakingSection.insertAdjacentElement('afterend', notesListContainer);
        }
    }

    const lessonNotes = state.currentUser.notes.filter(note => 
        note.moduleId === moduleId && note.lessonIndex === lessonIndex
    ).sort((a, b) => a.timestamp - b.timestamp);

    if (lessonNotes.length > 0) {
        notesListContainer.innerHTML = lessonNotes.map(note => `
            <div class="note-item flex items-start gap-4">
                <button class="timestamp-btn font-mono text-sm font-semibold text-sky-600 hover:text-sky-800 bg-sky-100 px-2 py-1 rounded-md mt-1" onclick="seekVideoTo(${note.timestamp})">
                    ${formatTime(note.timestamp)}
                </button>
                <div class="flex-grow bg-white p-4 rounded-lg shadow-sm border">
                    
                    <p class="text-xs text-slate-500 font-semibold mb-2">
                        <i data-feather="file-text" class="inline-block w-3 h-3 -mt-px mr-1"></i>
                        ${note.source} 
                    </p>
                    <p class="text-slate-800">${note.text}</p>
                </div>
            </div>
        `).join('');
    } else {
        notesListContainer.innerHTML = '';
    }

    feather.replace();
}

    function seekVideoTo(time) {
    const videoElement = document.getElementById('current-video-player');
    if (videoElement) {
        videoElement.currentTime = time;
        videoElement.play();
    }
}
        

        
function renderEmployeeView() {
    // 1. Render sidebar khusus untuk employee
    const sidebarNav = document.querySelector('#main-sidebar nav');
    sidebarNav.innerHTML = `
        <a href="#" id="nav-dashboard" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg">
            <i data-feather="home"></i> Dashboard
        </a>
        <a href="#" id="nav-path" class="sidebar-link flex items-center gap-3 px-4 py-3 mt-2 rounded-lg">
            <i data-feather="map"></i> Learning Path
        </a>
        <a href="#" id="nav-notes" class="sidebar-link flex items-center gap-3 px-4 py-3 mt-2 rounded-lg">
            <i data-feather="edit-3"></i> My Notes
        </a>
        <a href="#" id="nav-peer" class="sidebar-link flex items-center gap-3 px-4 py-3 mt-2 rounded-lg">
            <i data-feather="users"></i> Peer Learning
        </a>
        <a href="#" id="ai-practice-btn" class="sidebar-link flex items-center gap-3 px-4 py-3 mt-2 rounded-lg">
            <i data-feather="cpu"></i> AI Simulator
        </a>
    `;

    // 2. Hubungkan kembali event listener untuk navigasi employee
    ui.navDashboard = document.getElementById('nav-dashboard');
    ui.navPath = document.getElementById('nav-path');
    ui.navNotes = document.getElementById('nav-notes');
    ui.navPeer = document.getElementById('nav-peer');
    ui.aiPracticeBtn = document.getElementById('ai-practice-btn');

    ui.navDashboard.addEventListener('click', (e) => { e.preventDefault(); showLmsView(ui.dashboardView); });
    ui.navPath.addEventListener('click', (e) => { e.preventDefault(); showLmsView(ui.learningPathView); });
    ui.navNotes.addEventListener('click', (e) => { e.preventDefault(); showLmsView(ui.notesView); });
    ui.navPeer.addEventListener('click', (e) => { e.preventDefault(); showLmsView(ui.peerLearningView); });
    ui.aiPracticeBtn.addEventListener('click', openCaseLibrary);

    feather.replace();
    
    // 3. Update semua data UI khusus employee
    updateUI();
    
    // 4. (PALING PENTING) Tampilkan dashboard KARYAWAN yang benar
    showLmsView(ui.dashboardView); 
}

    // GANTI FUNGSI renderManagerView LAMA ANDA DENGAN INI
    function renderManagerView() {
    // (Bagian untuk merender sidebar manajer tetap sama)
    const sidebarNav = document.querySelector('#main-sidebar nav');
    const user = state.currentUser;
    document.querySelector('aside .font-bold.text-lg').textContent = user.name;
    document.querySelector('aside .text-sm.text-slate-500').textContent = user.division;
    document.querySelector('aside p#xp-text').textContent = "Manager Account";
    document.querySelector('#xp-bar').style.width = `100%`;
    //document.querySelector('aside img').src = `https://placehold.co/100x100/334155/FFFFFF?text=${user.avatar}`;
    sidebarNav.innerHTML = `
        <a href="#" id="nav-manager-dashboard" class="sidebar-link active flex items-center gap-3 px-4 py-3 rounded-lg">
            <i data-feather="trello"></i> Team Dashboard
        </a>
    `;
    feather.replace();

    // Render konten dashboard manajer
    renderManagerDashboard();
    
    // --- PERUBAHAN UTAMA DI SINI ---
    // Gunakan fungsi terpusat untuk menampilkan view yang benar
    showLmsView(ui.managerDashboardView);
}

    function handleLogin(userId) {
    const user = state.user.find(u => u.id === userId);
    if (!user) {
        console.error("User not found!");
        return;
    }
    state.currentUser = user; // Set user yang sedang login

    // Tampilkan aplikasi utama
    showPage(ui.lmsApp);

    // Render UI berdasarkan peran
    if (user.type === 'employee') {
        renderEmployeeView();
    } else if (user.type === 'manager') {
        renderManagerView();
    }
}

    const allModules = state.learningPath.flatMap(stage => stage.modules);
    function calculateLearningTime(employee) {
    let totalMinutes = 0;
    employee.completionData.forEach(data => {
        const module = allModules.find(m => m.id === data.moduleId);
        if (module && module.durationInMinutes) {
            totalMinutes += module.durationInMinutes;
        }
    });
    return totalMinutes;
}

// GANTI LAGI FUNGSI renderManagerDashboard DENGAN VERSI FINAL INI
    function renderManagerDashboard() {
    
    const manager = state.currentUser;
    const teamMembers = state.user.filter(user => user.reportsTo === manager.id);
    const modulesCount = allModules.length;

    ui.managerDashboardView.innerHTML = `
        <h2 class="text-3xl font-bold text-slate-800 mb-6">Team Progress: ${manager.division}</h2>
        <div class="bg-white rounded-xl shadow overflow-hidden">
            <table class="min-w-full">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Progress</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total XP</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Learning Time</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                    ${teamMembers.map(employee => {
                        const learningTime = calculateLearningTime(employee);
                        return `
                        <tr class="hover:bg-sky-50 cursor-pointer" onclick="showEmployeeDetail('${employee.id}')">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <img src="https://placehold.co/40x40/E0F2FE/00539F?text=${employee.avatar}" class="rounded-full">
                                    <div>
                                        <div class="text-sm font-medium text-slate-900">${employee.name}</div>
                                        <div class="text-sm text-slate-500">${employee.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-slate-900">${employee.completionData.length} / ${modulesCount} Modules</div>
                                <div class="w-full bg-slate-200 rounded-full h-2.5 mt-1">
                                    <div class="h-2.5 rounded-full" style="width: ${(employee.completionData.length / modulesCount) * 100}%; background-color: var(--brand-blue);"></div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">${employee.xp} XP</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-800 font-medium">
                                <div class="flex items-center gap-2">
                                    <i data-feather="clock" class="w-4 h-4 text-slate-500"></i>
                                    ${learningTime} Minute
                                </div>
                            </td>
                        </tr>
                    `}).join('')}
                </tbody>
            </table>
        </div>
    `;
    feather.replace();
}


    // --- KUMPULAN FUNGSI BARU UNTUK HALAMAN DETAIL KARYAWAN ---

// Fungsi ini dipanggil saat baris di tabel manajer diklik
function showEmployeeDetail(employeeId) {
    // Sesuai preferensi Anda, kita gunakan state.user untuk mencari
    const employee = state.user.find(u => u.id === employeeId);
    if (!employee) return;

    // Render konten detail ke dalam view
    renderEmployeeDetail(employee);
    // Gunakan showLmsView untuk beralih tampilan
    showLmsView(ui.employeeDetailView);
}

// Fungsi baru untuk menghitung waktu belajar HARI INI
function calculateTimeSpentToday(employee) {
    let todayMinutes = 0;
    // Untuk demo, kita hardcode "hari ini" adalah 24 Agustus 2025
    // agar cocok dengan data contoh yang kita buat.
    const today = "2025-08-24"; 

    employee.completionData.forEach(data => {
        // Ambil bagian tanggal (YYYY-MM-DD) dari timestamp
        const completedDate = data.completedAt.slice(0, 10);
        
        if (completedDate === today) {
            const module = allModules.find(m => m.id === data.moduleId);
            if (module && module.durationInMinutes) {
                todayMinutes += module.durationInMinutes;
            }
        }
    });
    return todayMinutes;
}




        function handleLogout() {
    state.currentUser = null;
    showPage(ui.loginPage);
}
        function endSimulation() {
            const selectedCase = state.caseLibrary.find(c => c.id === selectedCaseId);
            const modal = document.getElementById('ai-simulator-modal');
            const feedbackContent = modal.querySelector('#feedback-content');
            feedbackContent.innerHTML = selectedCase.feedback.map(f => `<div class="flex items-start gap-3"><i data-feather="${f.positive ? 'check' : 'x'}" class="w-6 h-6 mt-1 flex-shrink-0 ${f.positive ? 'text-green-500' : 'text-red-500'}"></i><p class="text-slate-700">${f.text}</p></div>`).join('');
            feather.replace();
            modal.querySelector('#chat-window').classList.add('hidden');
            modal.querySelector('#feedback-window').classList.remove('hidden');
            modal.querySelector('#chat-input').classList.add('hidden');
            modal.querySelector('#send-btn').classList.add('hidden');
            modal.querySelector('#end-session-btn').classList.add('hidden');
            modal.querySelector('#close-feedback-btn').classList.remove('hidden');
        }

        function completeAiSession() {
            closeModal(ui.aiSimulatorModal);
            openCaseLibrary();
        }
        
        // GANTI FUNGSI renderNotes LAMA ANDA DENGAN INI
        function renderNotes() {
    // Menggunakan state.currentUser yang benar
    ui.notesContainer.innerHTML = state.currentUser.notes.map(note =>
        `<div class="bg-white p-4 rounded-lg shadow-sm border-l-4" style="border-color: var(--brand-blue);">
            <p class="text-xs text-slate-500 font-semibold mb-1">From: ${note.source}</p>
            <p class="text-slate-700">${note.text}</p>
        </div>`
    ).join('') || `<div class="text-center text-slate-500 p-8 bg-white rounded-lg">You haven't saved any notes yet.</div>`;
}

// GANTI JUGA FUNGSI handleSaveNote LAMA ANDA DENGAN INI
        function handleSaveNote(e) {
    e.preventDefault();
    const noteText = ui.noteInput.value.trim();
    if (noteText) {
        const currentModuleTitle = getNextModule()?.title || "General Note";
        // Menggunakan state.currentUser yang benar
        state.currentUser.notes.unshift({ source: currentModuleTitle, text: noteText });
        ui.noteInput.value = '';
        renderNotes();
    }
}
        
        function renderPeerSessions() {
            ui.peerSessionsContainer.innerHTML = state.peerSessions.map(session => {
                const isBooked = session.participant !== null;
                const isHostedByUser = session.author === state.user.name;

                let actionBlock = '';
                if(isBooked) {
                    actionBlock = `<div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-slate-400"></div><span class="text-sm font-semibold text-slate-500">Booked by: ${session.participant}</span></div>`;
                } else if (!isHostedByUser) {
                    actionBlock = `<button onclick="handleJoinSession('${session.id}')" class="bg-sky-100 text-sky-700 font-semibold py-1 px-3 rounded-full text-sm hover:bg-sky-200">Sign Up</button>`;
                } else {
                    actionBlock = `<div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-green-400"></div><span class="text-sm font-semibold text-slate-500">You are hosting</span></div>`;
                }

                return `
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-bold text-slate-800">${session.topic}</h3>
                            <p class="text-sm text-slate-500 mt-1">Hosted by: ${session.author}</p>
                        </div>
                        <a href="${session.link}" target="_blank" class="bg-slate-100 p-2 rounded-full hover:bg-slate-200">
                            <i data-feather="external-link" class="w-4 h-4 text-slate-600"></i>
                        </a>
                    </div>
                    <p class="text-slate-600 mt-2 text-sm">${session.description}</p>
                    <div class="mt-4 pt-4 border-t flex justify-between items-center">
                        ${actionBlock}
                    </div>
                </div>`;
            }).join('') || `<div class="text-center text-slate-500 p-8 bg-white rounded-lg">No active sessions right now. Why not create one?</div>`;
            feather.replace();
        }

        function handleJoinSession(sessionId) {
            const session = state.peerSessions.find(s => s.id === sessionId);
            if (session && !session.participant) {
                session.participant = state.user.name;
                renderPeerSessions();
            }
        }

        function handlePostSession(e) {
            e.preventDefault();
            const topic = document.getElementById('session-topic').value;
            const description = document.getElementById('session-desc').value;
            const link = document.getElementById('session-link').value;
            if (topic && description && link) {
                state.peerSessions.unshift({ 
                    id: `ps${Date.now()}`,
                    topic, 
                    description, 
                    link, 
                    author: state.user.name,
                    participant: null 
                });
                renderPeerSessions();
                e.target.reset();
            }
        }

                // FUNGSI BARU UNTUK MENYELESAIKAN SESI ROLE-PLAY
        // GANTI FUNGSI LAMA ANDA DENGAN VERSI BARU INI
        function completeRolePlaySession() {
    const progress = state.currentUser.rolePlayProgress[currentGateId];
    if (!progress) return; 

    // BARIS PENTING: Menambahkan catatan bahwa satu sesi telah selesai
    progress.push({ role: 'Sales', completedAt: new Date().toISOString() });
    console.log("--- DATA SETELAH DISIMPAN ---", JSON.parse(JSON.stringify(state.currentUser.rolePlayProgress)));

    // Cek jika semua sesi untuk gerbang (gate) ini sudah selesai
    if (progress.length >= 3) {
        const { module } = findModule(currentGateId);
        const isAlreadyCompleted = state.currentUser.completionData.some(d => d.moduleId === currentGateId);

        if (module && !isAlreadyCompleted) {
            state.currentUser.xp += module.xp;
            state.currentUser.completionData.push({ moduleId: currentGateId, completedAt: new Date().toISOString() });
            alert(`Congratulations! You have cleared the "${module.title}" challenge and earned ${module.xp} XP!`);
        } else {
            alert('Great job reviewing this challenge!');
        }
    } else {
        alert(`Session ${progress.length} of 3 complete! Return to the Learning Path and start the next session.`);
    }

    closeModal(ui.rolePlayRubricModal);
    
    // Kembali ke Learning Path untuk melihat progress baru
    showLmsView(ui.learningPathView);
}

        document.addEventListener('DOMContentLoaded', () => {
            Object.assign(ui, {
                moduleDetailView: document.getElementById('module-detail-view'),
                rolePlaySessionModal: document.getElementById('role-play-session-modal'),
             rpgSessionTitle: document.getElementById('rpg-session-title'),
            rpgSessionRole: document.getElementById('rpg-session-role'),
            rpgInteractionWindow: document.getElementById('rpg-interaction-window'),
            rpgOptionsContainer: document.getElementById('rpg-options-container'),
                rolePlayPairingModal: document.getElementById('role-play-pairing-modal'),
                mainSidebar: document.getElementById('main-sidebar'),
        backToPathBtn: document.getElementById('back-to-path-btn'),
        moduleDetailTitle: document.getElementById('module-detail-title'),
        moduleDetailMeta: document.getElementById('module-detail-meta'),
        moduleLessonsList: document.getElementById('module-lessons-list'),
        startKnowledgeCheckBtn: document.getElementById('start-knowledge-check-btn'),
        managerDashboardView: document.getElementById('manager-dashboard-view'),

// 2. Tambahkan DUA tombol baru ini juga
loginAsEmployeeBtn: document.getElementById('login-as-employee-btn'),
loginAsManagerBtn: document.getElementById('login-as-manager-btn'),
addNoteModal: document.getElementById('add-note-modal'),
    lessonNoteForm: document.getElementById('lesson-note-form'),
    noteSourceTitle: document.getElementById('note-source-title'),
    lessonNoteInput: document.getElementById('lesson-note-input'),
    popupQuizModal: document.getElementById('popup-quiz-modal'),
    popupQuizQuestion: document.getElementById('popup-quiz-question'),
    popupQuizOptions: document.getElementById('popup-quiz-options'),
    popupQuizFeedback: document.getElementById('popup-quiz-feedback'),
    popupQuizSubmitBtn: document.getElementById('popup-quiz-submit-btn'),
    popupQuizNextBtn: document.getElementById('popup-quiz-next-btn'),
                landingPage: document.getElementById('landing-page'),
                loginPage: document.getElementById('login-page'),
                lmsApp: document.getElementById('lms-app'),
                goToLoginBtn: document.getElementById('go-to-login-btn'),
                loginForm: document.getElementById('login-form'),
                mainHeader: document.getElementById('main-header'),
                dashboardView: document.getElementById('dashboard-view'),
                learningPathView: document.getElementById('learning-path-view'),
                notesView: document.getElementById('notes-view'),
                peerLearningView: document.getElementById('peer-learning-view'),
                learningModuleView: document.getElementById('learning-module-view'),
                navDashboard: document.getElementById('nav-dashboard'),
                navPath: document.getElementById('nav-path'),
                navNotes: document.getElementById('nav-notes'),
                navPeer: document.getElementById('nav-peer'),
                mainHeaderTitle: document.getElementById('main-header-title'),
                continueLearningBtn: document.getElementById('continue-learning-btn'),
                nextModuleTitle: document.getElementById('next-module-title'),
                xpBar: document.getElementById('xp-bar'),
                xpText: document.getElementById('xp-text'),
                notificationModal: document.getElementById('notification-modal'),
                notificationOkBtn: document.getElementById('notification-ok-btn'),
                leaderboardModal: document.getElementById('leaderboard-modal'),
                leaderboardBtn: document.getElementById('leaderboard-btn'),
                leaderboard: document.getElementById('leaderboard'),
                branchFilter: document.getElementById('branch-filter'),
                divisionFilter: document.getElementById('division-filter'),
                userRank: document.getElementById('user-rank'),
                learningPath: document.getElementById('learning-path'),
                videoModal: document.getElementById('video-modal'),
                videoModalTitle: document.getElementById('video-modal-title'),
                startLessonBtn: document.getElementById('start-lesson-btn'),
                rolePlayGateModal: document.getElementById('role-play-gate-modal'),
                // Add these inside the Object.assign(ui, { ... }) block
                caseBriefingModal: document.getElementById('case-briefing-modal'),
                briefingModalTitle: document.getElementById('briefing-modal-title'),
                briefingModalContent: document.getElementById('briefing-modal-content'),
                startSimulationFromBriefingBtn: document.getElementById('start-simulation-from-briefing-btn'),
                caseLibraryModal: document.getElementById('case-library-modal'),
                aiSimulatorModal: document.getElementById('ai-simulator-modal'),
                aiPracticeBtn: document.getElementById('ai-practice-btn'),
                startRpgSessionBtn: document.getElementById('start-rpg-session-btn'),
                rolePlayBriefingModal: document.getElementById('role-play-briefing-modal'),
                // Di dalam document.addEventListener('DOMContentLoaded', ...) -> Object.assign(ui, { ... })

                // Di dalam Object.assign(ui, { ... })
                viewBriefingModal: document.getElementById('view-briefing-modal'),
                viewBriefingBtn: document.getElementById('view-briefing-btn'),
                inSessionObjective: document.getElementById('in-session-objective'),
                inSessionProblem: document.getElementById('in-session-problem'),
                rolePlayChatModal: document.getElementById('role-play-chat-modal'),
                chatWithTitle: document.getElementById('chat-with-title'),
                endRolePlayBtn: document.getElementById('end-role-play-btn'),
                chatWindow: document.getElementById('chat-window'),
                chatInput: document.getElementById('chat-input'),
                chatSendBtn: document.getElementById('chat-send-btn'),
                beginRolePlayBtn: document.getElementById('begin-role-play-btn'),
                noteForm: document.getElementById('note-form'),
                noteInput: document.getElementById('note-input'),
                notesContainer: document.getElementById('notes-container'),
                peerSessionForm: document.getElementById('peer-session-form'),
                peerSessionsContainer: document.getElementById('peer-sessions-container'),
                startSimulationBtn: document.getElementById('start-simulation-btn'),
                chatInput: document.getElementById('chat-input'),
                sendBtn: document.getElementById('send-btn'),
                endSessionBtn: document.getElementById('end-session-btn'),
                closeFeedbackBtn: document.getElementById('close-feedback-btn'),
                closeLessonBtn: document.getElementById('close-lesson-btn'),
                lessonProgressBar: document.getElementById('lesson-progress-bar'),
                lessonHearts: document.getElementById('lesson-hearts'),
                lessonCharacter: document.getElementById('lesson-character'),
                employeeDetailView: document.getElementById('employee-detail-view'),
                lessonQuestion: document.getElementById('lesson-question'),
                lessonOptions: document.getElementById('lesson-options'),
                lessonFooter: document.getElementById('lesson-footer'),
                lessonFeedback: document.getElementById('lesson-feedback'),
                feedbackTitle: document.getElementById('feedback-title'),
                feedbackCorrectAnswer: document.getElementById('feedback-correct-answer'),
                lessonCheckBtn: document.getElementById('lesson-check-btn'),
                lessonContinueBtn: document.getElementById('lesson-continue-btn'),
                lessonCompletionScreen: document.getElementById('lesson-completion-screen'),
                lessonFailedScreen: document.getElementById('lesson-failed-screen'),
                lessonXpAward: document.getElementById('lesson-xp-award'),
                finishLessonBtn: document.getElementById('finish-lesson-btn'),
                retryLessonBtn: document.getElementById('retry-lesson-btn'),
                logoutBtn: document.getElementById('logout-btn'),
                // Di dalam Object.assign(ui, { ... })
                rolePlayRubricModal: document.getElementById('role-play-rubric-modal'),
                backToPathBtnDetail: document.getElementById('back-to-path-btn-detail'),
                submitReviewBtn: document.getElementById('submit-review-btn'),
    moduleSidebarTitle: document.getElementById('module-sidebar-title'),
    moduleProgressBar: document.getElementById('module-progress-bar'),
    moduleProgressText: document.getElementById('module-progress-text'),
    moduleToc: document.getElementById('module-toc'),
    contentTitle: document.getElementById('content-title'),
    contentDescription: document.getElementById('content-description'),
    contentArea: document.getElementById('content-area'),
    nextContentBtn: document.getElementById('next-content-btn'),
            });

            console.log("Mencari tombol:", ui.startSimulationFromBriefingBtn);

            ui.goToLoginBtn.addEventListener('click', () => showPage(ui.loginPage));
            // Di dalam document.addEventListener('DOMContentLoaded', ...)
            // GANTI event listener LAMA DENGAN VERSI BARU INI
ui.beginRolePlayBtn.addEventListener('click', () => {
    closeModal(ui.rolePlayBriefingModal);

    setTimeout(() => {
        // 1. Ambil data kasus yang aktif
        const caseData = state.rolePlayCases[currentGateId];
        if (!caseData || !caseData.starterPrompt) {
            console.error("Starter prompt not found for this case.");
            return;
        }

        // 2. Bersihkan jendela chat dari sesi sebelumnya
        ui.chatWindow.innerHTML = '';
        
        // 3. Buka modal chat
        openModal(ui.rolePlayChatModal);
        
        // 4. Tampilkan pesan pembuka dari "customer" setelah jeda singkat
        setTimeout(() => {
            addChatMessage(caseData.starterPrompt, 'peer'); // 'peer' adalah role untuk customer/AI
        }, 500); // Jeda 0.5 detik agar terasa natural

        // 5. Fokus ke input field agar pengguna bisa langsung mengetik
        document.getElementById('chat-input').focus();
    }, 300);
});
            ui.logoutBtn.addEventListener('click', handleLogout);
            ui.navDashboard.addEventListener('click', (e) => { e.preventDefault(); showLmsView(ui.dashboardView); });
            ui.navPath.addEventListener('click', (e) => { e.preventDefault(); showLmsView(ui.learningPathView); });
            ui.navNotes.addEventListener('click', (e) => { e.preventDefault(); showLmsView(ui.notesView); });
            ui.navPeer.addEventListener('click', (e) => { e.preventDefault(); showLmsView(ui.peerLearningView); });
            ui.loginAsEmployeeBtn.addEventListener('click', () => handleLogin('emp01'));
            ui.loginAsManagerBtn.addEventListener('click', () => handleLogin('mgr01'));

            ui.chatSendBtn.addEventListener('click', handleSendMessage);
            ui.chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Listener untuk tombol End Session (untuk sekarang hanya menutup modal)
            // GANTI event listener lama untuk endRolePlayBtn dengan ini
        ui.endRolePlayBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to end this session?")) {
        closeModal(ui.rolePlayChatModal);
        
        // Panggil fungsi baru untuk menampilkan rubrik setelah jeda
        setTimeout(() => {
            showReviewRubric();
        }, 300);
    }
});

       // GANTI event listener lama untuk submitReviewBtn dengan ini
    ui.submitReviewBtn.addEventListener('click', () => {
    // Di masa depan, kita bisa menambahkan logika untuk mengambil nilai dari rubrik di sini.
    // Untuk sekarang, kita langsung panggil fungsi penyelesaian.
    completeRolePlaySession();
});

            // Di dalam document.addEventListener('DOMContentLoaded', ...)
ui.viewBriefingBtn.addEventListener('click', () => {
    // Ambil data briefing dari kasus yang sedang berjalan
    const caseData = state.rolePlayCases[currentGateId];
    // Untuk mockup, kita asumsikan peran pengguna adalah 'Sales'
    const briefing = caseData.salesBriefing; 

    // Isi konten modal
    ui.inSessionObjective.textContent = briefing.objective;
    ui.inSessionProblem.textContent = briefing.problem;

    // Tampilkan modal
    openModal(ui.viewBriefingModal);
});

// Add these inside the document.addEventListener('DOMContentLoaded', ...)
// 1. For the "Start Simulation" button inside the new briefing modal
// Di dalam document.addEventListener('DOMContentLoaded', ...) SETELAH Object.assign

    if (ui.startSimulationFromBriefingBtn) {
    ui.startSimulationFromBriefingBtn.addEventListener('click', () => {
        closeModal(ui.caseBriefingModal);
        setTimeout(() => {
            launchPlaceholderChat();
        }, 300);
    });
}

// 2. For the new "View Case Briefing" button inside the chat modal
    // Di dalam document.addEventListener('DOMContentLoaded', ...)

const viewBriefingInChatBtn = document.getElementById('view-briefing-in-chat-btn');
if (viewBriefingInChatBtn) {
    viewBriefingInChatBtn.addEventListener('click', () => {
        // --- PERUBAHAN DI SINI ---
        // 1. Naikkan lapisan z-index modal briefing secara paksa
        ui.caseBriefingModal.style.zIndex = '60'; 

        // 2. Baru buka modalnya
        openModal(ui.caseBriefingModal);
    });
}

// Opsional tapi direkomendasikan: Reset z-index saat ditutup
const briefingCloseBtn = ui.caseBriefingModal.querySelector('.close-modal-btn');
if (briefingCloseBtn) {
    briefingCloseBtn.addEventListener('click', () => {
        ui.caseBriefingModal.style.zIndex = ''; // Reset ke nilai default dari class CSS
    });
}

            ui.continueLearningBtn.addEventListener('click', () => showLmsView(ui.learningPathView));
            document.querySelectorAll('.close-modal-btn').forEach(btn => btn.addEventListener('click', (e) => { const modal = e.target.closest('.modal-backdrop'); if(modal) closeModal(modal); }));
            if(ui.leaderboardBtn) ui.leaderboardBtn.addEventListener('click', () => openModal(ui.leaderboardModal));
            if(ui.aiPracticeBtn) ui.aiPracticeBtn.addEventListener('click', openCaseLibrary);
            if(ui.startRpgSessionBtn) ui.startRpgSessionBtn.addEventListener('click', startRpgSession);
            if(ui.startSimulationBtn) ui.startSimulationBtn.addEventListener('click', startSimulation);
            if(ui.sendBtn) ui.sendBtn.addEventListener('click', handleUserMessage);
            if(ui.chatInput) ui.chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(); });
            if(ui.endSessionBtn) ui.endSessionBtn.addEventListener('click', endSimulation);
            if(ui.closeFeedbackBtn) ui.closeFeedbackBtn.addEventListener('click', completeAiSession);
            if(ui.noteForm) ui.noteForm.addEventListener('submit', handleSaveNote);
            if(ui.peerSessionForm) ui.peerSessionForm.addEventListener('submit', handlePostSession);
            if(ui.closeLessonBtn) ui.closeLessonBtn.addEventListener('click', closeLesson);
            if(ui.finishLessonBtn) ui.finishLessonBtn.addEventListener('click', closeLesson);
            if(ui.retryLessonBtn) ui.retryLessonBtn.addEventListener('click', closeLesson);
            // BUG FIX: Removed redundant event listener. The .onclick is set in resetButtons()
            // if(ui.lessonCheckBtn) ui.lessonCheckBtn.addEventListener('click', checkAnswer);
            if(ui.backToPathBtnDetail) ui.backToPathBtnDetail.addEventListener('click', () => showLmsView(ui.learningPathView));
            if(ui.notificationOkBtn) {
    ui.notificationOkBtn.addEventListener('click', () => closeModal(ui.notificationModal));
}

            if(ui.lessonNoteForm) ui.lessonNoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSaveLessonNote();
});
            if(ui.branchFilter) ui.branchFilter.addEventListener('change', filterAndRenderLeaderboard);
            if(ui.divisionFilter) ui.divisionFilter.addEventListener('change', filterAndRenderLeaderboard);

            showPage(ui.landingPage);
            feather.replace();
        });


// === TAMBAHKAN SEMUA FUNGSI BARU DI BAWAH INI ===

let currentNoteSource = '';
function openAddNoteModal(lessonTitle) {
    currentNoteSource = lessonTitle;
    ui.noteSourceTitle.textContent = lessonTitle;
    ui.lessonNoteInput.value = '';
    openModal(ui.addNoteModal);
}



let selectedQuizOption = null;
function showPopupQuiz(moduleId, lessonIndex, nextIndex) {
    const lesson = state.moduleContent[moduleId].lessons[lessonIndex];
    const quiz = lesson.popupQuiz;
    selectedQuizOption = null;

    ui.popupQuizQuestion.textContent = quiz.question;
    ui.popupQuizOptions.innerHTML = quiz.options.map((opt, index) => 
        `<button class="w-full text-left p-4 border-2 rounded-lg hover:bg-slate-50" data-index="${index}">${opt}</button>`
    ).join('');
    
    // Reset tampilan feedback dan tombol
    ui.popupQuizFeedback.classList.add('hidden');
    ui.popupQuizSubmitBtn.classList.remove('hidden');
    ui.popupQuizNextBtn.classList.add('hidden');

    // Event listener untuk pilihan jawaban
    ui.popupQuizOptions.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => {
            selectedQuizOption = parseInt(btn.dataset.index);
            ui.popupQuizOptions.querySelectorAll('button').forEach(b => b.classList.remove('border-sky-500', 'ring-2'));
            btn.classList.add('border-sky-500', 'ring-2');
        };
    });

    ui.popupQuizSubmitBtn.onclick = () => handlePopupQuizSubmit(moduleId, quiz, nextIndex);
    openModal(ui.popupQuizModal);
}

// GANTI KESELURUHAN FUNGSI LAMA ANDA DENGAN INI
    function handlePopupQuizSubmit(moduleId, quiz, nextIndex) {
    if (selectedQuizOption === null) return;

    const isCorrect = selectedQuizOption === quiz.correctAnswer;
    const feedback = ui.popupQuizFeedback;
    
    feedback.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
    
    if (isCorrect) {
        feedback.classList.add('bg-green-100', 'text-green-700');
        feedback.textContent = "Correct! Well done.";
    } else {
        feedback.classList.add('bg-red-100', 'text-red-700');
        feedback.textContent = `Not quite. The correct answer was: "${quiz.options[quiz.correctAnswer]}"`;
    }

    ui.popupQuizSubmitBtn.classList.add('hidden');
    ui.popupQuizNextBtn.classList.remove('hidden');

    // --- PERBAIKAN UTAMA ADA DI SINI ---
    // Event listener untuk tombol "Continue" setelah menjawab kuis
    ui.popupQuizNextBtn.onclick = () => {
        closeModal(ui.popupQuizModal);

        // Ambil elemen video yang sedang aktif
        const videoElement = document.getElementById('current-video-player');
        
        // Jika elemen video ditemukan, panggil method .play() untuk melanjutkannya
        if (videoElement) {
            videoElement.play(); // <-- MENGGANTIKAN PANGGILAN resumeVideo()
        }
    };
}

// Fungsi utama untuk membangun HTML halaman detail
function renderEmployeeDetail(employee) {
    const timeToday = calculateTimeSpentToday(employee);
    const totalTime = calculateLearningTime(employee);
    const modulesCount = allModules.length;

    // Urutkan aktivitas dari yang paling baru
    const recentActivities = [...employee.completionData]
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
        .slice(0, 5); // Ambil 5 aktivitas terakhir

    ui.employeeDetailView.innerHTML = `
        <div class="flex justify-between items-center mb-8">
            <div>
                <button onclick="showLmsView(ui.managerDashboardView)" class="flex items-center gap-2 text-sm text-slate-600 font-semibold hover:text-slate-900 mb-2">
                    <i data-feather="arrow-left" class="w-4 h-4"></i>
                    Back to Team Dashboard
                </button>
                <div class="flex items-center gap-4">
                    <img src="https://placehold.co/64x64/E0F2FE/00539F?text=${employee.avatar}" class="rounded-full">
                    <div>
                        <h2 class="text-3xl font-bold text-slate-800">${employee.name}</h2>
                        <p class="text-slate-500">${employee.division}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl shadow">
                <p class="text-sm font-medium text-slate-500">Time Spent Today</p>
                <p class="text-3xl font-bold text-slate-800 mt-1">${timeToday} <span class="text-lg font-medium">Minute</span></p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow">
                <p class="text-sm font-medium text-slate-500">Total Learning Time</p>
                <p class="text-3xl font-bold text-slate-800 mt-1">${totalTime} <span class="text-lg font-medium">Minute</span></p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow">
                <p class="text-sm font-medium text-slate-500">Modules Completed</p>
                <p class="text-3xl font-bold text-slate-800 mt-1">${employee.completionData.length} / ${modulesCount}</p>
            </div>
             <div class="bg-white p-6 rounded-xl shadow">
                <p class="text-sm font-medium text-slate-500">Current Streak</p>
                <p class="text-3xl font-bold text-slate-800 mt-1">${employee.streak} <span class="text-lg font-medium">Day</span></p>
            </div>
        </div>

        <div>
            <h3 class="text-xl font-bold text-slate-800 mb-4">Recent Activity</h3>
            <div class="bg-white rounded-xl shadow p-6 divide-y divide-slate-100">
                ${recentActivities.map(activity => {
                    const module = allModules.find(m => m.id === activity.moduleId);
                    const completedDate = new Date(activity.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                    return `
                    <div class="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                        <div>
                            <p class="font-semibold text-slate-700">${module.title}</p>
                            <p class="text-sm text-slate-500">Completed on ${completedDate}</p>
                        </div>
                        <div class="text-sm font-semibold text-green-600">+${module.xp} XP</div>
                    </div>
                    `
                }).join('') || '<p class="text-slate-500">No recent activity.</p>'}
            </div>
        </div>
    `;
    feather.replace();
}

// FUNGSI BARU UNTUK MENAMPILKAN RUBRIK
function showReviewRubric() {
    const caseData = state.rolePlayCases[currentGateId];
    const rubricContainer = document.getElementById('rubric-container');
    
    // Bangun HTML untuk setiap kriteria
    rubricContainer.innerHTML = caseData.reviewRubric.map(item => `
        <div>
            <label class="font-bold text-slate-700">${item.criterion}</label>
            <p class="text-sm text-slate-500 mb-2">${item.description}</p>
            <div class="flex justify-around bg-slate-100 p-2 rounded-lg">
                ${[1, 2, 3, 4, 5].map(score => `
                    <label class="flex flex-col items-center cursor-pointer">
                        <input type="radio" name="rubric_${item.id}" value="${score}" class="accent-sky-500">
                        <span class="text-sm mt-1">${score}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');

    openModal(ui.rolePlayRubricModal);
}

function showNotification(title, message) {
    const titleEl = document.getElementById('notification-title');
    const messageEl = document.getElementById('notification-message');
    
    if (titleEl && messageEl) {
        titleEl.textContent = title;
        messageEl.innerHTML = message; // <-- Diubah menjadi innerHTML
        openModal(ui.notificationModal);
    }
}