const { scoreJob } = require('./src/scoring');

const fakeJob = {
    title: "Helpdesk IT",
    description: "This job is sourced from a job board. Must know Active Directory and Windows 10.",
    workplace_type: "On-site",
    location_text: "Lisbon",
    easy_apply_flag: false
};

const result = scoreJob(fakeJob);
console.log(result);
