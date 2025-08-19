"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type CountryCode = {
  name: string;
  Iso2: string;
  Iso3: string;
  dialCode: string;
};

export function useCountriesNew() {
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState<string>("");
  const [selectedCityName, setSelectedCityName] = useState<string>("");
  const { data: countries = [] } = useQuery({
    queryKey: ["countriesnow", "codes"],
    queryFn: async (): Promise<CountryCode[]> => {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/codes"
      );
      const json = (await res.json()) as {
        error: boolean;
        msg: string;
        data: CountryCode[];
      };
      return json.data ?? [];
    },
    staleTime: 1000 * 60 * 60, // 1h
  });

  const { data: cities = [] } = useQuery({
    queryKey: ["countriesnow", "cities", selectedCountryName],
    queryFn: async (): Promise<string[]> => {
      if (!selectedCountryName) return [];
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: selectedCountryName }),
        }
      );
      const json = (await res.json()) as {
        error: boolean;
        msg: string;
        data: string[];
      };
      return json.error ? [] : json.data ?? [];
    },
    enabled: Boolean(selectedCountryName),
    staleTime: 1000 * 60 * 60, // 1h
  });

  const filteredCountries = useMemo(() => {
    const q = countrySearch.toLowerCase();
    return countries
      .filter((c) => c.name.toLowerCase().includes(q))
      .map((c) => c.name);
  }, [countries, countrySearch]);

  const filteredCities = useMemo(() => {
    const q = citySearch.toLowerCase();
    return cities.filter((c) => c.toLowerCase().includes(q));
  }, [cities, citySearch]);

  const selectedCountry = useMemo(
    () => countries.find((c) => c.name === selectedCountryName),
    [countries, selectedCountryName]
  );

  const phonePrefix = useMemo(() => {
    const dial = selectedCountry?.dialCode;
    return dial ? `+${dial}` : "";
  }, [selectedCountry]);

  const selectCountry = (name: string) => {
    setSelectedCountryName(name);
    setSelectedCityName("");
    setCitySearch("");
  };

  const selectCity = (name: string) => {
    setSelectedCityName(name);
  };

  return {
    filteredCountries,
    filteredCities,
    phonePrefix,
    setCountrySearch,
    setCitySearch,
    selectCountry,
    selectCity,
    selectedCountryName,
    selectedCityName,
  };
}


