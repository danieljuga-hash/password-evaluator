const passwordInput = document.getElementById('passwordInput');
const meter = document.getElementById('strengthMeter');
const feedbackText = document.getElementById('feedbackText');
const timeToCrack = document.getElementById('timeToCrack');
const pwnedStatus = document.getElementById('pwnedStatus');

let timeoutId; 

async function sha1(str) {
    const buffer = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-1', buffer);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('').toUpperCase();
}

async function checkPwnedPassword(password) {
    const hash = await sha1(password);
    const prefix = hash.substring(0, 5); 
    const suffix = hash.substring(5);    

    try {
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();
        
        const leakedHashes = data.split('\n');
        const found = leakedHashes.find(line => line.startsWith(suffix));

        pwnedStatus.classList.remove('hidden');
        if (found) {
            const count = found.split(':')[1].trim();
            pwnedStatus.className = 'pwned-status leaked';
            pwnedStatus.innerHTML = `Compromised: This password has appeared in ${count} known data breaches.`;
        } else {
            pwnedStatus.className = 'pwned-status safe';
            pwnedStatus.innerHTML = `Secure: No records of this password in public breach databases.`;
        }
    } catch (error) {
        console.error("Failed to connect to API:", error);
    }
}

passwordInput.addEventListener('input', function() {
    const val = passwordInput.value;
    
    if (val === '') {
        feedbackText.innerHTML = '<strong>Status:</strong> Waiting for input...';
        timeToCrack.innerText = '';
        meter.style.width = '0%';
        meter.style.backgroundColor = 'transparent';
        pwnedStatus.classList.add('hidden');
        clearTimeout(timeoutId);
        return;
    }

    const result = zxcvbn(val);
    const strengthPercentage = (result.score / 4) * 100;
    meter.style.width = `${strengthPercentage}%`;
    
    const colors = ['#ff4d4d', '#ffa64d', '#ffff4d', '#4dff4d', '#00b300'];
    meter.style.backgroundColor = colors[result.score];

    if (result.feedback.warning) {
        feedbackText.innerHTML = `<strong>Warning:</strong> ${result.feedback.warning}`;
    } else if (result.feedback.suggestions.length > 0) {
        feedbackText.innerHTML = `<strong>Suggestion:</strong> ${result.feedback.suggestions[0]}`;
    } else {
        feedbackText.innerHTML = '<strong>Status:</strong> Password looks strong.';
    }

    timeToCrack.innerText = `Estimated time to crack: ${result.crack_times_display.offline_slow_hashing_1e4_per_second}`;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        checkPwnedPassword(val);
    }, 500); 
});