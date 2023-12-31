
let choice = "";
let data = [];
  
const table = document.querySelector('.main-container');

const teams = [];
const playersFirstName = [];
const playersLastName = [];
const playersFullName = [];
const playersPosition = [];
const conference = [];
const division = [];
const teamName = [];
let avoidRepeat = "";
let j = 0;
const chosenSet = {
        teamFull: "",
        teamAlias: "",
        teamConference: "",
        teamDivision: ""
}

//connect to api
async function connectAPI() {
  try {
    const res = await fetch('https://www.balldontlie.io/api/v1/players');
    data = await res.json();
  } catch(err) {
    console.error(err);
  }
    for (let i = 0; i < data.data.length; i++) {
      teams.push(data.data[i].team.full_name);
      playersFirstName.push(data.data[i].first_name);
      playersLastName.push(data.data[i].last_name);
      playersPosition.push(data.data[i].position);
      conference.push(data.data[i].team.conference);
      division.push(data.data[i].team.division);
      teamName.push(data.data[i].team.full_name);
      playersFullName.push(`${playersFirstName[i]} ${playersLastName[i]}`);
    }
    console.log(teams)
}

// add event listener to dropdown menu
function listenTo() {
  const categories = document.querySelectorAll('.dropdown-item');
  categories.forEach(category => {
    category.addEventListener('click', (e) => {
      choice = e.target.dataset.category;
      chosenCategory();
  });
});
}

// links to onclick
function chosenCategory() {
    if (choice === avoidRepeat) {
      return;
    }
    switch(choice) {
      case 'teams': showTeams();
                  break;
      case 'players': showPlayers();
                  break;
      case 'standings': showStandings();
                  break;
      case 'statistics': showStatistics();
                  break;
      default: window.location = 'index.html'
    }
    avoidRepeat = choice;
}

