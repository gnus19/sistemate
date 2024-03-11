const { Router } = require('express'); 

const router = Router();

const ISSUE_STATUS = {
    OPEN: "OPEN",
    IN_PROGRESS: "IN_PROGRESS",
    IN_REVIEW: "IN_REVIEW",
    CLOSED: "CLOSED"
};

const ISSUES = [{
    id: 0,
    title: "My first issue",
    description: "API issue not working",
    status: ISSUE_STATUS.IN_PROGRESS
}, {
    id: 1,
    title: "My Second issue",
    description: "API status not working",
    status: ISSUE_STATUS.OPEN
}, {
    id: 2,
    title: "My Third issue",
    description: "API not working",
    status: ISSUE_STATUS.CLOSED
}]

let id = 3;

router.get('/', (req, res) => {
    console.log("[GET /]: issues", ISSUES)
    res.send({list: ISSUES});
});
router.get('/:id', (req, res) => {
    const issue = ISSUES.find(element => element.id == req.params.id);
    if (issue) {
        console.log("[GET /:id]: ", issue);
        res.status(201).send(issue);   
    } else {
        console.log("[ERROR GET /:id]: with id ", req.params.id);
        res.sendStatus(404)
    }
});
router.post('/', (req, res) => {
    const newIssue = {
        id,
        title: req.body.title,
        description: req.body.description,
        status: ISSUE_STATUS.OPEN
    }
    ISSUES.push(newIssue);
    console.log("[POST /]: adding new item", newIssue);
    res.sendStatus(200);
});
router.patch('/:id', (req, res) => {
    const issueIndex = ISSUES.findIndex(issue => issue.id == req.params.id);
    if (!issueIndex) {
        console.log("[ERROR PATCH /:id]: item not found with id", req.params.id)
        res.sendStatus(404);
    }
    ISSUES.splice(issueIndex, 1, {
        ...ISSUES[issueIndex],
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });
    console.log("[PATCH /:id]: patch item with id", id)
    res.sendStatus(200);
});
router.delete('/:id', (req, res) => {
    const issueIndex = ISSUES.findIndex(issue => issue.id == req.params.id);
    if (!issueIndex) {
        console.log("[ERROR DELETE /:id]: item not found with id", req.params.id);
        res.sendStatus(404);
    }
    ISSUES.splice(issueIndex, 1);
    console.log("[DELETE /:id]: deleted item with id", req.params.id);
    res.sendStatus(200);
});

module.exports = router;
