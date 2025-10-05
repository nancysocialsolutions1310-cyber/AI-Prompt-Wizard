// Select DOM elements
const goalInput = document.getElementById('goal');
const roleSelect = document.getElementById('role');
const contextTextarea = document.getElementById('context');
const toneInput = document.getElementById('tone');
const formatInput = document.getElementById('format');
const generateBtn = document.getElementById('generate-btn');
const generatedPromptTextarea = document.getElementById('generated-prompt');
const copyBtn = document.getElementById('copy-btn');
const messageElement = document.getElementById('message');

// Function: Display a message for a few seconds
function showMessage(msg, duration = 3000) {
    messageElement.textContent = msg;
    setTimeout(() => {
        messageElement.textContent = '';
    }, duration);
}

// Main function to generate the prompt
generateBtn.addEventListener('click', () => {
    const goal = goalInput.value.trim();
    const role = roleSelect.value;
    const context = contextTextarea.value.trim();
    const tone = toneInput.value.trim();
    const format = formatInput.value.trim();

    if (!goal) {
        showMessage('⚠️ Please enter your Goal/Task! This is required.', 5000);
        return;
    }

    // --- Start Prompt Engineering Logic (English) ---
    let promptParts = [];

    // 1. Role Assignment
    if (role !== 'none') {
        promptParts.push(`**[1. AI ROLE]** Act as a highly experienced and top-tier **${role}**. You possess comprehensive knowledge and expertise relevant to this specific task.`);
    } else {
        promptParts.push('**[1. AI ROLE]** Act as an expert, detailed, and highly helpful AI assistant.');
    }

    // 2. Context
    if (context) {
        promptParts.push(`**[2. CONTEXT/BACKGROUND]** Before proceeding, carefully consider the following context: "${context}"`);
    }

    // 3. Core Task/Objective
    promptParts.push(`**[3. CORE TASK]** Your sole objective is: "${goal}". Execute this task with the highest level of accuracy and efficiency.`);

    // 4. Output Requirements and Constraints (for Accuracy)
    promptParts.push('**[4. OUTPUT GUIDELINES & CONSTRAINTS]**');
    
    // a. Chain-of-Thought (CoT) Instruction for quality control
    promptParts.push('**To ensure maximum accuracy:** Use a robust internal Chain-of-Thought process to analyze and plan your response before generating the final output. Do not output your internal thoughts, only the final answer.');

    // b. Tone and Format
    if (tone) {
        promptParts.push(`- **Tone:** The output must maintain a **${tone}** and professional style.`);
    }
    if (format) {
        promptParts.push(`- **Format:** Strictly deliver the final output in the following structure: **${format}**.`);
    }
    
    // c. Clarity and Verification
    promptParts.push(`- **Verification:** Ensure all facts and information provided are **100% accurate** based on your trained knowledge.`);
    promptParts.push(`- **Clarity:** The response should be concise, clear, and actionable—avoid unnecessary filler or verbose explanations.`);

    const finalPrompt = promptParts.join('\n\n---\n\n');

    generatedPromptTextarea.value = finalPrompt;
    showMessage('✅ High-accuracy prompt successfully generated in English!', 5000);
});

// Copy Function
copyBtn.addEventListener('click', () => {
    if (!generatedPromptTextarea.value.trim()) {
        showMessage('🤔 There is no prompt to copy. Generate one first!', 5000);
        return;
    }
    
    generatedPromptTextarea.select(); 
    generatedPromptTextarea.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(generatedPromptTextarea.value)
        .then(() => {
            showMessage('📋 Prompt copied! Ready to paste into any AI chat.', 5000);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            showMessage('❌ Failed to copy. Please select and copy the text manually.', 5000);
        });
});
