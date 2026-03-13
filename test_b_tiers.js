const { scoreJob } = require('./src/scoring');
const fs = require('fs');
const csv = require('csv-parser');

const results = [];
fs.createReadStream('data/job_results_2026-02-22.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(job => {
            if (job.Tier === 'B') {
                const { score, tier, reason_short } = scoreJob({
                    title: job['Job Title'],
                    description: job['Description'],
                    workplace_type: job['Workplace'],
                    location_text: job['Location'],
                    easy_apply_flag: job['Easy Apply'] === 'Yes'
                });
                console.log(`B-Tier Candidate: ${job['Job Title']} @ ${job.Company}`);
                console.log(`New Score: ${score} | New Tier: ${tier} | Reason: ${reason_short}`);
                console.log('----------------------------');
            }
        });
    });
