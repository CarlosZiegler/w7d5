import React from 'react';
import countries from '../countries.json';
import { Link } from 'react-router-dom';
import axios from 'axios';


class CountryDetail extends React.Component {

  state = {
    country: null
  }

  getCountryData = () => {
    const countryCode = this.props.match.params.id;
    axios.get(`/countries/${countryCode}`)
      .then(response => {
        const country = response.data;
        this.setState({
          country: country
        })
      })
  }

  componentDidMount() {
    this.getCountryData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getCountryData();
    }
  }

  render() {
    // const getCountryByCode = cca3 => countries.find(el => el.cca3 === cca3);
    // const country = { ...getCountryByCode(this.props.match.params.id) };
    // console.log(country);
    // const borders = country.borders.map(cca3 => getCountryByCode(cca3));

    const country = this.state.country;

    if (!country) return <></>;
    return (
      <div className="col-7">
        <h1>{country.name.common}</h1>
        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Capital</td>
              <td>{country.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {country.area} km
                <sup>2</sup>
              </td>
            </tr>
            {country.borders.length > 0 && (
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {country.borders.map(el => {
                      return (
                        <li key={el.cca3}>
                          <Link to={`/${el.cca3}`}>
                            {el.name.common}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CountryDetail;
