document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  if((!description) || (!assignedTo)){
    alert ('Input Something!');
    return;
  }
  const id = Math.floor(Math.random()*100000000) + '';
  let status = 'Open';

  const issue = { id, description, severity, assignedTo, status};
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  //CLEAR THE INPUT FEILD
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  let newIssue = {};
  if(issues){
    newIssue = issues;
  }
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  for (var i = 0; i < newIssue.length; i++) {
    // console.log(newIssue[i]);

    //Object Distructuring...
    const {id, description, severity, assignedTo, status} = newIssue[i];
    // console.log(id);

    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info ${status === 'Closed' ? 'colorText' : ''}"> ${status} </span></p>
                              <h3 class="${status === 'Closed' ? 'style' : ''}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                              </div>`;
    issuesList.appendChild(newDiv);
  }

}


const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}