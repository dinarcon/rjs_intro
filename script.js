function Header() {
  return (
    <header>
      <h1>JavaScript Frameworks</h1>
      <p className="subheading">
        Vote for <strong>your favorite</strong> one.
      </p>
    </header>
  );
}

function Candidate({ name, year, votes, img_url }) {
  const [voteCount, setVoteCount] = React.useState(votes || 0);
  const handleClick = (event) => {
    setVoteCount(voteCount + 1);
  };

  return (
    <article>
      <h3>{name}</h3>
      <div className="year">Released in {year}</div>
      <div>{voteCount} votes</div>
      <button onClick={handleClick}>+1 vote</button>
      <img alt={`${name} logo`} src={img_url} />
    </article>
  );
}

Candidate.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  img_url: PropTypes.string.isRequired,
};

function CandidateList() {
  const sortByVotes = (data) => {
    return data.sort((a, b) => b.votes - a.votes);
  };

  const [ratings, setRatings] = React.useState([]);

  React.useEffect(() => {
    const ratingData = fetchData();
    setRatings(sortByVotes(ratingData));

    // useEffect can optionally return a clean up function.
    // It is executed before the effect is run again and when the component unmounts.
    // It can be used to clear a timer, unsubscribe from a service, etc.
    // This empty function is just a placeholder for reference.
    return function cleanup() {};

    // The second argument to useEffect is an array of variables.
    // If any of the variables changes between renders, the effect is run again.
    // An empty array means that the effect should be executed only once when the component mounts.
    // Not providing a value for this argument makes the effect run on every render of the component.
    // Generally, this array includes the variables used within useEffect. Lint rules exist to check this.
  }, []);

  return (
    <React.Fragment>
      <h2>Candidates</h2>
      <section>
        {ratings.map(({ id, name, year, votes, logo }) => {
          return (
            <Candidate
              key={id}
              name={name}
              year={year}
              votes={votes}
              img_url={logo}
            />
          );
        })}
      </section>
    </React.Fragment>
  );
}

function RatingApp() {
  return (
    <React.Fragment>
      <Header />
      <CandidateList />
    </React.Fragment>
  );
}

const domContainer = document.getElementById("react-app");
ReactDOM.render(<RatingApp />, domContainer);

function fetchData() {
  return [
    {
      id: "framework-1",
      name: "React",
      year: 2013,
      votes: 7,
      logo: "./images/react.png",
    },
    {
      id: "framework-2",
      name: "Vue",
      year: 2014,
      votes: 3,
      logo: "./images/vue.png",
    },
    {
      id: "framework-3",
      name: "Angular",
      year: 2010,
      votes: 5,
      logo: "./images/angular.png",
    },
  ];
}
