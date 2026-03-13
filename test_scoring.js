const { scoreJob } = require('./src/scoring');
const fs = require('fs');

const jobs = JSON.parse(fs.readFileSync('data/A_tier_temp.json', 'utf8'));

jobs.forEach(job => {
    const originalScore = job.Score;
    const { score, tier, reason_short } = scoreJob({
        title: job['Job Title'],
        description: job['Description'],
        workplace_type: job['Workplace'],
        location_text: job['Location'],
        easy_apply_flag: job['Easy Apply'] === 'Yes'
    });
    console.log(`Company: ${job.Company}`);
    console.log(`Original: Score ${originalScore} | Tier ${job.Tier}`);
    console.log(`New Result: Score ${score} | Tier ${tier} | Reason: ${reason_short}`);
    console.log('------------------------------------------------');
});