// teams category
function showTeams() {
  table.classList.add('category-container', 'justify-content-center', 'bg-dark', 'bg-opacity-50', 'rounded-5');
  table.innerHTML = "<h2 class='sub-title'>NBA Team Information</h2>";
  
  const teamAndDescContainer = document.createElement('div');
  table.appendChild(teamAndDescContainer);
  teamAndDescContainer.className = 'teams-desc-container py-4 mx-auto bg-light bg-opacity-25 rounded-5';
  
  const newDiv1 = document.createElement('div');
  const newDiv2 = document.createElement('div');
  const teamContainer = teamAndDescContainer.appendChild(newDiv1);
  teamContainer.className = 'left-container'

  const newDiv3 = document.createElement('div');
  const newDiv4 = document.createElement('div');
  const categoryTitle = teamContainer.appendChild(newDiv3);
  categoryTitle.className = 'category-title bg-transparent ';
  categoryTitle.textContent = 'Teams';
  const listTeam = teamContainer.appendChild(newDiv4);
  listTeam.className = 'list-team bg-transparent ';

  const descContainer = teamAndDescContainer.appendChild(newDiv2);
  descContainer.className = 'desc-container col-7 bg-dark bg-opacity-25 rounded-5 border border-2 border-warning';
  
  
  // Team description on hover
  let t1 = document.createElement('div');
  let t2 = document.createElement('div');
  let t3 = document.createElement('div');
  let t4 = document.createElement('div');
  const tDiv1 = descContainer.appendChild(t1);
  const tDiv2 = descContainer.appendChild(t2);
  const tDiv3 = descContainer.appendChild(t3);
  const tDiv4 = descContainer.appendChild(t4);
  tDiv1.className = 'desc-nba-logo t-div1 desc-item'
  tDiv2.className = 'desc-team-logo t-div2 desc-item'
  tDiv3.className = 'desc-conference t-div3 desc-item'
  tDiv4.className = 'desc-division t-div4 desc-item'


    // conference and division containers
    const oneDiv = document.createElement('div');
    const twoDiv = document.createElement('div');
    const confContainer = tDiv3.appendChild(oneDiv);
    const divisionContainer = tDiv4.appendChild(twoDiv);

    confContainer.className = 'conference fs-3 px-3 pt-1 pb-3 mt-3';
    divisionContainer.className = 'division fs-3 px-3 pt-1 pb-3';


  // removing duplicates
  const newTeams = teams.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      return [...accumulator, currentValue]
    }
    return accumulator;
  }, []);


  // teams handling values when mouse over
  function handleMouseOver(key) {
    let team = teams[key];
    let arrTeamName = team.split(" ");
    let lastString = arrTeamName[arrTeamName.length - 1].toLowerCase();
    if (lastString === '76ers') {
      lastString = 'p76ers';
    }

    const cContainer = document.querySelector('.conference');
          cContainer.className = 'conference px-3 pt-1 pb-3 mt-3 border border-3 border-dark shadow rounded-3';
          cContainer.textContent = 'CONFERENCE:';

    const dContainer = document.querySelector('.division');
          dContainer.className = 'division px-3 pt-1 pb-3 border border-3 border-dark shadow rounded-3';
          dContainer.textContent = 'DIVISION:';

    const descriptionContainer = document.querySelector('.desc-container');
          descriptionContainer.className = 'desc-container col-7 bg-dark bg-opacity-25 rounded-5 border border-2 border-warning';
          descriptionContainer.style.animation = 'appear 1s ease',
                                    'enlarge 2s ease';

    const nbaCont = document.querySelector('.desc-nba-logo');
          nbaCont.innerHTML = `<img src='images/nba-logo2.png' class='logo-nba desc-nba-logo' />`;
    
    const nbaLogo = document.querySelector('.logo-nba');
          nbaLogo.style.animation = "enlarge 0.5s linear";

    const teamCont = document.querySelector('.desc-team-logo');
          teamCont.innerHTML = `<img src='images/team/${lastString}.png' class='logo-team info-team-logo' />`

    const teamLogo = document.querySelector('.logo-team');
          teamLogo.style.animation = "sway 5s linear infinite";

    const child1Div = document.createElement('div');
    const cValue = confContainer.appendChild(child1Div);
          cValue.className = 'conf-value fs-4 text-light d-flex justify-content-center';
          cValue.textContent = conference[key];
          cValue.style.animation = 'appear 2.5s ease-out';
    
    const child2Div = document.createElement('div');
    const dValue = divisionContainer.appendChild(child2Div);
          dValue.className = 'division-value fs-4 text-light d-flex justify-content-center';
          dValue.textContent = division[key];
          dValue.style.animation = 'appear 2.5s ease-out';
  }


  // showing list of teams on left side with corresponding logo
  for (let j = 0; j < newTeams.length; j++) {
    const createDiv = document.createElement('div');
    const newDiv = listTeam.appendChild(createDiv);  
    
    let arrTeamName = newTeams[j].split(' ');
    let lastString = arrTeamName[arrTeamName.length - 1].toLowerCase();

    if (lastString === '76ers') {
      lastString = 'p76ers';
    }
    let newSpanLogo = document.createElement('span');
    let spanLogo = listTeam.appendChild(newSpanLogo);

    if (newTeams[j] === "Detroit Pistons") {
      newDiv.innerHTML = "Detroit Pistons &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
    } else if (newTeams[j] === "LA Clippers") {
      newDiv.innerHTML = "LA Clippers &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
    } else {
      newDiv.innerHTML = newTeams[j];
    }
    spanLogo.innerHTML = `<img class="team-logo p2" src="images/team/${lastString}.png">`;

    newDiv.style.animation = "enlarge 4s ease forwards";
    newDiv.className = "team-content text-light bg-opacity-75 py-1 ";

    newDiv.setAttribute("id", lastString);
    newDiv.setAttribute('data-alias', lastString);
  }


  // adding event listeners to teams
    const addListenToTeams = document.querySelectorAll('.team-content');
    addListenToTeams.forEach(team => {
      let chosenTeam = "";
      team.addEventListener('mouseover', (e) => {
        console.log(e);
        if (e.target.innerHTML === "Detroit Pistons &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") {
          chosenTeam = "Detroit Pistons";
        } else if (e.target.innerHTML === "LA Clippers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") {
          chosenTeam = "LA Clippers";
        } else {
          chosenTeam = e.target.innerText;
        }
        
        let teamIndex = teams.indexOf(chosenTeam);
        handleMouseOver(teamIndex);
      });
    });
}



