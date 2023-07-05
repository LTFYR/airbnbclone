import countries from "world-countries";

const mappedCountries = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const allCountries = () => mappedCountries;

  const getCountryByValue = (value: string) => {
    return mappedCountries.find((country) => country.value === value);
  };

  return {
    allCountries,
    getCountryByValue,
  };
};

export default useCountries;
