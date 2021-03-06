import {useState} from "react"
import {Link} from "react-router-dom"

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    countryOfOrigin: "",
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createPeople(newForm);
    setNewForm({
      name: "",
      image: "",
      countryOfOrigin: "",
    });
  };

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.countryOfOrigin}</h3>
      </div>
    ));
  };

  const loading = () => {
    if (props.people){
        return props.people.map((person) => {
            return <div key={person._id} className="person">
                <Link to={`/people/${person._id}`}>
                    <h1>{person.name}</h1>
                </Link>
                <img src={person.image} alt={person.name}/>
                <h3>{person.countryOfOrigin}</h3>
            </div>
        })
    } else {
    return <h1>Loading...</h1>; 
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="countryOfOrigin"
          onChange={handleChange}
        />
        <input type="submit" value="Create Person" />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  );
}

export default Index;