// players category
function showPlayers() {

  table.classList.add('player-category-container', 'category-container', 'max-height-75', 'justify-content-center', 'bg-dark', 'bg-opacity-50', 'rounded-5');
  table.innerHTML = "<h2 class='sub-title'>NBA Player Information</h2>";
  
  const playerAndDescContainer = document.createElement('div');
  table.appendChild(playerAndDescContainer);
  playerAndDescContainer.className = 'players-desc-container teams-desc-container mx-auto bg-light bg-opacity-25 rounded-5';
  
  const newDiv1 = document.createElement('div');
  const newDiv2 = document.createElement('div');
  const playerContainer = playerAndDescContainer.appendChild(newDiv1);
        playerContainer.className = 'left-container player-col-container'

  const newDiv3 = document.createElement('div');
  const newDiv4 = document.createElement('div');
  const categoryTitle = playerContainer.appendChild(newDiv3);
        categoryTitle.className = 'category-title bg-transparent ';
        categoryTitle.textContent = 'Players';
  const listPlayer = playerContainer.appendChild(newDiv4);
        listPlayer.className = 'list-players scroll bg-transparent ';

  const descContainer = playerAndDescContainer.appendChild(newDiv2);
        descContainer.className = 'players-container desc-container col-7 bg-dark bg-opacity-25 rounded-5 border border-2 border-warning';

  // Player description on hover
  let t1 = document.createElement('div');
  let t2 = document.createElement('div');
  let t3 = document.createElement('div');
  let t4 = document.createElement('div');
  const tDiv1 = descContainer.appendChild(t1);
  const tDiv2 = descContainer.appendChild(t2);
  const tDiv3 = descContainer.appendChild(t3);
  const tDiv4 = descContainer.appendChild(t4);
  tDiv1.className = 'desc-nba-logo t-div1 desc-item'
  tDiv2.className = 'desc-team-logo t-div2 desc-item'
  tDiv3.className = 'desc-conference t-div3 desc-item'
  tDiv4.className = 'desc-division t-div4 desc-item'


  // team name and position containers
  const oneDiv = document.createElement('div');
  const twoDiv = document.createElement('div');
  const playerTeamContainer = tDiv3.appendChild(oneDiv);
  const playerPositionContainer = tDiv4.appendChild(twoDiv);


  playerTeamContainer.className = 'conference fs-3 px-3 pt-1 pb-3 mt-3';
  playerPositionContainer.className = 'division fs-3 px-3 pt-1 pb-3';

  // players handling values when mouse over
  function handleMouseOver(key) {
    let team = teams[key];
    let pPosition = playersPosition[key];
    let fName = playersFirstName[key];
    if (playersFirstName[key] === 'Zach') {
      fName = (playersLastName[key] === 'Lofton') ? 'ZachL' : 'ZachR';
    }
    if (playersFirstName[key] === 'Michael') {
      fName = (playersLastName[key] === 'Smith') ? 'MichaelS' : 'MichaelA';
    }
  
    const tContainer = document.querySelector('.conference');
          tContainer.className = 'players-conference conference px-3 pt-1 pb-3 mt-3 border border-3 border-dark shadow rounded-3';
          tContainer.textContent = 'TEAM:';

    const pContainer = document.querySelector('.division');
          pContainer.className = 'division px-3 pt-1 pb-3 border border-3 border-dark shadow rounded-3';
          pContainer.textContent = 'POSITION:'

    const playerDescriptionContainer = document.querySelector('.desc-container');
          playerDescriptionContainer.classList.add('right-container', 'player-desc-container', 'col-7', 'bg-dark', 'bg-opacity-25', 'rounded-5', 'border', 'border-2', 'border-warning');
          playerDescriptionContainer.style.animation = 'appear 1s ease',
                                    'enlarge 2s ease';

    const nbaCont = document.querySelector('.desc-nba-logo');
          nbaCont.innerHTML = `<img src='images/nba-logo2.png' class='logo-nba desc-nba-logo' />`;      

    const nbaLogo = document.querySelector('.logo-nba');
          nbaLogo.style.animation = "enlarge 0.5s linear";

    const pPicture = document.querySelector('.desc-team-logo')
          pPicture.innerHTML = `<img src='images/players/${fName}.png' class='logo-team info-player-pic' />`

    const teamLogo = document.querySelector('.logo-team');
          teamLogo.style.animation = "appear 1.5s linear"; 
    

    const child1Div = document.createElement('div');
    const tValue = tContainer.appendChild(child1Div);
          tValue.className = 'conf-value text-light d-flex justify-content-center';
          tValue.textContent = teams[key];
          tValue.style.animation = 'enlarge 1s ease-out';
    
    const child2Div = document.createElement('div');
    const pValue = pContainer.appendChild(child2Div);
          pValue.className = 'division-value ]text-light d-flex justify-content-center';
          pValue.textContent = playersPosition[key];
          pValue.style.animation = 'enlarge 1s ease-out';

    
    pValue.classList.add('text-light');

    switch(pPosition) {
      case 'F': pPosition = 'Forward';
                break;
      case 'G': pPosition = 'Guard';
                break;    
      case 'C': pPosition = 'Center';
                break;
      case 'C-F': pPosition = 'Center-Forward';
                break;
      case 'F-C': pPosition = 'Forward-Center';
                break;
      case 'G-F': pPosition = 'Guard-Forward';
                break; 
      case 'F-C': pPosition = 'Forward-Center';
                break;
      case '': pPosition = 'No record on file';
                pValue.classList.remove('text-light');
                pValue.style.color = "tomato";
                break;
    }
    pValue.textContent = pPosition;
  }


    // showing list of players on left side with corresponding logo
    for (let j = 0; j < playersFirstName.length; j++) {
      const createDiv = document.createElement('div');
      const newDiv = listPlayer.appendChild(createDiv);  
  
      let arrTeamName = teams[j].split(" ");
      let lastString = arrTeamName[arrTeamName.length - 1].toLowerCase();
  
      if (lastString === '76ers') {
        lastString = 'p76ers';
      }
  
      let newSpanLogo = document.createElement('span');
      let spanLogo = listPlayer.appendChild(newSpanLogo);
  
      newDiv.textContent = playersFullName[j];
      spanLogo.innerHTML = `<img class="team-logo p2" src="images/team/${lastString}.png">`;
  
      newDiv.style.animation = 'enlarge 4s ease forwards';
      newDiv.className = 'players team-content text-light bg-opacity-75 px-3 py-1 ';
  
      newDiv.setAttribute('id', playersLastName[j].toLowerCase());
      newDiv.setAttribute('data-alias', playersLastName[j]);
    }


  // adding event listeners to players
  const addListenToPlayers = document.querySelectorAll('.players');
  addListenToPlayers.forEach(player => {
    player.addEventListener('mouseover', (e) => {
      let chosenPlayer = e.target.innerText;
      let playerIndex = playersFullName.indexOf(chosenPlayer);
      handleMouseOver(playerIndex);
    });
  });
}


connectAPI();
listenTo();