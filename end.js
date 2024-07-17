const finalscore = document.getElementById('finalscore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalscore.innerText = mostRecentScore;